import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import FeatherIcon from "feather-icons-react";
// import Data from "../assets/jsons/productList";
import "../../components/antd.css";
import { Table } from "antd";
import Select2 from '../../components/SelectDropdown'

import * as bootstrap from 'bootstrap'
// import {
//     onShowSizeChange,
//     itemRender,
// } from "../components/paginationfunction";
// import AddVendor from "../vendors/addVendor";
// import { FilterChart, search } from "../components/imagepath";

const HSNCode = () => {
    const [menu, setMenu] = useState(false);
    const [item, setitem] = useState(null);
    const [selectedItem, setselectedItem] = useState(null);
    const [toBeDeleteItem, setToBeDeleteItem] = useState(null);
    const [OrnamentType, setOrnamentType] = useState([]);
    const [newProduct, setnewProduct] = useState({ id: null, item: '', om_type: '', om_id: '' });

    const [datasource, setdatasource] = useState([]);
    useEffect(() => {
        refreshData();
    }, [])

    const refreshData = () => {
        $.ajax({
            url: 'http://localhost:80/billing_api/index.php',
            type: "POST",
            data: {
                method: "getHsnCode",
            },
            success: function (dataClient) {
                try {
                    setdatasource(JSON.parse(dataClient))
                } catch (e) {
                    setdatasource([])
                    console.log(e)
                }
                console.log(dataClient);
            },
            error: function (request, error) {
                console.log('Error')
            },
        });
        $.ajax({
            url: 'http://localhost:80/billing_api/index.php',
            type: "POST",
            data: {
                method: "getOrnamentType",
            },
            success: function (dataClient) {
                try {
                    setOrnamentType(JSON.parse(dataClient))
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
    }



    const toggleMobileMenu = () => {
        setMenu(!menu);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            sorter: (a, b) => a.id.length - b.id.length,
        },
        {
            title: "Product",
            dataIndex: "om_type",
            sorter: (a, b) => a.item.length - b.item.length,
        },
        {
            title: "HSN",
            dataIndex: "item",
            sorter: (a, b) => a.item.length - b.item.length,
        },
        {
            title: "Action",
            dataIndex: "Action",
            render: (text, record) => (
                <>
                    <div className="align-items-center flex items-center gpa-2 justify-start">
                        <button
                            onClick={() => showEditModel(record)}
                            style={{ marginRight: 10 }}
                            className="btn btn-primary gap-2">
                            Edit
                        </button>
                        {
                            (record.item === toBeDeleteItem) ?
                                <>
                                    <button onClick={() => deleteItem(record)} className="btn btn-primary ms-1 me-2">confirm</button>
                                    <button onClick={() => {
                                        setitem(null)
                                        // setConfirmDelete(false)
                                    }} className="btn btn-danger">Cancel</button>
                                </>

                                :
                                <button
                                    onClick={() => {
                                        // console.log(record)
                                        // setitem(record.item)
                                        // setConfirmDelete(true)
                                        // deleteItem(record)
                                        setToBeDeleteItem(record.item)
                                    }}
                                    // onClick={AddItemToTable}
                                    className="btn btn-danger gap-2">
                                    Delete
                                </button>
                        }
                    </div>
                </>
            )
        },
    ];


    const handleAddItem = () => {
        if (selectedItem) {

            $.ajax({
                url: 'http://localhost:80/billing_api/index.php',
                type: "POST",
                data: {
                    method: "updateHsnCode",
                    data: JSON.stringify({ ...newProduct, id: parseInt(newProduct.id) }),
                },
                success: function (dataClient) {
                    refreshData();
                    console.log(dataClient);
                    setnewProduct({ id: null, item: '', otid: '', ottitle: '', suffix: '' })
                    setselectedItem(null)
                },
                error: function (request, error) {
                    console.log('Error')
                },
            });


        }
        else {
            // var lastIndex = datasource.length;
            // setdatasource([...datasource, { Id: lastIndex, Item: item }])
            $.ajax({
                url: 'http://localhost:80/billing_api/index.php',
                type: "POST",
                data: {
                    method: "insertHsnCode",
                    data: JSON.stringify(newProduct),
                },
                success: function (dataClient) {
                    console.log(dataClient);
                    refreshData();
                },
                error: function (request, error) {
                    console.log('Error')
                },
            });
            setitem('')
        }
    }




    const showEditModel = (record) => {
        setnewProduct(record)
        setselectedItem(record)
        setitem(record.desc)
        var myModal = new bootstrap.Modal(document.getElementById('edit_inventory'));
        myModal.show()
    }

    const deleteItem = (record) => {
        $.ajax({
            url: 'http://localhost:80/billing_api/index.php',
            type: "POST",
            data: {
                method: "deleteHsnCode",
                data: JSON.stringify({ id: record.id }),
            },
            success: function (dataClient) {
                setitem('')
                var items = datasource.filter(val => val.id !== record.id);
                setdatasource([...items])
            },
            error: function (request, error) {
                console.log('Error')
            },
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
                                <h5>Master Data</h5>
                                <div className="list-btn">
                                    <ul className="filter-list">

                                        <li>
                                            <button
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_inventory"
                                                // onClick={AddItemToTable}
                                                className="btn btn-primary flex items-center gap-2">
                                                <FeatherIcon icon='plus' />
                                                Add Product
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* /Page Header */}
                        {/* All Invoice */}
                        <div className="card invoices-tabs-card">
                            <div className="invoices-main-tabs">
                                <div className="row align-items-center">
                                    <div className="col-lg-12">
                                        <div className="invoices-tabs">
                                            <ul>
                                                <li>
                                                    <Link to="/master-data" className="">
                                                        Ornament
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/ornament-type" className="">
                                                        Ornament Type
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/purity" className="">
                                                        Purity
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/identification-type" className="">
                                                        Identification Type
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/token-entry">Token Entry</Link>
                                                </li>
                                                <li>
                                                    <Link to="/gst-entry">GST pctg entry</Link>
                                                </li>
                                                <li>
                                                    <Link to="/state-code">STATE Code</Link>
                                                </li>
                                                <li>
                                                    <Link className="active" to="/hsn-code">HSN Code</Link>
                                                </li>
                                                <li>
                                                    <Link to="/hm-charge">HM Charge</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /All Invoice */}
                        {/* Table */}
                        <div className="row">
                            <div className="col-sm-12">
                                <div className=" card-table">
                                    <div className="card-body">
                                        <div className="table-responsive table-hover table-striped">
                                            <Table
                                                pagination={false}
                                                // pagination={{
                                                //     total: datasource.length,
                                                //     showTotal: (total, range) =>
                                                //         `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                //     showSizeChanger: true,
                                                //     onShowSizeChange: onShowSizeChange,
                                                //     itemRender: itemRender,
                                                // }}
                                                columns={columns}
                                                dataSource={datasource}
                                                rowKey={(record) => record.id}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Table */}
                    </div>


                </div>

                <div className="modal custom-modal fade" id="edit_inventory" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0">
                                    <h4 className="mb-0">Add Items</h4>
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
                                    <div className="col-lg-12">
                                        <div className="form-group mb-0">
                                            <label>Ornament Type</label>
                                            <Select2
                                                value={newProduct.om_type}
                                                onChange={(e) => {
                                                    setnewProduct({ ...newProduct, om_type: OrnamentType[e.target.selectedIndex].item, om_id: OrnamentType[e.target.selectedIndex].id });
                                                    console.log({ ...newProduct })
                                                }}
                                                type="text"
                                                data={OrnamentType}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12" style={{ marginTop: 10 }}>
                                        <div className="form-group mb-0">
                                            <label>HSN</label>
                                            <input
                                                // ref={OrnamentDescRef}
                                                type="text"
                                                className="form-control"
                                                style={{ width: '100%' }}
                                                value={newProduct.item}
                                                onChange={(text) => {
                                                    setnewProduct({ ...newProduct, item: text.target.value });
                                                    console.log({ ...newProduct })
                                                }}
                                            // defaultValue="Stock in"
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
                                    Add
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HSNCode;
