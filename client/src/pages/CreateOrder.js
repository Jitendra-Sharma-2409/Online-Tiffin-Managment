import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getMenuItems } from '../services/api'; // Adjust the import path as needed

const CreateOrder = () => {
  const [deliveryDate, setDeliveryDate] = useState('');
  const [menuItem, setMenuItem] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await getMenuItems();
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have a way to get the current user's ID
      const userId = 1; // Replace with actual user ID fetching logic
      await axios.post('http://localhost:3000/api/orders/create', { userId, deliveryDate, menuItem });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <Container>
      <h1>Create Order</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMenuItem">
          <Form.Label>Menu Item</Form.Label>
          <Form.Control
            as="select"
            value={menuItem}
            onChange={(e) => setMenuItem(e.target.value)}
          >
            <option value="">Select menu item</option>
            {menuItems.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formDeliveryDate">
          <Form.Label>Delivery Date</Form.Label>
          <Form.Control
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Order
        </Button>
      </Form>
    </Container>
  );
};

export default CreateOrder;




// import React, { useState } from 'react';
// import { Button, Col, Container, Form, Row } from 'react-bootstrap';
// import api from '../services/api'; // Adjust the path as needed

// const CreateOrder = () => {
//   const [deliveryType, setDeliveryType] = useState('one-time');
//   const [deliveryDate, setDeliveryDate] = useState('');
//   const [orderDetails, setOrderDetails] = useState('');

//   const handleCreateOrder = async (e) => {
//     e.preventDefault();
//     try {
//       const orderData = { deliveryType, deliveryDate, orderDetails };
//       await api.createOrder(orderData);
//       // Redirect or handle successful order creation
//     } catch (error) {
//       console.error('Order creation error', error);
//     }
//   };

//   return (
//     <Container>
//       <Row className="justify-content-md-center">
//         <Col md={6}>
//           <h2>Create Order</h2>
//           <Form onSubmit={handleCreateOrder}>
//             <Form.Group controlId="formDeliveryType">
//               <Form.Label>Delivery Type</Form.Label>
//               <Form.Control as="select" value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)}>
//                 <option value="one-time">One-Time</option>
//                 <option value="monthly">Monthly</option>
//                 <option value="weekly">Weekly</option>
//                 <option value="from-to">From-To</option>
//               </Form.Control>
//             </Form.Group>

//             <Form.Group controlId="formDeliveryDate">
//               <Form.Label>Delivery Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={deliveryDate}
//                 onChange={(e) => setDeliveryDate(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="formOrderDetails">
//               <Form.Label>Order Details</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={orderDetails}
//                 onChange={(e) => setOrderDetails(e.target.value)}
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Create Order
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default CreateOrder;
