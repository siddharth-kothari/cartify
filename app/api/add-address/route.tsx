import { pool } from "@/utils/dbConfig";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const {
      name,
      mobile,
      apartment,
      street,
      landmark,
      pincode,
      city,
      state,
      country,
      type,
    } = await req.json();

    const session = await getServerSession();

    //console.log(session);
    try {
      //console.log("2");
      const [getUser]: any = await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [session?.user.email]
      );
      const address =
        apartment +
        ", " +
        street +
        ", " +
        landmark +
        ", " +
        city +
        ", " +
        state +
        " " +
        pincode +
        " " +
        country;

      const [addAddress]: any = await pool.execute(
        "INSERT INTO address(userid,name,mobile,apartment,street,landmark,pincode,city,state,country,address,type) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          getUser[0].id,
          name,
          mobile,
          apartment,
          street,
          landmark,
          pincode,
          city,
          state,
          country,
          address,
          type,
        ]
      );
      //console.log("3");
      if (addAddress.affectedRows == 1) {
        //console.log("4");
        return NextResponse.json(
          { message: "Address added successfully !!", status: 201 },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: "Something went wrong !!", status: 400 },
          { status: 400 }
        );
      }
      //console.log("5");
    } catch (error: any) {
      //console.log(error);
      return NextResponse.json(
        { message: error.sqlMessage, status: 500 },
        { status: 500 }
      );
    }
  } else {
    //console.log("6");
    return NextResponse.json(
      { message: "Method not allowed", status: 405 },
      { status: 405 }
    );
  }
}
