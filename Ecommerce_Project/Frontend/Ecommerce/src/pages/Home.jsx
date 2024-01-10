import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import ToyImage from "../assets/image.jpg";
import axios from "axios";
import { Radio } from "antd";
import Prices from "./../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import image from "./../assets/HQ.png"


const Home = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = { ...checked };
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col md:flex-row bg-white-800 text-black p-8">
          <div className="md:w-1/2 mx-10">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to the Exclusive Toy Store
            </h1>
            <p className="text-lg mb-8">
              Welcome to our delightful world of play at [Exclusive Toy Store]!
              Immerse yourself in a haven where imagination knows no bounds and
              fun is the order of the day. As your go-to destination for all
              things play, we bring you an enchanting collection of toys that
              cater to every age, interest, and passion.
            </p>
            <button className="bg-black text-white px-4 py-2 font-bold hover:bg-gray-600">
              Explore Now
            </button>
          </div>

          <div className="md:w-1/2 mt-4 md:mt-0">
            <img
              src={ToyImage}
              alt="Image"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-1 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
              <div className="font-bold text-xl mb-2 text-center">
                Fast Delivery
              </div>
              <p className="text-gray-700 text-base text-center">
                Our expedited shipping ensures quick delivery to your doorstep.
              </p>
            </div>
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <div className="px-6 py-4">
              <div className="mb-1 flex justify-center items-center " >
                <img src={image} alt="High Quality" className="w-8 h-8" />
              </div>
              <div className="font-bold text-xl mb-2 text-center">
                Best Quality
              </div>
              <p className="text-gray-700 text-base text-center">
                We guarantee the highest quality products for your satisfaction.
              </p>
            </div>
          </div>

          <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-1 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
              <div className="font-bold text-xl mb-2 text-center">
                Free Shipping
              </div>
              <p className="text-gray-700 text-base text-center">
                Enjoy free shipping on all orders. No minimum purchase required.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <h4 className="mt-4 ms-3"> Filter By Price </h4>
            <div className="flex flex-col ms-2">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="flex flex-col">
              <button
                className="btn btn-danger ms-2 mt-2"
                onClick={() => window.location.reload()}
              >
                {" "}
                Reset Filters
              </button>
            </div>
          </div>
          <div className="col-md-9">
            {JSON.stringify(radio, null, 4)}
            <h1 className="text-center text-2xl"> All Products </h1>
            <div className="flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" style={{width:"250px"}}>
                  <img
                    src={`http://localhost:5000/product/product-photo/${p._id}`}
                    className="card-img-top"
                    style={{width:"150px", height:"150px", marginLeft:"50px", marginRight:"50px"}}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Name : {p.name}</h5>
                    <p className="card-text">Description : {p.description}</p>
                    <p className="card-title">Price : {p.price}</p>
                    <button className="bg-gray-700 text-white p-2 rounded-full ms-1 mt-3">
                      More Details
                    </button>
                    <button
                      className="bg-blue-600 text-white p-2 rounded-full ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to Cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ... " : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
