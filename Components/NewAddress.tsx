"use client";

import { api } from "@/app/api";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Loading from "./Loading";

const NewAddress = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [apartment, setApartment] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [showtoast, setShowToast] = useState(false);
  const router = useRouter();

  interface Errors {
    name?: string;
    mobile?: string;
    apartment?: string;
    street?: string;
    landmark?: string;
    pincode?: string;
    city?: string;
    state?: string;
    country?: string;
    type?: string;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;

    const validationErrors: Errors = {};
    if (name.trim() === "") {
      validationErrors.name = "Name is required";
    }

    if (mobile.trim() === "") {
      validationErrors.mobile = "Mobile number is required";
    }

    if (!phoneRegex.test(mobile)) {
      validationErrors.mobile = "Please enter a valid number";
    }

    if (apartment.trim() === "") {
      validationErrors.apartment = "Apartment is required";
    }

    if (street.trim() === "") {
      validationErrors.street = "Street is required";
    }

    if (pincode.trim() === "") {
      validationErrors.pincode = "Pincode is required";
    }

    if (!pincodeRegex.test(pincode)) {
      validationErrors.pincode = "Please enter a valid pincode";
    }

    if (city.trim() === "") {
      validationErrors.city = "City is required";
    }
    if (state.trim() === "") {
      validationErrors.state = "State is required";
    }
    if (country.trim() === "") {
      validationErrors.country = "Country is required";
    }
    if (type.trim() === "") {
      validationErrors.type = "Address type is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    const addressData = JSON.stringify({
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
    });

    const { data } = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/add-address`,
      addressData
    );

    if (data.status === 201) {
      setName("");
      setMobile("");
      setApartment("");
      setStreet("");
      setLandmark("");
      setPincode("");
      setCity("");
      setState("");
      setCountry("");
      setType("");
      setIsLoading(false);
      setTimeout(() => {
        router.push("/your-account/addresses");
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="lg:px-20 gap-x-8 px-5 max-w-screen-xl mx-auto py-10">
      <p className="text-3xl mb-5">Add a new address</p>

      <form
        className="border border-[#D5D9D9] rounded-md shadow-lg p-5"
        onSubmit={handleSubmit}
      >
        <div className="block md:flex md:justify-between md:items-center md:gap-10">
          <div className="mb-4 w-full">
            <label
              htmlFor="name"
              className="block text-black font-manrope text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full p-2 border bg-inherit rounded-md placeholder:text-slate-500 text-black font-manrope outline-none ${
                errors.name ? "border-red-500" : "border-black"
              }`}
              placeholder="Enter your first name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4 w-full">
            <label
              htmlFor="mobile"
              className="block text-black font-manrope text-sm font-medium mb-2"
            >
              Mobile
            </label>
            <div className="relative">
              <input
                type="tel"
                id="mobile"
                className={`w-full p-2 border bg-inherit rounded-md placeholder:text-slate-500 text-black font-manrope outline-none ${
                  errors.mobile ? "border-red-500" : "border-black"
                }`}
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>
        </div>

        <div className="block md:flex md:justify-between md:items-center md:gap-10">
          <div className="mb-4 w-full">
            <label
              htmlFor="apartment"
              className="block text-black font-manrope text-sm font-medium mb-2"
            >
              Flat/ House No / Building / Company / Apartment
            </label>
            <input
              type="text"
              id="apartment"
              className={`w-full p-2 border bg-inherit rounded-md placeholder:text-slate-500 text-black font-manrope outline-none ${
                errors.apartment ? "border-red-500" : "border-black"
              }`}
              placeholder="Enter your first name"
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
            />
            {errors.apartment && (
              <p className="text-red-500 text-sm mt-1">{errors.apartment}</p>
            )}
          </div>

          <div className="mb-4 w-full">
            <label
              htmlFor="street"
              className="block text-black font-manrope text-sm font-medium mb-2"
            >
              Area / Colony / Street / Village
            </label>
            <div className="relative">
              <input
                type="tel"
                id="street"
                className={`w-full p-2 border bg-inherit rounded-md placeholder:text-slate-500 text-black font-manrope outline-none ${
                  errors.street ? "border-red-500" : "border-black"
                }`}
                placeholder="Enter your street number"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street}</p>
            )}
          </div>
        </div>

        <div className="block md:flex md:justify-between md:items-center md:gap-10">
          <div className="mb-4 w-full">
            <label
              htmlFor="landmark"
              className="block text-black font-manrope text-sm font-medium mb-2"
            >
              Landmark
            </label>
            <input
              type="text"
              id="landmark"
              className={`w-full p-2 border bg-inherit rounded-md placeholder:text-slate-500 text-black font-manrope outline-none ${
                errors.landmark ? "border-red-500" : "border-black"
              }`}
              placeholder="Enter your first name"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
            {errors.landmark && (
              <p className="text-red-500 text-sm mt-1">{errors.landmark}</p>
            )}
          </div>

          <div className="mb-4 w-full">
            <label
              htmlFor="pincode"
              className="block text-black font-manrope text-sm font-medium mb-2"
            >
              Pincode
            </label>
            <div className="relative">
              <input
                type="tel"
                id="pincode"
                className={`w-full p-2 border bg-inherit rounded-md placeholder:text-slate-500 text-black font-manrope outline-none ${
                  errors.pincode ? "border-red-500" : "border-black"
                }`}
                placeholder="Enter your pincode number"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
            )}
          </div>
        </div>

        <div className="block md:flex md:justify-between md:items-center md:gap-10">
          <div className="mb-4 w-full">
            <label
              htmlFor="city"
              className="block text-black font-manrope text-sm font-medium mb-2"
            >
              city
            </label>
            <input
              type="text"
              id="city"
              className={`w-full p-2 border bg-inherit rounded-md placeholder:text-slate-500 text-black font-manrope outline-none ${
                errors.city ? "border-red-500" : "border-black"
              }`}
              placeholder="Enter your first name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div className="mb-4 w-full">
            <label
              htmlFor="state"
              className="block text-black font-manrope text-sm font-medium mb-2"
            >
              state
            </label>
            <div className="relative">
              <input
                type="tel"
                id="state"
                className={`w-full p-2 border bg-inherit rounded-md placeholder:text-slate-500 text-black font-manrope outline-none ${
                  errors.state ? "border-red-500" : "border-black"
                }`}
                placeholder="Enter your state number"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>
        </div>

        <div className="block md:flex md:justify-between md:items-center md:gap-10">
          <div className="mb-4 w-full">
            <label
              htmlFor="country"
              className="block text-black font-manrope text-sm font-medium mb-2"
            >
              country
            </label>
            <input
              type="text"
              id="country"
              className={`w-full p-2 border bg-inherit rounded-md placeholder:text-slate-500 text-black font-manrope outline-none ${
                errors.country ? "border-red-500" : "border-black"
              }`}
              placeholder="Enter your first name"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          <div className="mb-4 w-full">
            <label
              htmlFor="type"
              className="block text-black font-manrope text-sm font-medium mb-2"
            >
              type
            </label>
            <div className="relative">
              <select
                id="type"
                name="type"
                className={`w-full p-2 border bg-inherit rounded-md placeholder:text-slate-500 text-black font-manrope outline-none ${
                  errors.type ? "border-red-500" : "border-black"
                }`}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select address type</option>
                <option value="home">Home</option>
                <option value="office">Office</option>
                <option value="other">Other</option>
              </select>
            </div>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
            )}
          </div>
        </div>

        <div className="flex gap-5 items-center justify-end mt-5">
          <input
            type="button"
            className="button px-5"
            onClick={() => router.push("/your-account/addresses")}
            value="Cancel"
          />
          <input type="submit" value="Add Address" className="button" />
        </div>
      </form>
    </div>
  );
};

export default NewAddress;
