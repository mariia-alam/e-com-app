import { isAxiosError } from "axios";

const AxiosErrorHandler = (error: unknown) => {
    if(isAxiosError(error)){
        return error.response?.data.message|| error.message;
    }else{
        return "Network Error";
    }
}
export default AxiosErrorHandler;