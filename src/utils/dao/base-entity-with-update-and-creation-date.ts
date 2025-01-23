import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntityWithUpdateAndCreationDate {
    @CreateDateColumn({
        type: 'timestamp',
        nullable: true
    })
    createdAt!: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: true
    })
    updatedAt!: Date;
}