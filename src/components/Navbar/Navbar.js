import React, { Component } from 'react';
import './Navbar.css';


class Navbar extends Component {
    constructor() {
        super();
    }

    render(){
        return (
          <div className="container-fluid">

          
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <a className="logo" href="index.html">
                    <img className="logo-img" src="./logo_cine-react.png" alt=""/>
                </a>

                
                {/*<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
        </button>*/}
                <div className="collapse navbar-collapse pr-5" id="navbarNav">
                  <div>
                    <button className="btn btn-link search" type="button" >
                          <i class="fa fa-search fa-2x"></i>
                    </button>
                    </div>

                    <div>
                      <ul className="navbar-nav">
                          <li className="nav-item active pr-5">
                              
                              <a className="nav-link" href="#">
                                <i className="fa fa-heart icon mt-1"></i>
                                <p className="ml-3 mt-3">Favoris</p>
                              </a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="#">
                                <i className="fa fa-envelope icon mt-1"></i>
                                <p className="ml-3 mt-3">Contact</p>
                              </a>
                          </li>

                      </ul>
                    </div>
                </div>

                <div className= "menu-bottom navbar navbar-expand-sm  fixed-bottom" id="navbarNav">
                  <div>
                    <button className="btn btn-link" type="button" >
                          <i class="fa fa-search fa-2x"></i>
                    </button>
                    </div>

                    <div className="icon-bottom">
                      <ul className="navbar-nav">
                          <li className="nav-item active pr-5">
                              
                              <a className="nav-link" href="#">
                                <i className="fa fa-heart icon mt-1"></i>
                              </a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="#">
                                <i className="fa fa-envelope icon mt-1"></i>
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