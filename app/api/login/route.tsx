import { LoginHelper } from "@/utils/loginHelper";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  if (req.method === "POST") {
    const { username, password } = await req.json();
    try {
      const loginres = await LoginHelper({
        username,
        password,
      });

      // //console.log("loginres", loginres, username, password);

      if (loginres && loginres.ok) {
        // Successful login
        return NextResponse.json(
          { message: "success", status: 201, success: true },
          { status: 201 }
        );
      } else {
        // Failed login
        return NextResponse.json(
          { message: "Invalid email or password", status: 401, success: false },
          { status: 401 }
        );
      }
    } catch (error) {
      //console.log(error);
      return NextResponse.json(
        {
          message: "Something went wrong",
          status: 500,
          success: false,
          error: error,
        },
        { status: 500 }
      );
    }
    // Perform login logic
  }
}
