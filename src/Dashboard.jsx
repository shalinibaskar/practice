import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import { refreshAccessToken } from "./auth";

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
    try {
      const products = await fetch("https://dummyjson.com/products");

      const productList = await products.json();

      setProducts(productList);
      console.log("productlist", productList);
    } catch (err) {
      console.log("err", err);
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
      <div class="grid grid-cols-3  gap-1 p-2 rounded-md col-span-1">
        {
          user &&
            products.products.map((data) => (
              <div class="rounded-md p-3 m-3 bg-blue-50">
                <p>{data.id}</p>
                <img src={data.thumbnail} alt="image" />
                <p>{data.title}</p>
                <p>{data.description}</p>
              </div>
            ))
          /*  <div>
          <p>{products.products[0].id}</p>
          <img src={products.products[0].thumbnail} alt="image" />
        </div> */
        }
      </div>
    </>
  );
}

export default Dashboard;
