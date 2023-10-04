import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
// import Home from './components/Home'
import StockManagement from './Pages/StockManagement'
import { BuyerModule, Customers, DailyExpenses, InvoiceList, DueManagement, ExpenseManagement, InvoiceManagement, Login, MasterData, PurchaseModule, Signup } from './Pages'
import InvoiceGeneration from './Pages/Orders'
import Ornament from './Pages/MasterDataPages/Ornament'
import OrnamentType from './Pages/MasterDataPages/OrnamentType'
import GSTEntry from './Pages/MasterDataPages/GSTEntry'
import HMCharge from './Pages/MasterDataPages/HMCharge'
import HSNCode from './Pages/MasterDataPages/HSNCode'
import IdentificationType from './Pages/MasterDataPages/IdentificationType'
import Purity from './Pages/MasterDataPages/Purity'
import StateCode from './Pages/MasterDataPages/StateCode'
import TokenEntry from './Pages/MasterDataPages/TokenEntry'
import InvoiceFormat from './components/InvoiceFormat'

function App() {

  const [salesmanCode, setSalesmanCode] = useState('')

  return (
    <>
      <div className='h-[100vh] w-full'>
        <Routes>
          <Route path='/billing' element={<Login setSalesmanCode={setSalesmanCode} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/stock-management' element={<StockManagement />} />
          <Route path='/master-data' element={<MasterData />} >
            {/* <Route index element={<Ornament />} />
            <Route index={false} path='ornament-type' element={<OrnamentType />} />
            <Route path='gst-entry' element={<GSTEntry />} />
            <Route path='hm-charge' element={<HMCharge />} />
            <Route path='hsn-code' element={<HSNCode />} />
            <Route path='identification-type' element={<IdentificationType />} />
            <Route path='state-code' element={<StateCode />} />
            <Route path='purity' element={<Purity />} />
            <Route path='token-entry' element={<TokenEntry />} /> */}
          </Route>
          <Route index element={<MasterData />} />
          <Route index={false} path='ornament-type' element={<OrnamentType />} />
          <Route path='gst-entry' element={<GSTEntry />} />
          <Route path='customers' element={<Customers />} />
          <Route path='invoices-list' element={<InvoiceList />} />
          <Route path='invoice' element={<InvoiceFormat />} />
          <Route path='hm-charge' element={<HMCharge />} />
          <Route path='hsn-code' element={<HSNCode />} />
          <Route path='identification-type' element={<IdentificationType />} />
          <Route path='state-code' element={<StateCode />} />
          <Route path='purity' element={<Purity />} />
          <Route path='signup' element={<Signup />} />
          <Route path='/purchase-module' element={<PurchaseModule />} />
          <Route path='/orders' element={<InvoiceGeneration />} />
          <Route path='/due-management' element={<DueManagement />} />
          <Route path='/expense-management' element={<ExpenseManagement />} />
          <Route path='/daily-expenses' element={<DailyExpenses />} />
          <Route path='/invoice-management' element={<InvoiceManagement />} />
          <Route path='/buyer-module' element={<BuyerModule salesmanCode={salesmanCode} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
