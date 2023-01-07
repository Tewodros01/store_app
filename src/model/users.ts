import DB from '../config/database';
import bcrypt from 'bcrypt';

let pepper: any;
let saltRounds: any;
pepper = process.env.BCRYPT_PASSWORD;
saltRounds = process.env.SALT_ROUNDS;

export type User = {
  id?: Number;
  firstName?: String;
  lastName?: String;
  password?: String;
};

export class UserStore {
  async getAllUser(): Promise<User[]> {
    try {
      const conn = await DB.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.row;
    } catch (err) {
      throw new Error(`Could not get user the data ${err}`);
    }
  }
  async getUser(id: number): Promise<User> {
    try {
      const conn = await DB.connect();
      const sql = 'SELECT * FROM users WHERE id = ($1) ';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.row;
    } catch (err) {
      throw new Error(`Could not get the user data  ${err}`);
    }
  }
  async createUser(user: User): Promise<User> {
    try {
      const conn = await DB.connect();
      const sql =
        'INSERT INTO users (firstName , lastName, pwd) VALUES($1, $2, $3) RETURNING *';
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        hash,
      ]);
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not create user  ${err}`);
    }
  }
}
