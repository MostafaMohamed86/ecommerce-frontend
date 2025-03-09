import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import TableSkeleton from "../skeletons/TableSkeleton/TableSkeleton";
import { TLoading } from "@types"
import React from "react";
import LottieHandler from "../LottieHandler/LottieHandler";

const skeletonsTypes = {
    category: CategorySkeleton,
    product: ProductSkeleton,
    cart: CartSkeleton,
    table: TableSkeleton
}
type LoadingProps = {
    status: TLoading;
    error: null | string;
    children: React.ReactNode;
    type?: keyof typeof skeletonsTypes // keys 
}
const Loading = ({status, error, children, type = "category"}: LoadingProps) => {
    const Component = skeletonsTypes[type]; // skeletonsTypes[keys]
    if(status === "pending")
        return <Component />

    if(status === "failed")
        return <div><LottieHandler type="error" message={error as string}/></div>
    
  return <>{children}</>
}

export default Loading
