import useRegister from "@hooks/useRegister";
import { Navigate } from "react-router-dom";
import { Input } from "@components/Form/input";
import { Heading } from "@components/common";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";

const Register = () => {
  const {
    error,
    loading,
    accessToken,
    register,
    handleSubmit,
    formErrors,
    emailAvailabilityStatus,
    submitFrom,
    emailOnBlurHandler,
  } = useRegister();
  if (accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {" "}
          {/* ٦ اعمدة وتم ازاحة ٣ اعمدة ومتبقى ٣ اعمدة على اليمين */}
          <Form onSubmit={handleSubmit(submitFrom)}>
            <Input
              label="First Name"
              name="firstName"
              register={register}
              error={formErrors.firstName?.message}
            />
            <Input
              label="Last Name"
              name="lastName"
              register={register}
              error={formErrors.lastName?.message}
            />
            <Input
              label="Email address"
              name="email"
              register={register}
              error={
                formErrors.email?.message
                  ? formErrors.email?.message // required error message
                  : emailAvailabilityStatus === "notAvailable"
                  ? "This email is already in use."
                  : emailAvailabilityStatus === "failed"
                  ? "Error from the server."
                  : ""
              }
              onBlur={emailOnBlurHandler}
              formText={
                emailAvailabilityStatus === "checking"
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : ""
              }
              success={
                emailAvailabilityStatus === "available"
                  ? "This email is available for use."
                  : ""
              }
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            />
            <Input
              label="Password"
              name="password"
              register={register}
              error={formErrors.password?.message}
              type="password"
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              register={register}
              error={formErrors.confirmPassword?.message}
              type="password"
            />
            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailabilityStatus === "checking" || loading === "pending"
              }
            >
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

export default Register;
