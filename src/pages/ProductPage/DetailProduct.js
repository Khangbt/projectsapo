import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'


class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkName : false,
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

    fetchNameExist = (nameProduct) => {
        console.log("abc",nameProduct)
        axios.get(`http://localhost:8291/sreachproduct?name=${nameProduct}`)
          .then( res => {
              console.log(res.status)
              if(res.status === 200)
              {
                this.setState({checkName: true})
              }else{
                  this.setState({checkName: false})
              }
             }
          )
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
                checkName : false
            })
        }

    }

    onHandleSubmit = (event) => {
        event.preventDefault();
        console.log("data", this.state)
        console.log("checkName ở đây", this.state.checkName)
        this.fetchNameExist(this.state.nameProduct)
        if(!this.state.checkName && this.state.nameProduct!==''){
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
            })
        }
        
    }


    render() {
        var { nameProduct, productCode, inventoryNumber, price, checkName } = this.state
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
                                        <label>Tên sản phẩm : </label>
                                        <input type="text" className="form-control" name="nameProduct" defaultValue={nameProduct} onChange={this.onChange} />
                                        {nameProduct==='' && <span>* tên sản phẩm không được để trống</span>}
                                        {nameProduct.length > 44 && <span>* tên sản phẩm tối đa 45 ký tự</span> }
                                        {checkName && <span>* tên sản phẩm đã tồn tại</span> }
                                    </div>
                                    <label>Mã sản phẩm : </label>
                                    <input type="text" className="form-control" name="productCode" defaultValue={productCode} onChange={this.onChange} readOnly />
                                    <label>Số lượng tồn : </label>
                                    <input type="number" className="form-control" name="inventoryNumber" defaultValue={inventoryNumber} onChange={this.onChange} />
                                    <label>Giá bán : </label>
                                    <input type="number" className="form-control" name="price" defaultValue={price} onChange={this.onChange} />
                                    <label>Mô tả sản phẩm : </label>
                                    <textarea row='3' className="form-control" name="descriptionProduct" onChange={this.onChange} />
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