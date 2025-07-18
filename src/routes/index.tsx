import { createBrowserRouter } from 'react-router';
import RootLayout from '@/components/layout/RootLayout';
import Home from '@/pages/Home/Home';
import Cart from '@/pages/Cart/Cart';
import Products from '@/pages/Products/Products';
import Shop from '@/pages/Shop/Shop';
import Account from '@/pages/Account/Account';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'home', element: <Home /> },
            { path: 'products', element: <Products /> },
            { path: 'shop', element: <Shop /> },
            { path: 'cart', element: <Cart /> },
            { path: 'account', element: <Account /> },
        ]
    }
])