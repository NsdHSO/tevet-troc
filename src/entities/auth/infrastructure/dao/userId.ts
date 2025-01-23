import { Column } from 'typeorm';

export class UserDID{
    @Column({
        unique: true,
        type: 'int',
    })
    uic!: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    email!: string;
}