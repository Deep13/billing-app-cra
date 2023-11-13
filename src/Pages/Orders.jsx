import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Header from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Select2 from '../components/SelectDropdown'
import { Logo, signature, circle1, circle2 } from "../components/imagepath";
import FeatherIcon from "feather-icons-react";
// import Select2 from "react-select2-wrapper";

const Orders = () => {
    const [menu, setMenu] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const toggleMobileMenu = () => {
        setMenu(!menu);
    };
    const state = [
        { id: 4, item: 'Andhra Pradesh' },
        { id: 5, item: 'Arunachal Pradesh' },
        { id: 6, item: 'Assam' },
        { id: 7, item: 'Bihar' },
        { id: 8, item: 'Chhattisgarh' },
        { id: 9, item: 'Goa' },
        { id: 10, item: 'Gujarat' },
        { id: 11, item: 'Haryana' },
        { id: 12, item: 'Himachal Pradesh' },
        { id: 13, item: 'Jharkhand' },
        { id: 14, item: 'Karnataka' },
        { id: 15, item: 'Kerala' },
        { id: 16, item: 'Madhya Pradesh' },
        { id: 17, item: 'Maharashtra' },
        { id: 18, item: 'Manipur' },
        { id: 19, item: 'Meghalaya' },
        { id: 20, item: 'Mizoram' },
        { id: 21, item: 'Nagaland' },
        { id: 22, item: 'Odisha' },
        { id: 23, item: 'Punjab' },
        { id: 24, item: 'Rajasthan' },
        { id: 25, item: 'Sikkim' },
        { id: 26, item: 'Tamil Nadu' },
        { id: 27, item: 'Telangana' },
        { id: 28, item: 'Tripura' }
    ];
    const [invoiceData, setInvoiceData] = useState({
        ContactNumber: '',
        CustomerName: '',
        IdType: '',
        CardNumber: '',
        Address: '',
        DueDate: '',
        State: '',
        InovoiceDate: '',
        GstNumber: '',
        CityPin: '',
        PaymentMode: 'Cash',
        Notes: '',
    })
    const [cardType, setCardType] = useState('card')

    const getCustomerByContact = (contact_number) => {
        if (contact_number) {
            $.ajax({
                url: 'http://localhost:80/billing_api/customers.php',
                type: "POST",
                data: {
                    method: "getCustomerByContact",
                    data: JSON.stringify({ contact_number: contact_number }),
                },
                success: function (dataClient) {
                    try {
                        let thisData = JSON.parse(dataClient)
                        console.log(thisData);
                        if (dataClient.includes('not found')) {
                            alert('Customer not registered with Entered Contact number')
                        } else {
                            setInvoiceData({
                                ...invoiceData,
                                CustomerName: thisData.name,
                                Address: thisData.address,
                                State: thisData.state,
                                GstNumber: thisData.gst_number,
                                IdType: thisData.id_type,
                                CardNumber: thisData.id_value,
                                CityPin: thisData.pincode,
                            })
                        }
                    }
                    catch (e) {

                    }
                },
                error: function (request, error) {
                    console.log('Error')
                },
            });
        }
    }

    const [tableItems, setTableItems] = useState([
        {
            product: 'Product1',
            type: 'Gold',
            purity: 54,
            rate: 64000,
            desc: 'very good',
            pcs: 2,
            gross: 153500,
            net: 153600,
            amount: 156000,
            making_chares: 12000,
        }
    ])

    const [idChoices, setIdChoices] = useState([])

    useEffect(() => {
        let elements = Array.from(
            document.getElementsByClassName("react-datepicker-wrapper")
        );
        elements.map((element) => element.classList.add("w-100"));
    }, []);

    return (
        <>
            <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
                <Header onMenuClick={(value) => toggleMobileMenu()} />
                <Sidebar />
                {/* <!-- Page Wrapper --> */}
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="content-page-header">
                                <h5>Order Management</h5>
                            </div>
                        </div>
                        <div style={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between' }}>
                            <div className="form-group" style={{ width: '30%' }}>
                                <label>Contact Number</label>
                                <input
                                    autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Your Phone Number"
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            getCustomerByContact(e.target.value)
                                        }
                                    }}
                                />
                            </div>
                            <div className="form-group" style={{ width: '30%' }}>
                                <label>Customer Name</label>
                                <ul className="form-group">
                                    <li>
                                        <input
                                            type="text"
                                            value={invoiceData.CustomerName}
                                            className="form-control"
                                            placeholder="Name"
                                        />
                                    </li>
                                    <li>
                                    </li>
                                </ul>
                            </div>
                            <div className="form-group" style={{ width: '30%' }}>
                                <label>GST Number</label>
                                <input
                                    value={invoiceData.GstNumber}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter GST Number"
                                />
                            </div>
                            <div className="form-group" style={{ width: '30%' }}>
                                <label>Address</label>
                                <textarea
                                    value={invoiceData.Address}
                                    className="form-control"
                                    placeholder="Enter Address"
                                    defaultValue={""}
                                    rows={4}
                                />
                            </div>
                            <div className="form-group" style={{ width: '30%' }}>
                                <label>ID Type</label>
                                <Select2
                                    value={invoiceData.IdType}
                                    onChange={(e) => { setInvoiceData({ ...invoiceData, IdType: e.target.value }) }}
                                    className='form-control relative'
                                    data={idChoices}
                                />
                                <br />
                                <input
                                    value={invoiceData.CardNumber}
                                    className='form-control relative'
                                    placeholder={`Enter your ${cardType} number here`}
                                />
                            </div>
                            <div className="form-group" style={{ width: '30%' }}>
                                <label>State</label>
                                <Select2
                                    value={invoiceData.State}
                                    onChange={(e) => { setInvoiceData({ ...invoiceData, State: e.target.value }) }}
                                    className='form-control relative'
                                    data={state}
                                />
                                <br />
                                <div className="form-group" >
                                    {/* <label>City PIN</label> */}
                                    <input
                                        value={invoiceData.CityPin}
                                        type="text"
                                        className="form-control"
                                        placeholder="City PIN"
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="form-group-item border-0 mb-0">
                                            <div className="row align-item-center">
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Memo Number</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter First Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Customer Name</label>
                                                        <ul className="form-group-plus css-equal-heights">
                                                            <li>
                                                            </li>
                                                            <li>
                                                                <Link
                                                                    className="btn btn-primary form-plus-btn"
                                                                    to="/add-customer"
                                                                >
                                                                    <FeatherIcon icon="plus-circle" />
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Memo Date</label>
                                                        <div className="cal-icon cal-icon-info">
                                                            <DatePicker
                                                                className="datetimepicker form-control"
                                                                selected={startDate}
                                                                onChange={(date) => setStartDate(date)}
                                                            ></DatePicker>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter First Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Bill Due</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter First Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Due paid till date</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter First Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Recipt No</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Phone Number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Entry Date</label>
                                                        <div className="cal-icon cal-icon-info">
                                                            <DatePicker
                                                                className="datetimepicker form-control"
                                                                selected={startDate}
                                                                onChange={(date) => setStartDate(date)}
                                                            ></DatePicker>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row align-item-center">
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Cash</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Website Address"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row align-item-center">
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Cheque</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Website Address"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row align-item-center">
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Card</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Website Address"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group-item border-0 p-0">
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-12">
                                                    <div className="form-group-bank">
                                                        <div className="form-group">
                                                            <label>Select Bank</label>
                                                            <div className="bank-details">
                                                                <Link
                                                                    className="text-danger-light"
                                                                    to="#"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#bank_details"
                                                                >
                                                                    <i className="fas fa-bank me-2" />
                                                                    Add Bank Details
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="form-group notes-form-group-info">
                                                            <label>Notes</label>
                                                            <textarea
                                                                className="form-control"
                                                                placeholder="Enter Notes"
                                                                defaultValue={""}
                                                            />
                                                        </div>
                                                        <div className="form-group notes-form-group-info mb-0">
                                                            <label>Terms and Conditions</label>
                                                            <textarea
                                                                className="form-control"
                                                                placeholder="Enter Terms and Conditions"
                                                                defaultValue={""}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-12">
                                                    <div className="form-group-bank">
                                                        <div className="row">
                                                            <div className="col-lg-4 col-md-12">
                                                                <div className="form-group">
                                                                    <label>Discount Type</label>

                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-12">
                                                                <div className="form-group">
                                                                    <label>Discount (%)</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder={10}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-12">
                                                                <div className="form-group">
                                                                    <label>Total discount</label>
                                                                    <input
                                                                        type="text"
                                                                        className="bg-white-smoke form-control"
                                                                        placeholder="13.2"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="invoice-total-box">
                                                            <div className="invoice-total-inner">
                                                                <p>
                                                                    Taxable Amount <span>₹120.00</span>
                                                                </p>
                                                                <p>
                                                                    Discount <span>₹13.20</span>
                                                                </p>
                                                                <p>
                                                                    Vat <span>₹0.00</span>
                                                                </p>
                                                                <div className="status-toggle justify-content-between">
                                                                    <div className="d-flex align-center">
                                                                        <p>Round Off </p>
                                                                        <input
                                                                            id="rating_1"
                                                                            className="check"
                                                                            type="checkbox"
                                                                            defaultChecked="true"
                                                                        />
                                                                        <label
                                                                            htmlFor="rating_1"
                                                                            className="checktoggle checkbox-bg"
                                                                        >
                                                                            checkbox
                                                                        </label>
                                                                    </div>
                                                                    <span>₹0.00</span>
                                                                </div>
                                                            </div>
                                                            <div className="invoice-total-footer">
                                                                <h4>
                                                                    Total Amount <span>₹107.80</span>
                                                                </h4>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Signature Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter Signature Name"
                                                            />
                                                        </div>
                                                        <div className="form-group mb-0">
                                                            <label>Signature Image</label>
                                                            <div className="form-group service-upload service-upload-info mb-0">
                                                                <span>
                                                                    <FeatherIcon
                                                                        icon="upload-cloud"
                                                                        className="me-1"
                                                                    />
                                                                    Upload Signature
                                                                </span>
                                                                <input
                                                                    type="file"
                                                                    multiple=""
                                                                    id="image_sign"
                                                                />
                                                                <div id="frames" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="add-customer-btns text-end">
                                            <button
                                                type="reset"
                                                className="btn btn-primary cancel me-2"
                                            >
                                                Cancel
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="modal custom-modal fade"
                    id="add_discount"
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0 align-center">
                                    <h4 className="mb-0">Add Tax &amp; Discount</h4>
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
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Rate</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder={120}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Discount Amount</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder={0}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group mb-0">
                                            <label>Tax</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer add-tax-btns">
                                <button
                                    type="reset"
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary paid-cancel-btn me-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary paid-continue-btn"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="modal custom-modal fade"
                    id="delete_discount"
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header border-0 justify-content-center pb-0">
                                <div className="form-header modal-header-title text-center mb-0">
                                    <h4 className="mb-2">Delete Product / Services</h4>
                                    <p>Are you sure want to delete?</p>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="modal-btn delete-action">
                                    <div className="row">
                                        <div className="col-6">
                                            <Link
                                                to="#"
                                                data-bs-dismiss="modal"
                                                className="btn btn-primary paid-continue-btn"
                                            >
                                                Delete
                                            </Link>
                                        </div>
                                        <div className="col-6">
                                            <Link
                                                to="#"
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
                {/* /Delete Items Modal */}

                {/* Add Bank Details Modal */}
                <div
                    className="modal custom-modal fade"
                    id="bank_details"
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0">
                                    <h4 className="mb-0">Add Bank Details</h4>
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
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>
                                                Bank Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Bank Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>
                                                Account Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter Account Number"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>
                                                Branch Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Branch Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group mb-0">
                                            <label>
                                                IFSC Code <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter IFSC COde"
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
                                    Back
                                </Link>
                                <Link
                                    to="#"
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary paid-continue-btn"
                                >
                                    Save
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Add Bank Details Modal */}
            </div>
        </>
    );
};
export default Orders;
