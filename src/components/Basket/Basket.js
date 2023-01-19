import React, { useState } from 'react';
import { AppContext } from '../../App';
import '../../css/EmptyBasket.css';
import { useBasket } from '../../hooks/useBasket';
import BasketOrderDone from '../BasketOrderDone';
import style from './Basket.module.css';
import axios from 'axios';

function Basket({onRemove}) {
  //console.log('cardsBasket ', cardsBasket);
  const {cardsBasket, totalPrice} = useBasket()
  //const [orders, setOrders] = useState([])
  const {closeBasket, setCardsBasket, isBasket} = React.useContext(AppContext)
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false)

  const onClickOrder = async () => {    
    const prev = JSON.parse(localStorage.getItem('orders')) == null ?
        [] : JSON.parse(localStorage.getItem('orders'))
    
    const currentOrder = [...cardsBasket]    
    const json = JSON.stringify([...prev, ...currentOrder])
    localStorage.setItem(`orders`, json)
    
    const basketResponse = await axios.get("https://63c870725c0760f69acc04da.mockapi.io/basket")   
    function clearAxiosBasket() { 
      basketResponse.data.forEach(item => {
      axios.delete(`https://63c870725c0760f69acc04da.mockapi.io/basket/${item.id}`)
      })  
    }
    clearAxiosBasket()    
    
    setCardsBasket([])
    setIsOrderCompleted(true)
  }

  return (
    <div className={'overlay'}>
      <section  className={style.basket}>
        <div className={style.basket__main}> 
          <div className={style.basket__header}>
            <h1 className={style.basket__title}>Basket</h1>
            <div onClick={closeBasket} className={style.basket__close_criss}>
              <img  src="/img/criss.svg" alt="del"/>
            </div>
          </div>
          { isOrderCompleted ? <BasketOrderDone /> 
          : cardsBasket.length > 0 
          ? ( <div className={style.basket__box}>
            {cardsBasket.map((card) => (
              <div key={card.index} className={style.basket__item}>
               <div className={style.basket__image}>
                 <img className={style.basket_main_img} src={card.img} alt="photo sneakers"/>
               </div>
               <div>
                 <div className={style.basket__item_title}>
                   <p>{card.male}</p>
                   <p>{card.name}</p>
                 </div>
                 <div className={style.basket__price}>{card.price} $</div>
               </div>
               <div onClick={ ()=> onRemove(card.index)} className={style.basket__price_criss}>
                 <img src="/img/criss.svg" alt="del"/>
               </div>
              </div>
            ))}
             </div>)
          : (
            <section className="basket be">
            <div className='be__main'>  
              <div className="be__box">
                <div className='basket__image'>
                  <img src='/img/empty-basket.jpeg' alt="basket is empty"/>
                </div>
                <h2 className='be__name'>The basket is empty</h2>
                <h3 className='be__text'>add at least one pair of sneakers to complete your order</h3>
                <button onClick={closeBasket} className='be-btn'>go back</button>
              </div>
            </div>        
            </section>
          )}
        </div>  
        {cardsBasket.length > 0  && !isOrderCompleted ?
        (<div className={`${style.basket__footer} ${style.bf}`}>
          <div className={style.bf__summ}>
            <p className={style.bf__summ_title}>Summa :</p>
            <p className={style.bf__rectangle}></p>
            <p className={style.bf__summ_number}>
              {totalPrice} $
            </p>
          </div>
          <div className={style.bf__tax}>
            <p className={style.bf__tax_title}>Tax 20% :</p>
            <p className={style.bf__rectangle}></p>
            <p className={style.bf__tax_number}>
              {Math.ceil( totalPrice / 5)} $
            </p>
          </div>
          <button onClick={onClickOrder} className={style.bf_btn}>to order</button>
        </div>)
        : null}
      </section>
    </div>
  );
}

export default Basket;