import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Topic } from './Topic'

export class Board {
  // basic columns
  @PrimaryGeneratedColumn() public id: number

  @Column() public slug: string

  @Column() public name: string

  @Column() public theme: string

  @Column() public description: string

  // relationships
  @OneToMany(type => Topic, topic => topic.board)
  public topics: Topic[]
}
