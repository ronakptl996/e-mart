import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Order from "../models/Order";
import mongoose from "mongoose";

const MyOrder = ({ clearCart, order }) => {
  const products = order.products;
  // console.log(order);

  const [date, setDate] = useState();

  const router = useRouter();
  useEffect(() => {
    let placedDate = new Date(order.createdAt);
    setDate(placedDate);
    if (router.query.clearCart == 1) {
      clearCart();
    }
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              e-MART.COM
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Order Id: #{order.orderId}
            </h1>
            <p className="leading-relaxed">
              Your order has been successfully placed.
            </p>
            <p className="leading-relaxed">
              Order placed on : {date && date.toLocaleString("en-IN")}
            </p>
            <p className="leading-relaxed mb-4">
              Your Payment Status is :{" "}
              <span className="font-semibold text-slate-700">
                {order.status}
              </span>
            </p>
            <div className="flex mb-4">
              <a className="flex-grow text-center border-indigo-500 py-2 text-lg px-1">
                Item Description
              </a>
              <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                Quality
              </a>
              <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                Item Total
              </a>
            </div>
            {Object.keys(products).map((item) => {
              return (
                <div key={item} className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500 m-auto">
                    {products[item].name}({products[item].size}/
                    {products[item].varient})
                  </span>
                  <span className="m-auto text-gray-900">
                    {products[item].qty}
                  </span>
                  <span className="m-auto text-gray-900">
                    {products[item].qty} X ₹{products[item].price} = ₹
                    {products[item].price * products[item].qty}
                  </span>
                </div>
              );
            })}

            <div className="my-8">
              <span className="title-font font-medium text-2xl text-gray-900">
                SubTotal: ₹{order.amount}
              </span>
              <button className="flex my-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded my-6">
                Track Order
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://dummyimage.com/400x400"
          />
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default MyOrder;
