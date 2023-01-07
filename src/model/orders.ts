import DB from '../config/database';

export type Order = {
  id?: Number;
  status?: String;
  user_id?: Number;
};

export class OrderStore {
  async getAllOrder(): Promise<Order[]> {
    try {
      const conn = await DB.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.row;
    } catch (err) {
      throw new Error('Could not get order list');
    }
  }
  async addOrder(order: Order): Promise<Order> {
    try {
      const conn = await DB.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1,$2) RETURNING *';
      const result = await conn.query(sql, [order.status, order.user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(` Could not add order ${err}`);
    }
  }
  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    // get order to see if it is open
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)';
      //@ts-ignore
      const conn = await DB.connect();

      const result = await conn.query(ordersql, [orderId]);

      const order = result.rows[0];

      if (order.status !== 'open') {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, products_id) VALUES($1, $2, $3) RETURNING *';
      //@ts-ignore
      const conn = await DB.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
