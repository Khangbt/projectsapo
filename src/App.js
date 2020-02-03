import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from './Menu/Menu';
import routes from './routes';
import Sale from './pages/Sale/Sale';
import Head from './Menu/Head';
import DetailProduct from './pages/ProductPage/DetailProduct';
import EditProduct from './pages/ProductPage/EditProduct';
import DetailCustomer from './pages/CustomerPage/DetailCustomer';


const checkSale = window.location.pathname !== "/sale" ? true : false
class App extends Component {

  render() {
    return (
      <Router>

        {checkSale &&
          <div className="d-flex">
            <Menu />
            <div id="page-content-wrapper">
              <Head/>
              <div className="container-fluid">
                {this.showContentManager(routes)}
                <Route exact path="/product/id=:id" component={DetailProduct}/>
                <Route path="/product/edit/id=:id" component={EditProduct}/>
                <Route exact path="/customer/id=:id" component={DetailCustomer}/>
                
              </div>
            </div>
          </div>

        }
        <Route path="/sale" component={Sale} />
      </Router>
    )
  }
  showContentManager = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  }
}

export default App;
