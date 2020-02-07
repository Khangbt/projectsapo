import React, { Component } from 'react';
import '../../App.css'
import { Link } from 'react-router-dom';
import product from '../../Data/Product'

class ProductList extends Component {

  componentDidMount() {
    document.title = 'Danh sách sản phẩm';
  }
 
  render() {
    
      let elements = product.map((value, key) => {
        return <tr >
          <td id={value.id}>{key}</td>
          <td>no image</td>
          <td><Link to = {'/product/id='+value.id}  title={value.nameProduct} style ={{color : 'black',cursor: 'pointer'}}> {value.nameProduct}</Link></td>
          <td>{value.codeProduct}</td>
          <td>{value.inventory}</td>
          <td>{value.costProduct} đồng</td>
          <td>{value.create_date}</td>
        </tr>
      })
    
    
    return (
      <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '5px', marginTop: '20px' }}>
        <div className="d-flex justify-content-between" >
        <h3 className="page-title">Quản lý sản phẩm <Link to='/product/add'>
         <button type="button" className="btn btn-primary">Thêm sản phẩm</button></Link> </h3>
        
        </div>
       

        <div className="portlet box green-meadow">
          <div className="title-product"><h5>Danh sách sản phẩm</h5></div>
          <div className="portlet-body">
            <div className="table-responsive">
              <div id="news-grid" className="grid-view">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Hình đại diện</th>
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductList;
