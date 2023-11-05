import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import {
  De,
  Es,
  Fr,
  img2,
  img3,
  img4,
  img7,
  search,
  Us,
  Us1,
} from "../components/imagepath.jsx";

const Header = (props) => {


  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };

  const onMenuClik = () => {
    props.onMenuClick()
  }

  const [user, setuser] = useState(null)

  useEffect(() => {

    var userData = localStorage.getItem('logid');
    if (userData) {
      userData = JSON.parse(userData);
      setuser(userData);

    }
    const handleClick = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }

    const maximizeBtn = document.querySelector('.win-maximize');
    // maximizeBtn.addEventListener('click', handleClick);

    return () => {
      // maximizeBtn.removeEventListener('click', handleClick);
    };

  }, []);

  useEffect(() => {
    $(document).on('change', '.sidebar-type-five input', function () {
      if ($(this).is(':checked')) {
        $('.sidebar').addClass('sidebar-nine');
        $('.sidebar-menu').addClass('sidebar-menu-nine');
        $('.menu-title').addClass('menu-title-nine');
        $('.header').addClass('header-nine');
        $('.header-left-two').addClass('header-left-nine');
        $('.user-menu').addClass('user-menu-nine');
        $('.dropdown-toggle').addClass('dropdown-toggle-nine');
        $('#toggle_btn').addClass('darktoggle_btn');
        $('.white-logo').addClass('show-logo');
        $('.header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)').addClass('hide-logo');
      } else {
        $('.sidebar').removeClass('sidebar-nine');
        $('.sidebar-menu').removeClass('sidebar-menu-nine');
        $('.menu-title').removeClass('menu-title-nine');
        $('.header').removeClass('header-nine');
        $('.header-left-two').removeClass('header-left-nine');
        $('.user-menu').removeClass('user-menu-nine');
        $('.dropdown-toggle').removeClass('dropdown-toggle-nine');
        $('#toggle_btn').removeClass('darktoggle_btn');
        $('.white-logo').removeClass('show-logo');
        $('.header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)').removeClass('hide-logo');
      }
    });
  }, [])

  useEffect(() => {
    $(document).on('change', '.sidebar-type-three input', function () {
      if ($(this).is(':checked')) {
        $('.sidebar').addClass('sidebar-seven');
        $('.sidebar-menu').addClass('sidebar-menu-seven');
        $('.menu-title').addClass('menu-title-seven');
        $('.header').addClass('header-seven');
        $('.header-left-two').addClass('header-left-seven');
        $('.user-menu').addClass('user-menu-seven');
        $('.dropdown-toggle').addClass('dropdown-toggle-seven');
        $('.header-two .header-left-two .logo:not(.logo-small), .header-four .header-left-four .logo:not(.logo-small)').addClass('hide-logo');
        $('.header-two .header-left-two .dark-logo, .header-four .header-left-four .dark-logo').addClass('show-logo');
      } else {
        $('.sidebar').removeClass('sidebar-seven');
        $('.sidebar-menu').removeClass('sidebar-menu-seven');
        $('.menu-title').removeClass('menu-title-seven');
        $('.header').removeClass('header-seven');
        $('.header-left-two').removeClass('header-left-seven');
        $('.user-menu').removeClass('user-menu-seven');
        $('.dropdown-toggle').removeClass('dropdown-toggle-seven');
        $('.header-two .header-left-two .logo:not(.logo-small), .header-four .header-left-four .logo:not(.logo-small)').removeClass('hide-logo');
        $('.header-two .header-left-two .dark-logo, .header-four .header-left-four .dark-logo').removeClass('show-logo');
      }
    });
  }, [])

  useEffect(() => {
    $(document).on('change', '.sidebar-type-two input', function () {
      if ($(this).is(':checked')) {
        $('.sidebar').addClass('sidebar-six');
        $('.sidebar-menu').addClass('sidebar-menu-six');
        $('.sidebar-menu-three').addClass('sidebar-menu-six');
        $('.menu-title').addClass('menu-title-six');
        $('.menu-title-three').addClass('menu-title-six');
        $('.header').addClass('header-six');
        $('.header-left-two').addClass('header-left-six');
        $('.user-menu').addClass('user-menu-six');
        $('.dropdown-toggle').addClass('dropdown-toggle-six');
        $('.header-two .header-left-two .logo:not(.logo-small), .header-four .header-left-four .logo:not(.logo-small)').addClass('hide-logo');
        $('.header-two .header-left-two .dark-logo, .header-four .header-left-four .dark-logo').addClass('show-logo');
      } else {
        $('.sidebar').removeClass('sidebar-six');
        $('.sidebar-menu').removeClass('sidebar-menu-six');
        $('.sidebar-menu-three').removeClass('sidebar-menu-six');
        $('.menu-title').removeClass('menu-title-six');
        $('.menu-title-three').removeClass('menu-title-six');
        $('.header').removeClass('header-six');
        $('.header-left-two').removeClass('header-left-six');
        $('.user-menu').removeClass('user-menu-six');
        $('.dropdown-toggle').removeClass('dropdown-toggle-six');
        $('.header-two .header-left-two .logo, .header-four .header-left-four .logo:not(.logo-small)').removeClass('hide-logo');
        $('.header-two .header-left-two .dark-logo, .header-four .header-left-four .dark-logo').removeClass('show-logo');
      }
    });
  }, [])





  return (
    <div className="header header-one">
      {/* Sidebar Toggle */}
      <Link to="#" id="toggle_btn" onClick={handlesidebar} >
        <span className="toggle-bars">
          <span className="bar-icons" />
          <span className="bar-icons" />
          <span className="bar-icons" />
          <span className="bar-icons" />
        </span>
      </Link>
      {/* /Sidebar Toggle */}
      {/* Search */}
      <Link to="#" className="mobile_btn" id="mobile_btn" >
        <i className="fas fa-bars" />
      </Link>

      {/* /Search */}
      {/* Mobile Menu Toggle */}
      <Link to="#" className="mobile_btn" id="mobile_btn" onClick={() => onMenuClik()}>
        <i className="fas fa-bars" />
      </Link>
      {/* /Mobile Menu Toggle */}
      {/* Header Menu */}
      <ul className="nav nav-tabs user-menu">

        {/* User Menu */}
        <li className="nav-item dropdown">
          <Link
            to="#"
            className="user-link  nav-link"
            data-bs-toggle="dropdown"
          >
            <span className="user-img">
              <img src={img7} alt="img" className="profilesidebar" />
              <span className="animate-circle" />
            </span>
            <span className="user-content">
              <span className="user-details">{user?.role}</span>
              <span className="user-name">{user?.user_name}</span>
            </span>
          </Link>
          <div className="dropdown-menu menu-drop-user">
            <div className="profilemenu">
              <div className="subscription-logout">
                <ul>
                  <li className="pb-0">
                    <Link className="dropdown-item" onClick={(e) => {
                      e.preventDefault();
                      localStorage.removeItem('logid');
                      window.location.href = "/login"
                    }}>
                      Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        {/* /User Menu */}
      </ul>
      {/* /Header Menu */}
    </div>

  );
};
export default Header;
