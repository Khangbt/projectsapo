import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Payment from '../../Data/PaymentMethod.json'
import AddCustomer from './AddCustomer';
import Swal from 'sweetalert2';
import NumberFormat from 'react-number-format';


class Sale extends Component {
  constructor() {
    super();
    this._initState = {
      listproduct: [],
      listOrder: [],
      guest: null,
      showModalAddGuest: false,
      showModalOrder: false,  
      citys: "",
      listGuest: [],
      currentGuest : null,
      currentGuestName: "",
      currentGuestPhone : null,
      pays: Payment,
      checkClickCustomer: false,
      textSearchGuest: "",
      totalItemsCount: 100,
      unPay: 0,
      pay: 0,
      totalPay: 0,
      paymentID: 1,
    }
    this.state = this._initState

  }

  fetchURLSearchGuest(textSearch) {
    axios.get(`http://localhost:8291/searchcustomer?mailOrSdt=${textSearch}&page=0&size=${this.state.totalItemsCount}`)
      .then(response => {
        const results = response.data.content;
        this.setState({ listGuest: results });
      }
      ).catch(error => console.log(error));
  }


  fetchURLSearchProduct(textSearch) {
    axios.get(`http://localhost:8291/sreachproduct?name=${textSearch}`)
      .then(response => {
        const results = response.data;
        this.setState({ listproduct: results });
      }
      ).catch(error => console.log(error));
  }


  thanhToan = (event) => {
    if (this.state.pay < this.state.totalPay || this.state.pay === 0) {
      this.setState({
        showMess: true
      })
    } else {
     
      var order = {
        "idCustomer": this.state.currentGuest.idCustomer,
        "totalAmount": this.state.totalPay,
        "amountPaid": parseInt(this.state.pay),
        "unpaidAmount": this.state.unPay,
        "idPaymentMethods": parseInt(this.state.paymentID),
        "salesboarDtos": this.state.listOrder
      }
     
      axios({
        method: 'post',
        url: 'http://localhost:8291/setorder',
        data: order
      })
        .then(res => {
          Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
          })
            .fire({
              icon: 'success',
              title: 'Thanh toán thành công'
            })
          this.setState(this._initState)
        })
        .catch(function (error) {
          Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
          })
            .fire({
              icon: 'error',
              title: 'Thanh toán không thành công'
            })

        });

    }
  }


  changePay = () => {
  
    if (this.state.pay < this.state.totalPay)
      this.setState({
        showMess: true
      })
    else {
  
      this.setState({
        unPay: Math.abs(this.state.totalPay - this.state.pay),
        showMess: false
      })
    }
 
    if (this.state.pay === "")
      this.setState({
        unPay: 0
      })
  }

  totalPayOrder() {
    var total = 0
    for (var i = 0; i < this.state.listOrder.length; i++) {
      total = total + this.state.listOrder[i].amount * this.state.listOrder[i].price
     
    }
    this.setState({
      totalPay: total
    })
  }

  changePaymentMethod = (event) => {
    this.setState({
      paymentID: event.target.value
    })
  }

  searchByName = (event) => {
    let valname = event.target.value
    if (valname !== "")
      this.fetchURLSearchProduct(valname)
    else this.setState({
      listproduct: []
    })

  }

  searchGuest = (event) => {
    let val = event.target.value
   
    if (val !== "")
      this.fetchURLSearchGuest(val)
    else this.setState({
      listGuest: [],
      checkClickCustomer : false
    })
  }

  showModal = (name , phone) => {
  
    this.setState({
      // currentGuest : newCustomer,
      showModalAddGuest: !this.state.showModalAddGuest
    })
    if(typeof(name) === "string"){
      this.setState({
        currentGuestName : name,
        currentGuestPhone : phone,
        checkClickCustomer : true
      })
    }
  }

  closeAddGuest = (bool) => {
    if(bool){
      this.setState({
        showModalAddGuest : false,
        checkClickCustomer : false

      })
    }
  }

  showMessThanhToan = () => {
    this.setState({
      messThanhToan: false
    })
  }

  showModalOrder = () => {

    if(this.state.listOrder.length===0){
       Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
          })
            .fire({
              icon: 'error',
              title: 'Thêm sản phẩm vào đơn hàng'
            })

    }
    else if(!this.state.checkClickCustomer){
      Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
          })
            .fire({
              icon: 'error',
              title: 'Thêm khách hàng vào đơn'
            })
    }
    else{
      this.totalPayOrder()
      this.setState({
        showModalOrder: !this.state.showModalOrder
      })
    }
  }



  choseGuest(value) {
    this.setState({
      currentGuest : value,
      checkClickCustomer: true,
      currentGuestName: value.nameCustomer,
      currentGuestPhone : value.phoneNumber,
      listGuest: []
    })
  }

  removeCustomer = () => {
    this.setState({
      checkClickCustomer: false
    })
  }

  addOrder = (productById) => {
    var listOrder = this.state.listOrder.filter((order) => order.idProduct === productById.idProduct)
   
    if (productById.inventoryNumber === 0||productById.inventoryNumber===null) {
       Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
          })
            .fire({
              icon: 'error',
              title: 'không đủ số lượng'
            })
    }
    else if (listOrder.length === 0) {
      this.setState(prevState => ({
        listOrder: prevState.listOrder.concat({
          idProduct: productById.idProduct,
          nameProduct: productById.nameProduct,
          amount: 1,
          inventoryNumber: productById.inventoryNumber,
          price: productById.price
        })
      }))
    }
    else {
      for (var i = 0; i < this.state.listOrder.length; i++) {
        if (this.state.listOrder[i].idProduct === productById.idProduct) {
          this.increasequantity(productById, i)
        }
      }
    }

  }
  removeOrder = () => {
    this.setState({
      listOrder: []
    })
  }
  increasequantity = (orderById, key) => {

    var order = this.state.listOrder.filter((order) => order.idProduct === orderById.idProduct)[0]
   
    var listOrder = this.state.listOrder
    if (listOrder[key].amount < orderById.inventoryNumber) {
      listOrder[key].amount = order.amount + 1
    } else {
      Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
          })
            .fire({
              icon: 'error',
              title: 'không đủ số lượng'
            })
    }


    this.setState({
      listOrder: listOrder
    })
  }
  decreasequantity = (id, key) => {
    var order = this.state.listOrder.filter((order) => order.idProduct === id)[0]
    var listOrder = this.state.listOrder
    listOrder[key].amount = order.amount - 1
    this.setState({
      listOrder: listOrder
    })
    var list = this.state.listOrder.filter((order) => order.amount > 0)
    this.setState({
      listOrder: list
    })
  }
  deleteProductOrder = (id, key) => {
    var listOrder = this.state.listOrder
    listOrder[key].amount = 0
    this.setState({
      listOrder: listOrder
    })
    var list = this.state.listOrder.filter((order) => order.amount > 0)
    this.setState({
      listOrder: list
    })
  }

  maxLengthCheck = (event) => {
    if (event.target.value.length > event.target.maxLength)
        event.target.value = event.target.value.slice(0, event.target.maxLength)
}

  render() {


   
    let listproductsearch = this.state.listproduct.map((value, key) => {
      return <tr title="add to order" onClick={() => this.addOrder(value, value.id)} style={{ cursor: 'pointer' }} >
        <td width="30%">{value.nameProduct}</td>
        <td>{value.productCode}</td>
        <td>{value.inventoryNumber === null ? 0 : value.inventoryNumber}</td>
        <td>{value.price === null ? 0 : value.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>

      </tr>
    })

    let order = this.state.listOrder.map((value, key) => {
      let costPrice = value.price * value.amount
      return <tr>
        <td>{value.nameProduct}</td>
        <td><button type="submit" className="btn btn-default" onClick={() => this.increasequantity(value, key)}>+</button>{value.amount}
          <button type="submit" className="btn btn-default" onClick={() => this.decreasequantity(value.idProduct, key)}>-</button></td>
        <td>{value.price === null ? 0 : value.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
        <td>{costPrice === null ? 0 : costPrice.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
        <td style={{ cursor: 'pointer' }} onClick={() => this.deleteProductOrder(value.idProduct, key)}>
          <i className="fas fa-trash-alt" ></i>
        </td>

      </tr>
    })

    let guests = this.state.listGuest.map((value, key) => {
      return (
        <li className="list-group-item" onClick={() => this.choseGuest(value)}>{value.nameCustomer} (0{value.phoneNumber})</li>
      )
    })


    let listPay = this.state.pays.map((pay) => {
      return (
        <option value={pay.id}>{pay.name}</option>
      )
    })
    return (
      <div className="col-md-12 home">
        <div className="row main">
          <div className="col-md-6 homeleft">
            {!this.state.checkClickCustomer && (
              <div className="input-group">
                <input
                  className="search-customer"
                  type="text"
                  placeholder="Tìm kiếm khách hàng"
                  aria-label="Search"
                  onKeyUp={this.searchGuest}
                />
                <div className="input-group-prepend add-customer">
                  <button className="" onClick={this.showModal}>
                    <i className="fa fa-user-plus" ></i>
                  </button>
                </div>
              </div>
            )}
            {!this.state.checkClickCustomer && (
              <div className="cover">
                <div className="card dsguest">
                  <ul className="list-group list-group-flush">{guests}</ul>
                </div>
              </div>
            )}

            {this.state.checkClickCustomer && (
              <div
                className="d-flex justify-content-between chooseGuest"
              >
                <div>
                  <i className="fas fa-user"></i> <span><b>{this.state.currentGuestName} </b>:0{parseInt(this.state.currentGuestPhone)}</span>
                </div>
                <div>
                  <button
                    className="btn btn-danger btndeleteguest"
                    onClick={this.removeCustomer}
                  >
                    X
                  </button>
                </div>
              </div>
            )}
            <div className="list-order">
              <table
                className="table table-hover tableorder"
                style={{ marginTop: "22px" }}
              >
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá(VND)</th>
                    <th>Tổng(VND)</th>
                  </tr>
                </thead>
                <tbody>{order}</tbody>
              </table>
              {/* custom thanh srcollbar */}
              <div className="force-overflow"></div>
            </div>

            <div className="row text-center group-btn btnThanhToan">
              <button className="button-cancel" onClick={this.removeOrder}>
                Hủy đơn
              </button>
              &nbsp;
              <button className="button-confirm" onClick={this.showModalOrder}>
                Xác nhận
              </button>
            </div>
          </div>

          <div className="col-md-6 homeright">
            <input
              className="search-product"
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              aria-label="Search"
              onKeyUp={this.searchByName}
            />
            <div className="list-search">
              <table
                className="table table-hover listproductsearch"
                style={{ marginTop: "22px" }}
              >
                <thead>
                  <tr>
                    <th width="30%">Tên sản phẩm </th>
                    <th>Mã sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá(VND)</th>
                  </tr>
                </thead>
                <tbody>{listproductsearch}</tbody>
              </table>
              {/* custom thanh srcollbar */}
              <div className="force-overflow"></div>
            </div>
          </div>
        </div>


        <AddCustomer showModalAddGuest={this.state.showModalAddGuest} showModal={this.showModal} closeAddGuest = {this.closeAddGuest}/>

        <Modal show={this.state.showModalOrder}>
          <Modal.Header>
            <Modal.Title> Thanh toán </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              Tổng hóa đơn: {this.state.totalPay.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VND
              <br />
              <br />
              Tiền khách trả:{this.state.showMess && <i style={{ "color": "red" }}>thanh toán thiếu tiền</i>}
              {/* <input className="form-control" placeholder="" type="number" onChange={this.changePay} /> */}
              <NumberFormat className ="form-control"  maxLength="17" onInput={this.maxLengthCheck} onKeyUp={this.changePay} thousandSeparator={true} onValueChange={(values) => {const { value} = values;
                                                       this.setState({pay: value})
                                                                                    }} />
              <br />
              Tiền khách thừa:
              <NumberFormat className ="form-control"  thousandSeparator={true} disabled value={this.state.unPay} />
              <br />
              phương thức thanh toán:
              <select value={this.state.paymentID} onChange={this.changePaymentMethod} className="form-control">{listPay}</select>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.showModalOrder}>
              Hủy
            </Button>
            <Button variant="primary" onClick={this.thanhToan}>Thanh toán</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Sale;
