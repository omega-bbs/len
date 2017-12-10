import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Role } from './Role'

@Entity()
export class Permission {
  // basic columns
  @PrimaryGeneratedColumn() public id: number

  @Column()
  @Index({ unique: true }) // permission name should be unique
  public name: string

  @Column('text') public description: string

  // relationships
  @ManyToMany(type => Role, role => role.permissions)
  public roles: Role
}
