import { Navigate } from "react-router-dom";
import useLogin from "@hooks/useLogin";
import { Heading } from "@components/common";
import { Button, Col, Form, Row, Alert, Spinner } from "react-bootstrap";
import { Input } from "@components/Form/input";

const Login = () => {
  const {
    error,
    loading,
    accessToken,
    formErrors,
    searchParams,
    register,
    handleSubmit,
    submitForm,
  } = useLogin();
  if (accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {" "}
          {/* ٦ اعمدة وتم ازاحة ٣ اعمدة ومتبقى ٣ اعمدة على اليمين */}
          {searchParams.get("message") === "login_required" && (
            <Alert variant="danger">
              {" "}
              You need to login to view this content
            </Alert>
          )}
          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">
              {" "}
              Your account successfully created, please login
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              register={register}
              name="email"
              error={formErrors.email?.message}
              label="Email Address"
            />
            <Input
              type="password"
              register={register}
              name="password"
              error={formErrors.password?.message}
              label="Password"
            />
            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
