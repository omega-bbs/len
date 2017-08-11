import {ManyToMany, PrimaryColumn} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {Role} from './Role';

@Entity()
export class Permission {
    @PrimaryColumn()
    id: string;
    @ManyToMany(type => Role, roles => roles.permissions)
    roles: Role[];
}