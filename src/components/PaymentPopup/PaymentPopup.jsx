import './PaymentPopup.css';
import { createPortal } from 'react-dom';
import Chip from '../../assets/img/chip.png'
import Sticker from '../../assets/img/sticker.png'

export default function PaymentPopup() {
  const modalContent = (
    <div className="card-form">
      {/* Credit Card Display Placeholder */}
      <div className="card-list">
        <div className="card-item">
          <div className="card-item__side-front">
            <div className="card-item__wrapper">
              <div className="card-item__type">
                <img className="card-item__typeImg" src={Sticker} alt="card type" />
              </div>
              <div className="card-item__number">•••• •••• •••• ••••</div>
              <div className="card-item__content">
                <div className="card-item__info">
                  <div className="card-item__holder">Card Holder</div>
                  <div className="card-item__name">YOUR NAME</div>
                </div>
                <div className="card-item__date">
                  <div className="card-item__dateTitle">Expires</div>
                  <span>MM/YY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Inputs */}
      <div className="card-form__inner">
        <div className="card-input">
          <label className="card-input__label" htmlFor="cardNumber">Card Number</label>
          <input type="text" className="card-input__input" id="cardNumber" placeholder="1234 5678 9012 3456" />
        </div>

        <div className="card-input">
          <label className="card-input__label" htmlFor="cardHolder">Card Holder</label>
          <input type="text" className="card-input__input" id="cardHolder" placeholder="Your Name" />
        </div>

        <div className="card-form__row">
          <div className="card-form__col">
            <div className="card-form__group">
              <input type="text" className="card-input__input" placeholder="MM" maxLength={2} />
              <input type="text" className="card-input__input" placeholder="YY" maxLength={2} />
            </div>
          </div>

          <div className="card-form__col-cvv">
            <div className="card-input">
              <label className="card-input__label" htmlFor="cvv">CVV</label>
              <input type="text" className="card-input__input" id="cvv" maxLength={4} />
            </div>
          </div>
        </div>

        <button className="card-form__button">
          Submit
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
}
