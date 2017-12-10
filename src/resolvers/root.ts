import { getRepository } from 'typeorm'
import { Board } from '../entities/Board'
import { Board as BoardResolver } from './Board'

export async function allBoards(): Promise<BoardResolver[]> {
  const entities = await getRepository(Board).find()
  const resolvers = await BoardResolver.fromList(BoardResolver, entities)
  return resolvers
}

export async function boardById({
  id
}: {
  id: number
}): Promise<BoardResolver> {
  const board = await getRepository(Board).findOneById(id)
  return BoardResolver.fromEntity(BoardResolver, board)
}

export async function boardBySlug({
  slug
}: {
  slug: string
}): Promise<BoardResolver> {
  const board = await getRepository(Board).findOne({
    where: {
      slug
    }
  })
  return BoardResolver.fromEntity(BoardResolver, board)
}
