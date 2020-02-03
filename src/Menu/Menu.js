import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


class Menu extends Component{
  render(){
        return(
            <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading"><b>POS SHOP KHSK</b></div>
      <div className="list-group list-group-flush">
        <Link to="/" className="list-group-item list-group-item-action bg-light">Home</Link>
        <Link to="/product" className="list-group-item list-group-item-action bg-light">Quản lý sản phẩm</Link>
        <Link to="/customer" className="list-group-item list-group-item-action bg-light">Quản lý khách hàng</Link>
        <Link to="/order" className="list-group-item list-group-item-action bg-light">Quản lý đơn hàng</Link>
      </div>
    </div>
        )
    }
  }
 

export default Menu;
