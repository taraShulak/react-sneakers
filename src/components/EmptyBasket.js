import '../css/EmptyBasket.css';

function EmptyBasket() {
  return (
    <section className="basket be">
      <div className='be__main'>  
        <div className="be__box">
          <div className='basket__image'>
            <img src='/img/empty-basket.jpeg' alt="basket is empty"/>
          </div>
          <h2 className='be__name'>The basket is empty</h2>
          <h3 className='be__text'>add at least one pair of sneakers to complete your order</h3>
          <button className='be-btn'>go back</button>
        </div>
      </div>        
    </section>

  );
}

export default EmptyBasket;