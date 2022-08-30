import axios from "axios";
import { createContext, useEffect, useState } from "react";

const APIKey = "";
export let APIContext = createContext([]);

export function APIContextProvider(props){
    const [movies, setMovies] = useState([]);
    const [tv, setTv] = useState([]);
    const [people, setPeople] = useState([]);
    const [movieGenres, setMovieGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTV, setTrendingTV] = useState([]);
    const [trendingPeople, setTrendingPeople] = useState([]);

    // 

    async function getPostersDetails(posterName, setPosters, searchType='popular'){

        let {data} = await axios.get(`https://api.themoviedb.org/3/${posterName}/${searchType}?api_key=${APIKey}&language=en-US`);
        setPosters(data.results);
    }

    async function getGenres(posterName, setGenres){
        let {data} = (await axios.get(`https://api.themoviedb.org/3/genre/${posterName}/list?api_key=${APIKey}&language=en-US`));
        setGenres(data.genres);
    }

    async function getTrendings(mediaType, setMediaType){
        let {data} = (await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=${APIKey}`));
        setMediaType(data.results);
    }

    async function fetchDetails(id, mediaType, extraDetails=''){
        let {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id+extraDetails}?api_key=${APIKey}&language=en-US`);
        return data;
    }

    function fetchAllAPIs(searchType){
        setLoading(true);

        fetchMovies(searchType);
        getGenres('movie', setMovieGenres);

        fetchTVShows(searchType);
        
        fetchPeople(searchType);

        setLoading(false);
    }

    function fetchTVShows(searchType){
        setLoading(true);

        console.log('tv shows before', tv);

        getPostersDetails('tv', setTv, searchType);

        console.log('tv shows after', tv);

        setLoading(false);
    }

    function fetchMovies(searchType){
        setLoading(true);

        console.log('movies before', movies);

        getPostersDetails('movie', setMovies, searchType);

        console.log('movies after', movies);

        setLoading(false);
    }

    function fetchPeople(searchType){
        setLoading(true);

        getPostersDetails('person', setPeople, searchType);

        setLoading(false);
    }

    useEffect( () => {
        
        
        getTrendings('person', setTrendingPeople);
        getTrendings('movie', setTrendingMovies);
        getTrendings('tv', setTrendingTV);

        fetchAllAPIs('popular');
    }, []);

    return (
    <APIContext.Provider value={{fetchMovies, fetchTVShows, 
                                 fetchDetails,
                                 loading, setLoading, 
                                 movies, movieGenres, 
                                 tv, 
                                 people, 
                                 trendingMovies, trendingPeople, trendingTV}}>
        {props.children}
    </APIContext.Provider>);
}