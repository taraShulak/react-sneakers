import React from 'react';
import { AppContext } from '../App';

export const useBasket = () => {
  const {cardsBasket, setCardsBasket} = React.useContext(AppContext)
  const totalPrice = cardsBasket.reduce((acc, current) => acc + +current.price, 0)
  
  return { cardsBasket,setCardsBasket, totalPrice }
}

