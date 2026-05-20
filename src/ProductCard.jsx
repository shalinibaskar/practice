import React, { useState } from "react";

function ProductCard({ user, products }) {
  const [cart, setCart] = useState({ product: [], quantity: 0 });
  function handleAddtocart(product) {
    setCart((prevCart) => ({
      product: [...prevCart.product, product],
      quantity: prevCart.quantity + 1,
    }));
  }

  console.log(cart);

  return (
    <div class="grid grid-cols-3  gap-1 p-2 rounded-md col-span-1">
      {user &&
        products.products.map((data) => (
          <div class="rounded-md p-3 m-3 bg-blue-50">
            <p>{data.id}</p>
            <img src={data.thumbnail} alt="image" />
            <p class="text-black font-medium text-20 py-2 ">{data.title}</p>
            <p class="text-black-100 font-small tracking-tight text-sm">
              {data.description}
            </p>
            <button
              class="bg-orange-500 hover:bg-orange-700 rounded-md py-2 px-3 mt-2 text-white font-bold"
              onClick={() => handleAddtocart(data)}
            >
              Add to cart
            </button>
          </div>
        ))}
    </div>
  );
}

export default ProductCard;
