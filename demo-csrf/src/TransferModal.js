import React from 'react';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';


export default function TransferModal({ error, formRef, show, onHide, submitForm, loading }) {
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');
  const [description, setDescription] = useState('');

  const floatAmount = parseFloat(amount);
  const submittable =
    !isNaN(floatAmount) && floatAmount > 0 && to.length > 0 && description.length > 0;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Make a Transfer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={formRef}>
          <Form.Group>
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>To:</Form.Label>
            <Form.Control
              type="text"
              name="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this transfer for?"
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit" onClick={submitForm} disabled={loading || !submittable}>
              {loading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Submit Transfer'
              )}
            </Button>
          </Form.Group>
        </Form>
        {error && <Alert key="danger" variant="danger">
          {error}
        </Alert>}
      </Modal.Body>
    </Modal>
  );
}
