import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserStore, User } from '../model/users';

let token_secret: any;
token_secret = process.env.TOKEN_SECRET;

const userStor = new UserStore();

const getUser = async (req: Request, res: Response) => {
  const result = await userStor.getUser(parseInt(req.body.id));
  res.json(result);
};
const getAllUser = async (req: Request, res: Response) => {
  const result = await userStor.getAllUser();
  res.json(result);
};

const createUser = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  try {
    const newUser = await userStor.createUser(user);
    var token = jwt.sign({ user: newUser }, token_secret);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`${err} ${user}`);
  }
};

const user_router = (router: express.Router) => {
  router.get('/', getAllUser);
  router.post('/', createUser);
};

export default user_router;
