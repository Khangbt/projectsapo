import React, { Component } from 'react';
import product from '../../Data/Product';
import Head from '../../Menu/Head';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Guest from '../../Data/Customer'


class Sale extends Component {
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
      pays: ["a", "b", "c"]
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
      currentGuest: value
    })
  }
  render() {

    let listproductsearch = this.state.listproduct.map((value, key) => {
      return <tr title="add to order" style={{ cursor: 'pointer' }}>
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
        <td>1</td>
        <td>{value.codeProduct}</td>
        <td>{value.costProduct}</td>
      </tr>
    })

    let guests = this.state.listGuest.map((value, key) => {
      return (
        <li class="list-group-item" onClick={() => this.choseGuest(value)}>{value.name} ({value.sdt})</li>
      )
    })

    let listPay = this.state.pays.map((pay) => {
      return (
        <option>{pay}</option>
      )
    })
    return (
      <div className="col-md-12 home" style={{ marginBottom: '5px', marginTop: '20px' }}>
        <Head/>
        <div className="row">
          <div className="col-md-6 homeleft">
            <div className="input-group">
              <input className="form-control" type="text" placeholder="Search by name or phone" aria-label="Search" onKeyUp={this.searchGuest} />
              <div class="input-group-prepend">
                <button className="btn btn-primary" onClick={this.showModal} ><span>add</span></button>
              </div>
            </div>
            <div class="card dsguest" >
              <ul class="list-group list-group-flush">
                {this.state.currentGuest}
                {guests}
              </ul>

            </div>
            <table className="table table-hover tableorder" >
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Total</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {order}
              </tbody>
            </table>
            <div className="row text-center">
              <button className="btn btn-danger btn-lg">cancel</button>
              <button className="btn btn-primary btn-lg" onClick={this.showModalOrder}>order</button>
            </div>
          </div>

          <div className="col-md-6 homeright">
            <input className="form-control" type="text" placeholder="Search product by name" aria-label="Search" onKeyUp={this.searchByName} />

            <table className="table table-hover listproductsearch" >
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

export default Sale;
