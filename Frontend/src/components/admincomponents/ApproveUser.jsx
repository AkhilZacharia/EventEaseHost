import React, { useState, useEffect } from 'react';
import axiosInstance from '../interceptor/axiosInterceptor';
import { Button, Table, Container, Row, Col, Card, Badge } from 'react-bootstrap';
import './ApproveUser.css';

const ApproveUser = () => {
  const [users, setUsers] = useState([]);  // Pending Users
  const [approvedUsers, setApprovedUsers] = useState([]);  // Approved Users
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      const { UserA, UserUn } = response.data;
      console.log(UserA);
      setUsers(UserUn); 
      setApprovedUsers(UserA);
      setPendingCount(UserUn.length);
      setApprovedCount(UserA.length);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleApprove = async (userId) => {
    try {
        axiosInstance.get(`/approve-user/${userId}`)
          .then((res) => {
            alert(`User with ID: ${userId} has been approved`);
            fetchUsers(); 
      });
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axiosInstance.delete(`/delete/user/${userId}`);
      alert(`User with ID: ${userId} has been deleted`);
      fetchUsers(); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleBlock = async (userId) => {
    try {
      await axiosInstance.get(`/block-user/${userId}`);
      alert(`User with ID: ${userId} has been banned`);
      fetchUsers();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Dashboard</Card.Title>
              <Row>
                <Col>
                  <h3>{pendingCount}</h3>
                  <Badge pill bg="warning">Pending</Badge>
                </Col>
                <Col>
                  <h3>{approvedCount}</h3>
                  <Badge pill bg="success">Approved</Badge>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Pending Users</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user. _id}>
                      <td>{user.Name}</td>
                      <td>{user.Email}</td>
                      <td>
                        <Button variant="success" onClick={() => handleApprove(user._id)}>Approve</Button>{' '}
                        <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Approved Users</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedUsers.map(user => (
                    <tr key={user._id}>
                      <td>{user.Name}</td>
                      <td>{user.Email}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleBlock(user._id)}>Block</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApproveUser;
