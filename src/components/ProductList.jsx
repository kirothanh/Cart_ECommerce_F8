import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsList } from "../redux-toolkit/slices/productsSlice";
import Loading from "./Loading";
import Pagination from "./Pagination";
import { addProduct } from "../redux-toolkit/slices/cartSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const productsList = useSelector(
    (state) => state.products.productList.listProduct
  );
  const totalPage = useSelector(
    (state) => state.products.productList.totalPage
  );
  const status = useSelector((state) => state.products.status);

  const limitProduct = 20;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getProductsList({ limitProduct, currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleAddToCart = (product) => {
    dispatch(addProduct(product));
  };

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
    <div>
      <h1 className="mt-24 text-center uppercase text-4xl font-bold tracking-wide">
        Products
      </h1>
      <div className="w-full md:max-w-[90%] mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {productsList?.map((product) => (
            <div key={product._id}>
              <div className="border-2 mx-auto p-4 rounded-lg cursor-pointer hover:border-orange-800 transition-all duration-300 ease-in-out m-4 w-full ">
                <Link to={`/details/${product._id}`}>
                  <div className="flex justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="bg-cover bg-center rounded-lg"
                    />
                  </div>
                </Link>
                <h2 className="mt-4 text-center font-bold text-lg">
                  {product.name}
                </h2>
                <div className="flex items-center justify-between mt-4">
                  <p className="font-bold text-2xl">
                    <span className="text-orange-800">$</span>
                    {product.price}
                  </p>
                  <IoCartOutline
                    className="text-orange-800 text-3xl cursor-pointer"
                    onClick={() => handleAddToCart(product)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          totalPage={totalPage}
          limitProduct={limitProduct}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
