import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Topic } from './Topic';

@Entity()
export class Board {
  @PrimaryGeneratedColumn() id: number;

  @Column() slug: string;

  @Column() name: string;

  @Column() theme: string;

  @Column() description: string;

  @OneToMany(type => Topic, topic => topic.board)
  topics: Topic[];
}
