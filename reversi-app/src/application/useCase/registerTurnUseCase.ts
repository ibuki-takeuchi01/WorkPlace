import { GameRepository } from "../../domain/model/game/gameRepository"
import { GameResult } from "../../domain/model/gameResult/gameResult"
import { GameResultRepository } from "../../domain/model/gameResult/gameResultRepository"
import { Disc } from "../../domain/model/turn/disc"
import { Point } from "../../domain/model/turn/point"
import { TurnRepository } from "../../domain/model/turn/turnRepository"
import { connectMySQL } from "../../infrastructure/connection"
import { ApplicationError } from "../error/applicationError"

export class RegisterTurnUseCase{
  constructor(
    private _turnRepository: TurnRepository,
    private _gameRepository: GameRepository,
    private _gameResultRepository: GameResultRepository
  ) {}

  async run(
    turnCount: number,
    disc: Disc,
    point: Point,
  ){
    const conn = await connectMySQL()
  try {
    const game = await this._gameRepository.findLatest(conn)
    if(!game){
      throw new ApplicationError('LatestGameNotFound' ,'Latest game not found')
    }
    if (!game.id) {
      throw new Error('game.id not exist')
    }

    const previousTurnCount = turnCount - 1
    const previousTurn = await this._turnRepository.findGameIdAndTurnCount(
      conn,
      game.id,
      previousTurnCount
    )

    // 石を置く
    const newTurn = previousTurn.placeNext(disc, point)

    // ターンを保存する
    await this._turnRepository.save(conn, newTurn)

    // 勝敗が決した場合、対戦結果を保存
    if (newTurn.gameEnded()) {
      const winnerDisc = newTurn.winnerDisc()
      const gameResult = new GameResult(game.id, winnerDisc, newTurn.endAt)
      await this._gameResultRepository.save(conn, gameResult)

      // 対戦結果を保存
    }

    await conn.commit()
  } finally {
    await conn.end()
  }
  }
}