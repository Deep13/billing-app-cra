import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FeatherIcon from "feather-icons-react";
// import Data from "./inventory";
import "../components/antd.css";
import { Table } from "antd";
import Select2 from '../components/SelectDropdown'

// import {
//   onShowSizeChange,
//   itemRender,
// } from "../components/paginationfunction";
import AddVendor from "../vendors/addVendor";
// import Select2 from "react-select2-wrapper";

const StockManagement = () => {

  // const datasource = Data?.Data;
  // console.log(datasource);
  const [purityData, setPurityData] = useState([])
  const [ornamentType, setOrnamentType] = useState([])
  const [ornament, setOrnament] = useState([])


  const [data, setData] = useState([])
  const [currentItem, setCurrentItem] = useState({
    orm_desc: 'GOLD',
    om_code: 'curritem1235',
    purity: '22K',
    gross_wt: '23.8',
    net_wt: '23.5',
    stone_wt: '12',
    qty: '20',
    huid: 'curr1245',
    action: ""
  })
  const [menu, setMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false)
  const [purity, setPurity] = useState();


  const toggleMobileMenu = () => {
    setMenu(!menu);
  };


  const handleAddItem = () => {

    if (editMode && currentItem) {
      updateStockToDb(currentItem)
    }
    else {
      InsertStockToDb(currentItem)
    }
    setEditMode(false)
  }

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      sorter: (a, b) => a.Id.length - b.Id.length,
    },
    {
      title: "Entry Date",
      dataIndex: "entry_date",
      sorter: (a, b) => a.EntryDate.length - b.EntryDate.length,
    },
    {
      title: "Ornament Desc",
      dataIndex: "orm_desc",
      sorter: (a, b) => a.OmDesc.length - b.OmDesc.length,
    },
    {
      title: "OmCode",
      dataIndex: "om_code",
      sorter: (a, b) => a.OmCode.length - b.OmCode.length,
    },

    {
      title: "Purity",
      dataIndex: "purity",
      sorter: (a, b) => a.Purity.length - b.Purity.length,
    },
    {
      title: "Gross Wt",
      dataIndex: "gross_wt",
      sorter: (a, b) => a.grosswt.length - b.grosswt.length,
    },
    {
      title: "Net Wt",
      dataIndex: "net_wt",
      sorter: (a, b) => a.netwt.length - b.netwt.length,
    },
    {
      title: "Stone Wt",
      dataIndex: "stone_wt",
      sorter: (a, b) => a.stonewt.length - b.stonewt.length,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      sorter: (a, b) => a.qty.length - b.qty.length,
    },
    {
      title: "HUID",
      dataIndex: "huid",
      sorter: (a, b) => a.huid.length - b.huid.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex align-items-center gap-1">
          <div
            data-bs-toggle="modal"
            data-bs-target="#edit_inventory"
            onClick={() => { showEditModel(record) }}
            className="btn btn-primary">
            edit
          </div>
          {/* <Link
                        to="#"
                        className="btn btn-greys bg-success-light me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#stock_in"
                    >
                        <i className="fa fa-plus-circle me-1" /> Stock in
                    </Link>
                    <Link
                        to="#"
                        className="btn btn-greys bg-danger-light me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#stock_out"
                    >
                        <i className="fa fa-plus-circle me-1" /> Stock out
                    </Link> */}
          <div
            onClick={() => {
              deleteStock(record)
            }}
            className="btn btn-danger">
            delete
          </div>

        </div>
      ),
      sorter: (a, b) => a.Action.length - b.Action.length,
    },
  ];


  const InsertStockToDb = (stockItem) => {
    $.ajax({
      url: 'http://localhost:80/billing_api/index.php',
      type: "POST",
      data: {
        method: "insertStock",
        data: JSON.stringify({ ...stockItem }),
      },
      success: function (dataClient) {
        console.log(dataClient);
        refreshData();
      },
      error: function (request, error) {
        console.log('Error')
      },
    });
  }

  const updateStockToDb = (stockItem) => {
    $.ajax({
      url: 'http://localhost:80/billing_api/index.php',
      type: 'POST',
      data: {
        method: 'updateStock', // Updated method name to match your PHP function
        data: JSON.stringify({ ...stockItem }),
      },
      success: function (dataClient) {
        // Check the response dataClient to see if the update was successful
        // var response = JSON.parse(dataClient);
        // if (response[0] === 'Update successful') {
        // var editValue = data.map(val => {
        //   if (val.id === currentItem.id) {
        //     val.item = item;
        //   }
        //   return val;
        // });
        //   console.log('Update successful:', response[0]);
        //   setCurrentItem(null);
        // } else {
        //   console.log('Update failed:', response[0]);
        // }
        console.log(dataClient);
        refreshData();
      },
      error: function (request, error) {
        console.log('Error:', error);
      },
    });

  }

  const deleteStock = (record) => {
    $.ajax({
      url: 'http://localhost:80/billing_api/index.php',
      type: "POST",
      data: {
        method: "deleteStock",
        data: JSON.stringify({ id: JSON.parseInt(record.id) }),
      },
      success: function (dataClient) {
        // setitem('')
        console.log(JSON.parse(dataClient))
        refreshData();
      },
      error: function (request, error) {
        console.log('Error')
      },
    });

  }

  const showEditModel = (record) => {
    // setselectedItem(record)
    setCurrentItem(record)
    setEditMode(true)
    console.log(record)
    // var myModal = new bootstrap.Modal(document.getElementById('edit_inventory'));
    // myModal.show()
  }

  // const ItemRef = useRef()
  // const DateRef = useRef()
  // const OmCodeRef = useRef()
  // const GrossWtRef = useRef()
  // const StoneWtRef = useRef()
  // const HUIDRef = useRef()
  // const NetWtRef = useRef()
  // const QuantityRef = useRef()
  // const OrnamentDescRef = useRef()



  useEffect(() => {
    refreshData();
  }, [])

  useEffect(() => {
    // refreshData();
    console.log(currentItem)
  }, [currentItem])

  const refreshData = () => {
    $.ajax({
      url: 'http://localhost:80/billing_api/index.php',
      type: "POST",
      data: {
        method: "getPurity",
      },
      success: function (dataClient) {
        try {
          // setdatasource(JSON.parse(dataClient))
          setPurityData(JSON.parse(dataClient))
          // console.log(JSON.parse(dataClient))
        } catch (e) {
          // setdatasource([])
          setPurity([])
          console.log(e)
        }
        // console.log(dataClient);
      },
      error: function (request, error) {
        console.log('Error')
      },
    });

    // for ornament 
    $.ajax({
      url: 'http://localhost:80/billing_api/index.php',
      type: "POST",
      data: {
        method: "getOrnamentType",
      },
      success: function (dataClient) {
        try {
          // setdatasource(JSON.parse(dataClient))
          setOrnamentType(JSON.parse(dataClient))
          // console.log(JSON.parse(dataClient))
        } catch (e) {
          // setdatasource([])
          setOrnamentType([])
          console.log(e)
        }
        // console.log(dataClient);
      },
      error: function (request, error) {
        console.log('Error')
      },
    });

    // for ornament 
    $.ajax({
      url: 'http://localhost:80/billing_api/index.php',
      type: "POST",
      data: {
        method: "getOrnament",
      },
      success: function (dataClient) {
        try {
          // setdatasource(JSON.parse(dataClient))
          setOrnament(JSON.parse(dataClient))
          // console.log(JSON.parse(dataClient))
        } catch (e) {
          // setdatasource([])
          setOrnament([])
          console.log(e)
        }
        // console.log(dataClient);
      },
      error: function (request, error) {
        console.log('Error')
      },
    });

    // getting stock data
    $.ajax({
      url: 'http://localhost:80/billing_api/index.php',
      type: "POST",
      data: {
        method: "getStocks",
      },
      success: function (dataClient) {
        try {
          setData(JSON.parse(dataClient))
          console.log(JSON.parse(dataClient))
        } catch (e) {
          // setdatasource([])
          // setOrnamentType([])
          console.log(e)
        }
        // console.log(dataClient);
      },
      error: function (request, error) {
        console.log('Error')
      },
    });
  }

  const getLatestOrmCode = (desc, suffix) => {

    console.log(data);
    var lastIndex = data.filter(val => val.orm_desc == desc);
    var nextIndex;
    if (lastIndex.length > 0) {
      var currIndex = lastIndex[lastIndex.length - 1].om_code.split(suffix);
      currIndex = parseInt(currIndex[1]) + 1;
      nextIndex = suffix + currIndex;

    }
    else {
      nextIndex = suffix + '1';
    }

    setCurrentItem({ ...currentItem, om_code: nextIndex, orm_desc: desc })


  }

  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar />

        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="content-page-header ">
                <h5>Stock Management</h5>
                <div className="list-btn">
                  <ul className="filter-list">
                    <li className="me-2">
                      <div className="dropdown dropdown-action">
                        <Link
                          to="#"
                          className="btn-filters"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span>
                            {/* <i className="fe fe-download" /> */}
                            <FeatherIcon icon="download" />
                          </span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                          <ul className="d-block">
                            <li>
                              <Link
                                className="d-flex align-items-center download-item"
                                to="#"
                                download=""
                              >
                                <i className="far fa-file-pdf me-2" />
                                PDF
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="d-flex align-items-center download-item"
                                to="#"
                                download=""
                              >
                                <i className="far fa-file-text me-2" />
                                CVS
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li>
                      <Link
                        to="#"
                        onClick={() => {
                          setCurrentItem({
                            orm_desc: '',
                            om_code: '',
                            purity: '',
                            gross_wt: '',
                            net_wt: '',
                            stone_wt: '',
                            qty: '',
                            huid: '',
                          })
                          setEditMode(false)
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#edit_inventory"
                        className="btn btn-rounded btn-primary me-1 flex items-center">
                        <FeatherIcon icon="plus" />
                        <span className="ml-[0.25rem]">Add Items</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            {/* Table */}
            <div className="row">
              <div className="col-sm-12">
                <div className=" card-table">
                  <div className="card-body">
                    <div className="table-responsive table-hover">
                      <Table
                        pagination={false}
                        columns={columns}
                        dataSource={data}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Table */}
          </div>
        </div>

        <AddVendor
          setShow={setShow}
          show={show}
        />

        <div className="modal custom-modal fade" id="edit_inventory" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">{editMode ? 'Edit Item' : 'Add Items'}</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="align-center" aria-hidden="true">
                    ×
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-0">
                      <label>Ornament Type</label>
                      <Select2
                        value={currentItem.id}
                        onChange={(e) => setCurrentItem({ ...currentItem, item: ornamentType[e.target.selectedIndex].item, id: ornamentType[e.target.selectedIndex].id })}
                        type="text"
                        data={ornamentType}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-0">
                      <label>Ornament Desc</label>
                      <Select2
                        value={currentItem.orm_desc}
                        onChange={(e) => {
                          // setCurrentItem({ ...currentItem, orm_desc: e.target.value });
                          getLatestOrmCode(e.target.value, ornament[e.target.selectedIndex].suffix);
                        }}
                        type="text"
                        data={ornament}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Om Code</label>
                      <input
                        disabled
                        value={currentItem.om_code}
                        onChange={(e) => setCurrentItem({ ...currentItem, om_code: e.target.value })}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-0">
                      <label>Purity</label>
                      <Select2
                        value={currentItem.purity}
                        onChange={(e) =>
                          setCurrentItem({ ...currentItem, purity: e.target.value })}
                        className="form-control"
                        data={purityData}
                      />
                    </div>
                  </div>


                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Gross Wt</label>
                      <input
                        value={currentItem.gross_wt}
                        onChange={(e) => setCurrentItem({ ...currentItem, gross_wt: e.target.value })}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Net Wt</label>
                      <input
                        value={currentItem.net_wt}
                        onChange={(e) => setCurrentItem({ ...currentItem, net_wt: e.target.value })}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Stone Wt</label>
                      <input
                        value={currentItem.stone_wt}
                        onChange={(e) => setCurrentItem({ ...currentItem, stone_wt: e.target.value })}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>


                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-0">
                      <label>Quantity</label>
                      <input
                        value={currentItem.qty}
                        onChange={(e) => setCurrentItem({ ...currentItem, qty: e.target.value })}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>


                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>HUID</label>
                      <input
                        value={currentItem.huid}
                        onChange={(e) => setCurrentItem({ ...currentItem, huid: e.target.value })}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>


                </div>
              </div>

              <div className="modal-footer">
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-cancel-btn me-2"
                >
                  Cancel
                </Link>
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-continue-btn"
                  onClick={handleAddItem}
                >
                  {editMode ? 'Update' : 'Add'}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="modal custom-modal fade" id="delete_stock" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Stock</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <Link to="#" className="btn btn-primary paid-continue-btn">
                        Delete
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        to="#"
                        onClick={() => setEditMode(false)}
                        data-bs-dismiss="modal"
                        className="btn btn-primary paid-cancel-btn"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockManagement;
