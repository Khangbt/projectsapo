import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Head extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <Link className="nav-link drobuttondown-toggle" to="" id="navbarDropdown" role="button" data-toggle="dropdown" >
              Hello user
            </Link>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
        <a className="dropdown-item" href ={window.location.pathname!=="/sale"?"/sale" : "/"} >{window.location.pathname!=="/sale"?" Sale" : "Manage"}</a>
              <Link className="dropdown-item" to ="" >Setting</Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="/login">Logout</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
        );
    }
}

export default Head;