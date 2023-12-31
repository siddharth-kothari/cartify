"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { api } from "@/app/api";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { LoginHelper } from "@/utils/loginHelper";
import { useSession } from "next-auth/react";
import Loading from "@/Components/Loading";

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
  const { status } = useSession();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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

    const encodedString = Buffer.from(password).toString("base64");
    if (response.data.status === 201) {
      const loginres = await LoginHelper({
        username: email,
        password: encodedString,
      });

      if (loginres && loginres.ok) {
        setUsername("");
        setPassword("");
        setErrors({});
        setLoading(false);
        router.push("/");
      }
    }

    // Reset the form fields and errors
  };

  if (loading) {
    return <Loading />;
  }
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword: any) => !prevShowPassword);
  };

  return (
    <section className=" my-20 flex flex-col items-center text-center px-5">
      <h1 className="font-abril text-black text-4xl tracking-wider cursor-pointer">
        Cartify
      </h1>

      <div className="w-full md:w-[40%] mt-5 border rounded-lg p-5 md:px-12 md:py-8 shadow-xl">
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
              className={`w-full  py-2 border-b text-black text-left bg-inherit !border-black outline-none ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Name"
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
              className={`w-full  py-2 border-b !border-black text-black text-left bg-inherit  outline-none ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Mobile"
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
              className={`w-full  py-2 border-b !border-black text-black text-left bg-inherit  outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email"
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
              className={`w-full  py-2 border-b !border-black bg-inherit text-black text-left  outline-none ${
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
          <div className="w-full flex">
            <button
              type="submit"
              className="w-full mx-auto  py-2 px-4 outline-none button"
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
        <Link className="button px-10" href="/login">
          Sign in
        </Link>
      </div>
    </section>
  );
};

export default Register;
