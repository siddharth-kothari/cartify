"use client";

export function currencyFormatter(amount: any) {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

  return formattedAmount;
}
