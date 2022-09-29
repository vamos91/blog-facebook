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
  Form,
  Input,
  FormGroup
} from 'reactstrap';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function NavBar() {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const toggleModal = async () => {
    setModal(!modal);
    const postDataToBack = await fetch('/article/new', {
      method: 'POST',
      headers: {
        "Content-Type": "Application/json",
        "token": "yADyeawBFB5tCQZ"
      },
      body: JSON.stringify({title: title, content: content})
    })
    const postDataToBackJson = await postDataToBack.json()
    console.log(postDataToBackJson)
  }


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
          <Form>
            <FormGroup>
              <Input 
                placeholder="Title" 
                onChange={(e) => setTitle(e.target.value)}
                value = {title}
                />
            </FormGroup>
            <FormGroup>
              <Input 
                type="textarea" 
                placeholder='Content' 
                rows='10' 
                onChange={(e) => setContent(e.target.value)}
                value = {content}
                />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Valider
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default NavBar;