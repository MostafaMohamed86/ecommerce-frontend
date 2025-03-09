import { Category } from "@components/ecommerce"
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { TCategory } from "@types";
import useCategories from "@hooks/useCategories";


const Categories = () => {
  
  const { loading, error, records} = useCategories();

  return (
    <>
    <Heading title="Categories"/>
      <Loading status={loading} error={error} type="category">
        <GridList<TCategory> 
        emptyMessage="there are no categories"
        records={records} 
        renderItem= {(record) => <Category {...record} /> }/>
    </Loading>
    </>
  )
}

export default Categories
