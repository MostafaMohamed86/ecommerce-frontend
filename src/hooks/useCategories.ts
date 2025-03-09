import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetCategories, categoriesRecordsCleanUp } from "@store/categories/categoriesSlice";
const useCategories = () => {
  const  { loading, error, records}  = useAppSelector(state => state.categories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(actGetCategories());
  return () => {
    dispatch(categoriesRecordsCleanUp());
    promise.abort();
  }
  },[dispatch]);
  return {loading, error, records}
}

export default useCategories
