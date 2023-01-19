import { useEffect, useState } from 'react';
import '../css/Mybuy.css';
import Card from './Card/Card';

function Mybuy() {
  const [orders, setOrders] = useState([])
    
  const clearOrder = () => {
    localStorage.removeItem('orders')
    setOrders([])
    console.log('clear ordres.....');
    
  }
  const json = JSON.parse(localStorage.getItem('orders')) == null ?
    [] : JSON.parse(localStorage.getItem('orders'))
  //setOrders(json == null ? [] : [...orders])
  
  console.log('json ', json);
  
  return (
        <section className="main">
          <div className='main__header'>
            <h1 className="main__title">my buys</h1>
            <button className='clear__btn' onClick={clearOrder}>clear orders</button>
         </div>
         <div className="main__box box">           
            {json.map(item => 
              <Card
                key={item.name}
                index={item.index}
                male={item.male}
                name={item.name} 
                price={item.price} 
                img={item.img}
              />   
            )}
          </div>
        </section>     
  );
}

export default Mybuy;