import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Comment } from './Comment';
import { Post } from './Post';
import { Role } from './Role';
import { Topic } from './Topic';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() username: string;

  @Column() displayName: string;

  @Column() email: string;

  @Column() bio: string;

  @Column() avatarUrl: string;

  @Column() lastLoggedInAt: Date;
  @ManyToOne(type => Role, role => role.users)
  role: Role;

  @Column() createdAt: Date;
  @OneToMany(type => Topic, topic => topic.author)
  topics: Topic[];

  @OneToMany(type => Post, post => post.author)
  posts: Post[];

  @OneToMany(type => Comment, comment => comment.author)
  comments: Comment[];
}
