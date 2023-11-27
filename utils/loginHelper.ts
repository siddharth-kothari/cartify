import { ILoginParams } from "@/typing";
import { signIn } from "next-auth/react";

export const LoginHelper = async ({ username, password }: ILoginParams) => {
  const res = await signIn("credentials", {
    callbackUrl: "/",
    redirect: false,
    username,
    password,
  });

  return res;
};
