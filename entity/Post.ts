import {
  Column,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Comment } from './Comment';
import { Topic } from './Topic';
import { User } from './User';

@Entity()
export class Post {
  @PrimaryGeneratedColumn() id: number;

  @Column() body: string;

  @ManyToOne(type => User, user => user.posts)
  author: User;

  @ManyToOne(type => Topic, topic => topic.posts)
  topic: Topic;

  @ManyToMany(type => Post, post => post.referencesBy)
  @JoinTable({
    inverseJoinColumn: { name: 'referenceBy' },
    joinColumn: { name: 'referenceTo' }
  })
  referencesTo: Post[];

  @ManyToMany(type => Post, post => post.referencesTo)
  referencesBy: Post[];

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  @Column() deletedAt: Date;
}
