import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Comment } from './Comment'
import { File } from './File'
import { Topic } from './Topic'
import { User } from './User'

export enum PostBodyType {
  ast = 1,
  plain,
  markdown
}

@Entity()
export class Post {
  // basic columns
  @PrimaryGeneratedColumn() public id: number

  @Column() public sequence: number

  @Column() public bodyType: PostBodyType

  @Column() public body: string

  @Column() public createdAt: Date

  @Column() public updatedAt: Date

  @Column() public deletedAt: Date

  // relationships
  @ManyToOne(type => User, user => user.posts)
  public author: User

  @ManyToOne(type => Topic, topic => topic.posts)
  public topic: Topic

  @OneToMany(type => Comment, comment => comment.post)
  public comments: Comment[]

  @OneToMany(type => File, file => file.author)
  public files: File[]

  @ManyToMany(type => Post, post => post.postsReferencedBy)
  @JoinTable()
  public postsReferenced: Post[]

  @ManyToMany(type => Post, post => post.postsReferenced)
  public postsReferencedBy: Post[]
}
