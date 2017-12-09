import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Post } from './Post'

@Entity()
export class Comment {
  // basic columns
  @PrimaryGeneratedColumn() public id: number

  @Column() public body: string

  @Column() public createdAt: Date

  @Column() public updatedAt: Date

  @Column() public deletedAt: Date

  // relationships
  @Column() public author: User

  @ManyToOne(type => Post, post => post.comments)
  public post: Post
}
