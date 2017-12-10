import { getRepository } from 'typeorm'
import { Board } from '../entities/Board'
import { Board as BoardResolver } from './Board'

export async function allBoards(): Promise<BoardResolver[]> {
  const entities = await getRepository(Board).find()
  const resolvers = await BoardResolver.fromList(BoardResolver, entities)
  return resolvers
}
