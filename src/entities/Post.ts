import {
  Column,
  Entity,
  Generated,
  Index,
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
@Index(['topic', 'sequence'], { unique: true }) // topic sequence number
export class Post {
  // basic columns
  @PrimaryGeneratedColumn() public id: number

  // FIXME: should be generated
  @Column() public sequence: number

  @Column() public bodyType: PostBodyType

  @Column('text') public body: string

  @Column() public createdAt: Date

  @Column() public updatedAt: Date

  @Column() public deletedAt: Date

  // relationships
  @ManyToOne(type => User, user => user.posts)
  @Index() // user.posts
  public author: User

  @ManyToOne(type => Topic, topic => topic.posts)
  @Index() // topic.posts
  public topic: Topic

  @OneToMany(type => Comment, comment => comment.post)
  public comments: Comment[]

  /** files used in this post */
  @OneToMany(type => File, file => file.author)
  public files: File[]

  /** posts which referenced to this post */
  @ManyToMany(type => Post, post => post.postsReferencedBy)
  @JoinTable()
  public postsReferenced: Post[]

  /** posts which referenced by this post */
  @ManyToMany(type => Post, post => post.postsReferenced)
  public postsReferencedBy: Post[]
}
