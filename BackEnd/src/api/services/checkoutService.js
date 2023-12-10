require("dotenv").config();
const auth = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;
const base = "https://api-m.sandbox.paypal.com";
const checkoutService = {
  getAccessToken: async () => {
    
      try {
        const response = await fetch(`${base}/v1/oauth2/token`, {
          method: "POST",
          body: "grant_type=client_credentials",
          headers: {
            Authorization: `Basic ${auth}`,
          },
        });

        const res = await response.json();
        return res.access_token;
      } catch (error) {
        return error;
      
    };
  },
  createOrder: async (money) => {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = await checkoutService.getAccessToken();
        const url = `${base}/v2/checkout/orders`;
        const payload = {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: `${money}`,
              },
            },
          ],
        };

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method: "POST",
          body: JSON.stringify(payload),
        });

        resolve({
          status: 200,
          message: "checkout successfully",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  captureOrder: async (orderID) => {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = await checkoutService.getAccessToken();
        const url = `${base}/v2/checkout/orders/${orderID}/capture`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        resolve({
          status: 200,
          message: "get orderId successfully",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = checkoutService;
