import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './Navbar.css';
import Search from '../Search/Search';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';


class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
          modal : false
        }

    }

    toggle = () =>{
      this.setState({ modal : !this.state.modal})
    }

    render(){
        return (
          <div>
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
                          <p className="text-nav ml-3 mt-3">FAVORIS</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <li className="nav-item">    
                  <div className="nav-link">
                    <i className="fa fa-envelope icon" onClick={this.toggle}></i>
                    <p className="text-nav ml-3 mt-3" onClick={this.toggle}>CONTACT</p>
                  </div>  
                  <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                      <ModalHeader toggle={this.toggle} className="modal-contact">CONTACT</ModalHeader>
                      <ModalBody className="modal-contact">
                        <p>Names : Maéva Duran, Matthieu Petit, Tiphaine Deswartes, Antoine Nourris </p>
                        <hr className="mx-5"/>
                        <p>Email address :     Contact@simonphilouze.fr </p>
                      </ModalBody>
                    </Modal>
  					      </div> 
                </li>
                <div className= "menu-bottom navbar navbar-expand-sm fixed-bottom" id="navbarNav"> {/* Navbar du bas*/}
                    <Search />
                  <div className="icon-bottom">                      {/* icones de droite*/}
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                        <Link to="/favoris" className="nav-link">
                          <i className="text-danger fa fa-heart fa-1x icon"></i>
                        </Link>
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
