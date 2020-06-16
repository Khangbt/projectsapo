import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../image/logo.png'


class Menu extends Component{
  render(){
        return(
            <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading"><img alt="" src={logo} width="200"/></div>
      <div className="list-group list-group-flush menubar">
        <Link to="/" className="list-group-item list-group-item-action bg-light"><i className="fas fa-home"></i><span>Bán hàng</span></Link>
        <Link to="/order" className="list-group-item list-group-item-action bg-light"><i className="fas fa-clipboard"></i><span>Quản lý đơn hàng</span></Link>
        <Link to="/product" className="list-group-item list-group-item-action bg-light"><i className="fas fa-box-open"></i><span>Quản lý sản phẩm</span></Link>
        <Link to="/customer" className="list-group-item list-group-item-action bg-light"><i className="fas fa-user"></i><span>Quản lý khách hàng</span></Link>
        <Link to="/chart" className="list-group-item list-group-item-action bg-light"><i className="fas fa-user"></i><span>Biểu Đồ</span></Link>
      </div>
    </div>
        )
    }
  }
 

export default Menu;
