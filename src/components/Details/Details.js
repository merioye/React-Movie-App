import React, { useRef, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './details.css';
import { FaYoutube } from "react-icons/fa";


const useClickOutside = (handler)=>{
    const modal = useRef();

    useEffect(()=>{
        const modalHandler = (e)=>{
            if(!modal.current.contains(e.target)){
                handler();
            }
        }

        document.addEventListener('mousedown', modalHandler);

        return ()=>{
            document.removeEventListener('mousedown', modalHandler);
        }
    })
    return modal;
}



const Details = ({isHide, setIsHide, credits, details, ytLink})=>{
    const modal = useClickOutside(()=>{
        setIsHide(true);
    })

    const responsive = {
        0:{items:1},
        300:{items:2},
        500:{items:3},
        700:{items:4},
        850:{items:5},
        1000:{items:4},
        1300:{items:5},
        1520:{items:6},
        1688:{items:7}
    }

    
    return(
        <div className='modal-container' style={isHide?{display:'none'}:{display:'flex'}}>
            <div className='modal' ref={modal}>
                <div className='modal-image-container'>
                    <img src={details.poster_path ? 'http://image.tmdb.org/t/p/w780'+details.poster_path : 'images/poster-holder.jpg'} alt=''/>
                </div>
                <div className='modal-text'>
                    <h1>{details.name ? details.name+' ('+String(details.first_air_date).slice(0,4)+')' : details.title+' ('+String(details.release_date).slice(0,4)+')'}</h1>
                    <p>45.6 billion won is child's play.</p>
                    <div className='desc-container'>
                        {details.overview}
                    </div>
                    <div className='slider-container'>
                    <AliceCarousel autoPlay={true} autoPlayInterval={700} mouseTrackingEnabled={true} disableAutoPlayOnAction={true} disableDotsControls={true} disableButtonsControls={true} responsive={responsive} infinite={true} >
                        {
                            credits
                            ?
                            credits.map((credit)=>{
                                return(
                                    <div className='slider-content' key={credit.id}>
                                        <img src={credit.profile_path ? 'http://image.tmdb.org/t/p/w780'+credit.profile_path : 'images/poster-holder.jpg'} className='sliderimg' alt=''/>
                                        <p>{credit.original_name}</p>
                                    </div>
                                )
                            })
                            :
                            null
                        }
                        
                    </AliceCarousel>
                    </div>
                    <a href={ytLink} target='_wow' className='yt-anchor'><button className='yt-btn'><FaYoutube style={{fontSize:'1.3rem'}}/>&nbsp; watch the trailor</button></a>
                </div>
            </div>
        </div>
    );
}

export default Details;