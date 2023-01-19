import Card from "../Card/Card";

function Main(items, searchName, cardsBasket, setSearchName, 
              addCardBasket, addCardToLiked, onChangeSearchInput) {
      
  //console.log('Main items ', items.items)

  return (
    <section className="main">
      <div className='main__first-block'>
        <h1 className="main__title">{items.searchName ? `find : "${items.searchName}"` : 'all sneakers'}</h1>
        <div className='main__search'>
          <img className='main__search_button' src='/public/img/search.svg' />
          {searchName && (<div onClick={()=> items.setSearchName('')} className='search__close_criss'>
            <img  src="public/img/criss.svg" alt="del"/>
          </div>)}
          <input onChange={items.onChangeSearchInput} value={items.searchName} placeholder='...search' className='main__search-input'/>
        </div>
      </div>
      <div className="main__box box">
      {items.items.filter(item => item.name.toLowerCase().includes(items.searchName.toLowerCase()))
        .map((item, index) => 
        //myFunc(items, searchName).map((item, index) => 
        <Card 
          added={items.cardsBasket.some(card => card.index === item.index)}          
          key={item.index}
          index={item.index}
          male={item.male}
          name={item.name} 
          price={item.price} 
          img={item.img}
          onClickAdd={(obj) => items.addCardBasket(item)}
          onClickLike={(obj) => items.addCardToLiked(obj)}/>
        )}
      </div>
    </section>
  )
}

export default Main;