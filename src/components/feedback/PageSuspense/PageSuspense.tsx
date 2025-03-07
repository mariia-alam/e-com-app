import { Suspense } from "react"
import {LottieHandler} from "@components/feedback"

export default function PageSuspense({children}: {children :React.ReactNode}) {

    return (
        <Suspense
        fallback={<LottieHandler type='loading' message='Loading..'></LottieHandler>}
        >
            {children}
        </Suspense>
    )
}
