import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//layouts
import {MainLayout} from '@layouts/index'

//pages
const Home = lazy(()=> import("@pages/Home"))
const Categories = lazy(()=> import("@pages/Categories"))
const Products = lazy(()=> import("@pages/Products"))
const Cart = lazy(()=> import("@pages/Cart"))
const About = lazy(()=> import("@pages/About"))
const Login = lazy(()=> import("@pages/Login"))
const Register = lazy(()=> import("@pages/Register"))
const Error = lazy(()=> import("@pages/Error"))
const WishList = lazy(()=> import("@pages/WishList"))


const router = createBrowserRouter([{
    path:"/",
    element: <MainLayout/>,
    errorElement: <Error/>,
    children:[
        {
            index:true,
            element: <Suspense fallback="Loading please wait"><Home/></Suspense>
        },
        {
            path:"categories",
            element: <Suspense fallback="Loading please wait"><Categories/></Suspense>,
        },
        {
            path:"categories/products/:prefix",
            element: <Suspense fallback="Loading please wait"><Products/></Suspense>,
            loader: async({params})=>{
                if(
                    typeof(params.prefix) !== "string" ||
                    !/^[a-z]+$/i.test(params.prefix)
                ){
                    throw new Response("bad request",
                        {statusText:"category not found",
                        status: 400}
                    )
                }
                return true;
            }
        },
        {
            path:"about",
            element:<Suspense fallback="Loading please wait"><About/></Suspense>
        },
        {
            path:"login",
            element:<Suspense fallback="Loading please wait"><Login/></Suspense>
        },
        {
            path:"register",
            element:<Suspense fallback="Loading please wait"><Register/></Suspense>
        },
        {
            path:"cart",
            element:<Suspense fallback="Loading please wait"><Cart/></Suspense>
        },
        {
            path:"wishlist",
            element:<Suspense fallback="Loading please wait"><WishList/></Suspense>
        }
    ]
}])

export default function AddRouter() {
    return (

        <RouterProvider router={router}>
        </RouterProvider>
)}
