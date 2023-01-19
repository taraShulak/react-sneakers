import { json } from 'react-router-dom';
import '../css/Bookmark.css';
import Header from './Header';
import Card from './Card/Card';
import App from '../App';

function Bookmark() {
  return (
    <div className="wrapper">
        <section className="main">
          <h1 className="main__title">my bookmark</h1>
          <div className="main__box box">           
            {JSON.parse(localStorage.getItem('liked')).map( item => 
              <Card 
                key={item.name}
                index={item.index}
                liked={true}
                male={item.male}
                name={item.name} 
                price={item.price} 
                img={item.img}
              />           
              )}
          </div>
        </section>
      </div>
  );
}

export default Bookmark;