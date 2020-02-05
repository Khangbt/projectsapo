import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


class Menu extends Component{
  render(){
        return(
            <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading"><b>POS SHOP KHSK</b></div>
      <div className="list-group list-group-flush">
        <Link to="/" className="list-group-item list-group-item-action bg-light"><i className="fas fa-home">Tổng quan</i></Link>
        <Link to="/product" className="list-group-item list-group-item-action bg-light"><i className="fas fa-box-open">Quản lý sản phẩm</i></Link>
        <Link to="/customer" className="list-group-item list-group-item-action bg-light"><i className="fas fa-user">Quản lý khách hàng</i></Link>
        <Link to="/order" className="list-group-item list-group-item-action bg-light"><i className="fas fa-clipboard">Quản lý đơn hàng</i></Link>
      </div>
    </div>
        )
    }
  }
 

export default Menu;
