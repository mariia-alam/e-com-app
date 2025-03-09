import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import {Button, Form, Row , Col} from 'react-bootstrap';
import { Heading } from '@components/common';
import { signInSchema, signInType } from "@validation/SignInSchema";
import { Input, PasswordInput } from "@components/form";

export default function Login() {
  const { register, handleSubmit ,formState:{errors} } = useForm<signInType>(
    {
      mode: "onBlur",
      resolver: zodResolver(signInSchema)}
  );

  const submitForm : SubmitHandler<signInType> = (data) => {
    console.log(data)
  }

  return (
      <>
      <Heading title='User Login'/>
      <Row>
        <Col md={{span:6, offset:3}}>
          <Form onSubmit={handleSubmit(submitForm)}>
              <Input label="Email Address" name="email" type="email" error={errors.email?.message as string} register={register}></Input>
              <PasswordInput
                label="Password"
                name="password"
                register={register}
                error={errors.password?.message as string}
              />
              <Form.Group className="d-flex justify-content-end">
                <Button
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
