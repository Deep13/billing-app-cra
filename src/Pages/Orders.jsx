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

    const [product, setProduct] = useState([
        { id: 1, text: "Choose Customer" },
        { id: 2, text: "Customer 1" },
        { id: 3, text: "Customer 2" },
        { id: 4, text: "Customer 3" },
    ]);

    const [state, setState] = useState([
        { text: 'Andhra Pradesh' },
        { text: 'Arunachal Pradesh' },
        { text: 'Assam' },
        { text: 'Bihar' },
        { text: 'Chhattisgarh' },
        { text: 'Goa' },
        { text: 'Gujarat' },
        { text: 'Haryana' },
        { text: 'Himachal Pradesh' },
        { text: 'Jharkhand' },
        { text: 'Karnataka' },
        { text: 'Kerala' },
        { text: 'Madhya Pradesh' },
        { text: 'Maharashtra' },
        { text: 'Manipur' },
        { text: 'Meghalaya' },
        { text: 'Mizoram' },
        { text: 'Nagaland' },
        { text: 'Odisha' },
        { text: 'Punjab' },
        { text: 'Rajasthan' },
        { text: 'Sikkim' },
        { text: 'Tamil Nadu' },
        { text: 'Telangana' },
        { text: 'Tripura' },
        { text: 'Uttar Pradesh' },
        { text: 'Uttarakhand' },
        { text: 'West Bengal' }
    ])

    const [jewelleryType, setJewelleryType] = useState([
        { text: "Diamond Necklace" },
        { text: "Gold Bracelet" },
        { text: "Pearl Earrings" },
        { text: "Silver Ring" },
        { text: "Sapphire Pendant" },
        { text: "Emerald Brooch" },
        { text: "Ruby Anklet" },
        { text: "Amethyst Tiara" },
        { text: "Opal Cufflinks" },
        { text: "Platinum Watch" },
    ])

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



    const [idType, setIdType] = useState([
        { id: 1, text: "Aadhar Card" },
        { id: 3, text: "PAN Card" },
        { id: 2, text: "Driving License" },
        { id: 4, text: "Voter Id" }
    ])

    const [productOption, setProductOption] = useState([
        { id: 1, text: "Select Product" },
        { id: 2, text: "Product 1" },
        { id: 3, text: "Product 2" },
        { id: 4, text: "Product 3" },
    ]);

    const [currency, setCurrency] = useState([
        { id: 1, text: "Select Currency" },
        { id: 2, text: "US dollar" },
        { id: 3, text: "Euro" },
        { id: 4, text: "Pound sterling" },
        { id: 5, text: "Swiss franc" },
    ]);

    const [percentage, setPercentage] = useState([
        { id: 1, text: "Percentage(%)" },
        { id: 2, text: "0%" },
        { id: 3, text: "5%" },
        { id: 4, text: "10%" },
        { id: 5, text: "15%" },
    ]);

    const [tax, setTax] = useState([
        { id: 1, text: "N/A" },
        { id: 2, text: "5%" },
        { id: 3, text: "10%" },
        { id: 4, text: "15%" },
    ]);

    const AddItemToTable = () => {
        let item = {
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
        setTableItems(prev => [item, ...prev])

    }

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
                                <h5>Invoice Generation</h5>
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
                                                        <label>Contact Number</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Your Phone Number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Customer Name</label>
                                                        <ul className="form-group-plus css-equal-heights">
                                                            <li>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Name"
                                                                />
                                                            </li>
                                                            <li>
                                                                {/* <Link
                                  className="btn btn-primary form-plus-btn"
                                  to="/add-customer"
                                >
                                  <i className="fe fe-plus-circle" />
                                  <FeatherIcon icon="plus-circle" />
                                </Link> */}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Invoice Date</label>
                                                        <div className="cal-icon cal-icon-info">
                                                            <DatePicker
                                                                className="datetimepicker form-control"
                                                                selected={startDate}
                                                                onChange={(date) => setStartDate(date)}
                                                            ></DatePicker>
                                                            {/* <FeatherIcon icon="calendar"/> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group notes-form-group-info">
                                                        <label>Address</label>
                                                        <textarea
                                                            className="form-control"
                                                            placeholder="Enter Address"
                                                            defaultValue={""}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>Due Date</label>
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
                                                        <label>ID Type</label>
                                                        <br />
                                                        <Select2
                                                            className='form-control relative'
                                                            data={idType}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Card Number</label>
                                                        <br />
                                                        <input
                                                            className='form-control relative'
                                                            placeholder="Enter your card number here"
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group d-flex align-items-end h-100">
                            <label className="custom_check me-3">
                              <input type="checkbox" name="invoice" />
                              <span className="checkmark" /> Enable tax
                            </label>
                            <label className="custom_check">
                              <input type="checkbox" name="re_invoice" />
                              <span className="checkmark" /> Recurring Invoice
                            </label>
                          </div>
                        </div> */}
                                                <div className="col-lg-12">
                                                    {/* <div className="form-group">
                            <label>Products</label>
                            <ul className="form-group-plus css-equal-heights">
                              <li>
                                <select className="select">
                                  <option>Select Product</option>
                                  <option>Product 1</option>
                                  <option>Product 2</option>
                                  <option>Product 3</option>
                                </select>
                                <Select2
                                  // className="w-100"
                                  data={productOption}
                                  options={{
                                    placeholder: "Select Product",
                                  }}
                                />
                              </li>
                              <li>
                                <Link
                                  className="btn btn-primary form-plus-btn"
                                  to="/add-product"
                                >
                                  <i className="fe fe-plus-circle" />
                                  <FeatherIcon icon="plus-circle" />
                                </Link>
                              </li>
                            </ul>
                          </div> */}
                                                </div>
                                                {/* <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Currency</label>
                            <Select2
                              // className="w-100"
                              data={currency}
                              options={{
                                placeholder: "Select Currency",
                              }}
                            />
                          </div>
                        </div> */}
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>GST Number</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter GST Number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>State</label>
                                                        <Select2
                                                            className='form-control relative'
                                                            data={state}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label>City PIN</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter PIN code here"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 py-2 col-md-6 col-sm-12 flex justify-end items-center">
                                            <button
                                                data-bs-toggle="modal"
                                                data-bs-target="#add_discount"
                                                // onClick={AddItemToTable}
                                                className="btn btn-primary flex items-center gap-2">
                                                <FeatherIcon icon='plus' />
                                                Add Product
                                            </button>
                                        </div>
                                        <div className="form-group-item">
                                            <div className="card-table">
                                                <div className="card-body add-invoice">
                                                    <div className="table-responsive">
                                                        <table className="table table-center table-hover datatable">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>Product / Service</th>
                                                                    <th>Type</th>
                                                                    <th>Purity</th>
                                                                    <th>Rate</th>
                                                                    <th>Description</th>
                                                                    <th>Pcs</th>
                                                                    <th>Gross.</th>
                                                                    <th>Net</th>
                                                                    <th>Amount</th>
                                                                    <th>Making charges</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            {
                                                                tableItems.map((curr, index) => {
                                                                    return (
                                                                        <tbody key={curr.product + index}>
                                                                            <tr >
                                                                                <td>{curr.product}</td>
                                                                                <td>{curr.type}</td>
                                                                                <td>{curr.purity}</td>
                                                                                <td>{curr.rate}</td>
                                                                                <td>{curr.desc}</td>
                                                                                <td>{curr.pcs}</td>
                                                                                <td>{curr.gross}</td>
                                                                                <td>{curr.net}</td>
                                                                                <td>{curr.amount}</td>
                                                                                <td>{curr.making_chares}</td>
                                                                                <td className="d-flex align-items-center">
                                                                                    <Link
                                                                                        to="#"
                                                                                        className="btn-action-icon me-2"
                                                                                        data-bs-toggle="modal"
                                                                                        data-bs-target="#add_discount"
                                                                                    >
                                                                                        <span>
                                                                                            {/* <i className="fe fe-edit" /> */}
                                                                                            <FeatherIcon icon="edit" />
                                                                                        </span>
                                                                                    </Link>
                                                                                    <Link
                                                                                        to="#"
                                                                                        className="btn-action-icon"
                                                                                        data-bs-toggle="modal"
                                                                                        data-bs-target="#delete_discount"
                                                                                    >
                                                                                        <span>
                                                                                            {/* <i className="fe fe-trash-2" /> */}
                                                                                            <FeatherIcon icon="trash-2" />
                                                                                        </span>
                                                                                    </Link>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    )
                                                                })
                                                            }
                                                        </table>
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
                                                                    {/* <Select2
                                    // className="w-100"
                                    data={percentage}
                                    options={{
                                      placeholder: "Percentage(%)",
                                    }}
                                  /> */}
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
                                                                    CGST <span>₹120.00</span>
                                                                </p>
                                                                <p>
                                                                    SGST <span>₹120.00</span>
                                                                </p>
                                                                <p>
                                                                    Discount <span>₹13.20</span>
                                                                </p>
                                                                <p>
                                                                    Payment Mode
                                                                </p>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioCheckedDisabled" checked />
                                                                    <label className="form-check-label" >
                                                                        Card
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioCheckedDisabled" />
                                                                    <label className="form-check-label" >
                                                                        Cash
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioCheckedDisabled" />
                                                                    <label className="form-check-label" >
                                                                        Other
                                                                    </label>
                                                                </div>

                                                                {/* <p>
                                  Vat <span>₹0.00</span>
                                </p> */}
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
                                                        {/* <div className="form-group">
                              <label>Signature Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Signature Name"
                              />
                            </div> */}
                                                        {/* <div className="form-group mb-0">
                              <label>Signature Image</label>
                              <div className="form-group service-upload service-upload-info mb-0">
                                <span>
                                  <i className="fe fe-upload-cloud me-1" />
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
                            </div> */}
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

                {/* Add Tax & Discount Modal */}
                <div
                    className="modal custom-modal fade"
                    id="add_discount"
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0 align-center">
                                    <h4 className="mb-0">Add/Edit</h4>
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
                                            <label>Product</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={120}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Type</label>
                                            <Select2
                                                className="form-control w-100"
                                                data={jewelleryType}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Purity</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={0}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Rate</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={0}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={0}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Number of Pieces(Pcs.)</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={0}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Amount</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={0}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Making Charges</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={0}
                                            />
                                        </div>
                                    </div>


                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group mb-0">
                                            <label>Tax</label>
                                            <Select2
                                                className="w-100 form-control"
                                                data={tax}
                                                options={{
                                                    placeholder: "Choose Customer",
                                                }}
                                            />
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
                {/* /Add Tax & Discount Modal */}

                {/* Delete Items Modal */}
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
