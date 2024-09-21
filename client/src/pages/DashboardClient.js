import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardClient = () => {
  return (
    <Container>
      <h2>Client Dashboard</h2>
      <div>
        <Link to="/create-order">
          <Button variant="primary">Create Order</Button>
        </Link>
        <Link to="/update-profile" className="ms-3">
          <Button variant="secondary">Update Profile</Button>
        </Link>
      </div>
    </Container>
  );
};

export default DashboardClient;
