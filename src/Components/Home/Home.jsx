import axios from "axios";
import { useContext } from "react";
import { APIContext } from "../APIContext/APIContext";
import { renderPersonPosters, RenderPosters } from "../common/Posters";

function Home() {
    const {trendingMovies, trendingTV, trendingPeople} = useContext(APIContext);

    const renderHeader = (name, additionalHeading='', paragraph='') => {
        return (<div className="col-6 col-sm-8 col-md-6 col-lg-4 d-flex flex-column justify-content-center">
                    <div className="line opacity-50 w-25"></div>
                    <div className="home-header my-4">
                        Trending <br />
                        {name}            <br />
                        {additionalHeading}
                    </div>
                    <p className="opacity-50">{paragraph}</p>
                    <div className="line opacity-50 w-75"></div>
                </div>);
    }

    return ( 
    <div className="container">
        <div className="row">
            {renderHeader('Movies', 'To Watch Now', 'Most Watched Movies By Day')}
            {RenderPosters(trendingMovies, 'movie')}    
        </div>    
        <div className="row">
            {renderHeader('TV Shows', 'To Watch Now', 'Most Watched TV Shows By Day')}
            {RenderPosters(trendingTV, 'tv')}    
        </div>    
        <div className="row">
            {renderHeader('People', '', 'You Might Want to watch their works')}
            {renderPersonPosters(trendingPeople)}    
        </div>    
    </div> );
}

export default Home;