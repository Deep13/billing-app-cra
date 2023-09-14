import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { LogoImg, LogoSmallImg } from "../components/imagepath";
import MainLogo from '../assets/billingLogo.png'

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");

  const toggleSidebar = (value) => {
    console.log(value);
    setSideMenu(value);
  };

  useEffect(() => {
    function handleMouseOver(e) {
      e.stopPropagation();
      if (document.body.classList.contains('mini-sidebar') && document.querySelector('#toggle_btn').offsetParent !== null) {
        var targ = e.target.closest('.sidebar');
        if (targ) {
          document.body.classList.add('expand-menu');
          document.querySelectorAll('.subdrop + ul').forEach((ul) => ul.style.display = 'block');
        } else {
          document.body.classList.remove('expand-menu');
          document.querySelectorAll('.subdrop + ul').forEach((ul) => ul.style.display = 'none');
        }
        return false;
      }
    }

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    $(document).on('change', '.sidebar-type-four input', function () {
      if ($(this).is(':checked')) {
        $('.sidebar').addClass('sidebar-eight');
        $('.sidebar-menu').addClass('sidebar-menu-eight');
        $('.menu-title').addClass('menu-title-eight');
        $('.header').addClass('header-eight');
        $('.header-left-two').addClass('header-left-eight');
        $('.user-menu').addClass('user-menu-eight');
        $('.dropdown-toggle').addClass('dropdown-toggle-eight');
        $('.white-logo').addClass('show-logo');
        $('.header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)').addClass('hide-logo');
        $('.header-two .header-left-two .logo:not(.logo-small)').removeClass('hide-logo');
        $('.header-two .header-left-two .dark-logo').removeClass('show-logo');
      } else {
        $('.sidebar').removeClass('sidebar-eight');
        $('.sidebar-menu').removeClass('sidebar-menu-eight');
        $('.menu-title').removeClass('menu-title-eight');
        $('.header').removeClass('header-eight');
        $('.header-left-two').removeClass('header-left-eight');
        $('.user-menu').removeClass('user-menu-eight');
        $('.dropdown-toggle').removeClass('dropdown-toggle-eight');
        $('.white-logo').removeClass('show-logo');
        $('.header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)').removeClass('hide-logo');
      }
    });
  }, [])


  let thislocation = useLocation()

  let pathName = thislocation.pathname;

  console.log("Working", pathName);


  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Link to="/index" className="flex justify-between items-center">
              {/* <img src={LogoImg} className="img-fluid logo" alt="" /> */}
              <img src={MainLogo} className="img-fluid logo" alt="" />
              {/* {
                isSideMenu &&
              <p className="text-lg font-semibold text-[#000]">Billing System</p>
              } */}
            </Link>
            <Link to="index.html">
              <img
                src={MainLogo}
                className="img-fluid logo-small"
                alt=""
              />
            </Link>
          </div>
        </div>
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="95vh"
          thumbMinSize={30}
          universal={false}
          hideTracksWhenNotNeeded={true}
        >
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              {/* Main */}
              <ul>
                <li
                // className={`${"/index" === pathName ? "active submenu" : "submenu"
                //     }`}
                >
                  <Link
                    to="/daily-expenses"
                    // // className={isSideMenu == "index" ? "subdrop" : "}
                    className={`${"/daily_balance" === pathName ? "active" : ""} text-black`}
                  // onClick={() =>
                  //     toggleSidebar(isSideMenu == "index" ? "" : "index")
                  // }
                  >
                    <FeatherIcon icon="home" /> <span className="text-black">Daily Expenses</span>{" "}
                  </Link>
                  {/* {isSideMenu == "index" ? (
                                        <ul
                                            style={{
                                                display: isSideMenu == "index" ? "block" : "none",
                                            }}
                                        >
                                            <li>
                                                <Link
                                                    to="/index"
                                                    className={`${"/index" === pathName ? "active" : ""}`}
                                                >
                                                    <FeatherIcon icon="home" /> {"  "}
                                                    Admin Dashboard
                                                </Link>
                                            </li>
                                        </ul>
                                    ) : (
                                        ""
                                    )} */}
                </li>
                <li
                  className={`${"/chat" === pathName ||
                    "/calendar" === pathName ||
                    "/inbox" === pathName
                    ? "active submenu"
                    : "submenu"
                    }`}
                >
                  {/* <Link
                                        to="/buyer_creation"
                                        className={`${"/buyer_creation" === pathName ? "active" : ""
                                            }`}
                                    // onClick={() =>
                                    //     toggleSidebar(
                                    //         isSideMenu == "application" ? "" : "application"
                                    //     )
                                    // }
                                    >
                                        <FeatherIcon icon="grid" /> <span>Buyer Creation</span>{" "}
                                        <FeatherIcon icon="user" /> <span>Buyer Creation</span>{" "}
                                    </Link> */}
                  {/* {isSideMenu == "application" ? (
                                        <ul
                                            style={{
                                                display: isSideMenu == "application" ? "block" : "none",
                                            }}
                                        >
                                            <li>
                                                <Link
                                                    to="/chat"
                                                    className={`${"/chat" === pathName ? "active" : ""}`}
                                                >
                                                    Chat
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/calendar"
                                                    className={`${"/calendar" === pathName ? "active" : ""
                                                        }`}
                                                >
                                                    Calendar
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/inbox"
                                                    className={`${"/inbox" === pathName ? "active" : ""}`}
                                                >
                                                    Email
                                                </Link>
                                            </li>
                                        </ul>
                                    ) : (
                                        ""
                                    )} */}
                  <Link
                    to="/stock-management"
                    className={`${"/stock_management" === pathName ? "active" : ""
                      } text-black`}
                  // onClick={() =>
                  //     toggleSidebar(
                  //         isSideMenu == "application" ? "" : "application"
                  //     )
                  // }
                  >
                    {/* <FeatherIcon icon="grid" /> <span>Buyer Creation</span>{" "} */}
                    <FeatherIcon icon="package" /> <span className="text-black">Stock Management</span>{" "}
                  </Link>
                  <Link
                    to="/expense-management"
                    className={`${"/expense_management" === pathName ? "active" : ""
                      } text-black`}
                  // onClick={() =>
                  //     toggleSidebar(
                  //         isSideMenu == "application" ? "" : "application"
                  //     )
                  // }
                  >
                    {/* <FeatherIcon icon="grid" /> <span>Buyer Creation</span>{" "} */}
                    <FeatherIcon icon="file-plus" /> <span className="text-black">Expense Management</span>{" "}
                  </Link>
                  <Link
                    to="/buyer-module"
                    className={`${"/invoice_generation" === pathName ? "active" : ""
                      } text-black`}
                  // onClick={() =>
                  //     toggleSidebar(
                  //         isSideMenu == "application" ? "" : "application"
                  //     )
                  // }
                  >
                    {/* <FeatherIcon icon="grid" /> <span>Buyer Creation</span>{" "} */}
                    <FeatherIcon icon="clipboard" /> <span className="text-black">Buyer Module</span>{" "}
                  </Link>
                  <Link
                    to="/purchase-module"
                    className={`${"/invoice_generation" === pathName ? "active" : ""
                      } text-black`}
                  // onClick={() =>
                  //     toggleSidebar(
                  //         isSideMenu == "application" ? "" : "application"
                  //     )
                  // }
                  >
                    {/* <FeatherIcon icon="grid" /> <span>Buyer Creation</span>{" "} */}
                    <FeatherIcon icon="clipboard" /> <span className="text-black">Purchase Module</span>{" "}
                  </Link>
                  <Link
                    to="/invoice-management"
                    className={`${("/invoice_management" === pathName) || ("/invoice-paid" === pathName) || ("/invoice-list" === pathName) || ("/invoice-overdue" === pathName) || ("/invoice-draft" === pathName) || ("/invoice-recurring" === pathName) || ("/invoice-cancelled" === pathName) ? "active" : ""
                      } text-black`}
                  // onClick={() =>
                  //     toggleSidebar(
                  //         isSideMenu == "application" ? "" : "application"
                  //     )
                  // }
                  >
                    {/* <FeatherIcon icon="grid" /> <span>Buyer Creation</span>{" "} */}
                    <FeatherIcon icon="file" /> <span className="text-black">Invoice Management</span>{" "}
                  </Link>
                  <Link
                    to="/master-data"
                    className={`${("/invoice_management" === pathName) || ("/invoice-paid" === pathName) || ("/invoice-list" === pathName) || ("/invoice-overdue" === pathName) || ("/invoice-draft" === pathName) || ("/invoice-recurring" === pathName) || ("/invoice-cancelled" === pathName) ? "active" : ""
                      } text-black`}
                  // onClick={() =>
                  //     toggleSidebar(
                  //         isSideMenu == "application" ? "" : "application"
                  //     )
                  // }
                  >
                    {/* <FeatherIcon icon="grid" /> <span>Buyer Creation</span>{" "} */}
                    <FeatherIcon icon="file" /> <span className="text-black">Master Data</span>{" "}
                  </Link>
                  <Link
                    to="/due-management"
                    className={`${("/due_management" === pathName) || ("/invoice-paid" === pathName) || ("/invoice-list" === pathName) || ("/invoice-overdue" === pathName) || ("/invoice-draft" === pathName) || ("/invoice-recurring" === pathName) || ("/invoice-cancelled" === pathName) ? "active" : ""
                      } text-black`}
                  // onClick={() =>
                  //     toggleSidebar(
                  //         isSideMenu == "application" ? "" : "application"
                  //     )
                  // }
                  >
                    {/* <FeatherIcon icon="grid" /> <span>Buyer Creation</span>{" "} */}
                    <FeatherIcon icon="users" /> <span className="text-black">Due Management</span>{" "}
                  </Link>
                  <Link
                    to="/orders"
                    className={`${("/due_management" === pathName) || ("/invoice-paid" === pathName) || ("/invoice-list" === pathName) || ("/invoice-overdue" === pathName) || ("/invoice-draft" === pathName) || ("/invoice-recurring" === pathName) || ("/invoice-cancelled" === pathName) ? "active" : ""
                      } text-black`}
                  // onClick={() =>
                  //     toggleSidebar(
                  //         isSideMenu == "application" ? "" : "application"
                  //     )
                  // }
                  >
                    {/* <FeatherIcon icon="grid" /> <span>Buyer Creation</span>{" "} */}
                    <FeatherIcon icon="users" /> <span className="text-black">Orders</span>{" "}
                  </Link>
                </li>
              </ul>
              {/* /Settings */}
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};
export default Sidebar;
