import express, { Request, Response, Router } from 'express';
import product_router from '../../handler/products';

const productRouter = Router();
product_router(productRouter);

export default productRouter;
