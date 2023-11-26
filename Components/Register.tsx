"use client";
import Link from "next/link";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { api } from "@/app/api";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { LoginHelper } from "@/utils/loginHelper";

interface Errors {
  username?: string;
  password?: string;
  mobile?: string;
  email?: string;
}

const Register = () => {
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
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
    if (mobile.trim() === "") {
      validationErrors.mobile = "Password is required";
    }

    if (email.trim() === "") {
      validationErrors.email = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const hashedPass = await bcrypt.hash(password, 5);

    const userData = {
      username: username,
      email: email,
      password: hashedPass,
      mobile: mobile,
    };

    var body = JSON.stringify(userData);

    const response = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
      body
    );

    if (response.data.status === 201) {
      const loginres = await LoginHelper({
        username,
        password,
      });

      if (loginres && loginres.ok) {
        setUsername("");
        setPassword("");
        setErrors({});
        router.push("/");
      }
    }

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
        <h1 className="text-left text-lg font-semibold">Create Account</h1>

        <form onSubmit={handleLogin} className="mt-3">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-black text-left text-sm font-medium mb-[3px]"
            >
              Your Name
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
          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-black text-left text-sm font-medium mb-[3px]"
            >
              Your Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              className={`w-full px-3 py-2 border text-black text-left bg-inherit rounded-md focus:ring-black focus:border-black outline-none ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-black text-left text-sm font-medium mb-[3px]"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-3 py-2 border text-black text-left bg-inherit rounded-md focus:ring-black focus:border-black outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
              Register
            </button>
          </div>
        </form>
      </div>

      <div className="mt-5">
        <p className="text-sm text-gray-400 font-manrope mb-3">
          Already have an account?
        </p>
        <Link className="text-sm border rounded-lg px-6 py-1" href="/login">
          Sign in
        </Link>
      </div>
    </section>
  );
};

export default Register;
