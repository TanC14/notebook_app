import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useHistory, useLocation} from 'react-router-dom/cjs/react-router-dom.min';





const Bar = () => {
  let hist = useHistory();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    hist.push('/login');
  }
  
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Notebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active":" "}`}to="/books"></Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/books"? "active":" "}`}to="/books">Books</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/history"? "active":" "}`} to="/history">History</Link>
        </li>
        
      
      </ul>
      if({!localStorage.getItem('token')}) {<form className="d-flex ">
      <Link className="btn btn-light mx-2" to="/login"  role="button">Login</Link>
      <Link className="btn btn-light mx-2" to="/signup" role="button">Sign up</Link>
      </form>}
      else { (<button onClick={handleLogout}  className="btn btn-primary">Log out</button>)}
    </div>
  </div>
</nav>
  )
}

export default Bar
