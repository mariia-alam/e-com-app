import { useAppSelector, useAppDispatch } from "@store/hooks";
import { useEffect } from "react";
import { actGetCategories, cleanupCategories } from "@store/categories/categoriesSlice";

export default function useCategories() {
    const dispatch = useAppDispatch();
    const { loading, error, records } = useAppSelector((state) => state.categories);

    useEffect(() => {
        const promise = dispatch(actGetCategories());

        return ()=>{
            promise.abort();
            dispatch(cleanupCategories())
        }
    }, [dispatch]);

return {loading , error , records }
}
