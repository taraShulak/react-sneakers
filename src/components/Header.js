import { Link } from 'react-router-dom';
import { useBasket } from '../hooks/useBasket';

function Header(props) {
  const {totalPrice} = useBasket()
   
  return (
    <header className="header">
          <Link to='/'>
            <div className="header__left">
            <div className="header__logo">
              <img src="./img/image 4.png" alt="logo"/>
            </div>
            <div className="header__content">
              <h1 className="header__title">react sneakers</h1>
              <p className="header__text"> The best's sneakers shop </p>
            </div>
            </div>
          </Link>  
          <div className="header__right">
            <div className="header__basket">
              <div className="header__basket__img">
                <img onClick={props.onClickBasket} src="./img/basket.svg" alt="basket"/>
                <p className="header__basket__price">{totalPrice} $</p>
              </div>
              <div className="header__heart">
                <Link to='/liked'>
                  <img src="img/heart.svg" alt="like"/>
                </Link>  
              </div>
              <Link to='/orders'>
                <div className="header__user">
                  <img src="img/user.svg" alt="user"/>
                </div>
              </Link>
            </div>
          </div>
        </header>
  )
}

export default Header;