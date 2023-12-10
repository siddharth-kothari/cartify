import { pool } from "@/utils/dbConfig";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      // Parse the JSON data from the request body
      //console.log("Processing complete");
      const { data } = await req.json();
      //console.log("Received data:", data.order.order_id);

      const inputDateString = data.payment.payment_time;
      const inputDate = new Date(inputDateString);

      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, "0");
      const day = String(inputDate.getDate()).padStart(2, "0");
      const hours = String(inputDate.getHours()).padStart(2, "0");
      const minutes = String(inputDate.getMinutes()).padStart(2, "0");
      const seconds = String(inputDate.getSeconds()).padStart(2, "0");

      const outputDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      //console.log(outputDateString);

      const [updateOrder]: any = await pool.execute(
        "UPDATE orders SET status = ?, method = ?, bank_ref = ?, updated_at = ? WHERE orderno = ?",
        [
          data.payment.payment_status,
          data.payment.payment_group,
          data.payment.bank_reference,
          outputDateString,
          data.order.order_id,
        ]
      );

      // Perform any processing or database operations with the data

      // Send a response
      return NextResponse.json({
        message: "Data received and processed successfully",
      });
    } catch (error) {
      console.error("Error processing POST request:", error);
      return NextResponse.json(
        { message: "Internal Server Error", status: 500 },
        { status: 500 }
      );
    }
  } else {
    //console.log("Method not allowed");
    return NextResponse.json(
      { message: "Method not allowed", status: 405 },
      { status: 405 }
    );
  }
}
