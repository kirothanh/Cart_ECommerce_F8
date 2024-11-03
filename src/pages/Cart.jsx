import { Link } from "react-router-dom";
import { ImSad } from "react-icons/im";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  clearCart,
  decreaseProduct,
  removeProduct,
} from "../redux-toolkit/slices/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handleIncrementProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleDecrementProduct = (product) => {
    if (product.quantityNew === 1) {
      toast.warn("Nhấn xác nhận để xóa sản phẩm này", {
        autoClose: 3000,
        closeOnClick: false,
        position: "top-center",
        onClick: () => {
          dispatch(removeProduct(product));
          toast.dismiss();
        },
      });
    } else {
      dispatch(decreaseProduct(product));
    }
  };

  const handleRemoveProduct = (product) => {
    toast.warn("Nhấn xác nhận để xóa sản phẩm này", {
      autoClose: 3000,
      closeOnClick: false,
      position: "top-center",
      onClick: () => {
        dispatch(removeProduct(product));
        toast.dismiss();
      },
    });
  };

  const handleCheckout = () => {
    dispatch(clearCart());
  };

  return (
    <div className="mt-24 max-w-[80%] mx-auto">
      <h1 className="mt-24 text-center uppercase text-4xl font-bold tracking-wide">
        shopping cart
      </h1>
      {cart.length > 0 ? (
        <>
          {cart.map((cartItem) => (
            <div
              key={cartItem._id}
              className="border p-4 rounded-lg flex items-center justify-between gap-5 my-4"
            >
              <img
                className="w-20 h-20 rounded-md"
                src={cartItem.image}
                alt={cartItem.name}
              />
              <div className="flex-1">
                <p className="font-semibold text-red-600">{cartItem.brand}</p>
                <p className="font-bold text-xl">{cartItem.name}</p>
              </div>
              <div className="flex-1 flex items-center justify-center gap-3">
                <p className="font-bold text-xl text-red-600">
                  ${cartItem.price}
                </p>
                <div className="flex items-center justify-center gap-3 border rounded-md p-3">
                  <div
                    className="text-white bg-green-700 p-2 rounded-md cursor-pointer"
                    onClick={() => handleIncrementProduct(cartItem)}
                  >
                    <FaPlus />
                  </div>
                  <span>{cartItem.quantityNew}</span>
                  <div
                    className="text-white bg-green-700 p-2 rounded-md cursor-pointer"
                    onClick={() => handleDecrementProduct(cartItem)}
                  >
                    <FaMinus />
                  </div>
                </div>
                <p className="font-semibold">Còn lại: {cartItem.quantity}</p>
              </div>
              <div className="flex items-center justify-end gap-3 text-red-600 font-bold flex-1">
                <p>$ {cartItem.price * cartItem.quantityNew}</p>
                <CiTrash
                  className="text-2xl cursor-pointer"
                  onClick={() => handleRemoveProduct(cartItem)}
                />
              </div>
            </div>
          ))}
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex justify-end my-3">
            <h3 className="text-3xl font-bold my-3 capitalize">
              Total Price: <span>${totalPrice}</span>
            </h3>
          </div>
          <div className="flex items-center justify-between my-2">
            <Link to={"/"}>
              <button className="capitalize py-3 px-4 rounded bg-blue-400 text-white font-semibold">
                Continue Buying
              </button>
            </Link>
            <button
              className="capitalize py-3 px-4 rounded bg-blue-400 text-white font-semibold"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="mt-4 flex items-center justify-center mx-auto">
          <div>
            <p className="capitalize font-bold text-yellow-900 text-3xl mb-4">
              there is no product in your cart!
            </p>
            <ImSad className="capitalize font-bold text-yellow-900 text-2xl mb-4 mx-auto" />
            <div className="flex items-center justify-center">
              <Link to={"/"}>
                <button className="capitalize py-3 px-4 rounded-lg text-white bg-orange-800 ">
                  Go home
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
