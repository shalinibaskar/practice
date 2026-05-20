import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import { refreshAccessToken } from "./auth";
import axios from "axios";
import ProductCard from "./ProductCard";

function Dashboard() {
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);

  const loadUser = async () => {
    let accessToken = localStorage.getItem("accessToken");

    try {
      // try getting user
      let res = await fetch("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // token not expired
      if (res.status == 200) {
        console.log("okay");
        const data = await res.json();

        setUser(data);
      }
      // token expired
      if (res.status === 401) {
        console.log("Access token expired");

        // refresh token
        accessToken = await refreshAccessToken();

        // retry request
        res = await fetch("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await res.json();

        setUser(data);
      }
    } catch (err) {
      console.log("error from fetching user", err);
    }
  };

  //get products
  const getProducts = async () => {
    //using fetch

    /*  try {
      const products = await fetch("https://dummyjson.com/products");
      const productList = await products.json();

      setProducts(productList);
      console.log("productlist", productList);
    } catch (err) {
      console.log("err", err);
    } */

    // using axios
    try {
      const products = await axios.get("https://dummyjson.com/products");
      setProducts(products.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUser();
    getProducts();
    console.log("useeffecton every reload", products);
  }, []);

  useEffect(() => {
    console.log("Updated state:", products);
  }, [products]);
  return (
    <>
      <Logout />
      <ProductCard user={user} products={products} />
    </>
  );
}

export default Dashboard;
