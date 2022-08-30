import React, { useContext, useEffect } from 'react';
import { APIContext } from '../APIContext/APIContext';
import { renderPersonPosters, renderPostersLoaders } from '../common/Posters';

function People() {
    const {loading, people} = useContext(APIContext);
    
    useEffect( () => {
        console.log(people);
    }, [])

    return ( 
    <React.Fragment>
        <div className='row mt-5 align-items-center'>
            <div className="line col-4"></div>
            <h2 className="media-header col-4 text-center">
                People List
            </h2>
            <div className="line col-4"></div>
        </div>
        <div className="row mt-5">

            {loading? renderPostersLoaders() :renderPersonPosters(people)}
        </div>
    </React.Fragment> );
}

export default People;