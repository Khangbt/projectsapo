import React, { Component } from 'react'
import '../../App.css'
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Axios from 'axios';
import Swal from 'sweetalert2';
import District from '../../Data/District.json'
import options from '../../Data/Province'
// import Select from 'react-select';


class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkForm: false,
            checkPhone: false,
            nameCustomer: "",
            phoneNumber: null,
            city: "",
            email: "",
            address: "",
            district: "",
            selectProvince: 0
        }
    }

    onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ 
            checkPhone : false,
            [name] : value
             })
    }

    customerAdd = () => {
        if (this.state.nameCustomer !== '' && this.state.phoneNumber !== '' && /((09|03|07|08|05)+([0-9]{8})\b)/g.test(this.state.phoneNumber)
            && /[A-Z0-9._%+-]{1,32}@[A-Z0-9-]+.+.[A-Z]{2,4}/igm.test(this.state.email) 
        ) {
            Axios({
                method: 'POST',
                url: `http://localhost:8291/customer`,
                data:  {
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
                            title: 'Tạo mới khách hàng thành công'
                        })

                    this.showModal()
                }
            }).catch(err => {
                this.setState({ checkPhone: true })
            })
        } else {
            this.setState({ checkForm: true })
        }
    }

    maxLengthCheck = (event) => {
        if (event.target.value.length > event.target.maxLength)
            event.target.value = event.target.value.slice(0, event.target.maxLength)
    }

    showModal = () => {
        this.props.showModal();
        this.setState({ checkForm: false })
    }

    handleChange = (event) => {
        this.setState({
            selectProvince: event.target.value,
            city: event.target.options[event.target.selectedIndex].text
        });
        console.log(`Option selected:`, event.target.options[event.target.selectedIndex].text);
    };

    handleChangeDistrict = (event) => {
        this.setState({ district: event.target.options[event.target.selectedIndex].text });

    };


    render() {
        var { nameCustomer, phoneNumber, checkForm, checkPhone, selectProvince, email } = this.state

        let province = options.map((value, key) => {
            return <option key={key} value={value.provinceId}>{value.type} {value.label}</option>
        })

        let district = District.filter(item => item.provinceId === selectProvince).map((value, key) => {
            return <option key={key} value={value.districtId}>{value.districtType} {value.label}</option>
        })

        console.log("huyện", district)

        console.log("sdt", typeof (phoneNumber))
        return (
            <Modal show={this.props.showModalAddGuest}>
                <Modal.Header>
                    <Modal.Title> Thêm khách hàng mới </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.onHandleSubmit}>
                        <div className="form-group">
                            <div>
                                <label>Tên khách hàng : </label>
                                <input type="text" className="form-control" name="nameCustomer" onChange={this.onChange} maxLength="45" />
                                {nameCustomer === '' && checkForm && <span>* tên khách hàng không được để trống</span>}
                                {nameCustomer.length > 44 && <span>* tên khách hàng tối đa 45 ký tự</span>}
                            </div>
                            <div >
                                <label>Số điện thoại : </label>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Số điện thoại bao gồm 10 chữ số bắt đầu
                                Viettel: 09, 03 MobiFone: 09, 07 VinaPhone: 09, 08 Vietnamobile và Gmobile: 09, 05
                                        </Tooltip>}>
                                    <input type="number" className="form-control" id="myNumber" name="phoneNumber" onChange={this.onChange}
                                        min="1" max="999999999" maxLength="10" onInput={this.maxLengthCheck} />
                                </OverlayTrigger>
                                {isNaN(phoneNumber) && checkForm && <span>* số điện thoại không được để trống</span>}
                                {checkPhone && <span>* số điện thoại đã tồn tại</span>}
                                {/((09|03|07|08|05)+([0-9]{8})\b)/g.test(this.state.phoneNumber) === false && checkForm && <span>* Số điện thoại của bạn không đúng định dạng!</span>}
                            </div>
                            <div>
                                <label>Email : </label>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">địa chỉ email phải bắt đầu bằng 1 ký tự, địa chỉ email
                                        là tập hợp của các ký tự a-z 0-9, có thể có các ký tự như dấu chấm, dấu gạch dưới,
                                        độ dài của email là từ 5 đến 32 + tên miền của email. VD : example@gmail.com
                                        </Tooltip>}>
                                    <input type="text" className="form-control" name="email"  onChange={this.onChange} />   
                                </OverlayTrigger>
                                {!/[A-Z0-9._%+-]{1,32}@[A-Z0-9-]+.+.[A-Z]{2,4}/igm.test(email) && checkForm && <span>* email không đúng định dạng</span>}
                            </div>
                            <label>Địa chỉ : </label>
                            <input type="text" className="form-control" name="address" onChange={this.onChange} />
                            {/* <Select className="mt-2 col-md-12 "
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                            /> */}

                            {/* {selectedOption !== null && <Select className="mt-2 col-md-12 "
                                options={district}
                            />} */}

                            <div className="form-group">
                                <label>Tỉnh/Thành phố : </label><br />
                                <select className="form-control"
                                    onChange={this.handleChange}>
                                    <option value={0}>Chọn tỉnh thành phố</option>
                                    {province}
                                </select>
                            </div>
                            <div className="form-group">
                                {/* <input type="text" className="form-control" name="city" onChange={this.onChange} /> */}
                                <label>Quận/Huyện : </label>
                                <select className="form-control" onChange={this.handleChangeDistrict}>
                                    <option value={0}>Chọn quận huyện</option>
                                    {district}
                                </select>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.showModal}>
                        Close
              </Button>
                    <Button variant="primary" onClick={this.customerAdd}> Save </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddCustomer