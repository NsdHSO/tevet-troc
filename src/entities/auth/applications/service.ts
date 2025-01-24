import { IUserRepository } from './repository';
import { CreatedUser, CreateUser, IUser, LoginUser, Permission, Role } from './models';
import { generateHash } from '../util';
import { IUserHttp } from './http';
import { createError, ErrorObject, httpResponseBuilder } from '../../../infrastructure/models/error';
import { generateAlias } from '../../../utils/functions';
import { HttpCodeW } from '../../../infrastructure/enums/http-code';

export function userAuthApplicationService(userRepository: IUserRepository): IUserHttp {
    return {
        register: async (user: CreateUser) => {
            if (!user.email || !user.password) {
                throw httpResponseBuilder.BadRequest('Please provide a valid email address');
            }

            const existingUser = await userRepository.findByEmail(user.email);
            if (existingUser) {
                throw httpResponseBuilder.Conflict('User already exists');
            }
            const {
                hash,
                salt
            } = await generateHash(user.password);
            try {
                return httpResponseBuilder.OK(await userRepository.create({
                    ...createPayloadForCreateUser(user),
                    passwordHash: hash,
                    passwordSalt: salt,
                }));
            } catch (error) {
                throw httpResponseBuilder.Conflict('User can\'t be saved');
            }
        },
        async authenticate(requestUser: LoginUser, refreshToken: string) {

            const user = await userRepository.findByEmail(requestUser.email as string);
            if (!user) {
                throw createError('Wrong credentials provided', 401);
            }
            const { hash } = await generateHash((requestUser.password as string), user.passwordSalt);

            if (hash !== user.passwordHash) {
                throw createError('Wrong credentials provided', 404);
            }

            if (!user.refreshToken) {
                user.refreshToken = refreshToken;
            }

            await userRepository.save({ ...user });
            return httpResponseBuilder.OK({
                id: user.id,
                username: user.username,
                email: user.email,
                refreshToken: user.refreshToken,
                uic: user.uic
            });
        },
        async logout(email: string): Promise<{ message: string }> {
            try {
                const userDao = await userRepository.findByEmail(email);
                userDao.refreshToken = null;
                await userRepository.save(userDao);
                return httpResponseBuilder.OK('User was logout');
            } catch (error) {
                throw httpResponseBuilder.NotImplemented('Cannot read of null reading (\'email\')');
            }
        },
        async refresh(user: LoginUser) {
            try {
                const userDao = await userRepository.findByEmail(user.email as string);
                await userRepository.update(userDao as any);
            } catch (error) {
                throw httpResponseBuilder.NotImplemented('Cannot read of null reading (\'email\')');
            }
        }

    };
}

function createPayloadForCreateUser(user: CreateUser): Omit<IUser, 'id'> {
    return {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        username: user.username ?? '', // Use empty string if undefined or null
        phoneNumber: user.phoneNumber ?? '', // Same as above
        dateOfBirth: new Date(), // Same as above
        password: user.password ?? '', // Same as above
        twoFactorEnabled: user.twoFactorEnabled ?? false, // Default to false if not provided
        lastLoginAt: user.lastLoginAt ?? undefined, // Default to undefined if not provided
        address: {
            street: user.address?.street || '',
            city: user.address?.city || '',
            state: user.address?.state ?? undefined, // Default to undefined if not provided
            postalCode: user.address?.postalCode || '',
            country: user.address?.country || '',
        },
        roles: user.roles ?? [Role.USER], // Default to [Role.USER] if no roles provided
        permissions: user.permissions ?? [Permission.READ], // Default to [Permission.READ] if no permissions provided
        preferences: {
            language: user.preferences?.language ?? 'en', // Default to 'en' if not provided
            theme: user.preferences?.theme ?? 'light', // Default to 'light' if not provided
            notifications: {
                email: user.preferences?.notifications?.email ?? true, // Default to true if not provided
                sms: user.preferences?.notifications?.sms ?? false, // Default to false if not provided
                push: user.preferences?.notifications?.push ?? true, // Default to true if not provided
            },
        },
        isActive: user.isActive ?? true, // Default to true if not provided
        isEmailVerified: user.isEmailVerified ?? false, // Default to false if not provided
        isPhoneVerified: user.isPhoneVerified ?? false, // Default to false if not provided
        createdAt: new Date(),
        refreshToken: user.refreshToken ?? null,
        alias: user.alias ?? generateAlias()
    };
}
