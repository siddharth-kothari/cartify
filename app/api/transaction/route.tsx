import { pool } from "@/utils/dbConfig";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      // Parse the JSON data from the request body
      console.log("Processing complete");
      const data = await req.json();
      console.log("Received data:", data.order.order_id);

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
    console.log("Method not allowed");
    return NextResponse.json(
      { message: "Method not allowed", status: 405 },
      { status: 405 }
    );
  }
}
