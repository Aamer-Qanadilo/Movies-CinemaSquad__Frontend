import {Link} from 'react-router-dom';

function Navbar({isLoggedIn}) {
    
    return ( 
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
        <Link class="navbar-brand" to="/">CinemaSquad</Link>
        <button class="navbar-toggler border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="fa-solid fa-bars text-white"></span>
        </button>
                <div className={"collapse navbar-collapse " + (isLoggedIn? "justify-content-between" : "justify-content-end")} id="navbarSupportedContent">
                    {isLoggedIn ? 
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">Home</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to="/about">About</Link>
                                </li> */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/movies">Movies</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/tvshows">Tv Shows</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/people">People</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to="/networks">Networks</Link>
                                </li> */}
                            
                            </ul>
                    :''
                    }
                    
                    <ul className="navbar-nav mr-auto">
                        {isLoggedIn? 
                                    <li className="nav-item">
                                        <input className="p-1 rounded mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                    </li>
                        :''}
                        <ul className="navbar-nav mr-auto mx-3">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className='fa-brands fa-facebook'></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className='fa-brands fa-spotify'></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className='fa-brands fa-instagram'></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className='fa-brands fa-youtube'></i> 
                                </a>
                            </li>
                        </ul>
                        {isLoggedIn?
                            <li className="nav-item">
                                <Link className='nav-link' to="/logout">Logout</Link>
                            </li>
                            
                        :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        }
                    
                    </ul>
                </div>

      </nav> 
      );
}

export default Navbar;