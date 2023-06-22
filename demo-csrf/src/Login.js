import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


export default function Login({ user }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      console.log(123);
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      // if (response.ok) {
      //   const token = getCookie('token');
      //   localStorage.setItem('token', token);
      // } 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <Card style={{ width: '22rem' }}>
      <Card.Header as="h5">Login</Card.Header>
      <Card.Body>
        <Alert variant="info">
          Make your username unique, but use any password you want (it's not actually checked or
          stored).
        </Alert>
        <Form onSubmit={loginUser}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <Button type="submit" disabled={username.length < 1 || password.length < 1}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
