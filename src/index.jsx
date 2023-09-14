import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
//bootsrap
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/js/bootstrap.bundle.min.js';
import "./assets/css/feather.css";
// import bootstrap from 'bootstrap';
// styles
import './index.css'
import './assets/css/style.css';
import './assets/plugins/datatables/datatables.min.css';
import './assets/plugins/jvectormap/jquery-jvectormap-2.0.3.css';
import './assets/js/bootstrap.min.js';
import { BrowserRouter as Router } from 'react-router-dom'

//jquery
import { jQuery } from 'jquery'
import $ from 'jquery'
window.$ = $
window.jQuery = jQuery;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />,
  </Router>
)
