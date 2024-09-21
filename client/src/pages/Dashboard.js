import React from 'react';
import { Button, Col, Container, Row, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'; // Custom CSS for additional styles

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/manage-orders" className="nav-link">Manage Orders</Link>
              <Link to="/manage-users" className="nav-link">Manage Users</Link>
              <Link to="/manage-menu" className="nav-link">Manage Menu</Link>
            </Nav>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="main-content">
        <Row>
          <Col md={2} className="sidebar bg-light">
            <Nav className="flex-column">
              <Link to="/manage-orders" className="nav-link">Manage Orders</Link>
              <Link to="/manage-users" className="nav-link">Manage Users</Link>
              <Link to="/manage-menu" className="nav-link">Manage Menu</Link>
            </Nav>
          </Col>
          <Col md={10}>
            <h1>Welcome to the Admin Dashboard</h1>
            <p>Select an option from the sidebar to get started.</p>
          </Col>
        </Row>
      </Container>

      <footer className="footer bg-dark text-white text-center py-3">
        &copy; {new Date().getFullYear()} Tiffin Delivery & Management System
      </footer>
    </div>
  );
};

export default Dashboard;
