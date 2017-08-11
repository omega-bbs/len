import {Column, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Topic} from './Topic';
import {Entity} from 'typeorm/decorator/entity/Entity';

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    slug: string;
    @Column()
    name: string;
    @Column()
    theme: string;
    @Column()
    description: string;
    @OneToMany(type => Topic, topic => topic.board)
    topics: Topic[]
}
