import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2';

class DetailCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check : false,
            nameCustomer: "",
            phoneNumber: null,
            city: "",
            email: "",
            address: "",
            district: "",
            phone : "0",
            checkPhone1 : false,
            checkPhone2 : false,
            checkPhone3 : false
        }
    }

    onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        if(name === 'phoneNumber'){
            this.setState({[name] : parseInt(value)})
            console.log("số", this.state.phoneNumber)
            console.log("test",/((9|3|7|8|5)+([0-9]{7})\b)/g.test(this.state.phoneNumber))
                if (/((9|3|7|8|5)+([0-9]{7})\b)/g.test(this.state.phoneNumber) === false) 
                {
                    this.setState({
                        checkPhone1 : true,
                        checkPhone2 : false
                    })
                    
                }else{
                    this.setState({
                        checkPhone1 : false,
                        checkPhone2 : true
                    })
                   
                }
            }
        else{
            
        this.setState({
            [name]: value
        })
        }
    }

    onHandleSubmit = (event) => {
        event.preventDefault();
                axios({
                    method: 'PUT',
                    url: `http://localhost:8291/customer/${this.props.match.params.id}`,
                    data: {
                        nameCustomer : this.state.nameCustomer,
                        phoneNumber: parseInt(this.state.phoneNumber),
                        city: this.state.city,
                        email: this.state.email,
                        address: this.state.address,
                        district: this.state.district,
                    }
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
                            title: 'Cập nhật khách hàng thành công'
                          })
                          
                        this.setState({
                            check : true
                        })  
                    }
                })
        

    }
    componentDidMount() {
        document.title = "Cập nhật khách hàng";
        axios.get(`http://localhost:8291/customer/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    nameCustomer: res.data.nameCustomer,
                    phoneNumber: (this.state.phone.concat(res.data.phoneNumber)),
                    city: res.data.city,
                    email: res.data.email,
                    address : res.data.address,
                    district : res.data.district
                })
            })
    }


    render() {
        var {nameCustomer, phoneNumber, check, checkPhone2, city, email,address,district} = this.state
        // console.log("sdt", /^(\([0]{1}\)[0-9]{9}\b/.test(phoneNumber))
        if(check){
            return <Redirect to ="/customer" />
        }
        return (
            <div className="col-md-8 offset-md-2" style={{ marginBottom: '5px', marginTop: '20px' }}>
                <h3 className="page-title" style={{ marginBottom: '20px' }}>Chi tiết khách hàng</h3>
                <div className="portlet box green-meadow">
                    <div className="title-product"><h5>Cập nhật khách hàng</h5></div>
                    <div className="portlet-body">
                        <div className="col-xs-6">
                            <form onSubmit={this.onHandleSubmit}>
                                <div className="form-group">
                                    <label>Tên khách hàng : </label>
                                    <input type="text" className="form-control" name="nameCustomer" defaultValue={nameCustomer} onChange={this.onChange} required />
                                    <div>
                                    <label>Số điện thoại : </label>
                                    <input type="number" className="form-control" id="myNumber" name="phoneNumber" defaultValue={phoneNumber} onChange={this.onChange} max="1000000000" />
                                    {isNaN(phoneNumber) && <span>* số điện thoại không được để trống</span>}
                                    {/* { /^(\([0]{1})[0-9]{9}$/.test(phoneNumber)  && <span>* số điện thoại tối đa 9 số</span>} */}
                                    {this.state.checkPhone1 && <span>* Số điện thoại của bạn không đúng định dạng!</span>}
                                    {this.state.checkPhone2 && <span>* Số điện thoại của bạn hợp lệ</span>}
                                   
                                    </div>
                                    <label>Email : </label>
                                    <input type="email" className="form-control" name="email" defaultValue={email} onChange={this.onChange} />
                                    <label>Địa chỉ : </label>
                                    <input type="text" className="form-control" name="address" defaultValue={address} onChange={this.onChange} />
                                    <label>Tỉnh/Thành phố : </label>
                                    <input type="text" className="form-control" name="city" defaultValue={city} onChange={this.onChange} />
                                    <label>Quận/Huyện : </label>
                                    <input type="text" className="form-control" name="district" defaultValue={district} onChange={this.onChange} />
                                </div>
                                <Link to="/customer"><button type="submit" className="btn btn-danger"> Quay lại</button></Link>&nbsp;
                        <button type="submit" className="btn btn-primary">Lưu</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default DetailCustomer;