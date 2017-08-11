import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn() id: number;

  @Column() body: string;

  @ManyToOne(type => User, user => user.comments)
  author: User;

  @ManyToOne(type => Post, post => post.comments)
  post: User;


  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  @Column() deletedAt: Date;
}
