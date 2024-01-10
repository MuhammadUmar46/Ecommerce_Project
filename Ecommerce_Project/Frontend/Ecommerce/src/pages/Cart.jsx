import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency : "USD"
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } catch (error) {
      console.log(error);
    }
  };

  const showAlert = () => {
    Swal.fire({
      title: "Good job!",
      text: "Thank you for your payment! Your transaction was successful",
      icon: "success"
    });
  }

  return (
    <Layout>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-2 text-2xl">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  } `
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {cart?.map((p) => (
              <div className="row m-2 p-3 card flex-row">
                <div className="col-md-4 p-2">
                  <img
                    src={`http://localhost:5000/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      marginLeft: "30px",
                    }}
                  />
                </div>
                <div className="col-md-8 p-2">
                  <p>Name : {p.name}</p>
                  <p>Description : {p.description}</p>
                  <p>Price : {p.price} </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    {" "}
                    Remove{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4 className="mt-3">Total : {totalPrice()} </h4>
            <button className="btn btn-warning" onClick={showAlert}>
               Payment
            </button>

           <Link to="/checkout">
            <button className="btn btn-warning ms-2">Checkout</button>
           </Link>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Cart;
