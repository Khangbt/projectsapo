import React, { Component } from 'react';
import customers from '../../Data/Customer'
import '../../App.css'
import { Link } from 'react-router-dom';
class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: ''
    }
  }

  onChange = (event) => {
    this.setState({
      textSearch: event.target.value.toLowerCase()
    })
    console.log(this.state.textSearch)
  }

  render() {


    let elements = customers.filter((customer) => {
      return customer.nameCustomer.toLowerCase().indexOf(this.state.textSearch) !== -1 || customer.phoneNumber.toString().indexOf(this.state.textSearch) !== -1
    }).map((value) => {
      return <tr>
        <td>{value.nameCustomer}</td>
        <td>{value.phoneNumber}</td>
        <td>{value.email}</td>
        <td>{value.address}</td>
        <td>{value.province}</td>
        <td>{value.district}</td>
        <td>< Link to = {'/customer/id='+value.id}><button className="btn btn-info">chi tiết</button></Link></td>
          <td><Link to ={'/customer/edit/id='+value.id}><button className="btn btn-warning">cập nhật</button></Link></td>
      </tr>
    })


    return (
      <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '5px', marginTop: '20px' }}>
        <h3 className="page-title" style={{ marginBottom: '20px' }}>Quản lý khách hàng</h3>

        <div className="portlet box green-meadow">
          <div className="portlet-title">
            <div className="caption">Danh sách khách hàng</div>
            <div className="col-md-3 col-sm-3 col-xs-3">
              <i className="fas fa-search" aria-hidden="true"></i>
              <input type="text" className="form-control" name="textSearch" onChange={this.onChange} />
            </div>
          </div>
          <div className="portlet-body">
            <div className="table-responsive">
              <div id="news-grid" className="grid-view">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Tên khách hàng</th>
                      <th>Số điện thoại</th>
                      <th>Email</th>
                      <th>Địa chỉ</th>
                      <th>Tỉnh / Thành phố</th>
                      <th>Quận / huyện</th>
                      <th>Chi tiết</th>
                      <th>Cập nhật</th>
                    </tr>
                  </thead>
                  <tbody>
                    {elements}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CustomerList;
