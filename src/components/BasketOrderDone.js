import React from 'react';
import { AppContext } from '../App';
import '../css/BasketOrderDone.css';

function BasketOrderDone() {
  
  const {closeBasket} = React.useContext(AppContext)
  
  return (
    <section className="basket bod">
      <div className='bod__main'>  
          <div className="bod__box">
          <div className='bod__image'>
            <img src='/img/order-done.jpeg' alt="order done"/>
          </div>
          <h2 className='be__name'>The order has been placed</h2>
          <h3 className='be__text'>Your order #18 will be sent to courier delivery soon</h3>
          <button onClick={closeBasket} className='bf-btn'>go back</button>
        </div>
      </div>        
    </section>

  );
}

export default BasketOrderDone;