import DB from '../config/database';

export type Products = {
  id?: Number;
  productName?: String;
  prices?: Number;
};

export class ProductStore {
  async getAllProdouct(): Promise<Products[]> {
    try {
      const conn = await DB.connect();
      const sql = 'SELECT * FROM product';
      const result = await conn.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error('Could not get product ');
    }
  }
  async addProduct(prdouct: Products): Promise<Products> {
    try {
      const conn = await DB.connect();
      const sql =
        'INSERT INTO products (productName, price ) VALUES($1,$2) RETURNING *';
      const newProdsuct = await conn.query(sql, [
        prdouct.productName,
        prdouct.prices,
      ]);
      return newProdsuct.rows[0];
    } catch (err) {
      throw new Error('Could not add product');
    }
  }
}
