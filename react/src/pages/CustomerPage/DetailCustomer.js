import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import District from '../../Data/District.json'
import options from '../../Data/Province'

class DetailCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            check: false,
            checkPhone: false,
            nameCustomer: "",
            phoneNumber: null,
            city: "",
            email: "",
            address: "",
            district: "",
            phone: "0",
            selectProvince: 0
        }
    }

    onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        })
        if (name === 'phoneNumber') {
            this.setState({ checkPhone: false })
        }
    }


    onHandleSubmit = (event) => {
        event.preventDefault();
        if (this.state.nameCustomer !== '' && /((09|03|07|08|05)+([0-9]{8})\b)/g.test(this.state.phoneNumber) && /[A-Z0-9._%+-]{1,32}@[A-Z0-9-]+.+.[A-Z]{2,4}/igm.test(this.state.email)) {
            axios({
                method: 'PUT',
                url: `http://localhost:8291/customer/${this.props.match.params.id}`,
                data: {
                    nameCustomer: this.state.nameCustomer,
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
                        check: true
                    })
                }
            }).catch(err => {
                this.setState({ checkPhone: true })
            })
        }



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
                    address: res.data.address,
                    district: res.data.district
                })
            })
    }

    maxLengthCheck = (event) => {
        if (event.target.value.length > event.target.maxLength)
            event.target.value = event.target.value.slice(0, event.target.maxLength)
    }

    handleChange = (event) => {
        const cityName = event.target.options[event.target.selectedIndex].text;
        if (cityName !== "Chọn tỉnh thành phố") {
            this.setState({
                selectProvince: event.target.value,
                city: cityName,
                district: ""
            });
        } else {
            this.setState({
                selectProvince: event.target.value,
                city: "",
                district: ""
            })
        }
        console.log(`Option selected:`, event.target.options[event.target.selectedIndex].text);
    };

    handleChangeDistrict = (event) => {
        const districtName = event.target.options[event.target.selectedIndex].text;
        if (districtName !== "Chọn quận huyện") {
            this.setState({ district: districtName });
        } else {
            this.setState({ district: "" });
        }

    };



    render() {
        let selectProvince = 0
        let selectDistrict = ""
        let province = ""

        var { nameCustomer, phoneNumber, check, checkPhone, city, email, address, district } = this.state
        if (city != null) {
            selectProvince = options.filter(item => city.includes(item.label)).map((value) => {
                return value.provinceId

            })
        }
        if (district !== null) {
            selectDistrict = District.filter(item => district.includes(item.label)).map((value) => {
                return value.districtId
            })
        }

        province = options.map((value, key) => {
            return <option key={key} value={value.provinceId}>{value.type} {value.label}</option>
        })
        console.log("city", selectProvince)
        let districtList = District.filter(item => item.provinceId === (selectProvince[0])).map((value, key) => {
            return <option key={key} value={value.districtId}>{value.districtType} {value.label}</option>
        })
        if (check) {
            return <Redirect to="/customer" />
        }
        return (
            <div className="col-md-8 offset-md-2" style={{ marginBottom: '5px', marginTop: '20px' }}>
                <h3 className="page-title" style={{ marginBottom: '20px' }}>Cập nhật khách hàng</h3>
                <Link to="/customer"><a> Quay lại</a></Link>
                <div className="portlet box green-meadow">
                    
                    <div className="portlet-body">
                        <div className="col-xs-6">
                            <form onSubmit={this.onHandleSubmit}>
                                <div className="form-group">
                                    <div className = "item-input">
                                        <label>Tên khách hàng : <span className = "require-field" > * </span></label>
                                        <input type="text" className="form-control" name="nameCustomer" defaultValue={nameCustomer} onChange={this.onChange} maxLength="45" />
                                        {nameCustomer === '' && <span>* tên khách hàng không được để trống</span>}
                                        {nameCustomer.length > 44 && <span>* tên khách hàng tối đa 45 ký tự</span>}
                                    </div>
                                    <div className = "item-input">
                                        <label>Số điện thoại : <span className = "require-field" > * </span></label>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Số điện thoại bao gồm 10 chữ số bắt đầu
                                        Viettel: 09, 03 MobiFone: 09, 07 VinaPhone: 09, 08 Vietnamobile và Gmobile: 09, 05
                                        </Tooltip>}>
                                            <input type="number" className="form-control" id="myNumber" name="phoneNumber" defaultValue={phoneNumber} onChange={this.onChange}
                                                min="1" max="999999999" maxLength="10" onInput={this.maxLengthCheck} />
                                        </OverlayTrigger>
                                        {isNaN(phoneNumber) && <span>* số điện thoại không được để trống</span>}
                                        {checkPhone && <span>* số điện thoại đã tồn tại</span>}
                                        {/((09|03|07|08|05)+([0-9]{8})\b)/g.test(this.state.phoneNumber) === false && <span>* Số điện thoại của bạn không đúng định dạng!</span>}
                                    </div>
                                    <div className = "item-input">
                                        <label>Email : <span className = "require-field" > * </span>  </label>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">địa chỉ email phải bắt đầu bằng 1 ký tự, địa chỉ email
                                        là tập hợp của các ký tự a-z 0-9, có thể có các ký tự như dấu chấm, dấu gạch dưới,
                                        độ dài của email là từ 1 đến 32 + tên miền của email. VD : example@gmail.com
                                        </Tooltip>}>
                                            <input type="text" className="form-control" name="email" defaultValue={email} onChange={this.onChange} />
                                        </OverlayTrigger>
                                        {!/[A-Z0-9._%+-]{1,32}@[A-Z0-9-]+.+.[A-Z]{2,4}/igm.test(email) && <span>* email không đúng định dạng</span>}
                                    </div>
                                    <div className = "item-input">
                                        <label>Địa chỉ : </label>
                                        <input type="text" className="form-control" name="address" defaultValue={address} onChange={this.onChange} />
                                    </div>
                                    <div className = "item-input">
                                        <label>Tỉnh/Thành phố : </label>
                                        <select className="form-control"
                                            value={selectProvince[0]} onChange={this.handleChange} >
                                            <option value={0}>Chọn tỉnh thành phố</option>
                                            {province}
                                        </select>
                                    </div>
                                    <div className = "item-input">
                                        <label>Quận/Huyện : </label>
                                        <select className="form-control" value={selectDistrict[0]} onChange={this.handleChangeDistrict}  >
                                            <option value={0}>Chọn quận huyện</option>
                                            {districtList}
                                        </select>
                                    </div>

                                </div>
                                
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