import expreer, { Response, Request, Router } from 'express';
import { ProductStore, Products } from '../model/products';

const productStore = new ProductStore();

const getAllProdouct = async (req: Request, res: Response) => {
  try {
    const result = await productStore.getAllProdouct();
    res.json(result);
  } catch (err) {
    res.send(`could not get ${err}`);
  }
};
const addPrdouct = async (req: Request, res: Response) => {
  const product: Products = {
    productName: req.body.productName,
    prices: parseInt(req.body.price),
  };
  try {
    const result = await productStore.addProduct(product);
    res.json(result);
  } catch (err) {
    res.json(`could not inser ${err}`);
  }
};

const product_router = (router: expreer.Router) => {
  router.get('/', getAllProdouct);
  router.post('/', addPrdouct);
};

export default product_router;
