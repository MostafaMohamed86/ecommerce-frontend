import { Loading } from "@components/feedback";
import { Heading } from "@components/common";
import { Table, Modal } from "react-bootstrap";
import { ProductInfo } from "@components/ecommerce";
import useOrders from "@hooks/useOrders";

const Orders = () => {
  const {
    loading,
    error,
    showModal,
    selectedProduct,
    orderList,
    closeModalHandler,
    viewDetailsHandler,
  } = useOrders();
  return (
    <>
      <Modal show={showModal} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Products Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              quantity={el.quantity}
              direction="column"
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Modal.Body>
      </Modal>
      <Heading title="My Order" />
      <Loading status={loading} error={error} type="table">
        <Table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((el) => (
              <tr key={el.id}>
                <td>#{el.id}</td>
                <td>
                  {el.items.length} item(s){" / "}
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => viewDetailsHandler(el.id)}
                  >
                    Product Details
                  </span>
                </td>
                <td>{el.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default Orders;
