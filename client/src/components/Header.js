import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/dashboard">Admin Panel</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/manage-orders">Manage Orders</Nav.Link>
        <Nav.Link as={Link} to="/manage-users">Manage Users</Nav.Link>
        <Nav.Link as={Link} to="/manage-menu">Manage Menu</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
