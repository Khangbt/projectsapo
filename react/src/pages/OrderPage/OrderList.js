import React, { Component } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import NumberFormat from "react-number-format";
import Pagination from "react-js-pagination";
import moment from "moment";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOrder: [],
      activePage: 1,
      totalPages: null,
      itemsCountPerPage: null,
      totalItemsCount: null,
      textSearch: ''
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.fetchURL = this.fetchURL.bind(this);
  }
  fetchURL(page) {
    axios
      .get(`http://localhost:8291/orders?page=${page - 1}&size=10`)
      .then(response => {
        const totalPages = response.data.totalPages;
        const itemsCountPerPage = response.data.size;
        const totalItemsCount = response.data.totalElements;

        this.setState({ totalPages: totalPages });
        this.setState({ totalItemsCount: totalItemsCount });
        this.setState({ itemsCountPerPage: itemsCountPerPage });

        const results = response.data.content;
        this.setState({ listOrder: results });
      });
  }

  handlePageChange(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    this.fetchURL(pageNumber);
  }

  onChange = event => {
    this.setState({
      textSearch: event.target.value.toLowerCase(),
      acb: event.target.value
    });
    
  };
  componentDidMount() {
    document.title = "Danh sách đơn hàng";
    this.fetchURL(this.state.activePage);
  }

  render() {
    // console.log(this.state.textSearch);
    const {listOrder} = this.state;

    let elementListOrder = listOrder.filter((order, key) => {
      return order.nameCustomer.toLowerCase()
      .indexOf(this.state.textSearch) !== -1 || order.phoneNumber.toString()
      .indexOf(this.state.textSearch) !== -1
    })
    .map((value, key) => {
      return <tr key = {key}>
        <td ><Link to ={"/order/id="+value.idOrder} style ={{color : 'black',cursor: 'pointer'}}>{value.nameCustomer}</Link></td>
        <td> <NumberFormat value = {value.phoneNumber} displayType={'text'} format=" 0## ### ####" /></td>
        <td> <NumberFormat value={value.totalAmount} displayType={'text'} thousandSeparator={true} /> VNĐ</td>
        <td> <NumberFormat value={value.amountPaid} displayType={'text'} thousandSeparator={true} /> VNĐ</td>
        <td> <NumberFormat value={value.unpaidAmount} displayType={'text'} thousandSeparator={true} /> VNĐ</td>
        <td>{moment(value.dateSale).format("MMMM Do YYYY, h:mm:ss a")}</td>
      </tr>
    })
    return (
      <div
        className="col-md-12 col-sm-12 col-xs-12"
        style={{ marginBottom: "5px", marginTop: "20px" }}
      >
        <h3 className="page-title" style={{ marginBottom: "20px" }}>
          Quản lý đơn hàng
        </h3>
        <input
          type="text"
          className="search-order"
          placeholder="Tìm kiếm đơn hàng theo tên KH hoặc số điện thoại"
          name="textSearch"
          onChange={this.onChange}
        />
        <div className="portlet box green-meadow">
          <div className="title-product ">
            <h5>Danh sách đơn hàng</h5>
          </div>
          <div className="portlet-body">
            <div className="table-responsive">
              <div id="news-grid" className="grid-view">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Tên khách hàng</th>
                      <th>SĐT khách hàng</th>
                      <th>Tổng tiền hàng</th>
                      <th>Tiền khách đã trả</th>
                      <th>Tiền thừa trả khách</th>
                      <th>Thời gian tạo đơn</th>
                    </tr>
                  </thead>
                  <tbody>{elementListOrder}</tbody>
                </table>
              </div>
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
            linkClass="btn btn-light"
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default OrderList;
