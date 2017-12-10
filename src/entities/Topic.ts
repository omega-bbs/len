import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Board } from './Board'
import { Post } from './Post'

@Entity()
export class Topic {
  // basic types
  @PrimaryGeneratedColumn() public id: number

  @Column() public title: string

  @Column() public createdAt: Date

  @Column() public updatedAt: Date

  @Column() public deletedAt: Date

  // relationships
  @OneToMany(type => Post, post => post.topic)
  public posts: Post[]

  @ManyToOne(type => Board, board => board.topics)
  public board: Board
}
