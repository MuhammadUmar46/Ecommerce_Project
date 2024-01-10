import React, {useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,

      confirmParams: {
        return_url: "http://localhost:5173/success",
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
    }
  };

  return (
    <div className="bg-cover flex justify-center items-center text-center  h-[36%]">
      <div className="w-[30vw]  h-[75vh] flex justify-center items-center text-center border-2 mb-5 rounded-lg bg-white">
        {" "}
        <form className="w-[25vw]  " onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold mb-16 text-[#415161]  ">
            CheckOut
          </h1>

          <PaymentElement />
          <button
            disabled={!stripe}
            className="bg-[#ED1C24] flex gap-5 px-4 p-2 rounded-md text-white mt-4 text-lg"
          >
            Pay
          </button>

          {errorMessage && <div>{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
