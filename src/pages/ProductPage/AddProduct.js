import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class AddProduct extends Component {
    render() {
        return (
            <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '5px', marginTop: '20px' }}>
                <h3 className="page-title" style={{ marginBottom: '20px' }}>Thêm mới sản phẩm</h3>
                <div className="portlet box green-meadow">
                    <div className="portlet-title">
                        <div className="caption">Thêm sản phẩm mới</div>
                    </div>
                    <div className="portlet-body">
                        <div className="col-xs-6">
                    <form onSubmit={this.onHandleSubmit}>
                        <div className="form-group">
                            <label>Tên sản phẩm : </label>
                            <input type="text" className="form-control" name="nameProduct" onChange={this.onChange} required/>
                            <label>Mã sản phẩm : </label>
                            <input type="number" className="form-control" name="codeProduct" onChange={this.onChange} required />
                            <label>Số lượng tồn : </label>
                            <input type="number" className="form-control" name="inventory" onChange={this.onChange} />
                            <label>Giá bán : </label>
                            <input type="number" className="form-control" name="costProduct" onChange={this.onChange} />
                            <label>Mô tả sản phẩm : </label>
                            <textarea row='3' className="form-control" name="descriptionProduct" onChange={this.onChange} />
                        </div>
                        <Link to ="/product"><button type="submit" className="btn btn-danger"> Quay lại</button></Link>&nbsp;
                    <button type="submit" className="btn btn-success" >
                            Save</button>
                    </form>
                  
                </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default AddProduct;