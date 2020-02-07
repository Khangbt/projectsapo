import React, { Component } from 'react';
import product from '../../Data/Product';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Guest from '../../Data/Customer'


class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      listproduct: [],
      listOrder: [],
      guest: null,
      showModalAddGuest: false,
      showModalOrder: false,
      citys: "",
      listGuest: [],
      currentGuest: null,
      pays: ["a", "b", "c"],
      checkClickCustomer: false
    }

  }


  searchByName = (event) => {
    let valname = event.target.value
    if (valname !== "")
      this.setState({
        listproduct: product
      })
    else this.setState({
      listproduct: []
    })

  }

  searchGuest = (event) => {
    let val = event.target.value
    if (val !== "")
      this.setState({
        listGuest: Guest
      })
    else this.setState({
      listGuest: []
    })
  }

  showModal = () => {
    this.setState({
      showModalAddGuest: !this.state.showModalAddGuest
    })
  }

  showModalOrder = () => {
    this.setState({
      showModalOrder: !this.state.showModalOrder
    })
  }

  choseGuest(value) {
    this.setState({
      checkClickCustomer: true,
      currentGuest: value,
      listGuest: []
    })
  }

  removeCustomer = () => {
    this.setState({
      checkClickCustomer: false
    })
  }

  addOrder = (productById) => {
    var listOrder = this.state.listOrder.filter((order)=> order.id===productById.id)
    if(listOrder.length === 0){
      this.setState(prevState => ({
        listOrder: prevState.listOrder.concat({
          id: productById.id,
          nameProduct : productById.nameProduct,
          quantity: 1,
          inventory : productById.inventory,
          costProduct : productById.costProduct
        })
      }))
    }
    else{
        for(var i = 0; i < this.state.listOrder.length; i++){
          if(this.state.listOrder[i].id===productById.id){
            this.increasequantity(productById,i)
          }
        }
    }
    
  }
  removeOrder = () => {
    this.setState({
      listOrder: []
    })
  }
  increasequantity = (orderById,key) => {
  
    var order = this.state.listOrder.filter((order)=> order.id === orderById.id)[0]
    
    var listOrder = this.state.listOrder
    if(listOrder[key].quantity < orderById.inventory){
      listOrder[key].quantity = order.quantity + 1
    }else{
      alert("không đủ số lượng")
    }
    
   
    this.setState({
      listOrder : listOrder
    })
  }
  decreasequantity = (id,key) => {
    var order = this.state.listOrder.filter((order)=> order.id === id)[0]
    var listOrder = this.state.listOrder
    listOrder[key].quantity = order.quantity - 1
    this.setState({
      listOrder : listOrder
    })
    var list = this.state.listOrder.filter((order) => order.quantity > 0)
    this.setState({
      listOrder : list
    })
  }
  render() {
    console.log("listorder", this.state.listOrder)
    let listproductsearch = this.state.listproduct.map((value, key) => {
      return <tr title="add to order" onClick={() => this.addOrder(value, value.id)} style={{ cursor: 'pointer' }} >
        <td>{key}</td>
        <td>{value.nameProduct}</td>
        <td>{value.codeProduct}</td>
        <td>{value.inventory}</td>
        <td>{value.costProduct}</td>
      </tr>
    })

    let order = this.state.listOrder.map((value, key) => {
      return <tr>
        <td>{value.nameProduct}</td>
        <td><button type="submit" className="btn btn-default" onClick={() => this.increasequantity(value, key)}>+</button>{value.quantity}
          <button type="submit" className="btn btn-default" onClick={() => this.decreasequantity(value.id,key)}>-</button></td>
        <td>{value.costProduct}</td>
        <td>{value.costProduct * value.quantity}</td>


      </tr>
    })

    let guests = this.state.listGuest.map((value, key) => {
      return (
        <li className="list-group-item" onClick={() => this.choseGuest(value)}>{value.nameCustomer} ({value.phoneNumber})</li>
      )
    })

    let listPay = this.state.pays.map((pay) => {
      return (
        <option>{pay}</option>
      )
    })
    return (
      <div className="col-md-12 home" style={{ marginBottom: '5px', marginTop: '20px' }}>
        <div className="row" style={{ marginTop: '22px' }}>
          <div className="col-md-6 homeleft" >
            {!this.state.checkClickCustomer &&
              <div className="input-group">
                <input className="form-control" type="text" placeholder="Search by name or phone" aria-label="Search" onKeyUp={this.searchGuest} />
                <div className="input-group-prepend">
                  <button className="btn btn-primary" onClick={this.showModal} ><span>add</span></button>
                </div>
              </div>
            }
            {
              !this.state.checkClickCustomer &&
              <div className="card dsguest" >
                <ul className="list-group list-group-flush">
                  {guests}
                </ul>
              </div>
            }

            {this.state.checkClickCustomer &&
              <div style={{ borderStyle: 'groove' }} className="d-flex justify-content-between">
                <div>
                  <div><b> Tên khách hàng : {this.state.currentGuest.nameCustomer}</b></div>
                  <div><b> Số điện thoại : {this.state.currentGuest.phoneNumber}</b></div>
                </div>
                <div><button className="btn btn-danger" onClick={this.removeCustomer}  >X</button></div>
              </div>
            }
            <table className="table table-hover tableorder" style={{ marginTop: '22px' }}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order}
              </tbody>
            </table>
            <div className="row text-center">
              <button className="btn btn-danger btn-lg" onClick={this.removeOrder}>cancel</button>&nbsp;
              <button className="btn btn-primary btn-lg" onClick={this.showModalOrder}>order</button>
            </div>
          </div>

          <div className="col-md-6 homeright">
            <input className="form-control" type="text" placeholder="Search product by name" aria-label="Search" onKeyUp={this.searchByName} />

            <table className="table table-hover listproductsearch" style={{ marginTop: '22px' }}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>nameProduct</th>
                  <th>codeProduct</th>
                  <th>inventory</th>
                  <th>price</th>
                </tr>
              </thead>
              <tbody>
                {listproductsearch}
              </tbody>
            </table>
          </div>
        </div>


        <Modal show={this.state.showModalAddGuest} >
          <Modal.Header >
            <Modal.Title>add new guest</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form >
              <input className="form-control" placeholder="input name" r />
              <input className="form-control" placeholder="input sdt" />
              <input className="form-control" placeholder="input email" />
              <input className="form-control" placeholder="địa chỉ" />
              <input className="form-control" placeholder="tỉnh/thành phố" />
              <input className="form-control" placeholder="quận" />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.showModal}>
              Close
            </Button>
            <Button variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showModalOrder} >
          <Modal.Header >
            <Modal.Title>order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form >
              Tổng hóa đơn: 10000<br /><br />
              Tiền khách trả:
              <input className="form-control" placeholder="" /><br />
              Tiền khách thừa:
              <input className="form-control" placeholder="" disabled /><br />
              phương thức thanh toán:
              <select className="form-control">
                {listPay}
              </select>

            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.showModalOrder}>
              Close
            </Button>
            <Button variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Modal>


      </div>
    )
  }
}

export default HomePage;
