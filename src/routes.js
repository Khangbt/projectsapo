import React from 'react';
import HomePage from './pages/HomePage/Home';
import ProductList from './pages/ProductPage/ProductList';
import CustomerList from './pages/CustomerPage/CustomerList';
import OrderList from './pages/OrderPage/OrderList';
import Sale from './pages/Sale/Sale';
import AddProduct from './pages/ProductPage/AddProduct';
// import EditProduct from './pages/ProductPage/EditProduct';


const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage/>
    },
    {
        path: '/product',
        exact: true,
        main: () => <ProductList />
    },
    {
        path: '/product/add',
        exact: true,
        main: () => <AddProduct />
    },
    // {
    //     path: '/product/:id/edit',
    //     exact: true,
    //     main: () => <EditProduct />
    // },
    // {
    //     path: '/product/:id',
    //     exact: false,
    //     main: () => <DetailProduct />
    // },
    {
        path: '/customer',
        exact: true,
        main: () => <CustomerList />
    },
    {
        path: '/order',
        exact: false,
        main: () => <OrderList />
    },
    {
        path: '/sale',
        exact: false,
        main: () => <Sale />
    }

];

export default routes;