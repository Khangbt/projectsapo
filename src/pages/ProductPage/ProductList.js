import React, { Component } from 'react';
import '../../App.css'
import { Link } from 'react-router-dom';
import product from '../../Data/Product'

class ProductList extends Component {

  Detail = (e)=> {
    console.log("ácdfad",e)
    return < Link to = {'/product/id='+e}></Link>
  }
 
  render() {
      console.log("aaaabbb",product)
      let elements = product.map((value, key) => {
        return <tr  onClick={() => this.Detail(value.id)}>
          <td id={value.id}>{key}</td>
          <td>no image</td>
          <td>{value.nameProduct}</td>
          <td>{value.codeProduct}</td>
          <td>{value.inventory}</td>
          <td>{value.costProduct} đồng</td>
          <td>{value.create_date}</td>
          <td>< Link to = {'/product/id='+value.id}><button className="btn btn-info">chi tiết</button></Link></td>
          <td><Link to ={'/product/edit/id='+value.id}><button className="btn btn-warning">cập nhật</button></Link></td>
          <td><button className="btn btn-danger">xóa</button></td>
        </tr>
      })
    
    
    return (
      <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '5px', marginTop: '20px' }}>
        <h3 className="page-title" style={{ marginBottom: '20px' }}>Quản lý sản phẩm <Link to='/product/add'><button type="button" className="btn btn-success">Tạo mới</button></Link></h3>

        <div className="portlet box green-meadow">
          <div className="portlet-title">
            <div className="caption">Danh sách sản phẩm</div>
           
          </div>
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
                      <th>Chi tiết</th>
                      <th>Cập nhật</th>
                      <th>Xóa</th></tr>
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
