import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Topic } from './Topic'

@Entity()
export class Board {
  // basic columns
  @PrimaryGeneratedColumn() public id: number

  /** slug of the board, used in the url, should be unique */
  @Column()
  @Index({ unique: true }) // ensure slug to be unique; boardBySlug
  public slug: string

  /** name of the board, used in everywhere, not required to be unique */
  @Column() public name: string

  /** theme filed is preserved for future use */
  @Column() public theme: string

  @Column('text') public description: string

  // relationships
  /** topics of the board */
  @OneToMany(type => Topic, topic => topic.board)
  public topics: Topic[]
}
