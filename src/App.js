import React, {useEffect, useState} from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Basket from './components/Basket/Basket';
import Card from './components/Card/Card';
import Header from './components/Header';
import axios from 'axios';
import Bookmark from './components/Bookmark';
import Main from './components/Main/Main';
import Mybuy from './components/Mybuy';



const itemsArr = [ 
  {"index": 1, "liked": false, "male": "Mens sneakers", "name": "Nike Blazer Mid Suede G", "price": "200", "img": "/img/sneakers/1.jpeg"},
  {"index": 2,  "liked": false, "male": "Mens sneakers", "name": "Nike Air Max 270", "price": "130", "img": "/img/sneakers/2.jpeg"},
  {"index": 3,  "liked": false,  "male": "Mens sneakers", "name": "Nike Blazer Mid Suede W", "price": "277", "img": "/img/sneakers/3.jpeg"},
  {"index": 4,  "liked": false, "male": "Mens sneakers", "name": "Puma X Aka Boku Future Rider", "price": "149", "img": "/img/sneakers/4.jpeg"},
  {"index": 5,  "liked": false, "male": "Mens sneakers", "name": "Under Armour Curry 8", "price": "199", "img": "/img/sneakers/5.jpeg"},
  {"index": 6, "liked": false, "male": "Mens sneakers", "name": "Nike Kyrie 7", "price": "199", "img": "/img/sneakers/6.jpeg"},
  {"index": 7, "liked": false, "male": "Mens sneakers", "name": "Jordan Air Jordan 11", "price": "199", "img": "/img/sneakers/7.jpeg"},
  {"index": 8, "liked": false, "male": "Mens sneakers", "name": "Nike Lebron XVIII Low", "price": "199", "img": "/img/sneakers/8.jpeg"},
  {"index": 9, "liked": false, "male": "Mens sneakers", "name": "Nike LeBron XVIII", "price": "199", "img": "/img/sneakers/9.jpeg"},
  {"index": 10, "liked": false, "male": "Mens sneakers", "name": "Nike Kyrie Flytrap IV", "price": "199", "img": "/img/sneakers/10.jpeg"}
  ]

export const AppContext = React.createContext({})


function App() {

  const [items, setItems] = useState([])
  const [cardsBasket, setCardsBasket] = useState([])
  const [cardsLiked, setCardsLiked] = useState([])
  const [isBasket, setIsBasket] = useState(false)
  const [searchName, setSearchName] = useState('')
  const onHendleBasket = (() => {
    setIsBasket(!isBasket)
  })

  const onChangeSearchInput = (event) => {
    //console.log('', event.target.value);    
    setSearchName(event.target.value)
  }

  const addCardBasket = (obj) => {
    console.log('obj ', obj);
    console.log('', cardsBasket);
    
    if(!cardsBasket.some(item => item.index === obj.index)) {
      axios.post("https://63c870725c0760f69acc04da.mockapi.io/basket", obj);     
      
      //we can do this
      //setCardsBasket([...cardsBasket, obj])
      
      // but better  to do this
      setCardsBasket(prev =>[...prev, obj])   
    } else {
      removeItemFromBasket(obj.index)      
    }
  }

  const addCardToLiked = (obj) => {
       
    console.log('obj ', obj.index);    
    localStorage.removeItem('liked');
    //axios.post("https://63b74c1f4f17e3a931d077e8.mockapi.io/liked", obj);     
    console.log('cardsLiked before ', cardsLiked);
    
    console.log(cardsLiked.find(item => item.index == obj.index ))

    if(cardsLiked.find(item => item.index == obj.index ) !== undefined) {  
      setCardsLiked(prev => prev.filter(item => Number(item.index) !== Number(obj.index)))            
      console.log('liked delete', cardsLiked);    
    } else {
      setCardsLiked(prev =>[...prev, obj])
      console.log('cardsLikedd add ', cardsLiked);      
    }
    
    const json = JSON.stringify(cardsLiked)
    localStorage.setItem(`liked`, json)
    //console.log('json ', json);
    console.log('localStorage.liked ', localStorage.liked);
    
  }

  const removeItemFromBasket = async (index) => {
    try {
      //console.log('cardsBasket ',cardsBasket );
      //console.log('index',index );
      setCardsBasket(prev => prev.filter(item => Number(item.index) != Number(index)))
      const basketResponse = await axios.get("https://63c870725c0760f69acc04da.mockapi.io/basket")
      //console.log('basketResponse ', basketResponse);    
      const deleteItem = await basketResponse.data.filter(item => Number(item.index) === Number(index))
      //console.log('deleteItem', deleteItem);    
      const deleteId = deleteItem[0].id
      //console.log('id ', deleteId);    
      axios.delete(`https://63c870725c0760f69acc04da.mockapi.io/basket/${deleteId}`);      
    } catch (error) {
      alert('error when cardBasket remove')
    }
    
  }

  const closeBasket = () => setIsBasket(false) 
/*
  const myFunc = (items, searchName) => {
    return items.filter(item => item.name.toLowerCase().includes(searchName.toLowerCase()))                 
  }
*/

  useEffect(() => {
 /*  
    fetch("https://63b74c1f4f17e3a931d077e8.mockapi.io/sneakers")
    //fetch("https://mockapi.io/projects/63b74c1f4f17e3a931d077e9")
    .then((res) => { 
      //console.log('res', res);      
      return res.json()
    })
    .then((json) => {
      console.log('data', json);
      setItems(json)
    });
*/
    async function fetchData() {
      try {
        const basketResponse = await axios.get("https://63c870725c0760f69acc04da.mockapi.io/basket")
        const itemsResponse = await axios.get("https://63c870725c0760f69acc04da.mockapi.io/sneakers")
        setCardsBasket(basketResponse.data)
        setItems(itemsResponse.data)   
      } catch (error) {
        alert('can not read data')
      }     
    }
    fetchData();
//use axios library instead of The FETCH
/*    axios.get("https://63b74c1f4f17e3a931d077e8.mockapi.io/sneakers").then( res => {
      //console.log('axios data ', res.data);
      setItems(res.data)
    })

    axios.get("https://63b74c1f4f17e3a931d077e8.mockapi.io/basket").then( res => {
      //console.log('axios basket ', res.data);
      setCardsBasket(res.data)
    })
*/
  }, [])
  
  //console.log('app items ', items);
  return (
    <AppContext.Provider value={{items, cardsBasket, isBasket, setCardsBasket, cardsLiked, closeBasket }}>
      <div className="wrapper">        
      
      {/*isBasket ? <Basket closeBasket={() => setIsBasket(false)}/> : null*/}   
      { isBasket && <Basket onRemove={removeItemFromBasket}/>}
      
      <Header onClickBasket={onHendleBasket}/>
      
      <Routes>
        <Route path='liked' element={ <Bookmark/>}></Route>
      </Routes>
      
      <Routes>
        <Route path='orders' element={ < Mybuy/>}></Route>
      </Routes>

      <Routes>
        <Route 
          path='' 
          element={ 
          <Main
            items={items}  
            cardsBasket={cardsBasket}
            searchName={searchName}
            setSearchName={setSearchName}
            addCardBasket={addCardBasket}
            addCardToLiked={addCardToLiked}
            onChangeSearchInput={onChangeSearchInput} />
            }>
        </Route> 
      </Routes>  
      
      </div>
    </AppContext.Provider>
  );
}

export default App;
