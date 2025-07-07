import './Promote.css';
import { createPortal } from 'react-dom';

import Logo from '/logo skincare 2.svg'
import RoboLogo from '../../assets/images/icons/robo-idle-transparent.gif'
import { useNavigate } from 'react-router-dom';
import { ArrowForward, Close } from '@mui/icons-material';
import { useState } from 'react';

export default function Promote() {
  const navigate = useNavigate();
  const [closeBanner, setCloseBanner] = useState(true);

  const modalContent = (
    <>
    {closeBanner && <div className="adBanner">
        <img className="logo" src={Logo} alt="skinsense logo" />
        
        <section className="section1">
            <h1>Get VIP</h1>
        </section>
        
        <section className="section2">
            <img className="AIrobot" src={RoboLogo} alt=""/>
        </section>
        
        <section className="section3 slidedown">
            <h3>Unlock VIP Perks:</h3>
            <h1 className="scale">180k</h1>
            <p>Full Access</p>
        </section>
        
        <section className="section4 slideright">
            <h2>GET NOW!!</h2>
        </section>
        
        <section className="section5">
            <ArrowForward className="starSymbol" onClick={() => navigate("/VIP-purchase")}/>
        </section>
        
        <Close className='closeIcon' onClick={() => setCloseBanner(false)} />
    </div>}
    </>
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
}