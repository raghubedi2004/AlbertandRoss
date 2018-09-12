import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
		<NavbarBrand href="#"></NavbarBrand>

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/"><span className="icon-basket"></span></NavLink>
            <NavLink href="/">Buy</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="/#/telus/subscriberInfo"><span className="icon-people"></span></NavLink>
            <NavLink href="/#/telus/subscriberInfo">Subscribers</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#"><span className="icon-bulb"></span></NavLink>
            <NavLink href="#">Analytics</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#"><span className="icon-chart"></span></NavLink>
            <NavLink href="#">Abc</NavLink>
          </NavItem>
        </Nav>

        <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
      </header>
    );
  }
}

export default Header;
