import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Permission, Role } from '../../applications';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;  // Add the definite assignment assertion (!)

    @Column({ type: 'varchar', length: 50 })
    firstName!: string;

    @Column({ type: 'varchar', length: 50 })
    lastName!: string;

    @Column({ type: 'varchar', unique: true })
    email!: string;

    @Column({ type: 'varchar', nullable: true })
    username?: string;

    @Column({ type: 'varchar', nullable: true })
    phoneNumber?: string;

    @Column({ type: 'date', nullable: true })
    dateOfBirth?: Date;

    @Column({ type: 'varchar', nullable: true })
    passwordHash?: string;

    @Column({ type: 'varchar', nullable: true })
    passwordSalt?: string;
    @Column({ type: 'boolean', default: false })
    twoFactorEnabled!: boolean;

    @Column({ type: 'timestamp', nullable: true })
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

    @Column({ type: 'boolean', default: true })
    isActive?: boolean;

    @Column({ type: 'boolean', default: false })
    isEmailVerified?: boolean;

    @Column({ type: 'boolean', default: false })
    isPhoneVerified?: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}
