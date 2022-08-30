import holderImg from '../../test.png';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

export const imgPrefix = 'https://image.tmdb.org/t/p/w500';


const getMoreDeatils = (id, navigator, mediaType) => {

    const path = {
        pathname: '/watch',
        search: `?id=${id}`
    }
    navigator(path,{state:{id: id, mediaType: mediaType}});
}

export function renderPostersLoaders(){
    let loaderArr = new Array(10);
    
    return loaderArr.map((element, index) => {
        return (<div key={index} className="loader col-6 col-sm-4 col-md-3 col-lg-2 my-3 text-center">
                    <div className='loader-img position-relative mb-3'>
                        <div className='w-100 h-100 d-flex justify-content-center align-items-center'> 
                            <i class="fa-solid fa-bars"></i>
                        </div>
                    </div>
                    <h3 className='loader-name'><i class="fa-solid fa-bars"></i></h3>
                </div>)
    });
    
}



export function RenderPosters(posterContainer=[], mediaType){

    const navigator = useNavigate();

    return (posterContainer.map( (element,elementIndex) => (
        element.poster_path ? (
        <div key={elementIndex} className="poster col-6 col-sm-4 col-md-3 col-lg-2 my-3 text-center" onClick={()=>getMoreDeatils(element.id, navigator, mediaType)}>
            <div className='poster-img position-relative mb-3'>
                <img className='w-100 h-100 bg-light' src={imgPrefix+element.poster_path } alt="" />
                <div className='poster-img-mask bg-opacity-50 bg-dark w-100 h-100 position-absolute start-0'>
                </div>
                <i class="poster-img-play-icon fa-regular fa-circle-play"></i>
                <i className='poster-rating p-2 bg-light bg-opacity-75 text-dark rounded'>{element.vote_average}</i>
            </div>
            <h3 className='poster-name opacity-75'>{element.name || element.title}</h3>
        </div>)
        : <></>
    )));
}

export function renderPersonPosters(posterContainer=[]){

    return (posterContainer.map( (element,elementIndex) => (
        <div key={elementIndex} className="poster col-6 col-sm-4 col-md-3 col-lg-2 my-3 text-center d-flex flex-column justify-content-between" >
            <div className='poster-img position-relative mb-3'>
                <img className='w-100 bg-light' src={element.profile_path ? (imgPrefix+element.profile_path) : holderImg} alt={element.name + '\'s image'} />
                <div className='poster-img-mask bg-opacity-50 bg-dark w-100 h-100 position-absolute start-0'>
                </div>
            </div>
            <h3 className='poster-name'>{element.name || element.title}</h3>
        </div>
    )));
}
