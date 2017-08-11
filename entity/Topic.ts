import {
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Board} from './Board';
import {Post} from './Post';
import {User} from './User';
import {Entity} from 'typeorm/decorator/entity/Entity';

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @ManyToOne(type => Board, board => board.topics)
    board: Board;
    @OneToOne(type => Post)
    rootPost: Post;
    @OneToOne(type => Post)
    lastPost: Post;
    @OneToMany(type => Post, post => post.topic)
    posts: Post[];
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @Column()
    deletedAt: Date;
    @ManyToOne(type => User, user => user.topics)
    author: User;
}