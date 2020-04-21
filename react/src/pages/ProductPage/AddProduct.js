import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
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
           
                this.setState({
                    [name]: parseInt(value)
                })
            

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
        if (!this.state.checkName && this.state.nameProduct !== '' && this.state.productCode !== ''  && 999 < this.state.price && this.state.price < 1000000000
                && 0 < this.state.inventoryNumber && this.state.inventoryNumber < 1000) {
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

    maxLengthCheck = (event) => {
        if (event.target.value.length > event.target.maxLength)
            event.target.value = event.target.value.slice(0, event.target.maxLength)
    }

    componentDidMount() {
        document.title = 'Thêm mới sản phẩm';
    }

    render() {
        var { check, checkForm, checkName, nameProduct, productCode, checkCode, inventoryNumber, price } = this.state
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
                                        <input type="text" className="form-control" name="nameProduct" value={nameProduct} onChange={this.onChange} maxLength="45" />
                                        {nameProduct === '' && checkForm && <span>* tên sản phẩm không được để trống</span>}
                                        {nameProduct.length < 2 && nameProduct !== '' && <span>* tên sản phẩm tối thiểu 2 ký tự</span>}
                                        {nameProduct.length > 44 && <span>* tên sản phẩm tối đa 45 ký tự</span>}
                                        {checkName && <span>* tên sản phẩm đã tồn tại</span>}
                                    </div>
                                    <div>
                                        <label>Mã sản phẩm : </label>
                                        <input type="text" className="form-control" name="productCode" onChange={this.onChange} maxLength="45" />
                                        {productCode === '' && checkForm && <span>* mã sản phẩm không được để trống</span>}
                                        {productCode.length > 44 && <span>* mã sản phẩm tối đa 45 ký tự</span>}
                                        {!/^[a-zA-Z0-9]+$/.test(productCode) && productCode !== ''  && <span>* mã sản phẩm chỉ được chứa chữ và số</span>}
                                        {checkCode && <span>* mã sản phẩm đã tồn tại</span>}
                                    </div>
                                    <div>
                                   <label>Số lượng tồn : </label>
                                   <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Số lượng tồn từ 1 đến 999
                                        </Tooltip>}>
                                        <input type="number" className="form-control" name="inventoryNumber" onChange={this.onChange}
                                         maxLength="3" onInput={this.maxLengthCheck} />
                                </OverlayTrigger>
                                    {  (inventoryNumber < 1 || inventoryNumber > 999) && checkForm && <span>* số lượng tồn từ 1 đến 999</span>}
                                    {isNaN(inventoryNumber) && checkForm && <span>* số lượng tồn không được để trống</span>}
                                   </div>
                                  <div>
                                   <label>Giá bán : </label>
                                   <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Giá bán tối thiểu là 1.000 đồng
                                        </Tooltip>}>
                                        <input type="number" className="form-control" name="price"  onChange={this.onChange}
                                         maxLength="9" onInput={this.maxLengthCheck} />
                                </OverlayTrigger>
                                    {  (price < 1000 || price > 999999999) && checkForm && <span>* giá bán tối thiểu là 1.000 đồng</span>}
                                    {isNaN(price) && checkForm && <span>* giá bán không được để trống</span>}
                                   </div>
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