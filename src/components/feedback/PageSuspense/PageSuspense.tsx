import { Suspense } from "react"
import {LottieHandler} from "@components/feedback"
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from "react-router-dom";

export default function PageSuspense({children}:{children: React.ReactNode}) {
        const location = useLocation();

    const pageVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: 60, transition: { duration: 0.4 } },
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <Suspense
                fallback={<LottieHandler type='loading' message='Loading..'></LottieHandler>}
                >
                    {children}
                </Suspense>
            </motion.div>
        </AnimatePresence>
    )
}
