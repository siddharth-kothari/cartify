"use client";

import React, { useEffect, useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginHelper } from "@/utils/loginHelper";
import bcrypt from "bcryptjs";
import Loading from "@/Components/Loading";

interface Errors {
  username?: string;
  password?: string;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const [resError, setResErrors] = useState("");
  const [loading, setLoading] = useState(false);
  var CryptoJS = require("crypto-js");
  var key = process.env.NEXT_PUBLIC_SECRET;

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate form fields
    const validationErrors: Errors = {};
    if (username.trim() === "") {
      validationErrors.username = "Username is required";
    }
    if (password.trim() === "") {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Process the form submission logic here
    var ciphertext = CryptoJS.AES.encrypt(password, key).toString();
    // const hashedPass = await bcrypt.hash(password, 5);
    setLoading(true);
    const loginres = await LoginHelper({
      username,
      password: ciphertext,
    });

    //console.log("loginres", loginres);

    if (loginres && loginres.ok) {
      setUsername("");
      setPassword("");
      setErrors({});
      setLoading(false);
      router.push("/");
    } else {
      setLoading(false);
      setResErrors("Invalid email or pasword");
    }
    // try {
    //   const response = await fetch("/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ username, password }),
    //   });

    //   if (response.ok) {
    //     // Successful login
    //     setUsername("");
    //     setPassword("");
    //     setErrors({});
    //     setLoading(false);
    //     router.push("/");
    //   } else {
    //     // Failed login
    //     setLoading(false);
    //     setResErrors("Invalid email or password");
    //   }
    // } catch (error) {
    //   console.error("Login error:", error);
    //   setLoading(false);
    //   setResErrors("An error occurred during login");
    // }
    // Reset the form fields and errors
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword: any) => !prevShowPassword);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {status == "loading" && <Loading />}

      <section className="w-full my-20 flex flex-col items-center text-center">
        <h1 className="font-abril text-black text-4xl tracking-wider cursor-pointer">
          Cartify
        </h1>

        <div className="w-full md:w-[40%] mt-5 border rounded-lg p-5 md:px-12 md:py-8 shadow-xl">
          <h1 className="text-left text-lg font-semibold">Sign In</h1>

          <form onSubmit={handleLogin} className="mt-3">
            <div className="mb-4">
              {/* <label
                  htmlFor="username"
                  className="block text-black text-left text-sm font-medium mb-[3px]"
                >
                  Username
                </label> */}
              <input
                type="text"
                id="username"
                className={`w-full py-2 border-b text-black text-left bg-inherit !border-black  outline-none ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div className="mb-3 relative">
              {/* <label
                  htmlFor="password"
                  className="block text-black text-left text-sm font-medium mb-[3px]"
                >
                  Password
                </label> */}
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`w-full py-2 border-b bg-inherit text-black text-left !border-black  outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-[70%] transform -translate-y-1/2 text-gray-500"
                onClick={toggleShowPassword}
              >
                {!showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {resError && (
              <p className="text-red-700 text-left mb-6">{resError}</p>
            )}
            <div className="w-full flex">
              <button
                type="submit"
                className="w-full button mx-auto mb-3 py-2 px-4 outline-none"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-left mb-3">Or log in with</p>
            <button
              className="w-full button text-center"
              onClick={() => {
                signIn("google");
              }}
            >
              Sign in with Google
            </button>
          </div>

          <Link
            className="font-bold flex gap-x-1 items-center mt-5"
            href="/register"
          >
            Create an account
            <ArrowRightIcon className="text-black w-4 h-4 font-bold" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Login;
