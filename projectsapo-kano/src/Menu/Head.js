import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const checkSale = window.location.pathname !== "/sale" ? true : false
class Head extends Component {
  constructor(props){
    super(props);
    this.state = {
      check : false
    }
  }

  handleClick = () => {
    this.setState(prevState => ({
      check: !prevState.check
    }));
    this.props.toggle(this.state.check)
  }
  
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
       {checkSale && <button onClick={() => this.handleClick(false)}><i className="fas fa-bars"></i></button>}
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item dropdown">
              <Link className="nav-link drobuttondown-toggle" to="" id="navbarDropdown" role="button" data-toggle="dropdown" >
                Hello user
            </Link>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href={window.location.pathname !== "/sale" ? "/sale" : "/"} >{window.location.pathname !== "/sale" ? " Sale" : "Manage"}</a>
                <Link className="dropdown-item" to="" >Setting</Link>
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