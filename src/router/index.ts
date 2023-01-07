import express, { Request, Response, Router } from 'express';
import userRouter from './api/users';
import orderRouter from './api/orders';
import productRouter from './api/products';

const router = Router();

router.use('/user', userRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);

export default router;
