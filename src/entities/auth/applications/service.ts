import { IUserRepository } from './repository';
import { CreatedUser, CreateUser, IUser, LoginUser } from './models';
import { generateHash } from '../util';
import { IUserHttp } from '../infrastructure/http/model';

export function userAuthApplicationService(userRepository: IUserRepository): IUserHttp {
    return {
        register: async (user: CreateUser): Promise<CreatedUser | undefined> => {
            if (!user.email || !user.password) {
                return undefined;
            }

            const existingUser = await userRepository.findByEmail(user.email);
            if (existingUser) {
                const err = new Error('User already exists');
                (err as any)['statusCode'] = 409;
                throw err;
            }
            const {
                hash,
                salt
            } = await generateHash(user.password);

            try {
                return await userRepository.create({
                    ...createPayloadForCreateUser(),
                    passwordHash: hash,
                    passwordSalt: salt
                });
            } catch (error) {

            }
            return undefined;
        },
        authenticate(email: LoginUser): Promise<CreatedUser | undefined> {
            return Promise.resolve(undefined);
        },
        logout(): Promise<{ message: string }> {
            return Promise.resolve({ message: 'Not implementd' });
        },
        refresh(): Promise<string> {
            return Promise.resolve('Not implemented');
        }

    };
}

function createPayloadForCreateUser(): IUser {
    return {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        username: undefined,
        phoneNumber: undefined,
        dateOfBirth: undefined,
        password: undefined,
        twoFactorEnabled: false,
        lastLoginAt: undefined,
        address: {
            street: '',
            city: '',
            state: undefined,
            postalCode: '',
            country: '',
        },
        roles: [], // No roles by default
        permissions: [], // No permissions by default
        preferences: {
            language: 'en', // Default language
            theme: 'light', // Default theme
            notifications: {
                email: true, // Default to receiving email notifications
                sms: false,
                push: true,
            },
        },
        isActive: true, // Default to active
        isEmailVerified: false,
        isPhoneVerified: false,
        createdAt: new Date(), // Current timestamp
        updatedAt: new Date(), // Current timestamp
        deletedAt: undefined,
    };
}