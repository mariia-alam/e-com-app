import {Button, Form, Row , Col, Spinner} from 'react-bootstrap';
import { Heading } from '@components/common';
import { Input, PasswordInput } from "@components/form";
import { Navigate } from "react-router-dom";
import useRegister from '@hooks/useRegister';

export default function Register() {
  const {
        error,
        loading,
        accessToken,
        register,
        handleSubmit,
        submitForm,
        formErrors,
        // isValid,
        emailAvailabilityStatus,
        emailOnBlurHandler,
        } = useRegister();

if(accessToken){
  return <Navigate to="/" />
}

  return (
      <>
      <Heading title='User Registration'/>
      <Row>
        <Col md={{span:6, offset:3}}>
          <Form onSubmit={handleSubmit(submitForm)}>
              <Input label="First Name" name="firstName" type="text" error={formErrors.firstName?.message as string} register={register}></Input>
              <Input label="Last Name" name="lastName" type="text" error={formErrors.lastName?.message as string} register={register}></Input>
              <Input
                onBlur={emailOnBlurHandler}
                label="Email Address"
                name="email"
                type="email"
                error={formErrors.email?.message ?
                  formErrors.email?.message :
                  emailAvailabilityStatus==="notAvailable" ?
                  "This email already in use " :
                  emailAvailabilityStatus==="failed" ? "Error from the server" : ""}
                register={register}
                formText =
                  {
                    emailAvailabilityStatus==="checking"
                    ? "We're currently checking the availability of this email address. Please wait"
                    :""
                  }
                success=
                  {
                    emailAvailabilityStatus==="available"
                    ? "This email is available for use"
                    :""
                  }
              ></Input>
              <PasswordInput
                label="Password"
                name="password"
                register={register}
                error={formErrors.password?.message as string}
              />
              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                register={register}
                error={formErrors.confirmPassword?.message as string}
              />

              <Form.Group className="d-flex justify-content-end">

                {loading !== "pending" ?
                  <Button
                    disabled={emailAvailabilityStatus === "notAvailable" || emailAvailabilityStatus === "failed"}
                    variant=""
                    type="submit"
                    style={{ backgroundColor: "var(--primary-color)", color: "white" }}
                  >
                    Submit
                  </Button> :
                  <Button
                    variant=""
                    style={{ backgroundColor: "var(--primary-color)", color: "white" }}
                  >
                    <Spinner animation="border" size="sm"/> Submitting..
                  </Button>
                }

              </Form.Group>
                {error && <p className="text-danger">{error}</p>}
          </Form>
        </Col>
      </Row>
      </>
  )
}
