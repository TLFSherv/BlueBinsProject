import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Contact from './pages/Contact';
import AccessBooking from './pages/AccessBooking';
import ManageBooking from './pages/ManageBooking';
import BookingSuccess from './pages/SuccessPage';
import BookingError from './pages/ErrorPage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/booking/access' element={<AccessBooking />} />
          <Route path='/booking/manage' element={<ManageBooking />} />
          <Route path='/booking/success' element={<BookingSuccess />} />
          <Route path='/booking/error' element={<BookingError />} />
        </Routes>
      </Router>
    </>
  )
}


export default App
