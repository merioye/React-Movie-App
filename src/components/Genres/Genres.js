import React from 'react';
import './genres.css';

const Genres = ({genre, addGenre, isSelected, removeGenre})=>{
    return <span style={isSelected ? {background:'#3f51b5',color:'white'} : null} className='genre' id={genre.id} >
                <span id={genre.id} onClick={addGenre}>{genre.name}</span>
                {
                    isSelected
                    ?
                    <span className='genre-cross' id={genre.id} onClick={removeGenre}>x</span>
                    :
                    null
                }  
            </span>
}

export default Genres;