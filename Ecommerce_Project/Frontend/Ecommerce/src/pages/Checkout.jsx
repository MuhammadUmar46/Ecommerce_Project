import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import userModel from "../../../../Backend/models/userModel";

const initStripe = async () => {
  const res = await axios.get("http://localhost:5000/product/publishable-key");
  const publishableKey = await res.data.publishable_key;

  return loadStripe(publishableKey);
};

const Checkout = () => {
  const stripePromise = initStripe();
  const [clientSecretSettings, setClientSecretSettings] = useState({
    clientSecret: "",
    loading: true,
  });
  useEffect(() => {
    async function createPaymentIntent() {
      await axios
        .post("http://localhost:5000/product/create-payment-intent")
        .then((res) => {
          console.log(res.data);
          setClientSecretSettings({
            clientSecret: res.data.client_secret,
            loading: false,
          });
        });
    }
    createPaymentIntent();
  }, []);

  return (
    <Layout>
      <div>
        {clientSecretSettings.loading ? (
          <h1>Loading ...</h1>
        ) : (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: clientSecretSettings.clientSecret,
              appearance: { theme: "stripe" },
            }}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
