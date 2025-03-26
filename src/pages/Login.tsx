import { Link, Navigate } from "react-router-dom";
import {Button, Form, Row , Col, Alert, Spinner} from 'react-bootstrap';
import { Heading } from '@components/common';
import { Input, PasswordInput } from "@components/form";
import useLogin from "@hooks/useLogin";

export default function Login() {
  const {
          error,
          loading,
          accessToken,
          register,
          handleSubmit,
          formErrors,
          submitForm,
          searchParams,
        } = useLogin();


if(accessToken){
  return <Navigate to="/" />
}
  return (
      <>
      <Heading title='User Login'/>
      <Row>
        <Col md={{span:6, offset:3}}>
        {searchParams.get("message") === "account_created" &&
            <Alert variant="success">Account created successfully, login please</Alert>}
        {searchParams.get("message") === "login_required" &&
            <Alert variant="primary">If you want to continue, please log in</Alert>}
        {searchParams.get("message") ==="home" &&
            <Alert variant="primary">Don't have an account? <Link to="/register">Create one now</Link></Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit(submitForm)}>
              <Input label="Email Address" name="email" type="email" error={formErrors.email?.message as string} register={register}></Input>
              <PasswordInput
                label="Password"
                name="password"
                register={register}
                error={formErrors.password?.message as string}
              />
              <Form.Group className="d-flex justify-content-end">
              {
                loading!=="pending" ?
                  <Button
                    variant=""
                    type="submit"
                    style={{ backgroundColor: "var(--primary-color)", color: "white" }}
                  >
                    Login
                  </Button> :
                  <Button
                      variant=""
                      style={{ backgroundColor: "var(--primary-color)", color: "white" }}
                    >
                      <Spinner animation="border" size="sm"/> Logging in..
                  </Button>
              }
              </Form.Group>

          </Form>
        </Col>
      </Row>
      </>
  )
}
