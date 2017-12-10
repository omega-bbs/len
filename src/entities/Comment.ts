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

@Entity()
@Index(['post', 'createdAt']) // post.comments
@Index(['author', 'createdAt']) // author.comments
export class Comment {
  // basic columns
  @PrimaryGeneratedColumn() public id: number

  @Column('text') public body: string

  @Column() public createdAt: Date

  @Column() public updatedAt: Date

  @Column() public deletedAt: Date

  // relationships
  @ManyToOne(type => User, user => user.comments)
  public author: Promise<User>

  /** post of the comment belongs to */
  @ManyToOne(type => Post, post => post.comments)
  public post: Promise<Post>
}
