import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister ,resetUi } from "@store/auth/authSlice";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { signUpSchema, signUpType } from "@validation/SignUpSchema";



const useRegister = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const {error , loading, accessToken} = useAppSelector((state)=> state.auth);

    const { register, handleSubmit ,formState:{errors:formErrors, isValid}, getFieldState, trigger } = useForm<signUpType>(
        {
        mode: "onBlur",
        resolver: zodResolver(signUpSchema)}
    );

    const submitForm : SubmitHandler<signUpType> = async (data) => {
        const {firstName,lastName,email,password} = data
        dispatch(actAuthRegister({firstName,lastName,email,password})).unwrap().then(()=>{
            navigate("/login?message=account_created")
        })
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


    useEffect(()=>{
    return ()=>{ dispatch(resetUi());}
},[dispatch])



return{
    error,
    loading,
    accessToken,
    register,
    handleSubmit,
    submitForm,
    formErrors,
    isValid,
    emailAvailabilityStatus,
    emailOnBlurHandler,
}
}
export default useRegister