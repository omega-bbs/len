import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from './Role'

@Entity()
export class Permission {
  // basic columns
  @PrimaryGeneratedColumn() public id: number

  @Column() public name: string

  // relationships
  @ManyToMany(type => Role, role => role.permissions)
  public roles: Role
}
