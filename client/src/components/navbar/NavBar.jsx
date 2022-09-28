import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function NavBar(args) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);


  return (
    <div>
      <Navbar color='danger' expand='md'>
        <NavbarBrand href="/">Blog</NavbarBrand>
          <Nav className="me-auto" navbar>
            <Link to="/">
              <NavLink>Home</NavLink>
            </Link>
            <Link to="/my-article">
              <NavLink>My articles</NavLink>
            </Link>
              <NavLink onClick={() => toggleModal()}>New article</NavLink>
          </Nav>
          <NavLink><Button color="default">Signin</Button></NavLink>
          <NavLink><Button color="warning">Signup</Button></NavLink>
      </Navbar>

      <Modal isOpen={modal} fade={false} toggle={toggleModal}>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default NavBar;