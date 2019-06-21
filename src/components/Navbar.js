import React from 'react'
import logo from '../images/logo.svg';
import {FaAlignRight} from 'react-icons/fa';
import {Link} from 'react-router-dom';



class Navbar extends React.Component {

  state={
    is0pen:false
  }

  handleToggle =()=> {

    this.setState({is0pen:!this.state.is0pen});
  };

  render () {

    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} alt="LogoOfBeach-Resort"/>
            </Link>
            <button
              type="button"
              className="nav-btn"
              onClick={this.handleToggle}>
              <FaAlignRight className="nav-icon"/>
            </button>
          </div>
          <ul className={this.state.is0pen ? "nav-links show-nav" : "nav-links"}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rooms">Rooms</Link>
            </li>
          </ul>
        </div>
      </nav>
  );
  }
}

export default Navbar;
