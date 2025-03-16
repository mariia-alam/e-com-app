import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInType } from "@validation/SignInSchema";
import { actAuthLogin, resetUi } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const useLogin = () => {
    const [searchParams , setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const {error , loading, accessToken} = useAppSelector(state => state.auth)



    const { register, handleSubmit ,formState:{errors: formErrors} } = useForm<signInType>(
        {
        mode: "onBlur",
        resolver: zodResolver(signInSchema)}
    );

    const submitForm : SubmitHandler<signInType> = async (data) => {
        if(searchParams.get("message")){
        setSearchParams(" ")
        }
        dispatch(actAuthLogin(data)).unwrap().then(()=>{
                navigate("/");

    })
    }

    useEffect(()=>{
        return ()=>{ dispatch(resetUi());}
    },[dispatch])

return {
        error,
        loading,
        accessToken,
        register,
        handleSubmit,
        formErrors,
        submitForm,
        searchParams,
    }
}
export default useLogin;