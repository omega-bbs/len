import {
  Column,
  Entity,
  Index,
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

  /** the storage driver which the file storage in */
  @Column() public storageDriver: string

  /** the path of the storage driver which the file storage in  */
  @Column() public path: string

  @Column() public createdAt: Date

  @Column() public updatedAt: Date

  @Column() public deletedAt: Date

  // relationships
  @ManyToOne(type => User, user => user.files)
  public author: User

  /** get the user if this file using(used) as avatar */
  @ManyToOne(type => User, user => user.avatarFiles)
  public usedInUser: User

  /** get the post if this file using in a post */
  @ManyToOne(type => Post, post => post.files)
  @Index() // post.files
  public usedInPost: Post

  // calculated fields
  /** get the public accessed url of the file (use the storageDriver and path) */
  public getUrl(): string {
    return 'FIXME'
  }
}
