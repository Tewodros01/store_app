import express, { Request, Response } from 'express';
import { OrderStore, Order } from '../model/orders';

const orderStore = new OrderStore();

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const allOrder = await orderStore.getAllOrder();
    res.json(allOrder);
  } catch (err) {
    res.json('could not get');
  }
};
const addOrder = async (req: Request, res: Response) => {
  const order: Order = {
    status: req.body.status,
    user_id: parseInt(req.body.user_id),
  };
  try {
    const newOrder = await orderStore.addOrder(order);
    res.json(newOrder);
  } catch (err) {
    res.json(`could not add ${err}`);
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);
  try {
    const addedProduct = await orderStore.addProduct(
      quantity,
      orderId,
      productId
    );
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const order_router = (router: express.Router) => {
  router.get('/', getAllOrder);
  router.post('/', addOrder);
  router.post('/orders/:id/products', addProduct);
};

export default order_router;
