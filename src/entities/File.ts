import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Post } from './Post'
import { User } from './User'

export enum FileUsage {
  avatar = 1,
  post
}

@Entity()
export class File {
  // basic columns
  @PrimaryGeneratedColumn() public id: number

  @Column() public filename: string

  @Column() public mime: string

  @Column() public hash: string

  @Column() public bytes: number

  @Column() public storageDriver: string

  @Column() public path: string

  // @Column() public url: string

  @Column() public createdAt: Date

  @Column() public updatedAt: Date

  @Column() public deletedAt: Date

  // relationships
  @Column() public author: User

  @ManyToOne(type => User, user => user.avatarFiles)
  public usedInUser: User

  @ManyToOne(type => Post, post => post.files)
  public usedInPost: Post

  // calculated fields
  public getUrl(): string {
    return 'FIXME'
  }
}
