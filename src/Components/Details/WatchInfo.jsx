import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { APIContext } from '../APIContext/APIContext';
import { imgPrefix, RenderPosters } from '../common/Posters';

function WatchInfo() {
    const {fetchDetails} = useContext(APIContext);
    const {state} = useLocation();
    const [details, setDetails] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [numberOfSlides, setNumberOfSlides] = useState(6);

    useEffect( () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        getDetails(state.id, state.mediaType);
        changeNumberOfSlide(window.innerWidth);
    }, [state])

    async function getDetails(id, mediaType) {
        let data = await fetchDetails(id, mediaType);
        setDetails(data);
        
        data = await fetchDetails(id, mediaType, '/similar');
        setSimilarMovies(data.results);
        
        data = await fetchDetails(id, mediaType, '/recommendations');
        setRecommendations(data.results);

        // console.log(details);
        // console.log(recommendations);
        // console.log(similarMovies);
    };

    const changeNumberOfSlide = (width) => {
        if(width >= 1200)       setNumberOfSlides(6);
        else if(width >= 760)   setNumberOfSlides(4);
        else                    setNumberOfSlides(2);
    }

    return ( 
    <div>
        <div className='row mt-5'>
            <div className="watch-img col-12 col-lg-6">
                <img className='w-100' src={imgPrefix + details.poster_path} alt="" />
            </div>
            <div className="watch-details col-12 my-5 mx-3 m-lg-0 col-lg-6">
                <h2>{details.title || details.original_title || details.name}</h2>
                <p className='opacity-50'>{details.tagline}</p>
                <div className="watch-genres d-flex my-4">
                    {details.genres && details.genres.map( (watchGenre) => <div className='mx-2 bg-primary p-1 rounded'>{watchGenre.name}</div>)}
                </div>
                <div className="row my-5">
                    <div className="col-3">Spoken Languages:</div>
                    <div className="col-9 opacity-75">{details.spoken_languages && details.spoken_languages.map((language, index)=>{
                        let name = (language.name)
                        if(index+1 !== details.spoken_languages.length) name += ', '
                        return name;
                    })}</div>
                </div>
                <div className="row my-5">
                    <div className="col-3">Release Date:</div>
                    <div className="col-9 opacity-75">{details.release_date || '-'}</div>
                </div>
                <div className="row my-5">
                    <div className="col-3">Vote Average:</div>
                    <div className="col-9 opacity-75">{details.vote_average || '-'}</div>
                </div>
                <div className="row my-5">
                    <div className="col-3">Vote Count:</div>
                    <div className="col-9 opacity-75">{details.vote_count || '-'}</div>
                </div>
                <div className="row my-5">
                    <div className="col-3">Overview:</div>
                    <div className="col-9 opacity-75">{details.overview || '-'}</div>
                </div>
            </div>
        </div>

            <React.Fragment>
                {similarMovies.length ? <div className='row mt-5 mb-3 align-items-center'>
                                    <div className="line col-4"></div>
                                    <h2 className="media-header col-4 text-center">
                                        Similer {state.mediaType} To Watch
                                    </h2>
                                    <div className="line col-4"></div>
                                </div>
                                : <></>
                }

                <Slider slidesToShow={numberOfSlides} autoplay={true} infinite={true}>
                    {RenderPosters(similarMovies,state.mediaType)}
                </Slider>
            </React.Fragment>
            


            <React.Fragment>
                
                {recommendations.length ? <div className='row mt-5 mb-3 align-items-center'>
                                    <div className="line col-4"></div>
                                    <h2 className="media-header col-4 text-center">
                                        Recommended {state.mediaType} To Watch
                                    </h2>
                                    <div className="line col-4"></div>
                                </div>
                                : <></>
                }

                <Slider slidesToShow={recommendations.length > 6 ? numberOfSlides : recommendations.length} autoplay={true} infinite={true}>
                    {RenderPosters(recommendations,state.mediaType)}
                </Slider>
            </React.Fragment>
            
        
        
    </div>);
}

export default WatchInfo;