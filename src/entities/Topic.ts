import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
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
  @OneToOne(type => Post, { eager: true })
  @JoinColumn()
  public rootPost: Post

  @ManyToOne(type => Board, board => board.topics)
  @Index() // board.topics
  public board: Promise<Board>

  @OneToMany(type => Post, post => post.topic)
  public posts: Promise<Post[]>
}
