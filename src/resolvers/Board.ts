import { getRepository } from 'typeorm'
import { Board as BoardEntity } from '../entities/Board'
import { Topic } from '../entities/Topic'
import { BaseResolver } from './BaseResolver'

export class Board extends BaseResolver<BoardEntity> {
  public id: number
  constructor(id: number) {
    super(BoardEntity, id)
    this.publicFields('slug', 'name', 'theme', 'description', 'topics')
  }
  public topicCount(): Promise<number> {
    return getRepository(Topic).count({
      where: {
        board: this.id
      }
    })
  }
}
