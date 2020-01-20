import React from 'react';
import HomePage from './pages/HomePage/Home';
import ProductList from './pages/ProductPage/ProductList';
import CustomerList from './pages/CustomerPage/CustomerList';
import OrderList from './pages/OrderPage/OrderList';
import Sale from './pages/Sale/Sale';
import AddProduct from './pages/ProductPage/AddProduct';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage/>
    },
    {
        path: '/productList',
        exact: false,
        main: () => <ProductList />
    },
    {
        path: '/product/add',
        exact: false,
        main: () => <AddProduct />
    },
    {
        path: '/customerList',
        exact: false,
        main: () => <CustomerList />
    },
    {
        path: '/orderList',
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