import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { customAlphabet } from 'nanoid';
import { BaseEntityWithUpdateAndCreationDate } from '../../../../utils/dao/base-entity-with-update-and-creation-date';
import { Permission, Role } from '../../applications';

class UserWithDid extends BaseEntityWithUpdateAndCreationDate {
    @Column({
        unique: true,
        type: 'int',
    })
    uic!: string;

    @Column({
        unique: true,
        type: 'varchar',
    })
    alias!: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    firstName!: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    lastName!: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    email!: string;
}

@Entity('user')
export class UserEntity extends UserWithDid {
    @PrimaryGeneratedColumn('uuid')
    id!: string;  // Add the definite assignment assertion (!)

    @Column({
        type: 'varchar',
        nullable: true
    })
    username?: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    phoneNumber?: string;

    @Column({
        type: 'date',
        nullable: true
    })
    dateOfBirth?: Date;

    @Column({
        type: 'varchar',
        nullable: true
    })
    passwordHash?: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    passwordSalt?: string;

    @Column({
        type: 'boolean',
        default: false
    })
    twoFactorEnabled!: boolean;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    lastLoginAt?: Date;

    @Column({
        type: 'jsonb',
        nullable: true,
    })
    address?: {
        street: string;
        city: string;
        state?: string;
        postalCode: string;
        country: string;
    };

    @Column({
        type: 'enum',
        enum: Role,
        array: true,
        default: [Role.USER],
    })
    roles?: Role[];

    @Column({
        type: 'enum',
        enum: Permission,
        array: true,
        nullable: true,
    })
    permissions?: Permission[];

    @Column({
        type: 'jsonb',
        nullable: true,
    })
    preferences?: {
        language: string;
        theme: 'light' | 'dark' | 'system';
        notifications: {
            email: boolean;
            sms: boolean;
            push: boolean;
        };
    };

    @Column({
        type: 'boolean',
        default: true
    })
    isActive?: boolean;

    @Column({
        type: 'boolean',
        default: false
    })
    isEmailVerified?: boolean;

    @Column({
        type: 'boolean',
        default: false
    })
    isPhoneVerified?: boolean;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    refreshToken?: string | null;

    @BeforeInsert()
    generateId() {
        const nanoid = customAlphabet('0123456789', 8);
        this.uic = nanoid(); // Generates an 8-character string
    }
}

