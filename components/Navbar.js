import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdDelete, MdAccountCircle } from "react-icons/md";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  // console.log(cart);
  const [dropDown, setDropDown] = useState(false);

  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10">
      <Link href="/">
        <div className="logo pl-3 mr-auto md:mx-5 hover:cursor-pointer">
          <Image src="/logo.jpeg" width={150} height={50} />
        </div>
      </Link>
      <div className="nav">
        <ul className="flex items-center space-x-4 font-bold md:text-md">
          <Link href="/tshirts">
            <a>
              <li className="hover:text-indigo-500">Tshirts</li>
            </a>
          </Link>
          <Link href="/hoodies">
            <a>
              <li className="hover:text-indigo-500">Hoodies</li>
            </a>
          </Link>
          <Link href="/stickers">
            <a>
              <li className="hover:text-indigo-500">Stickers</li>
            </a>
          </Link>
          <Link href="/mugs">
            <a>
              <li className="hover:text-indigo-500">Mugs</li>
            </a>
          </Link>
        </ul>
      </div>
      <div className="cart items-center absolute top-6 right-5 cursor-pointer flex">
        <span
          onMouseOver={() => setDropDown(true)}
          onMouseLeave={() => setDropDown(false)}
        >
          {dropDown && (
            <div className="absolute top-6 right-10 rounded-md p-4 w-32 bg-white shadow-lg border">
              <ul>
                <Link href={"/myaccount"}>
                  <a>
                    <li className="py-1 text-sm hover:text-indigo-500">
                      My Account
                    </li>
                  </a>
                </Link>
                <Link href={"/orders"}>
                  <a>
                    <li className="py-1 text-sm hover:text-indigo-500">
                      My Orders
                    </li>
                  </a>
                </Link>
                <li
                  onClick={logout}
                  className="py-1 text-sm hover:text-indigo-500"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
          {user.value && (
            <MdAccountCircle className="md:text-3xl text-2xl mx-2" />
          )}
        </span>
        {!user.value && (
          <Link href={"/login"}>
            <a>
              <button className="bg-indigo-600 rounded-md text-sm mx-2 p-1 text-white">
                Login
              </button>
            </a>
          </Link>
        )}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="md:text-3xl text-xl"
        />
      </div>

      <div
        ref={ref}
        className="sideCart overflow-y-scroll absolute transition-transform translate-x-full transform top-0 right-0 bg-indigo-200 px-2 w-72 py-10 h-[100vh]"
      >
        <h2 className="font-bold text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-indigo-700"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal px-8">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 font-semibold">Your cart is Empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">
                    {cart[k].name} ({cart[k].size}/{cart[k].varient})
                  </div>
                  <div className="flex items-center font-semibold justify-center w-1/3 text-lg">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].varient
                        );
                      }}
                      className="cursor-pointer text-indigo-500"
                    />{" "}
                    <span className="mx-2">{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].varient
                        );
                      }}
                      className="cursor-pointer text-indigo-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="flex mt-10">
          <Link href={"/checkout"}>
            <button
              disabled={Object.keys(cart).length == 0}
              className="disabled:bg-indigo-400 flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"
            >
              <BsFillCartCheckFill className="m-1" /> Check Out
            </button>
          </Link>
          <button
            onClick={clearCart}
            disabled={Object.keys(cart).length == 0}
            className="disabled:bg-indigo-400 flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"
          >
            <MdDelete className="m-1" /> Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
