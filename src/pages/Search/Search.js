import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import ItemCard from '../../components/ItemCard/ItemCard';
import Pagination from '../../components/Pagination/Pagination';
import Details from '../../components/Details/Details';
import './search.css';

const Search = ()=>{
    const [val, setVal] = useState('');
    const [tab, setTab] = useState('movie');
    const [searchResult, setSearchResult] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [isHide, setIsHide] = useState(true);
    const [credits, setCredits] = useState([]);
    const [itemDetails, setItemDetails] = useState({});
    const [ytLink, setYtLink] = useState('');


    useEffect(()=>{
        const fetchSearchResult = async ()=>{
            try{
                const res = await fetch(`https://api.themoviedb.org/3/search/${tab}?api_key={Your Api Key Here}&query=${val}&page=${pageNo}`);
                if(!res.ok){
                    throw new Error(res.status);
                }
                const data = await res.json();
                setSearchResult(data.results);
                setPageCount(data.total_pages);
            }catch(e){
                console.log(e);
            }
        }
        if(val){
            fetchSearchResult();
        }
    },[pageNo,tab,val]);

    const handleFocus = (e)=>{
        e.target.style.borderBottom = '3px solid white';
    }
    const handleBlur = (e)=>{
        e.target.style.borderBottom = '1px solid white';
    }
    const handleChange = (e)=>{
        setVal(e.target.value);
    }

    const handlePageClick = (e)=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        console.log(e.selected);
        setPageNo(e.selected+1);
    }


    const fetchCredits = async (id, media)=>{
        try{
            const res = await fetch(`http://api.themoviedb.org/3/${tab}/${id}/credits?api_key={Your Api Key Here}&language=en-US`);
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
            const res = await fetch(`https://api.themoviedb.org/3/${tab}/${id}/videos?api_key={Your Api Key Here}`);
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
            <Header />
            <div className='search-page-container'>
                <div className='search-box-container'>
                    <input className='search-box' placeholder='Search' value={val} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
                </div>
                <div className='search-and-movies-tabs'>
                    <div style={tab==='movie' ? {borderBottom:'2px solid white'} : null} onClick={()=>setTab('movie')}>search movies</div>
                    <div style={tab==='tv' ? {borderBottom:'2px solid white'} : null} onClick={()=>setTab('tv')}>search tv series</div>
                </div>
                <div className='tv-and-movies-items-container'>
                    {
                        searchResult
                        ?
                        searchResult.map((item)=>{
                            
                            return <ItemCard item={item} key={item.id} event={handleItemClick}/>
                        })
                        :
                        null
                    }
                </div>
                {
                    searchResult
                    ?
                    <Pagination pageCount={pageCount} handlePageClick={handlePageClick}/>
                    :
                    null
                }
            </div>
            <Navbar />
        </>
    );
}

export default Search;