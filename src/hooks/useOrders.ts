import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetOrders, resetOrderStatus } from "@store/orders/ordersSlice";
import { TProduct } from "@types";

const useOrders = () => {
  const dispatch = useAppDispatch();
  const { orderList, loading, error } = useAppSelector((state) => state.orders);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  const viewDetailsHandler = (id: number) => {
    const productDetails = orderList.find((order) => order.id === id); // bring data by id
    const newItems = productDetails?.items ?? []; // array of object [{}]
    setShowModal(true);
    setSelectedProduct((prev) => [...prev, ...newItems]); // [{id:1,title:'product1',price:10,img:"url1"}, {id}]
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };
  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);
  return {
    loading,
    error,
    showModal,
    selectedProduct,
    orderList,
    closeModalHandler,
    viewDetailsHandler,
  };
};

export default useOrders;
