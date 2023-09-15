import React from "react";
import { signature } from "./imagepath";
import FeatherIcon from "feather-icons-react";
import { useLocation } from "react-router-dom";

const InvoiceFormat = () => {

    const location = useLocation()
    const data = location.state.invoiceData;
    console.log(data)
    return (
        <>
            <div className="main-wrapper p-8">
                <div id="printable" className="invoice-wrapper index-two">
                    <div className="inv-content">
                        <div className="invoice-header">
                            <div className="inv-header-left">
                                <a href="#">
                                    Logo
                                    {/* <img src={InvoiceLogo} alt="Logo" /> */}
                                </a>
                                <span>original for recipient</span>
                            </div>
                            <div className="inv-header-right">
                                <div className="invoice-title">TAX INVOICE</div>
                                <div className="inv-details">
                                    <div className="inv-date">
                                        Date: <span>{data.date}</span>
                                    </div>
                                    <div className="inv-date">
                                        Invoice No: <span>00001</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="company-details">
                            <span className="company-name invoice-title ">{data.CustomerName}</span>
                            <div className="company-info">
                                <div className="gst-details">
                                    GST IN: <span>{data.GstNumber}</span>
                                </div>
                                <div className="gst-details mb-0">
                                    Mobile: <span>{data.ContactNumber}</span>
                                </div>
                                <div className="gst-details company-address">
                                    Address:{" "}
                                    <span>
                                        {data.Address}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="invoice-address">
                            <div className="invoice-to">
                                <span>Invoice To:</span>
                                <div className="inv-to-address">
                                    Walter Roberson
                                    <br />
                                    299 Star Trek Drive, Panama City, <br />
                                    Florida, 32405, USA.
                                    <br />
                                    walter@gmail.com <br />
                                    +45 5421 4523
                                </div>
                            </div>
                            <div className="invoice-to">
                                <span>Pay To:</span>
                                <div className="inv-to-address">
                                    Lowell H. Dominguez
                                    <br /> 84 Spilman Street, London
                                    <br />
                                    United King
                                    <br />
                                    domlowell@gmail.com
                                    <br />
                                    +45 5421 2154
                                </div>
                            </div>
                        </div>
                        <div className="invoice-table">
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="table_width_1">#</th>
                                            <th className="table_width_2">Product</th>
                                            <th className="table_width_3">Type</th>
                                            <th className="table_width_1">Purity</th>
                                            <th className="table_width_3 text-center">Desc</th>
                                            <th className="table_width_1 text-center">Gross</th>
                                            <th className="table_width_1 text-center">Net</th>
                                            <th className="table_width_4 text-end">Rate</th>
                                            <th className="table_width_4 text-end">amount</th>
                                            <th className="table_width_4 text-end">making charges</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.items.map((curr, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td className=""> {curr.product}</td>
                                                    <td className=""> {curr.type}</td>
                                                    <td className=""> {curr.purity}</td>
                                                    <td className="table-description text-center">
                                                        {curr.desc}
                                                    </td>
                                                    <td className="text-center">{curr.pcs}</td>
                                                    <td className="text-center">{curr.gross}</td>
                                                    <td className="text-center">{curr.net}</td>
                                                    <td className="text-end">₹{curr.rate}</td>
                                                    <td className="text-end">₹{curr.making_charges}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="invoice-table-footer">
                            <div className="table-footer-left notes">
                                <span>Important Note:</span>{" "}
                                <div className="delivery-notes">
                                    {data.Notes}
                                </div>
                            </div>
                            <div className="text-end table-footer-right">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Taxable Amount</td>
                                            <td>18400</td>
                                        </tr>
                                        <tr>
                                            <td>Discounted Price</td>
                                            <td>{data.DiscountedPrice}</td>
                                        </tr>
                                        <tr>
                                            <td>GST {data.CGst} </td>
                                            <td>$165.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="invoice-table-footer totalamount-footer">
                            <div className="table-footer-left">
                                <p className="total-info">Total Items / Qty : 4 / 4.00</p>
                            </div>
                            <div className="table-footer-right">
                                <table className="totalamt-table">
                                    <tbody>
                                        <tr>
                                            <td>Total</td>
                                            <td>{data.TotalAmount}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="total-amountdetails">
                            <p>
                                Total amount ( in words):{" "}
                                <span>INR One Thousand Eight Hundred Fifteen Rupees Only.</span>
                            </p>
                        </div>
                        <div className="bank-details">
                            <div className="payment-info">
                                <span className="payment-title">Payment Info:</span>
                                <div>
                                    <span>Debit Card :</span> 465 *************645
                                </div>
                                <div>
                                    <span>Amount :</span> $1,815
                                </div>
                            </div>
                            <div className="company-sign">
                                <span>For Dreamguys</span>
                                <img src={signature} alt="" />
                            </div>
                        </div>
                        <div className="terms-condition">
                            <span>Terms and Conditions:</span>
                            <ol>
                                <li> Goods Once sold cannot be taken back or exchanged</li>
                                <li>
                                    {" "}
                                    We are not the manufactures, company will stand for warrenty
                                    as per their terms and conditions.
                                </li>
                            </ol>
                        </div>
                        <div className="thanks-msg text-center">
                            Thanks for your Business
                        </div>
                    </div>
                </div>
                <div id="nonPrintable" className="file-link">
                    <button className="download_btn download-link">
                        {/* <i className="feather-download-cloud me-1" /> */}
                        <FeatherIcon icon="download-cloud" className="me-1" />
                        <span>Download</span>
                    </button>
                    <a href="javascript:window.print()" className="print-link">
                        {/* <i className="feather-printer" />  */}
                        <FeatherIcon icon="printer" className="me-1" />
                        <span className="">Print</span>
                    </a>
                </div>
            </div>


            {/* here is printable */}

        </>
    );
};

export default InvoiceFormat;
