import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [deliveryPersons, setDeliveryPersons] = useState([]);
    const [filters, setFilters] = useState({ date: '', status: '', user: '' });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/api/orders/all');
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        const fetchDeliveryPersons = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/api/deliverypersons');
                setDeliveryPersons(data);
            } catch (error) {
                console.error('Error fetching delivery persons:', error);
            }
        };

        fetchOrders();
        fetchDeliveryPersons();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/orders/${id}/status`, { status });
            const updatedOrder = response.data.order;
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === id ? updatedOrder : order
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleDeliveryPersonChange = async (orderId, deliveryPersonId) => {
        try {
            await axios.put(`http://localhost:3000/api/orders/${orderId}/assign`, { deliveryPersonId });
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, delivery_person_id: deliveryPersonId } : order
                )
            );
        } catch (error) {
            console.error('Error assigning delivery person:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredOrders = orders.filter(order => {
        return (
            (!filters.date || order.delivery_date === filters.date) &&
            (!filters.status || order.status === filters.status) &&
            (!filters.user || order.user_id === parseInt(filters.user))
        );
    });

    return (
        <Container>
            <h1>Manage Orders</h1>
            <Form>
                <Form.Group controlId="filterDate">
                    <Form.Label>Filter by Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        value={filters.date}
                        onChange={handleFilterChange}
                    />
                </Form.Group>
                <Form.Group controlId="filterStatus">
                    <Form.Label>Filter by Status</Form.Label>
                    <Form.Control
                        as="select"
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                    >
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="filterUser">
                    <Form.Label>Filter by User ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="user"
                        value={filters.user}
                        onChange={handleFilterChange}
                    />
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Menu Item ID</th>
                        <th>Delivery Date</th>
                        <th>Status</th>
                        <th>Delivery Person</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user_id}</td>
                            <td>{order.menu_item_id}</td>
                            <td>{order.delivery_date}</td>
                            <td>{order.status}</td>
                            <td>
                                <Form.Control
                                    as="select"
                                    value={order.delivery_person_id || ''}
                                    onChange={(e) => handleDeliveryPersonChange(order.id, e.target.value)}
                                >
                                    <option value="">Select Delivery Person</option>
                                    {deliveryPersons.map((person) => (
                                        <option key={person.id} value={person.id}>
                                            {person.username}
                                        </option>
                                    ))}
                                </Form.Control>
                            </td>
                            <td>
                                <Button
                                    variant="success"
                                    onClick={() => handleStatusChange(order.id, 'delivered')}
                                >
                                    Mark as Delivered
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleStatusChange(order.id, 'cancelled')}
                                >
                                    Cancel Order
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ManageOrders;
