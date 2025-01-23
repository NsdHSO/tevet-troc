// Reusable Types
export type ThemePreference = 'light' | 'dark' | 'system';
export type CreateUser = Partial<IUser>;
export type CreatedUser = Pick<IUser, 'email' | 'username' | 'roles'>
export type LoginUser = Partial<Pick<IUser, 'email' | 'username' | 'password'| 'uic'>>

export enum Role {
    ADMIN = 'admin',
    EDITOR = 'editor',
    USER = 'user',
    GUEST = 'guest',
}

export enum Permission {
    READ = 'read',
    WRITE = 'write',
    DELETE = 'delete',
    UPDATE = 'update',
}

// Address Type
interface Address {
    street: string;
    city: string;
    state?: string; // Optional for countries without states
    postalCode: string; // ZIP or postal code
    country: string; // ISO 3166-1 alpha-2 country code (e.g., 'US', 'FR')
}

// Notification Preferences Type
interface NotificationPreferences {
    email: boolean;
    sms: boolean;
    push: boolean;
}

// Preferences Type
interface Preferences {
    language: string; // Language code (e.g., 'en', 'es', 'fr')
    theme: ThemePreference;
    notifications: NotificationPreferences;
}

// Main User Interface
export interface IUser {
    // Unique identifier for the user
    id: string;

    // Basic personal information
    firstName: string;
    lastName: string;
    email: string;
    username?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    uic: string
    alias: string
    // Authentication-related fields
    password?: string;
    twoFactorEnabled?: boolean;
    lastLoginAt?: Date;

    // Address information
    address?: Address;

    // Roles and permissions
    roles: Role[]; // Array of predefined roles
    permissions?: Permission[]; // Array of predefined permissions

    // User preferences
    preferences?: Preferences;

    // Account status
    isActive: boolean;
    isEmailVerified: boolean;
    isPhoneVerified?: boolean;

    // Metadata
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;

    // Additional properties for extensibility
    [key: string]: any;
}