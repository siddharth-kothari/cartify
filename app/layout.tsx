import Header from "@/Components/Header";
import type { Metadata } from "next";
import "./../styles/globals.css";
import Provider from "./../utils/Provider";
import Footer from "@/Components/Footer";
import { api } from "./api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Cartify",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await api.get(
    `${process.env.NEXT_PUBLIC_STORE_BASE_URL}products/categories`
  );

  const searchTerm = "-";

  const categories = data.filter((str: string) => !str.includes(searchTerm));

  return (
    <html lang="en">
      <body className="bg-[#f7f7f7]">
        <Provider>
          <Header categories={categories} />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          {children}
          <SpeedInsights />
          <Analytics />
          <Footer categories={categories} />
        </Provider>
      </body>
    </html>
  );
}
