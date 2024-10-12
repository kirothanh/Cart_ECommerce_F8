import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductDetail } from "../redux-toolkit/slices/productDetailSlice";
import Loading from "../components/Loading";
import { addProduct } from "../redux-toolkit/slices/cartSlice";

export default function DetailProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailProduct = useSelector(
    (state) => state.productDetail.productDetail
  );
  const status = useSelector((state) => state.productDetail.status);

  const handleAddToCart = (detailProduct) => {
    dispatch(addProduct(detailProduct));
  };

  useEffect(() => {
    dispatch(getProductDetail({ id }));
  }, [dispatch]);

  if (status === "pending") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center mt-24">
        <p className="text-2xl font-semibold text-red-500">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[80%] mx-auto mt-24 flex items-center justify-center gap-4">
      <div
        className="w-1/2 p-8 border-2 rounded-lg border-blue-600
      "
      >
        <img
          src={detailProduct?.image}
          alt={detailProduct?.name}
          className="w-full h-auto bg-cover rounded-lg"
        />
      </div>
      <div>
        <h1 className="capitalize font-bold text-amber-800 text-3xl mb-4">
          {detailProduct?.brand}
        </h1>
        <p className="capitalize font-bold text-black text-xl mb-4">
          {detailProduct?.name}
        </p>
        <p className="capitalize font-semibold text-black text-md mb-4 italic">
          {detailProduct?.description}
        </p>
        <p className="capitalize mb-4">category: {detailProduct?.category}</p>
        <button className="bg-orange-800 text-white py-3 px-4 rounded-lg mb-4">
          <Link to={"/"}>Go home</Link>
        </button>

        <div className="flex items-center gap-4 justify-center">
          <p className="font-bold text-3xl">
            <span className="text-orange-800">$</span>
            {detailProduct?.price}
          </p>
          <button
            className="capitalize bg-orange-800 text-white py-3 px-4 rounded-lg mb-4 translate-y-1/4"
            onClick={() => handleAddToCart(detailProduct)}
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
