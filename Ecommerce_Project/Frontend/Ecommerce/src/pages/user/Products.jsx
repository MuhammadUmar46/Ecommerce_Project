import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios, { all } from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //all product
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout>
      <div className="row ms-2 mt-4">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="flex justify-around items-center flex-wrap">
            {products?.map((p) => (
              <>
                <Link
                  key={p._id}
                  to={`/dashboard/user/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "250px" }}>
                    <img
                      src={`http://localhost:5000/product/product-photo/${p._id}`}
                      className="card-img-top w-[200px]"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
