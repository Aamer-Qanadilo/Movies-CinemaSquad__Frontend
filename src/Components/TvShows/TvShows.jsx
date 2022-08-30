import React, { useContext, useEffect, useState } from 'react';
import { APIContext } from '../APIContext/APIContext';
import { RenderPosters } from '../common/Posters';

function TvShows() {
    const {tv, fetchTVShows} = useContext(APIContext);
    const [activatedTypeIndex,setActivatedTypeIndex] = useState(0);

    useEffect( ()=> {
        fetchTVShows(searchTypes[activatedTypeIndex].type);
    },[activatedTypeIndex])

    const searchTypes = [
        {
            name: 'Airing Today', 
            type: 'airing_today'
        },
        {
            name: 'On The Air', 
            type: 'on_the_air'
        },
        {
            name: 'Popular', 
            type: 'popular'
        },
        {
            name: 'Top Rated', 
            type: 'top_rated'
        },
    ]


    return ( 
    <React.Fragment>
        <div className='row mt-5 align-items-center'>
            <div className="line col-3 col-md-4"></div>
            <h2 className="media-header col-6 col-md-4 text-center">
                Tv Shows List
            </h2>
            <div className="line col-3 col-md-4"></div>
        </div>

        <div className="types-container row mt-5 justify-content-center align-items-center">
                <span className='col-8 col-lg-2 text-center opacity-50 fs-4 p-2 mb-2'><i className="fa-solid fa-filter"></i> Filter By:</span>
                <div className="types-selector col-10 col-lg-8 row text-center border-1 border-white">

                    {searchTypes.map( (type, index) => {
                        return <div key={index} onClick={()=>setActivatedTypeIndex(index)} className={`p-2 col-12 col-md-3 border border-white ${(activatedTypeIndex === index) ? 'active' : ''}`}> {type.name} </div>
                    } )}
                </div>
        </div>

        <div className="row mt-5">
            
            {RenderPosters(tv, 'tv')}
        </div>
    </React.Fragment> );
}

export default TvShows;