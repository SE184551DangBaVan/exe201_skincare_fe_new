import { ArrowBack, ArrowForward, CurrencyExchange } from '@mui/icons-material'
import './PaymentPage.css'
import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import Scene2 from "../../assets/scene (2).splinecode";
import { useNavigate } from 'react-router-dom';
import PaymentPopup from '../../components/PaymentPopup/PaymentPopup';
import PayOSLogo from '../../assets/PayOSimage.png'
import { showLoading, updateToast } from '../../utils/toastUtils';
import axios from 'axios';

export default function PaymentPage() {
  const [paymentPopup, setPaymentPopup] = useState(false);
  const navigate = useNavigate();

  const handlePayOS = async () => {
    const toastId = showLoading("Directing to PayOS...");

    try {
      const response = await axios.post(
        'https://skincareapp.somee.com/SkinCare/vippayment/create-link',
        {},
        { withCredentials: true }
      );

      const checkoutUrl = response.data?.checkoutUrl;

      if (checkoutUrl) {
        updateToast(toastId, "success", "Redirecting to PayOS...");
        window.location.href = checkoutUrl; // Redirect to the payment URL
      } else {
        updateToast(toastId, "error", "No checkout URL received.");
      }
    } catch (error) {
      console.error("Error during PayOS redirect:", error);
      updateToast(toastId, "error", "Failed to get PayOS link.");
    }
  };

  return (
    <div className='paymentPage'>
      <button className="back-btn" onClick={() => { navigate("/VIP-purchase"); } }>
        <ArrowBack />
      </button>
      <div className="paymentScene">
        <Spline scene={Scene2} />
        { paymentPopup ? (
            <PaymentPopup />
          ) : (<div className='payOSNavi'>
            <img src={PayOSLogo} alt='' className='payOSLogo' role="button"/>
            <button onClick={handlePayOS}>Thanh Toán <ArrowForward /></button>
          </div>)
        }
      </div>
      <button className={paymentPopup ? "back-btn next" : "back-btn next back"} onClick={() => { setPaymentPopup(!paymentPopup) } }>
        <CurrencyExchange />
      </button>
    </div>
  )
}
