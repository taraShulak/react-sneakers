import { useEffect, useState } from 'react';
import style from './Card.module.css'

function Card ({index, liked = false, added = false, male, name, price, img, onClickAdd, onClickLike}) {

  const [isAdded, setIsAdded] = useState(added)
  const [isLiked, setIsLiked] = useState(liked)
  //console.log('isLiked ', isLiked);
  const onClickAdded = () => {
    onClickAdd({index, male, name, price, img});
    setIsAdded(!isAdded);
  }

  const onClickLiked = () => {
    console.log('isLiked before ', isLiked);    
    setIsLiked(isLiked == false ? true : false);  
    console.log('isLiked after in Cards ', isLiked);
    onClickLike({index, male, name, price, img});   
  }

  useEffect(() => {
   // console.log('rendering of SPA')
  },[isAdded, isLiked])

  return (
    <div className={style.box__item}>
              <div className={style.box__image}>
                {onClickLike && <div onClick={onClickLiked} className={style.box_like}>
                  <img  src={isLiked ? "/img/heart_liked.svg" : "/img/heart-box.svg" }alt="heart-box"/>
                </div>}
                <img className={style.box_main_img} src={img} alt="photo sneakers"/>
              </div>
              <div className={style.box__title}>
                <p>{male}</p>
                <p>{name}</p>
              </div>
              <div className={style.box__price}>
                <div className={style.box__price_text}>
                  <div className={style.price__name}>PRICE</div>
                  <div className={style.price__number}>{price} $</div>
                </div>
                { onClickAdd && <div onClick={onClickAdded} className={isAdded 
                  ? `${style.box__price_plus} ${style.plus__background}` 
                  : `${style.box__price_plus}`} >
                  <img src={isAdded ? "/img/checked.svg" : "/img/plus.svg" } alt="add"/>
                </div>}
              </div>
            </div>
  )
}
export default Card;