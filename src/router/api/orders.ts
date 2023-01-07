import express, { Request, Response, Router } from 'express';
import order_router from '../../handler/orders';

const orderRouter = Router();
order_router(orderRouter);

export default orderRouter;
