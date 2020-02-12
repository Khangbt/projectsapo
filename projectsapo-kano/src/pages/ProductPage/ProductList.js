import React, { Component } from 'react';
import '../../App.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";
import DetailProduct from './DetailProduct';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
      checkTextSearch: true,
      listProducts: [],
      activePage: 1,
      totalPages: null,
      itemsCountPerPage: 10,
      totalItemsCount: null,

    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.fetchURL = this.fetchURL.bind(this);
  }

  fetchURL(page) {
    axios.get(`http://localhost:8291/products?page=${page - 1}&size=${this.state.itemsCountPerPage}`)
      .then(response => {
        const totalPages = response.data.totalPages;
        const itemsCountPerPage = response.data.size;
        const totalItemsCount = response.data.totalElements;

        this.setState({ totalPages: totalPages })
        this.setState({ totalItemsCount: totalItemsCount })
        this.setState({ itemsCountPerPage: itemsCountPerPage })

        const results = response.data.content;
        this.setState({ listProducts: results });
      }
      )
  }

  fetchURLSearch(textSearch) {
    axios.get(`http://localhost:8291/sreachproduct?name=${textSearch}`)
      .then(response => {
        console.log("có ko", response)
        const results = response.data;
        this.setState({ listProducts: results });
        this.setState({ totalPages: 0 })
      }
      )
  }


  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber })
    this.fetchURL(pageNumber)

  }

  changeSize = (event) =>{
    this.setState({
      itemsCountPerPage:event.target.value
    })
  }

  onChange = (event) => {

    this.setState({
      textSearch: event.target.value.toLowerCase()
    })
    if (event.target.value !== "")
      this.setState({
        checkTextSearch: false
      })
    else
      this.setState({
        checkTextSearch : true
      })

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.textSearch !== this.state.textSearch) {
      if (this.state.textSearch === "")
        this.fetchURL(0)
      else this.fetchURLSearch(this.state.textSearch)

    }
    if (prevState.itemsCountPerPage !== this.state.itemsCountPerPage) {
      this.fetchURL(0)
    }

  }

  componentDidMount() {
    document.title = 'Danh sách sản phẩm';
    this.fetchURL(this.state.activePage);

  }

  render() {
    let elements = this.state.listProducts.map((value, key) => {
      const date = new Date(value.dateCreated).toLocaleString();
      return <tr>
        <td><Link to={'/product/id=' + value.idProduct} title={value.nameProduct} style={{ cursor: 'pointer' }}> {value.nameProduct}</Link></td>
        <td>{value.productCode}</td>
        <td>{value.inventoryNumber === null ? 0 : value.inventoryNumber}</td>
        <td>{value.price === null ? 0 : value.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VNĐ</td>
        <td>{date}</td>
      </tr>
    })


    return (


      <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '5px', marginTop: '20px' }}>
        {this.state.checkClickProduct && <DetailProduct />}
        <div className="d-flex justify-content-between" >
          <h3 className="page-title">Quản lý sản phẩm <Link to='/product/add'>
            <button type="button" className="btn btn-primary">Thêm sản phẩm</button></Link> </h3>
        </div>


        <div className="portlet box green-meadow">
          <div className="title-product d-flex justify-content-between "><h5>Danh sách sản phẩm</h5>
            <div className="col-md-3 col-sm-3 col-xs-3">
              <i className="fas fa-search" aria-hidden="true"></i>
              <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm..." name="textSearch" onChange={this.onChange} />
            </div>
          </div>
          {this.state.checkTextSearch&&
          <div className="d-flex justify-content-left showEntity">
            <span>Hiển thị</span> 
            <select onChange={this.changeSize}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span>Kết quả</span>
          </div>
            }
          <div className="portlet-body">
            <div className="table-responsive">
              <div id="news-grid" className="grid-view">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>Mã sản phẩm</th>
                      <th>Số lượng tồn</th>
                      <th>Giá bán</th>
                      <th>Ngày tạo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {elements}
                  </tbody>
                </table>
              </div>
              {this.state.checkTextSearch &&
                <div className="d-flex justify-content-left">
                  <Pagination
                    hideDisabled
                    prevPageText='prev'
                    nextPageText='next'
                    firstPageText='first'
                    lastPageText='last'
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.state.totalItemsCount}
                    pageRangeDisplayed={5}
                    linkClass='btn btn-light'
                    onChange={this.handlePageChange}
                  />
                </div>
              }
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default ProductList;
