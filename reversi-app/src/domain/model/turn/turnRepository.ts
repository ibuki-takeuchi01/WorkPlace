import mysql from 'mysql2/promise'
import { Turn } from './turn'

export interface TurnRepository {
  findGameIdAndTurnCount(
    conn: mysql.Connection,
    gameId: number,
    turnCount: number
  ): Promise<Turn>

  save(conn: mysql.Connection, turn: Turn): Promise<void>
}