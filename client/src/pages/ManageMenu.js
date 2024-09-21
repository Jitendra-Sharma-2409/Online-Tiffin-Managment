import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { addMenuItem, deleteMenuItem, getMenuItems, updateMenuItem } from '../services/api';

const ManageMenu = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data } = await getMenuItems();
        setMenuItems(data);
      } catch (error) {
        console.error('Failed to fetch menu items:', error.response ? error.response.data : error.message);
      }
    };
    fetchMenuItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItemId) {
        await updateMenuItem(editingItemId, { itemName, price, description, picture });
        setEditingItemId(null);
      } else {
        await addMenuItem({ itemName, price, description, picture });
      }
      setItemName('');
      setPrice('');
      setDescription('');
      setPicture('');
      const { data } = await getMenuItems(); // Fetch updated list
      setMenuItems(data);
    } catch (error) {
      console.error('Failed to add/update menu item:', error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (item) => {
    setItemName(item.item_name);
    setPrice(item.price);
    setDescription(item.description);
    setPicture(item.picture);
    setEditingItemId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMenuItem(id);
      const { data } = await getMenuItems();
      setMenuItems(data);
    } catch (error) {
      console.error('Failed to delete menu item:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container>
      <h1>Manage Menu</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formItemName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPicture">
          <Form.Label>Picture</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter picture URL"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {editingItemId ? 'Update Menu Item' : 'Add Menu Item'}
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.item_name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td><img src={item.picture} alt={item.item_name} width="50" /></td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(item)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageMenu;
