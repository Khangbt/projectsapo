import React, { Component } from 'react';
import '../../App.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
      listCus: [],
      activePage:1,
      totalPages: null,
      itemsCountPerPage:null,
      totalItemsCount:null
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.fetchURL = this.fetchURL.bind(this);
  }
  fetchURL(page) {

    axios.get(`http://localhost:8291/customers?page=${page-1}&size=1`)
      .then( response => {
          const totalPages = response.data.totalPages;
          const itemsCountPerPage = response.data.size;
          const totalItemsCount = response.data.totalElements;

          this.setState({totalPages: totalPages})
          this.setState({totalItemsCount: totalItemsCount})
          this.setState({itemsCountPerPage: itemsCountPerPage})

          const results = response.data.content;
          this.setState({listCus: results});
        }
      )
    }


handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber})
    this.fetchURL(pageNumber)

    }

  onChange = (event) => {
    this.setState({
      textSearch: event.target.value.toLowerCase()
    })
    console.log(typeof (this.state.textSearch))
  }

  componentDidMount(){
    document.title = "Danh sách khách hàng"
    this.fetchURL(this.state.activePage)
  }

  render() {
    let elements = this.state.listCus.filter((customer) => {
      return customer.nameCustomer.toLowerCase().indexOf(this.state.textSearch) !== -1 || customer.phoneNumber.toString().indexOf(this.state.textSearch) !== -1
    }).map((value) => {
      return <tr>
        <td><Link to ={"/customer/id="+value.id} style ={{color : 'black',cursor: 'pointer'}}>{value.nameCustomer}</Link></td>
        <td>{value.phoneNumber}</td>
        <td>{value.email}</td>
        <td>{value.address}</td>
        <td>{value.city}</td>
        <td>{value.district}</td>
      </tr>
    })
    return (
      <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '5px', marginTop: '20px' }}>
        <h3 className="page-title" style={{ marginBottom: '20px' }}>Quản lý khách hàng</h3>

        <div className="portlet box green-meadow">
          <div className="title-product d-flex justify-content-between"><h5>Danh sách khách hàng</h5>
            <div className="col-md-3 col-sm-3 col-xs-3">
              <i className="fas fa-search" aria-hidden="true"></i>
              <input type="text" className="form-control" placeholder="Tìm kiếm khách hàng..." name="textSearch" onChange={this.onChange} />
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
                    </tr>
                  </thead>
                  <tbody>
                    {elements}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
           <div className="d-flex justify-content-left">
            <Pagination
             hideDisabled
             activePage={this.state.activePage}
             itemsCountPerPage={this.state.itemsCountPerPage}
             totalItemsCount={this.state.totalItemsCount}
             pageRangeDisplayed={5}
             linkClass='btn btn-light'
             onChange={this.handlePageChange}
             />
         </div>
        </div>
      </div>
    )
  }
}

export default CustomerList;
