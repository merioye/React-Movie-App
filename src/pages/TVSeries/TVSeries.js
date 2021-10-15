import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import PageName from '../../components/PageName/PageName';
import Navbar from '../../components/Navbar/Navbar';
import Genres from '../../components/Genres/Genres';
import ItemCard from '../../components/ItemCard/ItemCard';
import Pagination from '../../components/Pagination/Pagination';
import Details from '../../components/Details/Details';
import './tvseries.css';


const TVSeries = ()=>{
    const [genres, setGenres] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [tvSeries, setTvSeries] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [isHide, setIsHide] = useState(true);
    const [credits, setCredits] = useState([]);
    const [itemDetails, setItemDetails] = useState({});
    const [ytLink, setYtLink] = useState('');


    const fetchGenres = async ()=>{
        try{
            const res = await fetch('https://api.themoviedb.org/3/genre/tv/list?api_key={Your Api Key Here}&language=en-US');
            if(!res.ok){
                throw new Error(res.status);
            }
            const data = await res.json();
            setGenres(data.genres);
        }catch(e){
            console.log(e);
        }
    }


    useEffect(()=>{
        fetchGenres();
    }, []);

    useEffect(()=>{
        const fetchTvSeries = async ()=>{
            try{
                
                const res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key={Your Api Key Here}&language=en-US&page=${pageNo}&with_genres=${genreList.join('|')}`);
                if(!res.ok){
                    throw new Error(res.status);
                }
                const data = await res.json();
                setTvSeries(data.results);
                setPageCount(data.total_pages);
            }catch(e){
                console.log(e);
            }
        }
        fetchTvSeries();
    },[pageNo, genreList]);



    

    const addGenre = (e)=>{
        setGenreList([...genreList, e.target.id]);
    }
    const removeGenre = (e)=>{
        setGenreList(genreList.filter((item)=>{
            return item!==String(e.target.id);
        }));
    }


    const handlePageClick = (e)=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        setPageNo(e.selected+1);
    }


    const fetchCredits = async (id, media)=>{
        try{
            const res = await fetch(`http://api.themoviedb.org/3/tv/${id}/credits?api_key={Your Api Key Here}&language=en-US`);
            if(!res.ok){
                throw new Error(res.status);
            }
            const data = await res.json();
            setCredits(data.cast);
        }catch(e){
            console.log(e);
        }
    }
    const fetchYtLink = async (id, media)=>{
        try{
            const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key={Your Api Key Here}`);
            if(!res.ok){
                throw new Error(res.status);
            }
            const data = await res.json();
            setYtLink('https://www.youtube.com/watch?v='+data.results[0].key);
        }catch(e){
            console.log(e);
        }
    }
    const handleItemClick = (id, media, item)=>{
        fetchCredits(id);
        fetchYtLink(id);
        setIsHide(false);
        setItemDetails(item);
    }
    return(
        <>
            <Details isHide={isHide} setIsHide={setIsHide} credits={credits} details={itemDetails} ytLink={ytLink}/>
            <Header/>
            <div className='tv-page-container'>
                <PageName name='discover series'/>
                <div className='genres-container'>
                    {
                        genres
                        ?
                        genres.map((item)=>{
                            return <Genres genre={item} key={item.id} addGenre={addGenre} removeGenre={removeGenre} isSelected={genreList.includes(String(item.id))}/>
                        })
                        :
                        null
                    }
                </div>
                <div className='tv-items-container'>
                    {
                        tvSeries
                        ?
                        tvSeries.map((item)=>{
                            return <ItemCard item={item} key={item.id} event={handleItemClick}/>
                        })
                        :
                        null
                    }
                </div>
            {
                tvSeries
                ?
                <Pagination pageCount={pageCount} handlePageClick={handlePageClick}/>
                :
                null
            }
            </div>
            
            <Navbar/>
        </>
    );
}

export default TVSeries;