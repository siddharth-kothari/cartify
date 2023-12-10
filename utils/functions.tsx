import { pool } from "./dbConfig";

export async function OrderItems(orderid: any): Promise<string | undefined> {
  try {
    const [items]: any = await pool.execute(
      "SELECT * FROM order_items WHERE orderid = ?",
      [orderid]
    );

    return items;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error; // Rethrow the error for the caller to handle
  }
}

export async function getOrders(email: any): Promise<string | undefined> {
  try {
    const [orders]: any = await pool.execute(
      "SELECT o.*,u.name FROM orders o JOIN users u ON u.id = o.userid WHERE o.status IN ('SUCCESS','FAILED') AND u.email = ?",
      [email]
    );

    return orders;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error; // Rethrow the error for the caller to handle
  }
}

export async function getAddresses(email: any): Promise<string | undefined> {
  try {
    const [addresses]: any = await pool.execute(
      "SELECT a.* FROM address a JOIN users u ON u.id = a.userid WHERE a.isDeleted != 1 AND u.email = ?",
      [email]
    );

    return addresses;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error; // Rethrow the error for the caller to handle
  }
}
