import React, { Component } from 'react';


class OrderList extends Component{
  render(){
    return(
      <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '5px', marginTop: '20px' }}>
        <h3 className="page-title" style={{ marginBottom: '20px' }}>Quản lý đơn hàng</h3>

        <div className="portlet box green-meadow">
          <div className="portlet-title">
            <div className="caption">Danh sách đơn hàng</div>
          </div>
          <div className="portlet-body">
            <div className="table-responsive">
              <div id="news-grid" className="grid-view">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Tên khách hàng</th>
                      <th>SĐT khách hàng</th>
                      <th>Tổng tiền hàng</th>
                      <th>Tiền khách đã trả</th>
                      <th>Tiền khách chưa trả</th>
                      <th>Ngày tạo đơn</th>
                      <th>Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderList;
