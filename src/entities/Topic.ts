import {
  Column,
  Entity,
  Index,
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

  @Column('text') public title: string

  @Column() public createdAt: Date

  @Column() public updatedAt: Date

  @Column() public deletedAt: Date

  // relationships
  @ManyToOne(type => Board, board => board.topics)
  @Index() // board.topics
  public board: Board

  @OneToMany(type => Post, post => post.topic)
  public posts: Post[]
}
