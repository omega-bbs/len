import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Permission } from './Permission'
import { User } from './User'

@Entity()
export class Role {
  // basic columns
  @PrimaryGeneratedColumn() public id: number

  @Column('text') public title: string

  // relationships
  @ManyToOne(type => User, user => user.role)
  public users: User[]

  @ManyToMany(type => Permission, permission => permission.roles)
  @JoinTable()
  public permissions: Permission[]
}
