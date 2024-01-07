import { pool } from "@/utils/dbConfig";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Cashfree } from "cashfree-pg";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const { items, total } = await req.json();
    const orderno = "C-" + Math.floor(Date.now() / 1000);
    const session = await getServerSession();
    //console.log("1", session);
    try {
      const [getUser]: any = await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [session?.user.email]
      );
      //console.log("2", getUser);
      const [newOrder]: any = await pool.execute(
        "INSERT INTO orders(orderno,userid,amount,status,transactionID,addressID) VALUES (?,?,?,?,?,?)",
        [orderno, getUser[0].id, total * 80, "initiated", orderno, 1]
      );
      //console.log("2.1", newOrder);
      //console.log("2.2", items);
      for (const item of items) {
        var desc =
          "desc" in item
            ? item.desc
            : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
        //console.log("2.3", desc);
        const [newOrderDetail]: any = await pool.execute(
          "INSERT INTO order_items(orderid,userid,item_id,item_name,description,image,amount,qty) VALUES (?,?,?,?,?,?,?,?)",
          [
            newOrder.insertId,
            getUser[0].id,
            item.id,
            item.name,
            desc,
            item.image,
            item.price * 80,
            item.qty,
          ]
        );
      }

      //console.log("3");
      if (newOrder.affectedRows == 1) {
        Cashfree.XClientId = process.env.CASHFREE_CLIENT_KEY;
        Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
        Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
        ////console.log("4");
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
            customer_phone: "8208567642",
          },
          order_meta: {
            return_url: returnURL,
          },
          order_note: "",
        };
        //console.log("5");

        const response = await Cashfree.PGCreateOrder("2022-09-01", request);
        ////console.log("response", response);
        const paymentSessionId = response.data.payment_session_id;
        return NextResponse.json(
          { message: "redirecting...", status: 201, data: paymentSessionId },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: "Something went wrong", status: 500 },
          { status: 500 }
        );
      }
    } catch (error: any) {
      //console.log("7", error);
      return NextResponse.json(
        { message: "Something went wrong", status: 500 },
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
