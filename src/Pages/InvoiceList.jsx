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

const InvoiceList = () => {

    // const datasource = Data?.Data;
    // console.log(datasource);
    const [purityData, setPurityData] = useState([])
    const [ornamentType, setOrnamentType] = useState([])


    const [data, setData] = useState([])
    const [currentItem, setCurrentItem] = useState({
        code: 'fkdsjfl6543',
        desc: 'any desc is allowed',
        pcs: 5,
        gross_wt: 66,
        net_wt: 70,
        stone_wt: 20,
        making_charge: 6500,
        fixed_charge: 2500,
        amount: 60000,
        hsn: 'wowowow'
    })
    const [menu, setMenu] = useState(false);
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false)



    const toggleMobileMenu = () => {
        setMenu(!menu);
    };


    const handleAddItem = () => {

        if (editMode && currentItem) {
            updateInvoice(currentItem)
        }
        else {
            InsertInvoiceToDb(currentItem)
        }
        setEditMode(false)
    }




    const columns = [
        {
            title: "Invoice ID",
            dataIndex: "invoice_id",
            sorter: (a, b) => a.Id.length - b.Id.length,
        },
        {
            title: "Code",
            dataIndex: "code",
            sorter: (a, b) => a.EntryDate.length - b.EntryDate.length,
        },
        {
            title: "Description",
            dataIndex: "desc",
            sorter: (a, b) => a.OmDesc.length - b.OmDesc.length,
        },
        {
            title: "Pcs",
            dataIndex: "pcs",
            sorter: (a, b) => a.OmCode.length - b.OmCode.length,
        },

        {
            title: "Gross wt.",
            dataIndex: "gross_wt",
            sorter: (a, b) => a.Purity.length - b.Purity.length,
        },
        {
            title: "Net wt.",
            dataIndex: "net_wt",
            sorter: (a, b) => a.grosswt.length - b.grosswt.length,
        },
        {
            title: "Making Charge",
            dataIndex: "making_charge",
            sorter: (a, b) => a.netwt.length - b.netwt.length,
        },
        {
            title: "Stone wt.",
            dataIndex: "stone_wt",
            sorter: (a, b) => a.stonewt.length - b.stonewt.length,
        },
        {
            title: "Fixed Charge",
            dataIndex: "fixed_charge",
            sorter: (a, b) => a.qty.length - b.qty.length,
        },
        {
            title: "Amount",
            dataIndex: "amount",
            sorter: (a, b) => a.qty.length - b.qty.length,
        },
        {
            title: "HSN",
            dataIndex: "hsn",
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
                            deleteInvoice(record.invoice_id)
                        }}
                        className="btn btn-danger">
                        delete
                    </div>
                </div>
            ),
            sorter: (a, b) => a.Action.length - b.Action.length,
        },
    ];


    const InsertInvoiceToDb = (invoice) => {
        $.ajax({
            url: 'http://localhost:80/billing_api/invoice.php',
            type: "POST",
            data: {
                method: "insertInvoice",
                data: JSON.stringify({ ...invoice }),
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

    const updateInvoice = (thisInvoice) => {
        $.ajax({
            url: 'http://localhost:80/billing_api/invoice.php',
            type: 'POST',
            data: {
                method: 'updateTheInvoice',
                data: JSON.stringify({ ...thisInvoice }),
            },
            success: function (dataClient) {
                console.log(dataClient);
                refreshData();
            },
            error: function (request, error) {
                console.log('Error:', error);
            },
        });

    }

    const deleteInvoice = (invoice_id) => {
        $.ajax({
            url: 'http://localhost:80/billing_api/invoice.php',
            type: "POST",
            data: {
                method: "deleteInvoice",
                data: JSON.stringify({ invoice_id: invoice_id }),
            },
            success: function (dataClient) {
                // setitem('')
                try {
                    console.log(JSON.parse(dataClient))
                    refreshData();
                } catch (e) {
                    console.log(e)
                }
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
            url: 'http://localhost:80/billing_api/invoice.php',
            type: "POST",
            data: {
                method: "getInvoices",
            },
            success: function (dataClient) {
                try {
                    console.log(dataClient);
                    setData(JSON.parse(dataClient))
                } catch (e) {
                    console.log(e)
                }
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
                                <h5>Invoice List</h5>
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
                                                        code: '',
                                                        desc: '',
                                                        pcs: '',
                                                        gross_wt: '',
                                                        net_wt: '',
                                                        stone_wt: '',
                                                        making_charge: '',
                                                        fixed_charges: '',
                                                        amount: '',
                                                        hsn: ''
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
                                        <div className="form-group">
                                            <label>Code</label>
                                            <input
                                                value={currentItem.code}
                                                onChange={e => setCurrentItem({ ...currentItem, code: e.target.value })}
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group">
                                            <label>Desc</label>
                                            <input
                                                value={currentItem.desc}
                                                onChange={e => setCurrentItem({ ...currentItem, desc: e.target.value })}
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>



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
                                            <label>Pcs</label>
                                            <input
                                                value={currentItem.pcs}
                                                onChange={(e) => setCurrentItem({ ...currentItem, pcs: e.target.value })}
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    {/* <div className="col-lg-6 col-md-12">
                                        <div className="form-group mb-0">
                                            <label>Gross</label>
                                            <Select2

                                                onChange={() => { }}
                                                className="form-control"
                                                data={purityData}
                                            />
                                        </div>
                                    </div> */}


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
                                            <label>Making Charges</label>
                                            <input
                                                value={currentItem.making_charge}
                                                onChange={(e) => setCurrentItem({ ...currentItem, making_charge: e.target.value })}
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>


                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group">
                                            <label>HSN</label>
                                            <input
                                                value={currentItem.hsn}
                                                onChange={(e) => setCurrentItem({ ...currentItem, hsn: e.target.value })}
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

export default InvoiceList;
