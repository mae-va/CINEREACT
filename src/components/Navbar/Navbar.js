import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './Navbar.css';

import Search from '../Search/Search';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
          <div className="container-fluid">
            <nav className="navbar navbar-expand-md fixed-top"> {/* Navbar du haut*/}
            <Link exact to="/">
              <h1 className="logo-cine">CINE</h1>
              <h1 className="logo-react">REACT</h1> {/* Logo */}
            </Link>
                <div className="collapse navbar-collapse" > {/* icones de droite*/}
                  <div>
                    <Search />
                  </div>
                  <div>
                    <ul className="navbar-nav">
                      <li className="nav-item active pr-5">
                        <Link to="/favoris" className="nav-link">
                          <i className="fa fa-heart icon"></i>
                          <p className="text-nav ml-3 mt-3">Favoris</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="fa fa-envelope icon"></i>
                          <p className="text-nav ml-3 mt-3">Contact</p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className= "menu-bottom navbar navbar-expand-sm fixed-bottom" id="navbarNav"> {/* Navbar du bas*/}
                  <div>
                    <button className="btn btn-link" type="button" >
                        <i className="fa fa-search fa-2x"></i>           {/* icone recherche */}
                    </button>
                    </div>
                    <div className="icon-bottom">                      {/* icones de droite*/}
                      <ul className="navbar-nav">
                          <li className="nav-item active pr-5">
                              
                              <a className="nav-link" href="#">
                                <i className="fa fa-heart fa-2x icon mt-1"></i>
                              </a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="#">
                                <i className="fa fa-envelope fa-2x icon mt-1"></i>
                              </a>
                          </li>

                      </ul>
                    </div>
                </div>
            </nav>
      
          </div>

        )
    }
  }

export default Navbar;
