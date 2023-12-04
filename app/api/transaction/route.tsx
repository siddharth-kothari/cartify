import { pool } from "@/utils/dbConfig";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const data = await req.json();
    console.log("data1");
  } else {
    const data = await req.json();
    console.log("data");
    return NextResponse.json(
      { message: "Method not allowed", status: 405 },
      { status: 405 }
    );
  }
}
