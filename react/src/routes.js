import React from 'react';
import HomePage from './pages/HomePage/Home';
import ProductList from './pages/ProductPage/ProductList';
import CustomerList from './pages/CustomerPage/CustomerList';
import OrderList from './pages/OrderPage/OrderList';
import Sale from './pages/Sale/Sale';
import AddProduct from './pages/ProductPage/AddProduct';
import ChartExample from './pages/Test/ChartExample';
// import DetailCustomer from './pages/CustomerPage/DetailCustomer';
// import DetailProduct from './pages/ProductPage/DetailProduct';


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
    //     path: '/customer/:id',
    //     exact: true,
    //     main: () => <DetailCustomer />
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
        exact: true,
        main: () => <OrderList />
    },
    {
        path: '/sale',
        exact: false,
        main: () => <Sale />
    },
    {
      path: '/chart',
      exact : true,
      main:() => <ChartExample/>
    }

];

export default routes;