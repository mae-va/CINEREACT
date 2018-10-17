import React, { Component } from 'react';
import './Navbar.css';

import Search from '../Search/Search';

import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {  Navbar as Navbarr,
  Nav,
  NavItem,
  NavLink,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupDropdown,
  Input,
  Button } from 'reactstrap'


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
            <Search/>
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

          <Navbarr className="bottom-fixed-navbar" expand="lg">
            <Search/>
          </Navbarr>

          <Modal isOpen={this.state.modal} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle} className="modal-contact">CONTACT</ModalHeader>
            <ModalBody className="modal-contact">
              <p>Names : Maéva Duran, Matthieu Petit, Tiphaine Deswartes, Antoine Nourris </p>
              <hr className="mx-5"/>
              <p>Email address : Contact@simonphilouze.fr </p>
            </ModalBody>
          </Modal>
        </div>
        )
    }
  }

export default Navbar;
