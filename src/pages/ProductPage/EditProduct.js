import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import products from '../../Data/Product'
class EditProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            productEdit : products.filter(product => product.id===parseInt(this.props.match.params.id))[0]
        }
    }
    
    
    render() {    
         console.log("abc",this.state.productEdit)
        return (
            <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '5px', marginTop: '20px' }}>
                <h3 className="page-title" style={{ marginBottom: '20px' }}>Cập nhật sản phẩm</h3>
                <div className="portlet box green-meadow">
                    <div className="portlet-title">
                        <div className="caption">Cập nhật sản phẩm</div>
                    </div>
                    <div className="portlet-body">
                        <div className="col-xs-6">
                    <form onSubmit={this.onHandleSubmit}>
                    <div className="form-group">
                            <label>Tên sản phẩm : </label>
                            <input type="text" className="form-control" name="nameProduct" defaultValue={this.state.productEdit.nameProduct} onChange={this.onChange} required/>
                            <label>Mã sản phẩm : </label>
                            <input type="text" className="form-control" name="codeProduct" defaultValue={this.state.productEdit.codeProduct} onChange={this.onChange} required />
                            <label>Số lượng tồn : </label>
                            <input type="number" className="form-control" name="inventory" defaultValue={this.state.productEdit.inventory} onChange={this.onChange} />
                            <label>Giá bán : </label>
                            <input type="number" className="form-control" name="costProduct" defaultValue={this.state.productEdit.costProduct} onChange={this.onChange} />
                            <label>Mô tả sản phẩm : </label>
                            <textarea row='3' className="form-control" name="descriptionProduct" onChange={this.onChange} />
                        </div>
                        <Link to ="/product"><button type="submit" className="btn btn-danger"> Quay lại</button></Link>&nbsp;
                    <button type="submit" className="btn btn-success" >
                            Cập nhật</button>
                    </form>

                </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default EditProduct;