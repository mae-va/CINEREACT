import React, { Component } from 'react';
import './Navbar.css';
import Search from '../Search/Search';
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {  Navbar as Navbarr, Nav, NavItem, NavLink,} from 'reactstrap'


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
          <Navbarr className="top-fixed-navbar" expand="xs">
            <Link exact to="/">
              <h1 className="logo-cine">CINE</h1>
              <h1 className="logo-react">REACT</h1>
            </Link>
            <Search functionUpdateMovie={this.props.functionUpdateMovie}/>
            <Nav className="ml-auto" navbar>
              <NavItem className="mr-2">
                <NavLink tag={Link} to="/favoris">
                  <i className="fa fa-heart fa-1x icon mr-2"></i>
                  <span className="text-link-nav">Favoris</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggle}>
                  <i className="fa fa-envelope icon mr-2"></i>
                  <span className="text-link-nav">Contact</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Navbarr>
          <Navbarr className="bottom-fixed-navbar">
            <Search functionUpdateMovie={this.props.functionUpdateMovie}/>
          </Navbarr>
          <Modal isOpen={this.state.modal} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle} className="modal-contact">CONTACT</ModalHeader>
            <ModalBody className="modal-contact">
            <div>  
                <img src ={process.env.PUBLIC_URL + './images/Matthieu.jpg'} className="rounded-circle profile pull-left"></img>
                <p  className="ml-5">Matthieu Petit</p>
                <a className="ml-2" href="https://github.com/MatPlume">https://github.com/MatPlume</a>
              </div>
               <hr/>
              <div> 
                <img src ={process.env.PUBLIC_URL + './images/Matthieu.jpg'} className="rounded-circle profile pull-left"></img>
                <p  className="ml-5">Maéva Duran</p>
                <a  className="ml-2" href="https://github.com/mae-va">https://github.com/mae-va</a>
              </div>
              <hr/>
              <div> 
                <img src ={process.env.PUBLIC_URL + './images/Matthieu.jpg'} className="rounded-circle profile pull-left"></img>
                <p  className="ml-5">Antoine Nourris</p>
                <a  className="ml-2" href="https://github.com/awcs">https://github.com/awcs</a>
              </div>
              <hr/>
              <div>
                <img src ={process.env.PUBLIC_URL + './images/Matthieu.jpg'} className="rounded-circle profile pull-left"></img>
                <p  className="ml-5">Tiphaine Deswarte</p>
                <a  className="ml-2" href= "https://github.com/TiphaineDSW">https://github.com/TiphaineDSW</a>
              </div>
            </ModalBody>
          </Modal>
        </div>
      )
    }
  }

export default Navbar;