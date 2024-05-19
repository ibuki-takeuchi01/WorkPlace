import { TurnGateway } from "../dataaccess/turnGateway"
import { SquareGateway } from "../dataaccess/squareGateway"
import { GameGateway } from "../dataaccess/gamegateway"
import { connectMySQL } from "../dataaccess/connection"
import { DARK, INITIAL_BOARD } from "../application/constants"

const turnGateway = new TurnGateway()
const gameGateway = new GameGateway()
const squareGateway = new SquareGateway()

export class GameService {
  async startNewGame(){
    const now = new Date()

  const conn = await connectMySQL()
  try {
    await conn.beginTransaction()

    const gameRecord = await gameGateway.insert(conn, now)

    const turnRecord = await turnGateway.insert(
      conn,
      gameRecord.id,
      0,
      DARK,
      now
    )

    await squareGateway.insertAll(conn, turnRecord.id, INITIAL_BOARD)

    await conn.commit()
  } finally {
    await conn.end()
  }
  }
}