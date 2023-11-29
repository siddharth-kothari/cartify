import { pool } from "@/utils/dbConfig";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const { username, email, password, mobile } = await req.json();

    const [existingUser] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (Array.isArray(existingUser)) {
      //const arrayLength = existingUser.length;
      if (existingUser.length > 0) {
        return NextResponse.json(
          { message: "Email already exists" },
          { status: 400 }
        );
      }
    }
    try {
      const [result] = await pool.execute(
        "INSERT INTO users (name, email,password,mobile) VALUES (?, ?,?,?)",
        [username, email, password, mobile]
      );

      return NextResponse.json(
        { message: "User created !!", status: 201 },
        { status: 201 }
      );
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
