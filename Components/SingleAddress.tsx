import React from "react";

const SingleAddress = ({ address }: any) => {
  return (
    <div className="p-5 border shadow-xl rounded-lg">
      <p className="capitalize text-right">{address.type}</p>
      <p className="font-bold">{address.name}</p>
      <p>{address.apartment},</p>
      <p>
        {address.street},{" "}
        {address.landmark != "" ? address.landmark + ", " : ""}
      </p>
      <p className="uppercase">
        {address.city}, {address.state} {address.pincode}
      </p>
      <p className="capitalize">{address.country}</p>
      <p>Phone number: {address.mobile}</p>
      <div className="flex justify-end items-center gap-2">
        <button className="button px-5">Edit</button>
        <button className="button">Remove</button>
      </div>
    </div>
  );
};

export default SingleAddress;
