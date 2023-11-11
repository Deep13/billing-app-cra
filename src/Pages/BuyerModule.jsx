import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Select2 from '../components/SelectDropdown'
// import { Logo, signature, circle1, circle2 } from "../components/imagepath";
import FeatherIcon from "feather-icons-react";
import TableRow from "../components/TableRow";
import InvoiceFormat from "../components/InvoiceFormat";
// import Select2 from "react-select2-wrapper";
import { Table } from "antd";
import { ToastContainer, toast } from "react-toastify";

import $ from 'jquery'
const BuyerModule = () => {


  // state for storing if the customer is already present
  const [presence, setPresence] = useState('')

  const [menu, setMenu] = useState(false);
  const [HMCharge, setHMCharge] = useState(false);
  const [total, settotal] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [CGSTTax, setCGSTTax] = useState(0);
  const [SGSTTax, setSGSTTax] = useState(0);
  const [discount, setdiscount] = useState(0);
  const [manualdiscount, setmanualdiscount] = useState(0);
  const [roundoff, setroundoff] = useState(0);
  const [isroundoff, setisroundoff] = useState(false);
  const salesmanCode = localStorage.getItem('logid') ? JSON.parse(localStorage.getItem('logid')) : null;
  const navigate = useNavigate()
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  const columns = [
    {
      title: "Code",
      dataIndex: "om_code",
      sorter: (a, b) => a.id.length - b.id.length,
      render: (text, data, index) =>
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              getStockData(e.target.value, index);
            }
            // 
          }
          }
          onChange={(e) => {
            var temp = [...tableItems];
            temp[index].om_code = e.target.value;
            setTableItems([...temp])
          }} value={text} type="text" />

    },
    {
      title: "Description",
      dataIndex: "orm_desc",
      sorter: (a, b) => a.item.length - b.item.length,
      render: (text, data, index) =>
        <input
          onChange={(e) => {
            var temp = [...tableItems];
            temp[index].orm_desc = e.target.value;
            setTableItems([...temp])
          }}
          //  value={text}
          type="text" />
    },
    {
      title: "Pcs",
      dataIndex: "qty",
      sorter: (a, b) => a.item.length - b.item.length,
      render: (text, data, index) =>
        <input
          onChange={(e) => {
            var temp = [...tableItems];
            temp[index].qty = e.target.value;
            setTableItems([...temp])
          }}
          // value={text}
          type="text" />
    },
    {
      title: "Gross",
      dataIndex: "gross_wt",
      sorter: (a, b) => a.item.length - b.item.length,
      render: (text, data, index) =>
        <input
          onChange={(e) => {
            var temp = [...tableItems];
            temp[index].gross_wt = e.target.value;
            setTableItems([...temp])
          }}
          // value={text}
          type="text" />
    },
    {
      title: "Net",
      dataIndex: "net_wt",
      sorter: (a, b) => a.item.length - b.item.length,
      render: (text, data, index) =>
        <input
          onChange={(e) => {
            var temp = [...tableItems];
            temp[index].net_wt = e.target.value;
            setTableItems([...temp])
          }}
          //  value={text} 
          type="text" />
    }, {
      title: "Value",
      dataIndex: "value",
      sorter: (a, b) => a.item.length - b.item.length,
      render: (text, data, index) =>
        <input
          onChange={(e) => {
            var temp = [...tableItems];
            temp[index].value = e.target.value;
            setTableItems([...temp])
          }}
          // value={text}
          type="text" />
    }, {
      title: "Making",
      dataIndex: "making",
      sorter: (a, b) => a.item.length - b.item.length,
      render: (text, data, index) =>
        <input
          onChange={(e) => {
            var temp = [...tableItems];
            temp[index].making = e.target.value;
            var hmVal = 0
            if (e.target.value) {
              hmVal = e.target.value;
            }


            temp[index].amount = (parseFloat(temp[index].net_wt) * parseFloat(invoiceData.rate ? invoiceData.rate : 1)) + parseFloat(temp[index].hmcharge) + parseFloat(hmVal);
            setTableItems([...temp])
          }}
          //  value={text}
          type="text" />
    }, {
      title: "St. Wt",
      dataIndex: "stone_wt",
      sorter: (a, b) => a.item.length - b.item.length,
      render: (text, data, index) =>
        <input
          onChange={(e) => {
            var temp = [...tableItems];
            temp[index].stone_wt = e.target.value;
            setTableItems([...temp])
          }}
          //  value={text}
          type="text" />
    }, {
      title: "St. Val",
      dataIndex: "suffix",
      sorter: (a, b) => a.item.length - b.item.length,
      render: (text, data, index) =>
        <input
          onChange={(e) => {
            var temp = [...tableItems];
            temp[index].suffix = e.target.value;
            setTableItems([...temp])
          }}
          // value={text} 
          type="text" />
    }, {
      title: "HM Charge",
      dataIndex: "hmcharge",
      sorter: (a, b) => a.item.length - b.item.length,
      render: (text, data, index) =>
        <input
          onChange={(e) => {
            var temp = [...tableItems];
            temp[index].hmcharge = e.target.value;
            var hmVal = 0
            if (e.target.value) {
              hmVal = e.target.value;
            }


            temp[index].amount = (parseFloat(temp[index].net_wt) * parseFloat(invoiceData.rate ? invoiceData.rate : 1)) + parseFloat(hmVal) + parseFloat(temp[index].making);
            setTableItems([...temp])
          }}
          // value={text} 
          type="text" />
    }, {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.item.length - b.item.length,
      render: (text, data, index) =>
        <input
          onChange={(e) => {
            var temp = [...tableItems];
            temp[index].amount = e.target.value;
            setTableItems([...temp])
          }}
          // value={text} 
          type="text" />
    }, {
      title: "HUID",
      dataIndex: "huid",
      sorter: (a, b) => a.item.length - b.item.length,
      render: (text, data, index) =>
        <input
          onChange={(e) => {
            var temp = [...tableItems];
            temp[index].huid = e.target.value;
            setTableItems([...temp])
          }}
          // value={text}
          type="text" />
    },
  ];

  const [tableItems, setTableItems] = useState([{
    orm_desc: "",
    om_code: "",
    gross_wt: "",
    net_wt: "",
    stone_wt: "",
    st_value: "",
    qty: "",
    amount: "",
    making: "",
    value: "",
    hmcharge: "",
    huid: ""
  }])

  const [currentTableItem, setCurrentTableItem] = useState({
    orm_desc: "",
    om_code: "",
    gross_wt: "",
    net_wt: "",
    stone_wt: "",
    st_value: "",
    qty: "",
    amount: "",
    making: "",
    value: "",
    hmcharge: "",
    huid: ""
  })

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
    DiscountedPrice: '145000',
    CGst: '5%',
    SGst: '5%',
    TotalAmount: '165000',
    items: tableItems,
    type: '',
    purity: '',
    // remaining purity and type cuz they are outside of the items.
  })

  const [disable, setDisable] = useState(false)
  const [purityChoices, setPurityChoices] = useState([])
  const [idChoices, setIdChoices] = useState([])
  const [gstEntries, setGstEntries] = useState([])
  const [ornamentTypes, setOrnamentTypes] = useState([])
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

  const [jewelleryType, setJewelleryType] = useState([
    { item: "Diamond Necklace" },
    { item: "Gold Bracelet" },
    { item: "Pearl Earrings" },
    { item: "Silver Ring" },
    { item: "Sapphire Pendant" },
    { item: "Emerald Brooch" },
    { item: "Ruby Anklet" },
    { item: "Amethyst Tiara" },
    { item: "Opal Cufflinks" },
    { item: "Platinum Watch" },
  ])

  const [editValues, setEditValues] = useState({
    product: '',
    type: '',
    purity: 0,
    rate: 0,
    desc: '',
    pcs: 0,
    gross: 0,
    net: 0,
    amount: 0,
    making_chares: 0,
  })

  const productRef = useRef()
  // const typeRef = useRef()
  const purityRef = useRef()
  const rateRef = useRef()
  const descRef = useRef()
  const pcsRef = useRef()
  const grossRef = useRef()
  const netRef = useRef()
  const amountRef = useRef()
  const makingChargesRef = useRef()

  const [editMode, setEditMode] = useState(false)

  const [typeOption, setTypeOption] = useState()
  const [cardType, setCardType] = useState('card')


  // const handleCardType = (e) => {
  //   setCardType(e.target.value)
  // }

  const handleTypeChange = (e) => {
    // setTypeOption(e.target.value)

  }

  const handleOnEnterAnyTableData = () => {

  }

  const getEinvoice = () => {
    // setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": "testeway@mastersindia.co",
      "password": "!@#Demo!@#123",
      "client_id": "fIXefFyxGNfDWOcCWnj",
      "client_secret": "QFd6dZvCGqckabKxTapfZgJc",
      "grant_type": "password"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://clientbasic.mastersindia.co/oauth/access_token", requestOptions)
      .then(response => response.text())
      .then(result => {
        var access_token = result.access_token;
        if (access_token) {
          var raw = JSON.stringify({
            "access_token": access_token,
            "user_gstin": "09AAAPG7885R002",
            "data_source": "erp",
            "transaction_details": {
              "supply_type": "B2B"
            },
            "document_details": {
              "document_type": "INV",
              "document_number": "MIPL/101",
              "document_date": new Date().toLocaleDateString()
            },
            "seller_details": {
              "gstin": "09AAAPG7885R002",
              "legal_name": "MastersIndia UP",
              "trade_name": "MastersIndia UP",
              "address1": "Vila",
              "address2": "Vila",
              "location": "Noida",
              "pincode": 201301,
              "state_code": "UTTAR PRADESH",
              "phone_number": 9876543231,
              "email": ""
            },
            "buyer_details": {
              "gstin": "05AAAPG7885R002",
              "legal_name": "MastersIndia UT",
              "trade_name": "MastersIndia UT",
              "address1": "Kila",
              "address2": "Kila",
              "location": "Nainital",
              "pincode": 263001,
              "place_of_supply": "5",
              "state_code": "UTTARAKHAND",
              "phone_number": 9876543231,
              "email": ""
            },
            "dispatch_details": {
              "company_name": "MastersIndia UP",
              "address1": "Vila",
              "address2": "Vila",
              "location": "Noida",
              "pincode": 201301,
              "state_code": "UTTAR PRADESH"
            },
            "ship_details": {
              "gstin": "05AAAPG7885R002",
              "legal_name": "MastersIndia UT",
              "trade_name": "MastersIndia UT",
              "address1": "Kila",
              "address2": "Kila",
              "location": "Nainital",
              "pincode": 263001,
              "state_code": "UTTARAKHAND"
            },
            "export_details": {
              "ship_bill_number": "",
              "ship_bill_date": "12/08/2022",
              "country_code": "IN",
              "foreign_currency": "INR",
              "refund_claim": "N",
              "port_code": "",
              "export_duty": 2534.34
            },
            "payment_details": {
              "bank_account_number": "Account Details",
              "paid_balance_amount": 100,
              "credit_days": 2,
              "credit_transfer": "Credit Transfer",
              "direct_debit": "Direct Debit",
              "branch_or_ifsc": "KKK000180",
              "payment_mode": "CASH",
              "payee_name": "Payee Name",
              "outstanding_amount": 1.9,
              "payment_instruction": "Payment Instruction",
              "payment_term": "Terms of Payment"
            },
            "reference_details": {
              "invoice_remarks": "Invoice Remarks",
              "document_period_details": {
                "invoice_period_start_date": "2022-08-06",
                "invoice_period_end_date": "2023-08-07"
              },
              "preceding_document_details": [
                {
                  "reference_of_original_invoice": "CFRT/0006",
                  "preceding_invoice_date": "07/03/2020",
                  "other_reference": "2334"
                }
              ],
              "contract_details": [
                {
                  "receipt_advice_number": "aaa",
                  "receipt_advice_date": "07/03/2020",
                  "batch_reference_number": "2334",
                  "contract_reference_number": "2334",
                  "other_reference": "2334",
                  "project_reference_number": "2334",
                  "vendor_po_reference_number": "233433454545",
                  "vendor_po_reference_date": "07/02/2022"
                }
              ]
            },
            "additional_document_details": [
              {
                "supporting_document_url": "asafsd",
                "supporting_document": "india",
                "additional_information": "india"
              }
            ],
            "value_details": {
              "total_assessable_value": 4,
              "total_cgst_value": 0,
              "total_sgst_value": 0,
              "total_igst_value": 0.2,
              "total_cess_value": 0,
              "total_cess_value_of_state": 0,
              "total_discount": 0,
              "total_other_charge": 0,
              "total_invoice_value": 4.2,
              "round_off_amount": 0,
              "total_invoice_value_additional_currency": 0
            },
            "ewaybill_details": {
              "transporter_id": "05AAABB0639G1Z8",
              "transporter_name": "Jay Trans",
              "transportation_mode": "1",
              "transportation_distance": "0",
              "transporter_document_number": "1230",
              "transporter_document_date": "12/08/2022",
              "vehicle_number": "PQR1234",
              "vehicle_type": "R"
            },
            "item_list": [
              {
                "item_serial_number": "501",
                "product_description": "Wheat desc",
                "is_service": "N",
                "hsn_code": "1001",
                "bar_code": "1212",
                "quantity": 1,
                "free_quantity": 0,
                "unit": "KGS",
                "unit_price": 4,
                "total_amount": 4,
                "pre_tax_value": 0,
                "discount": 0,
                "other_charge": 0,
                "assessable_value": 4,
                "gst_rate": 5,
                "igst_amount": 0.2,
                "cgst_amount": 0,
                "sgst_amount": 0,
                "cess_rate": 0,
                "cess_amount": 0,
                "cess_nonadvol_amount": 0,
                "state_cess_rate": 0,
                "state_cess_amount": 0,
                "state_cess_nonadvol_amount": 0,
                "total_item_value": 4.2,
                "country_origin": "",
                "order_line_reference": "",
                "product_serial_number": "",
                "batch_details": {
                  "name": "aaa",
                  "expiry_date": "31/10/2022",
                  "warranty_date": "31/10/2022"
                },
                "attribute_details": [
                  {
                    "item_attribute_details": "aaa",
                    "item_attribute_value": "147852"
                  }
                ]
              }
            ]
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

          fetch("https://clientbasic.mastersindia.co/generateEinvoice", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        }

      })
      .catch(error => console.log('error', error));

  }
  const AddItemToTable = () => {
    //reset items first


    let item = {
      product: productRef.current.value,
      type: typeOption,
      purity: purityRef.current.value,
      rate: rateRef.current.value,
      desc: descRef.current.value,
      pcs: pcsRef.current.value,
      gross: grossRef.current,
      net: netRef.current,
      amount: amountRef.current.value,
      making_chares: makingChargesRef.current.value,
    }
    let item2 = {
      product: 'lfjaifjoij',
      type: 'fadslfkdsjlfk',
      purity: 520,
      rate: '52400',
      desc: 'good good good',
      pcs: 6,
      gross: 72,
      net: 69,
      amount: 5847000,
      making_chares: 150000,
    }
    console.log(item)
    setTableItems(prev => [item, ...prev])
    // reset values remember
  }

  const searchCustomer = () => {
    let res;
    if (!invoiceData.GstNumber) {
      alert('Enter the gst number first')
      return
    }
    // otherwise
    $.ajax({
      url: 'http://localhost:80/billing_api/customers.php',
      type: "POST",
      data: {
        method: "searchCustomer",
        data: JSON.stringify({
          gst_number: invoiceData.GstNumber
        }),
      },
      success: function (dataClient) {
        console.log(dataClient === 'Present');
        if (dataClient === 'Absent') {
          InsertCustomerToDB({
            contact_number: invoiceData.ContactNumber,
            address: invoiceData.Address,
            name: invoiceData.CustomerName,
            id_type: invoiceData.IdType,
            id_value: invoiceData.CardNumber,
            gst_number: invoiceData.GstNumber,
            state: invoiceData.State,
            pincode: invoiceData.CityPin
          })
        }
      },
      error: function (request, error) {
        console.log('Error')
      }
    });
    return res
  }

  const insertInvoice = (newInvoiceObject) => {
    let condition = invoiceData.Address && invoiceData.CustomerName && invoiceData.ContactNumber && invoiceData.CityPin && invoiceData.State && invoiceData.IdType && invoiceData.CardNumber && invoiceData.GstNumber;
    if (!condition) {
      alert('Enter the relevant data fields for customer if new.')
      return
    }
    $.ajax({
      url: 'http://localhost:80/billing_api/invoice.php',
      type: "POST",
      data: {
        method: "insertInvoice",
        data: JSON.stringify(newInvoiceObject),
      },
      success: function (dataClient) {
        console.log(dataClient);
      },
      error: function (request, error) {
        console.log('Error')
      }
    });

  }

  const refreshData = () => {
    $.ajax({
      url: 'http://localhost:80/billing_api/index.php',
      type: "POST",
      data: {
        method: "getPurity",
      },
      success: function (dataClient) {
        console.log(JSON.parse(dataClient));
        setPurityChoices(JSON.parse(dataClient))
      },
      error: function (request, error) {
        console.log('Error')
      }
    });


    $.ajax({
      url: 'http://localhost:80/billing_api/index.php',
      type: "POST",
      data: {
        method: "getOrnamentType",
      },
      success: function (dataClient) {
        try {
          console.log((dataClient));
          setOrnamentTypes(JSON.parse(dataClient))
        } catch (e) {
          setOrnamentTypes([])
          console.log(e)
        }
      },
      error: function (request, error) {
        console.log('Error')
      }
    });

    $.ajax({
      url: 'http://localhost:80/billing_api/index.php',
      type: "POST",
      data: {
        method: "getIdentificationType",
      },
      success: function (dataClient) {
        console.log(JSON.parse(dataClient));
        setIdChoices(JSON.parse(dataClient))
      },
      error: function (request, error) {
        console.log('Error')
      }
    });


    $.ajax({
      url: 'http://localhost:80/billing_api/index.php',
      type: "POST",
      data: {
        method: "getGstEntry",
      },
      success: function (dataClient) {
        var GST = JSON.parse(dataClient);
        setGstEntries({ CGST: parseFloat(GST[0].value) / 2, SGST: parseFloat(GST[0].value) / 2 })
      },
      error: function (request, error) {
        console.log('Error')
      }
    });

    $.ajax({
      url: 'http://localhost:80/billing_api/index.php',
      type: "POST",
      data: {
        method: "getHmCharge",
      },
      success: function (dataClient) {
        var temp = JSON.parse(dataClient)[0];
        setHMCharge(temp.item)
      },
      error: function (request, error) {
        console.log('Error')
      }
    });
  }

  useEffect(() => {
    recalculate();

  }, [tableItems, isroundoff, manualdiscount])

  const recalculate = () => {
    var temp = [...tableItems];
    var total = 0;
    temp.map(val => {
      if (val.amount) {
        total += val.amount;
      }

    });
    if (total > 0) {
      setCGSTTax((gstEntries.CGST / 100) * total);
      setSGSTTax((gstEntries.SGST / 100) * total);
      total += (gstEntries.CGST / 100) * total + (gstEntries.SGST / 100) * total;
    }
    else {
      setCGSTTax(0);
      setSGSTTax(0);
    }

    if (manualdiscount) {
      let oldTotal = total;
      if (manualdiscount.indexOf('%') !== -1) {

        total = Math.round(total - (total * (parseFloat(manualdiscount) / 100)));

      }
      else {
        total = total - parseFloat(manualdiscount);
      }
      setdiscount(Math.round(oldTotal - total));
    }
    else {
      setdiscount(0)
    }


    if (isroundoff) {
      var oldTotal = total;
      total = Math.floor(total / 10) * 10;
      var disc = oldTotal - total;
      setroundoff(Math.round(disc * 100) / 100
      );
    }
    else {
      setroundoff(0);

    }
    settotal(Math.round(total * 100) / 100);
  }


  const getStockData = (omcode, index) => {
    $.ajax({
      url: 'http://localhost:80/billing_api/index.php',
      type: "POST",
      data: {
        method: "getStockByORMCODE",
        data: JSON.stringify({ omcode: omcode }),
      },
      success: function (dataClient) {
        try {
          var temp = [...tableItems];
          temp[index] = JSON.parse(dataClient)[0];
          temp[index].hmcharge = HMCharge;
          temp[index].value = (parseFloat(temp[index].net_wt) * parseFloat(invoiceData.rate ? invoiceData.rate : 1));
          temp[index].amount = (parseFloat(temp[index].net_wt) * parseFloat(invoiceData.rate ? invoiceData.rate : 1)) + parseFloat(HMCharge);
          // var existing = [...tableItems.reverse(), { ...temp }];
          // existing[0] = { "id": "", "entry_date": "", "orm_desc": "", "om_code": "", "purity": "", "gross_wt": "", "net_wt": "", "stone_wt": "", "qty": "", "huid": "", hmcharge: '' };
          // existing = existing.reverse();
          setTableItems([...temp])
        } catch (e) {
          console.log(e)
        }
      },
      error: function (request, error) {
        console.log('Error')
      }
    });
  }

  const InsertCustomerToDB = (newCustomer) => {
    $.ajax({
      url: 'http://localhost:80/billing_api/customers.php',
      type: "POST",
      data: {
        method: "insertCustomer",
        data: JSON.stringify(newCustomer),
      },
      success: function (dataClient) {
        alert('customer saved to database')

      },
      error: function (request, error) {
        console.log('Error')
        console.log(error)
      },
    });
  }



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
            alert('Customer Not Found')
          }
        },
        error: function (request, error) {
          console.log('Error')
        },
      });
    }
  }

  useEffect(() => {
    refreshData();
    // getStockData('AY1')
    let elements = Array.from(
      document.getElementsByClassName("react-datepicker-wrapper")
    );
    elements.map((element) => element.classList.add("w-100"));
  }, []);

  useEffect(() => console.log(tableItems), [tableItems])
  useEffect(() => console.log(invoiceData), [invoiceData])

  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <ToastContainer />
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar />
        {/* <!-- Page Wrapper --> */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header" style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div className="content-page-header" style={{ marginBottom: 0 }}>
                <h5>Buyer Module</h5>
              </div>
              <button disabled={!disable} onClick={() => setDisable(false)} className="btn btn-primary">Edit</button>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div style={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between' }}>
                      <div className="form-group" style={{ width: '30%' }}>
                        <label>Contact Number</label>
                        <input
                          disabled={disable}
                          autoFocus
                          type="text"
                          className="form-control"
                          value={invoiceData.ContactNumber}
                          onChange={(e) => setInvoiceData(prev => ({ ...prev, ContactNumber: e.target.value }))}
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
                              disabled={disable}
                              type="text"
                              value={invoiceData.CustomerName}
                              onChange={(e) => setInvoiceData(prev => ({ ...prev, CustomerName: e.target.value }))}
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
                          onChange={(e) => setInvoiceData(prev => ({ ...prev, GstNumber: e.target.value }))}
                          disabled={disable}
                          type="text"
                          className="form-control"
                          placeholder="Enter GST Number"
                        />
                      </div>
                      <div className="form-group" style={{ width: '30%' }}>
                        <label>Address</label>
                        <textarea
                          disabled={disable}
                          value={invoiceData.Address}
                          onChange={(e) => setInvoiceData(prev => ({ ...prev, Address: e.target.value }))}
                          className="form-control"
                          placeholder="Enter Address"
                          defaultValue={""}
                          rows={4}
                        />
                      </div>
                      <div className="form-group" style={{ width: '30%' }}>
                        <label>ID Type</label>
                        <Select2
                          disabled={disable}
                          value={invoiceData.IdType}
                          onChange={(e) => { setInvoiceData({ ...invoiceData, IdType: e.target.value }) }}
                          className='form-control relative'
                          data={idChoices}
                        />
                        <br />
                        <input
                          value={invoiceData.CardNumber}
                          onChange={(e) => setInvoiceData(prev => ({ ...prev, CardNumber: e.target.value }))}
                          disabled={disable}
                          className='form-control relative'
                          placeholder={`Enter your ${cardType} number here`}
                        />
                      </div>
                      <div className="form-group" style={{ width: '30%' }}>
                        <label>State</label>
                        <Select2
                          value={invoiceData.State}
                          disabled={disable}
                          onChange={(e) => { setInvoiceData({ ...invoiceData, State: e.target.value }) }}
                          className='form-control relative'
                          data={state}
                        />
                        <br />
                        <div className="form-group" >
                          {/* <label>City PIN</label> */}
                          <input
                            value={invoiceData.CityPin}
                            onChange={(e) => setInvoiceData(prev => ({ ...prev, CityPin: e.target.value }))}
                            disabled={disable}
                            type="text"
                            className="form-control"
                            placeholder="City PIN"
                          />
                        </div>
                      </div>

                    </div>
                    <div className="col-lg-12 py-2 col-md-6 col-sm-12 flex justify-between items-center row">

                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label>Type</label>
                          <Select2
                            onChange={(e) => setInvoiceData(prev => ({ ...prev, type: e.target.value }))}
                            value={invoiceData.type}
                            className="form-control w-100"
                            data={ornamentTypes}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label>purity</label>
                          <Select2
                            onChange={(e) => setInvoiceData(prev => ({ ...prev, purity: e.target.value }))}
                            className="form-control w-100"
                            data={purityChoices}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label>Rate</label>
                          <input
                            value={invoiceData.rate}
                            disabled={disable}
                            className='form-control relative'
                            onChange={e => {
                              console.log(e.target.value); setInvoiceData({ ...invoiceData, rate: e.target.value })
                              if (tableItems.length > 0) {
                                var temp = [...tableItems];
                                temp.map(val => {
                                  if (val.om_code) {
                                    val.value = (parseFloat(val.net_wt) * parseFloat(e.target.value ? e.target.value : 1));
                                    val.amount = (parseFloat(val.net_wt) * parseFloat(e.target.value ? e.target.value : 1)) + parseFloat(val.hmcharge);
                                  }

                                })
                                setTableItems([...temp])
                              }

                            }}
                          />
                          {/* <Select2
                            onChange={handleTypeChange}
                            className="form-control w-100"
                            data={jewelleryType}
                          /> */}
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-12">
                        <div className="form-group">
                          <label>Salesman Code</label>
                          <input
                            value={salesmanCode?.user_name}
                            disabled
                            // onChange={handleTypeChange}
                            className="form-control w-100"
                            data={jewelleryType}
                          />
                        </div>
                      </div>
                    </div>
                    <button style={{ marginBottom: 10 }} onClick={() => {
                      if (tableItems[tableItems.length - 1].om_code) {
                        var table = [...tableItems];
                        table.push({});
                        setTableItems(table)
                      }
                    }} type="submit" className="btn btn-primary">
                      Add Product
                    </button>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className=" card-table">
                          <div className="card-body">
                            <div className="table-responsive table-hover table-striped">
                              <Table
                                pagination={false}
                                columns={columns}
                                dataSource={tableItems}
                                rowKey={(record) => record.id}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group-item border-0 p-0">
                      <div className="row">
                        <div className="col-xl-6 col-lg-12">
                          <div className="form-group-bank">
                            <div className="invoice-total-box">
                              <p>
                                Payment Mode
                              </p>
                              <div className="form-check">
                                <input onChange={(event) => setInvoiceData({ ...invoiceData, PaymentMode: 'Card' })} disabled={disable} className="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioCheckedDisabled" checked={invoiceData.PaymentMode == 'Card'} />
                                <label className="form-check-label" >
                                  Card
                                </label>
                              </div>
                              <div className="form-check">
                                <input onChange={(event) => setInvoiceData({ ...invoiceData, PaymentMode: 'Cash' })} disabled={disable} className="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioCheckedDisabled" checked={invoiceData.PaymentMode == 'Cash'} />
                                <label className="form-check-label" >
                                  Cash
                                </label>
                              </div>
                              <div className="form-check">
                                <input disabled={disable} onChange={(event) => setInvoiceData({ ...invoiceData, PaymentMode: 'Bank' })} checked={invoiceData.PaymentMode == 'Bank'} className="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioCheckedDisabled" />
                                <label className="form-check-label" >
                                  Bank Transfer
                                </label>
                              </div>
                              <div className="form-check">
                                <input disabled={disable} onChange={(event) => setInvoiceData({ ...invoiceData, PaymentMode: 'Other' })} checked={invoiceData.PaymentMode == 'Other'} className="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioCheckedDisabled" />
                                <label className="form-check-label" >
                                  Other
                                </label>
                              </div>
                              <div className="form-group notes-form-group-info">
                                <label>Notes</label>
                                <textarea
                                  disabled={disable}
                                  className="form-control"
                                  placeholder="Enter Notes"
                                  value={invoiceData.Notes}
                                  onChange={(e) => setInvoiceData({ ...invoiceData, Notes: e.target.value })}
                                />
                              </div>
                            </div>
                            {/* <div className="form-group notes-form-group-info mb-0">
                              <label>Terms and Conditions</label>
                              <textarea
                                className="form-control"
                                placeholder="Enter Terms and Conditions"
                                defaultValue={""}
                              />
                            </div> */}
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-12">
                          <div className="form-group-bank">
                            <div className="row">
                              {/* <div className="col-lg-4 col-md-12">
                                <div className="form-group">
                                  <label>Discount Type</label>
                                  <Select2
                                    disabled={disable}
                                    className="w-100 form-control"
                                    data={percentage}
                                    options={{
                                      placeholder: "Percentage(%)",
                                    }}
                                  />
                                </div>
                              </div> */}
                              <div className="col-lg-4 col-md-12">
                                <div className="form-group">
                                  <label>Discounted Price</label>
                                  <input
                                    disabled={disable}
                                    type="text"
                                    className="form-control"
                                    placeholder={10}
                                    value={manualdiscount}
                                    onChange={e => setmanualdiscount(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="invoice-total-box">
                              <div className="invoice-total-inner">
                                <p>
                                  CGST({gstEntries.CGST}%) <span>₹{CGSTTax}</span>
                                </p>
                                <p>
                                  SGST({gstEntries.SGST}%) <span>₹{SGSTTax}</span>
                                </p>
                                <div className="status-toggle justify-content-between">
                                  <div className="d-flex align-center">
                                    <p>Round Off </p>
                                    <input
                                      checked={isroundoff}
                                      id="rating_1"
                                      className="check"
                                      type="checkbox"
                                      onChange={val => {
                                        setisroundoff(val.target.checked);

                                      }}
                                    />
                                    <label
                                      htmlFor="rating_1"
                                      className="checktoggle checkbox-bg"
                                    >
                                      checkbox
                                    </label>
                                  </div>
                                  <span>₹{roundoff}</span>
                                </div>
                              </div>
                              <p>
                                Discount <span>₹{discount}</span>
                              </p>
                              <div className="invoice-total-footer">
                                <h4>
                                  Total Amount <span>{total}</span>
                                </h4>
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
                      <button onClick={() => {
                        setDisable(true)
                        navigate('/invoice', { state: { invoiceData } })
                        getEinvoice()
                        searchCustomer()
                        insertInvoice(invoiceData)
                      }} type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {Loading && <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 999 }}>

        </div>
        }
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


      </div>
    </>
  );
};
export default BuyerModule;
