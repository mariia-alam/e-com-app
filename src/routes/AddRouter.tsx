import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
//layouts
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));

//pages
import Error from '@pages/Error';
const Home = lazy(()=> import("@pages/Home"))
const Products = lazy(()=> import("@pages/Products"))
const Cart = lazy(()=> import("@pages/Cart"))
const About = lazy(()=> import("@pages/About"))
const Login = lazy(()=> import("@pages/Login"))
const Register = lazy(()=> import("@pages/Register"))
const WishList = lazy(()=> import("@pages/WishList"))
const Account = lazy(()=> import("@pages/Account"))
const Orders = lazy(()=> import("@pages/Orders"))

//suspense
import {PageSuspense} from '@components/feedback';

import {LottieHandler} from '@components/feedback';

//protected routes
import ProtectedRoutes from '@components/auth/ProtectedRoutes';
import CheckoutOrder from '@pages/CheckoutOrder';

const router = createBrowserRouter([{
    path:"/",
    element:
        <Suspense
            fallback={
                <div style={{marginTop:"15%"}} className='d-flex flex-column align-items-center'>
                    <LottieHandler type='loading' message='Loading..'></LottieHandler>
                </div>}
        >
            <MainLayout key={location.pathname}/>
        </Suspense>,
    errorElement: <Error/>,
    children:[
        {
            index:true,
            element: <PageSuspense><Home/></PageSuspense>
        },
        {
            path:"categories/products/:prefix",
            element: <PageSuspense><Products/></PageSuspense>,
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
            element:<PageSuspense><About/></PageSuspense>
        },
        {
            path:"login",
            element:<PageSuspense><Login/></PageSuspense>
        },
        {
            path:"register",
            element:<PageSuspense><Register/></PageSuspense>
        },
        {
            path:"cart",
            element:<PageSuspense><ProtectedRoutes><Cart/></ProtectedRoutes></PageSuspense>
        },
        {
            path:"wishlist",
            element:<PageSuspense><ProtectedRoutes><WishList/></ProtectedRoutes></PageSuspense>
        },
        {
            path:"profile",
            element:<PageSuspense><ProtectedRoutes><Account/></ProtectedRoutes></PageSuspense>
        },
        {
            path:"orders",
            element:<PageSuspense><ProtectedRoutes><Orders/></ProtectedRoutes></PageSuspense>
        },
        {
            path:"checkout",
            element:<PageSuspense><ProtectedRoutes><CheckoutOrder/></ProtectedRoutes></PageSuspense>
        },

    ]
}])

export default function AddRouter() {
    return (
            <RouterProvider router={router} />
    )}
