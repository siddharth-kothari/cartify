"use client";

import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    console.log("Username:", username);
    console.log("Password:", password);

    // const loginres = await LoginHelper({
    //   username,
    //   password,
    // });

    // if (loginres && loginres.ok) {
    //   setUsername("");
    //   setPassword("");
    //   setErrors({});
    //   router.push("/");
    // }
    // Reset the form fields and errors
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword: any) => !prevShowPassword);
  };

  return (
    <section className="w-screen my-20 grid place-content-center text-center">
      <h1 className="font-abril text-black text-4xl tracking-wider cursor-pointer">
        Cartify
      </h1>

      <div className="mt-5 border rounded-lg p-5">
        <h1 className="text-left text-lg font-semibold">Sign In</h1>

        <form onSubmit={handleLogin} className="mt-3">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-black text-left text-sm font-medium mb-[3px]"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className={`w-full px-3 py-2 border text-black text-left bg-inherit rounded-md focus:ring-black focus:border-black outline-none ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-black text-left text-sm font-medium mb-[3px]"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`w-full px-3 py-2 border bg-inherit text-black text-left rounded-md focus:ring-black focus:border-black outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
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
          <div className="w-full flex">
            <button
              type="submit"
              className="w-[40%] mx-auto bg-white text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center">
          <button className="text-black" onClick={() => signIn("google")}>
            Sign in with Google
          </button>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm text-gray-400 font-manrope mb-3">
          New to Cartify?
        </p>
        <Link className="text-sm border rounded-lg px-6 py-1" href="/register">
          Create your Cartify account
        </Link>
      </div>
    </section>
  );
};

export default Login;
