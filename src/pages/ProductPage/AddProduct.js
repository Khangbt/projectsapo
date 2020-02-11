import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'
class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false,
            checkName: false,
            checkForm: false,
            checkCode : false,
            nameProduct: "",
            productCode: "",
            inventoryNumber: 0,
            price: 0
        }
    }
    onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        if (name === "inventoryNumber" || name === "price") {
            if (value === '') {
                this.setState({
                    [name]: 0
                })
            }
            else {
                this.setState({
                    [name]: parseInt(value)
                })
            }

        } else {
            this.setState({
                [name]: value,
                checkName: false,
                checkCode : false
            })
        }
    }
    onHandleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.checkName && this.state.nameProduct !== '' && this.state.productCode !== '') {
            axios({
                method: 'POST',
                url: `http://localhost:8291/product`,
                data: this.state
            }).then(res => {
                if (res.status === 200) {
                    Swal.mixin({
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                        .fire({
                            icon: 'success',
                            title: 'Tạo mới sản phẩm thành công'
                        })

                    this.setState({
                        check: true
                    })
                }
            }).catch(err => {
                if(err.response.data === 'tên sp đã tồn tại'){
                    this.setState({checkName : true})
                }
                if(err.response.data === 'mã sản phẩm đã tồn tai'){
                    this.setState({checkCode : true})
                }
            })
        } else {
            this.setState({ checkForm: true })
        }
    }


    componentDidMount() {
        document.title = 'Thêm mới sản phẩm';
    }

    render() {
        var { check, checkForm, checkName, nameProduct, productCode, checkCode } = this.state
        console.log("data", this.state)
        console.log("giá", this.state.price)
        console.log("số lượng", this.state.inventoryNumber)
        console.log(check)
        console.log("12345",!/^[a-zA-Z0-9]+$/.test(productCode))
        if (check) {
            return <Redirect to="/product" />
        }
        return (
            <div className="col-md-8 offset-md-2" style={{ marginBottom: '5px', marginTop: '20px' }}>
                <h3 className="page-title" style={{ marginBottom: '20px' }}>Thêm mới sản phẩm</h3>
                <div className="portlet box green-meadow">
                    <div className="title-product"><h5>Thêm mới sản phẩm</h5></div>
                    <div className="portlet-body">
                        <div className="col-xs-6">
                            <form onSubmit={this.onHandleSubmit}>
                                <div className="form-group">
                                    <div>
                                        <label>Tên sản phẩm : </label>
                                        <input type="text" className="form-control" name="nameProduct" value={nameProduct} onChange={this.onChange} />
                                        {nameProduct === '' && checkForm && <span>* tên sản phẩm không được để trống</span>}
                                        {nameProduct.length > 44 && <span>* tên sản phẩm tối đa 45 ký tự</span>}
                                        {checkName && <span>* tên sản phẩm đã tồn tại</span>}
                                    </div>
                                    <div>
                                        <label>Mã sản phẩm : </label>
                                        <input type="text" className="form-control" name="productCode" onChange={this.onChange} />
                                        {productCode === '' && checkForm && <span>* mã sản phẩm không được để trống</span>}
                                        {productCode.length > 44 && <span>* mã sản phẩm tối đa 45 ký tự</span>}
                                        {!/^[a-zA-Z0-9]+$/.test(productCode) && productCode !== ''  && <span>* mã sản phẩm chỉ được chứa chữ và số</span>}
                                        {checkCode && <span>* mã sản phẩm đã tồn tại</span>}
                                    </div>
                                    <label>Số lượng tồn : </label>
                                    <input type="number" className="form-control" name="inventoryNumber" onChange={this.onChange} />
                                    <label>Giá bán : </label>
                                    <input type="number" className="form-control" name="price" onChange={this.onChange} />
                                    <label>Mô tả sản phẩm : </label>
                                    <textarea row='3' className="form-control" name="descriptionProduct" onChange={this.onChange} />
                                </div>
                                <Link to="/product"><button type="submit" className="btn btn-danger"> Quay lại</button></Link>&nbsp;
                    <button type="submit" className="btn btn-primary">
                                    Lưu</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default AddProduct;