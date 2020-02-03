import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class DetailCustomer extends Component {
    constructor(props){
        super(props);
        this.state = {
            // customerEdit : customers.filter(customer => customer.id===parseInt(this.props.match.params.id))[0]
            customerEdit : ""
            
        }
    }
    
    
    render() {    
        return (
            <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '5px', marginTop: '20px' }}>
                <h3 className="page-title" style={{ marginBottom: '20px' }}>Chi tiết khách hàng</h3>
                <div className="portlet box green-meadow">
                    <div className="portlet-title">
                        <div className="caption">Chi tiết khách hàng </div>
                    </div>
                    <div className="portlet-body">
                        <div className="col-xs-6">
                    <form onSubmit={this.onHandleSubmit}>
                    <div className="form-group">
                            <label>Tên khách hàng : </label>
                            <input type="text" className="form-control" name="nameProduct" defaultValue={this.state.customerEdit.nameCustomer} onChange={this.onChange} required/>
                            <label>Số điện thoại : </label>
                            <input type="number" className="form-control" name="codeProduct" defaultValue={this.state.customerEdit.codeProduct} onChange={this.onChange} required />
                            <label>Email : </label>
                            <input type="email" className="form-control" name="inventory" defaultValue={this.state.customerEdit.inventory} onChange={this.onChange} />
                            <label>Địa chỉ : </label>
                            <input type="text" className="form-control" name="costProduct" defaultValue={this.state.customerEdit.costProduct} onChange={this.onChange} />
                            <label>Tỉnh/Thành phố : </label>
                            <input type="text" className="form-control" name="costProduct" defaultValue={this.state.customerEdit.costProduct} onChange={this.onChange} />
                            <label>Quận/Huyện : </label>
                            <input type="text" className="form-control" name="costProduct" defaultValue={this.state.customerEdit.costProduct} onChange={this.onChange} />
                        </div>
                        <Link to ="/customer"><button type="submit" className="btn btn-danger"> Quay lại</button></Link>&nbsp;
                    </form>

                </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default DetailCustomer;