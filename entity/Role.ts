import {Column, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {Permission} from './Permission';
import {User} from './User';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToMany(type => Permission, permission => permission.roles)
    @JoinTable()
    permissions: Permission[];
    @Column()
    title: string;
    @OneToMany(type => User, user => user.role)
    users: User;
}