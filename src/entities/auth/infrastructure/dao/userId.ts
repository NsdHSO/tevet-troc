import { Column } from 'typeorm';

export class UserDID{
    @Column({
        type: 'int',
    })
    uic?: number;

    @Column({type:'varchar'})
    email?: string;
}
