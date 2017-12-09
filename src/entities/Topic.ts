import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from './Post'

@Entity()
export class Topic {
  // basic types
  @PrimaryGeneratedColumn() public id: number

  @Column() public title: string

  @Column() public board: Board

  @Column() public topic: Topic

  @Column() public createdAt: Date

  @Column() public updatedAt: Date

  @Column() public deletedAt: Date

  // relationships
  @OneToMany(type => Post, post => post.topic)
  public posts: Post[]
}
