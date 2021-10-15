import React from 'react';
import './itemcard.css';

const ItemCard = ({item, event})=>{
    return(
        <div className='card' onClick={()=>event(item.id, item.media_type, item)}>
            <div className='rating' style={item.vote_average<6 ? {background: '#f50057'} : null}>{item.vote_average}</div>
            <div className='item-image'>
                <img src={item.poster_path ? 'http://image.tmdb.org/t/p/w780'+item.poster_path : 'images/poster-holder.jpg'} alt=''/>
            </div>
            <div className='item-desc'>
                <p className='item-name'>{item.name || item.title}</p>
                <div className='date-and-category'>
                    {
                        item.media_type==='tv'
                        ?
                        <p>TV Series</p>
                        :
                        <p>Movie</p>
                    }
                    
                    <p>{item.first_air_date || item.release_date}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;