import axios from "axios";

export default async function VerifyPayment(
  orderno: any
): Promise<string | undefined> {
  try {
    const response = await axios.get(
      `https://sandbox.cashfree.com/pg/orders/${orderno}/payments`,
      {
        headers: {
          accept: "application/json",
          "x-api-version": "2022-09-01",
          "x-client-id": "TEST10073955b3a6f1f62ec9ab29481d55937001",
          "x-client-secret":
            "cfsk_ma_test_9fdac006afdf9301ee54c40d97ab67bc_61d70cd5",
        },
      }
    );

    // Assuming response.data is an array and you want to extract the first payment's status
    return response.data[0]?.payment_status;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error; // Rethrow the error for the caller to handle
  }
}
