import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Permission } from './Permission'

export class Role {
  // basic columns
  @PrimaryGeneratedColumn() public id: number

  @Column() public title: string

  // relationships
  @ManyToMany(type => Permission, permission => permission.roles)
  @JoinTable()
  public permissions: Permission
}
