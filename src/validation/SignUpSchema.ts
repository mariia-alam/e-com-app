import {z} from "zod"

const signUpSchema = z.object(
    {
        firstName: z.string().min(2, {message:"First name is required"}),
        lastName: z.string().min(2, {message:"Last name is required"}),
        email: z.string().min(1, {message:"Email address is required"}).email(),
        password: z.string().min(8, {message:"Password must be at least 8 characters"})
        .regex(/.*[!@#$%^&*()_+|[\]\\:";'<>?,./].*/, {
            message: "Password should contain at least 1 special character",
        }),
        confirmPassword: z.string().min(1, {message:"Confirm password is required"}),
    }).refine((input) => input.password === input.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


type signUpType = z.infer<typeof signUpSchema>
// type TFormInputs = {
//   firstName: string;
//   lastName: string;
//   email:string;
//   password:string;
//   confirmPassword:string;
// }
export { signUpSchema, type signUpType}