import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import {Button, Form, Row , Col} from 'react-bootstrap';
import { Heading } from '@components/common';
import { signUpSchema, signUpType } from "@validation/SignUpSchema";
import { Input, PasswordInput } from "@components/form";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
export default function Register() {
  const { register, handleSubmit ,formState:{errors, isValid}, getFieldState, trigger } = useForm<signUpType>(
    {
      mode: "onBlur",
      resolver: zodResolver(signUpSchema)}
  );

  const submitForm : SubmitHandler<signUpType> = (data) => {
    console.log(data)
  }
  const {
          emailAvailabilityStatus,
          enteredEmail,
          checkEmailAvailability,
          resetCheckEmailAvailability
        } = useCheckEmailAvailability();

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email")
    const value = e.target.value;
    const { isDirty, invalid  } = getFieldState("email");
    // console.log(isDirty, invalid)
    if(isDirty && !invalid && enteredEmail !== value){
      checkEmailAvailability(value)
    }
    if(isDirty && invalid && enteredEmail && value.length === 0 ){
      resetCheckEmailAvailability()
    }
  }

  return (
      <>
      <Heading title='User Registration'/>
      <Row>
        <Col md={{span:6, offset:3}}>
          <Form onSubmit={handleSubmit(submitForm)}>
              <Input label="First Name" name="firstName" type="text" error={errors.firstName?.message as string} register={register}></Input>
              <Input label="Last Name" name="lastName" type="text" error={errors.lastName?.message as string} register={register}></Input>
              <Input
                onBlur={emailOnBlurHandler}
                label="Email Address"
                name="email"
                type="email"
                error={errors.email?.message ?
                  errors.email?.message :
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
                error={errors.password?.message as string}
              />
              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                register={register}
                error={errors.confirmPassword?.message as string}
              />

              <Form.Group className="d-flex justify-content-end">
                <Button
                  disabled={!isValid || emailAvailabilityStatus === "notAvailable" || emailAvailabilityStatus === "failed"}

                // disabled={emailAvailabilityStatus==="notAvailable" || emailAvailabilityStatus==="failed"}
                  variant=""
                  type="submit"
                  style={{ backgroundColor: "var(--primary-color)", color: "white" }}
                >
                  Submit
                </Button>
              </Form.Group>
          </Form>
        </Col>
      </Row>
      </>
  )
}
