import React from "react";

function ProductCard({ user, products }) {
  console.log(user, products);
  return (
    <div class="grid grid-cols-3  gap-1 p-2 rounded-md col-span-1">
      {user &&
        products.products.map((data) => (
          <div class="rounded-md p-3 m-3 bg-blue-50">
            <p>{data.id}</p>
            <img src={data.thumbnail} alt="image" />
            <p>{data.title}</p>
            <p>{data.description}</p>
          </div>
        ))}
    </div>
  );
}

export default ProductCard;
