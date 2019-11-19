import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
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
  DropdownItem 
} from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  //function for signing out of the application - uses amplify
  function signOut() {
    Auth.signOut()
      .then(data => console.log(data), window.location.href = "/Login")
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/Home">Celebrity Recognition Application</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Search for Celebrity</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Posts about Celebs
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/">
                  View Posts
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/">
                  Create Post
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink href="" onClick={signOut}>Log Out</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;