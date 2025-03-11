import {z} from "zod"

const signInSchema = z.object(
    {
        email: z.string().min(1, {message:"Email address is required"}).email(),
        password: z.string().min(1, {message:"Password is required"}),
    });


type signInType = z.infer<typeof signInSchema>
// type TFormInputs = {
//   firstName: string;
//   lastName: string;
//   email:string;
//   password:string;
//   confirmPassword:string;
// }
export { signInSchema, type signInType}