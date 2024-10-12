import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const quantityProduct = useSelector((state) => state.cart.quantity);

  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between py-5 bg-indigo-900 px-8 z-50">
      <h2 className="capitalize text-3xl font-bold text-white cursor-pointer">
        <Link to="/">My shopping</Link>
      </h2>
      <div className="text-white text-3xl cursor-pointer relative">
        <Link to="/cart">
          <FaShoppingCart className="" />
          <p className="flex items-center justify-center text-sm rounded-lg absolute -bottom-5 -right-2 text-xl text-white">
            {quantityProduct}
          </p>
        </Link>
      </div>
    </div>
  );
}
