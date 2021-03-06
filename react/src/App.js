import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Menu from './Menu/Menu';
import routes from './routes';
import DetailProduct from './pages/ProductPage/DetailProduct';
import DetailCustomer from './pages/CustomerPage/DetailCustomer';
import OrderDetail from './pages/OrderPage/OrderDetail';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      a : true
    }
  }
  toggle = (clickToggle) => {
    this.setState ({
      a : clickToggle
    })
  }
  render() {
    return (
      <Router>
        
          <div className="d-flex">
           {this.state.a && <Menu/>}
            <div id="page-content-wrapper">         
              <div className="container-fluid">
                {this.showContentManager(routes)}
                <Route exact path="/product/id=:id" component={DetailProduct}/>
                <Route exact path="/customer/id=:id" component={DetailCustomer}/>    
                <Route exact path="/order/id=:id" component={OrderDetail}/>    

              </div>
            </div>
          </div>

        
       
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
