import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import PageName from '../../components/PageName/PageName';
import ItemCard from '../../components/ItemCard/ItemCard';
import Pagination from '../../components/Pagination/Pagination';
import Details from '../../components/Details/Details';
import './trending.css';

const Trending = ()=>{
    const [trending, setTrending] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [isHide, setIsHide] = useState(true);
    const [credits, setCredits] = useState([]);
    const [itemDetails, setItemDetails] = useState({});
    const [ytLink, setYtLink] = useState('');


    useEffect(()=>{
        const fetchTrending = async ()=>{
            try{
                const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key={Your Api Key Here}&page=${pageNo}`);
                if(!res.ok){
                    throw new Error(res.status);
                }
                const data = await res.json();
                setTrending(data.results)
                setPageCount(data.total_pages);
            }catch(e){
                console.log(e);
            }
        }
        fetchTrending();
    },[pageNo]);


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
            const res = await fetch(`http://api.themoviedb.org/3/${media}/${id}/credits?api_key={Your Api Key Here}&language=en-US`);
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
            const res = await fetch(`https://api.themoviedb.org/3/${media}/${id}/videos?api_key={Your Api Key Here}`);
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
        fetchCredits(id, media);
        fetchYtLink(id, media);
        setIsHide(false);
        setItemDetails(item);
    }

    return(
        <>
            <Details isHide={isHide} setIsHide={setIsHide} credits={credits} details={itemDetails} ytLink={ytLink}/>
            <Header/>
            <div className='trending-page-container'>
                <PageName name='trending today' />
                <div className='trending-items-container'>
                    {
                        trending
                        ?
                        trending.map((item)=>{
                            return <ItemCard item={item} key={item.id} event={handleItemClick}/>
                        })
                        :
                        null
                    }
                    
                </div>
            {
                trending
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

export default Trending;