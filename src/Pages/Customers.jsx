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

const Customers = () => {

    // const datasource = Data?.Data;
    // console.log(datasource);
    const [purityData, setPurityData] = useState([])
    const [ornamentType, setOrnamentType] = useState([])

    const stateData = [
        { item: 'Andhra Pradesh' },
        { item: 'Arunachal Pradesh' },
        { item: 'Assam' },
        { item: 'Bihar' },
        { item: 'Chhattisgarh' },
        { item: 'Goa' },
        { item: 'Gujarat' },
        { item: 'Haryana' },
        { item: 'Himachal Pradesh' },
        { item: 'Jharkhand' },
        { item: 'Karnataka' },
        { item: 'Kerala' },
        { item: 'Madhya Pradesh' },
        { item: 'Maharashtra' },
        { item: 'Manipur' },
        { item: 'Meghalaya' },
        { item: 'Mizoram' },
        { item: 'Nagaland' },
        { item: 'Odisha' },
        { item: 'Punjab' },
        { item: 'Rajasthan' },
        { item: 'Sikkim' },
        { item: 'Tamil Nadu' },
        { item: 'Telangana' },
        { item: 'Tripura' },
        { item: 'Uttar Pradesh' },
        { item: 'Uttarakhand' },
        { item: 'West Bengal' }
    ]

    const [data, setData] = useState([])
    const [currentItem, setCurrentItem] = useState({
        contact_number: 96808,
        address: '22K',
        name: 'someone',
        id_type: 'PAAN',
        id_value: 'EM6980',
        gst_number: '654fds6f46s5',
        state: 'west bengal',
        pincode: 314525
    })
    const [menu, setMenu] = useState(false);
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const [idTypes, setIdTypes] = useState([])



    const toggleMobileMenu = () => {
        setMenu(!menu);
    };


    const handleAddItem = () => {

        if (editMode && currentItem) {
            updateCustomer(currentItem)
        }
        else {
            InsertCustomerToDb(currentItem)
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
            title: "Contact No.",
            dataIndex: "contact_number",
            sorter: (a, b) => a.EntryDate.length - b.EntryDate.length,
        },
        {
            title: "Address",
            dataIndex: "address",
            sorter: (a, b) => a.OmDesc.length - b.OmDesc.length,
        },
        {
            title: "Name",
            dataIndex: "name",
            sorter: (a, b) => a.OmCode.length - b.OmCode.length,
        },

        {
            title: "Id Type",
            dataIndex: "id_type",
            sorter: (a, b) => a.Purity.length - b.Purity.length,
        },
        {
            title: "Id Value",
            dataIndex: "id_value",
            sorter: (a, b) => a.grosswt.length - b.grosswt.length,
        },
        {
            title: "GST No.",
            dataIndex: "gst_number",
            sorter: (a, b) => a.netwt.length - b.netwt.length,
        },
        {
            title: "State",
            dataIndex: "state",
            sorter: (a, b) => a.stonewt.length - b.stonewt.length,
        },
        {
            title: "PIN code",
            dataIndex: "pincode",
            sorter: (a, b) => a.qty.length - b.qty.length,
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
                            deleteThisCustomer(record)
                        }}
                        className="btn btn-danger">
                        delete
                    </div>
                </div>
            ),
            sorter: (a, b) => a.Action.length - b.Action.length,
        },
    ];


    const InsertCustomerToDb = (customer) => {
        $.ajax({
            url: 'http://localhost:80/billing_api/customers.php',
            type: "POST",
            data: {
                method: "insertCustomer",
                data: JSON.stringify({ ...customer }),
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

    const updateCustomer = (customer) => {
        $.ajax({
            url: 'http://localhost:80/billing_api/customers.php',
            type: 'POST',
            data: {
                method: 'updateCustomer', // Updated method name to match your PHP function
                data: JSON.stringify({ ...customer }),
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

    const deleteThisCustomer = (customer) => {
        $.ajax({
            url: 'http://localhost:80/billing_api/customers.php',
            type: "POST",
            data: {
                method: "deleteCustomer",
                data: JSON.stringify({ id: parseInt(customer.id) }),
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
    }





    useEffect(() => {
        refreshData();
    }, [])

    useEffect(() => {
        // refreshData();
        console.log(currentItem)
    }, [currentItem])

    const refreshData = () => {
        $.ajax({
            url: 'http://localhost:80/billing_api/customers.php',
            type: "POST",
            data: {
                method: "getCustomers",
            },
            success: function (dataClient) {
                console.log(JSON.parse(dataClient));
                setData(JSON.parse(dataClient))
            },
            error: function (request, error) {
                console.log('Error')
            }
        });

        //getting id type
        $.ajax({
            url: 'http://localhost:80/billing_api/index.php',
            type: "POST",
            data: {
                method: "getIdentificationType",
            },
            success: function (dataClient) {
                console.log(JSON.parse(dataClient));
                setIdTypes(JSON.parse(dataClient))
            },
            error: function (request, error) {
                console.log('Error')
            }
        });
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
                                <h5>Customers</h5>
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
                                                        contact_number: '',
                                                        address: '',
                                                        name: '',
                                                        id_type: '',
                                                        id_value: '',
                                                        gst_number: '',
                                                        state: '',
                                                        pincode: ''
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
                                    {/* <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Entry Date</label>
                      <input
                        type="date"
                        className="form-control"
                      />
                    </div>
                  </div> */}

                                    {/* <div className="col-lg-6 col-md-12">
                                        <div className="form-group mb-0">
                                            <label>Ornament Desc</label>
                                            <Select2
                                                value={currentItem.orm_desc}
                                                onChange={(e) => setCurrentItem({ ...currentItem, orm_desc: e.target.value })}
                                                type="text"
                                                data={ornamentType}
                                                className="form-control"
                                            />
                                        </div>
                                    </div> */}

                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group">
                                            <label>Contact Number</label>
                                            <input
                                                value={currentItem.contact_number}
                                                onChange={(e) => setCurrentItem({ ...currentItem, contact_number: e.target.value })}
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>


                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input
                                                value={currentItem.address}
                                                onChange={(e) => setCurrentItem({ ...currentItem, address: e.target.value })}
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    {/* <div className="col-lg-6 col-md-12">
                                        <div className="form-group mb-0">
                                            <label>Purity</label>
                                            <Select2

                                                onChange={() => { }}
                                                className="form-control"
                                                data={purityData}
                                            />
                                        </div>
                                    </div> */}


                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                value={currentItem.name}
                                                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group">
                                            <label>ID Type</label>
                                            <Select2
                                                value={currentItem.id_type}
                                                onChange={(e) => setCurrentItem({ ...currentItem, id_type: e.target.value })}
                                                className="form-control"
                                                data={idTypes}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group">
                                            <label>ID Value</label>
                                            <input
                                                value={currentItem.id_value}
                                                onChange={(e) => setCurrentItem({ ...currentItem, id_value: e.target.value })}
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>


                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group mb-0">
                                            <label>GST Number</label>
                                            <input
                                                value={currentItem.gst_number}
                                                onChange={(e) => setCurrentItem({ ...currentItem, gst_number: e.target.value })}
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>


                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group">
                                            <label>State</label>
                                            <Select2
                                                data={stateData}
                                                value={currentItem.state}
                                                onChange={(e) => setCurrentItem({ ...currentItem, state: e.target.value })}
                                                // type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>


                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group">
                                            <label>PIN code</label>
                                            <input
                                                value={currentItem.pincode}
                                                onChange={(e) => setCurrentItem({ ...currentItem, pincode: e.target.value })}
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

export default Customers;
