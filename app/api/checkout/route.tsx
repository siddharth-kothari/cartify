import { pool } from "@/utils/dbConfig";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Cashfree } from "cashfree-pg";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const { items, total } = await req.json();
    const orderno = "C-" + Math.floor(Date.now() / 1000);
    const session = await getServerSession();

    try {
      const [getUser]: any = await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [session?.user.email]
      );

      const [newOrder]: any = await pool.execute(
        "INSERT INTO orders(orderno,userid,amount,status,transactionID,addressID) VALUES (?,?,?,?,?,?)",
        [orderno, getUser[0].id, total * 80, "initiated", orderno, 1]
      );

      if (newOrder.affectedRows == 1) {
        Cashfree.XClientId = process.env.CASHFREE_CLIENT_KEY;
        Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
        Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

        var returnURL =
          process.env.NEXTAUTH_URL + "/success?order_id={order_id}";

        var request = {
          order_id: orderno,
          order_amount: total * 80,
          order_currency: "INR",
          customer_details: {
            customer_id: "c_" + getUser[0].id,
            customer_name: getUser[0].name,
            customer_email: getUser[0].email,
            customer_phone: getUser[0].mobile,
          },
          order_meta: {
            return_url: returnURL,
          },
          order_note: "",
        };

        const response = await Cashfree.PGCreateOrder("2022-09-01", request);
        const paymentSessionId = response.data.payment_session_id;
        return NextResponse.json(
          { message: "User created !!", status: 201, data: paymentSessionId },
          { status: 201 }
        );
      }
    } catch (error: any) {
      return NextResponse.json(
        { message: error.sqlMessage, status: 500 },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method not allowed", status: 405 },
      { status: 405 }
    );
  }
}
