import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//layouts
import {MainLayout} from '@layouts/index.ts'
//pages
import Home from '@pages/Home';
import Categories from '@pages/Categories';
import Products from '@pages/Products';
import About from '@pages/About';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Error from '../pages/Error';
import Cart from '@pages/Cart';
import WishList from '@pages/WishList';

const router = createBrowserRouter([{
    path:"/",
    element: <MainLayout/>,
    errorElement: <Error/>,
    children:[
        {
            index:true,
            element: <Home/>
        },
        {
            path:"categories",
            element: <Categories/>,
        },
        {
            path:"categories/products/:prefix",
            element: <Products/>,
            // loader: ProductsLoader,
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
            element:<About/>
        },
        {
            path:"login",
            element: <Login/>
        },
        {
            path:"register",
            element: <Register/>
        },
        {
            path:"cart",
            element: <Cart/>
        },
        {
            path:"wishlist",
            element: <WishList/>
        }

    ]
}])

export default function AddRouter() {
    return (

        <RouterProvider router={router}>
        </RouterProvider>
)
}
