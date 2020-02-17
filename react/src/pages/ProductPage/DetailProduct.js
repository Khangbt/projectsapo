import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import NumberFormat from "react-number-format";


class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkName: false,
            check: false,
            nameProduct: "",
            productCode: "",
            inventoryNumber: null,
            price: null

        }
    }
    componentDidMount() {
        document.title = "Cập nhật sản phẩm";
        axios.get(`http://localhost:8291/product/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    nameProduct: res.data.nameProduct,
                    productCode: res.data.productCode,
                    inventoryNumber: res.data.inventoryNumber,
                    price: res.data.price
                })
            })
    }



    onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        if (name === "inventoryNumber" || name === "price") {
            console.log("số lượng", value, typeof(value))
            
                this.setState({
                    [name]: parseInt(value)
                })
            

        } else
            this.setState({
                [name]: value,
                checkName: false
            })
        

    }

    onHandleSubmit = (event) => {
        event.preventDefault();
        console.log("data", this.state.inventoryNumber)
        console.log("checkName ở đây", this.state.checkName)
        if ( !this.state.checkName && this.state.nameProduct !== '' && 0<= this.state.inventoryNumber && this.state.inventoryNumber <1000
                && 999 < this.state.price && this.state.price < 1000000000 ) {
            axios({
                method: 'PUT',
                url: `http://localhost:8291/product/${this.props.match.params.id}`,

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
                            title: 'Cập nhật sản phẩm thành công'
                        })

                    this.setState({
                        check: true
                    })
                }
            }).catch(err => {
                this.setState({ checkName: true })
            })
        }

    }

    maxLengthCheck = (event) => {
        if (event.target.value.length > event.target.maxLength)
            event.target.value = event.target.value.slice(0, event.target.maxLength)
    }

    render() {
        var { nameProduct, productCode, inventoryNumber, price, checkName } = this.state
        console.log("số ", inventoryNumber)
        if (this.state.check) {
            return <Redirect to="/product" />
        }
        return (
            <div className="col-md-8 offset-md-2" style={{ marginBottom: '5px', marginTop: '20px' }}>
                <h3 className="page-title" style={{ marginBottom: '20px' }}>Cập nhật sản phẩm</h3>
                <div className="portlet box green-meadow">
                    <div className="title-product"><h5>{nameProduct}</h5></div>
                    <div className="portlet-body">
                        <div className="col-xs-6">
                            <form onSubmit={this.onHandleSubmit}>
                                <div className="form-group">
                                    <div>
                                        <label>Tên sản phẩm :  <span className = "require-field" > * </span> </label>
                                        <input type="text" className="form-control" name="nameProduct" defaultValue={nameProduct} onChange={this.onChange} maxLength="45" />
                                        {nameProduct === '' && <span>* tên sản phẩm không được để trống</span>}
                                        {nameProduct.length < 2 && nameProduct !== '' && <span>* tên sản phẩm tối thiểu 2 ký tự</span>}
                                        {nameProduct.length > 44 && <span>* tên sản phẩm tối đa 45 ký tự</span>}
                                        {checkName && <span>* tên sản phẩm đã tồn tại</span>}
                                    </div>
                                    <label>Mã sản phẩm :  <span className = "require-field" > * </span></label>
                                    <input type="text" className="form-control" name="productCode" defaultValue={productCode} onChange={this.onChange} readOnly />
                                   <div>
                                   <label>Số lượng tồn :  <span className = "require-field" > * </span> </label>
                                   <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Số lượng tồn từ 0 đến 999
                                        </Tooltip>}>
                                        <input type="number" className="form-control" name="inventoryNumber" defaultValue={inventoryNumber} onKeyUp={this.onChange}
                                         maxLength="3" onInput={this.maxLengthCheck} />
                                </OverlayTrigger>
                                    {  (inventoryNumber < 0 || inventoryNumber > 999) && <span>* số lượng tồn từ 0 đến 999</span>}
                                    {isNaN(inventoryNumber) && <span>* số lượng tồn không được để trống</span>}
                                   </div>
                                   <div>
                                   <label>Giá bán :  <span className = "require-field" > * </span> </label>
                                   <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Giá bán tối thiểu là 1.000 đồng
                                        </Tooltip>}>
                                        
                                        {/* <input type="number" className="form-control" name="price" 
                                        defaultValue={price} onChange={this.onChange}
                                        maxLength="9" onInput={this.maxLengthCheck} /> */}
                                        <NumberFormat className ="form-control"  maxLength="11" onInput={this.maxLengthCheck} value={price}  thousandSeparator={true} onValueChange={(values) => {const { value} = values;
                                                       this.setState({price: value})
                                                                                    }} />
                                        
                                </OverlayTrigger>
                                    {  (price < 1000 || price > 999999999) && <span>* giá bán tối thiểu là 1.000 đồng</span>}
                                    {isNaN(price) && <span>* giá bán không được để trống</span>}
                                   </div> 
                                </div>
                                <Link to="/product"><button type="submit" className="btn btn-danger"> Quay lại</button></Link>&nbsp;
                        <button type="submit" className="btn btn-primary"> Lưu</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default DetailProduct;