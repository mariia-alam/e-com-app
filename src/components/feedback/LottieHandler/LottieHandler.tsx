import Lottie from "lottie-react";
import emptyCart from "@assets/lottieFile/emptyCart.json"
import error from "@assets/lottieFile/error.json"
import notFound from "@assets/lottieFile/notFound.json"
import loading from "@assets/lottieFile/loading.json"
import emptyWishList from "@assets/lottieFile/emptyWishList.json"
import emptyList from "@assets/lottieFile/emptyList.json"
import success from "@assets/lottieFile/success.json"

const lottieFilesMap = {
    notFound: notFound,
    emptyCart:emptyCart,
    emptyWishList: emptyWishList,
    emptyList: emptyList,
    loading: loading,
    error:error,
    success:success,
}
type LottieHandleProps ={
    type: keyof typeof lottieFilesMap;
    message?:string;
}
export default function LottieHandler({ type , message }: LottieHandleProps) {
    const lottie = lottieFilesMap[type];
    return(
        <>
        <div className="d-flex flex-column align-items-center">
            <Lottie animationData={lottie} style={{width:"300px"}}></Lottie>
            {message && <h3 className={type==="error" ? "fs-5 text-danger" : "fs-5"} >{message}</h3>}
        </div>
        </>

    )
}
