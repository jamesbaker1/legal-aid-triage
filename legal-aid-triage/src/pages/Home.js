// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();
  const [issue, setIssue] = useState('');
  const [documents, setDocuments] = useState([]);

  const handleDocumentsUpload = (event) => {
    const files = event.target.files;
    setDocuments([...files]);
  };

  const handleSubmit = () => {
    // TODO: Save data to your backend or context
    navigate('/my-case');
  };

  return (
    <Container className="home-container">
      <Card className="mt-4">
        <Card.Body>
          <Card.Title className="mb-3">
            Welcome to the Legal Aid Service
          </Card.Title>
          <Card.Text>
            Please describe your problem in detail. Upload any documents that may help us understand your case. You can also choose to call us.
          </Card.Text>

          <Form>
            <Form.Group className="mb-3" controlId="issueDescription">
              <Form.Label>Describe your legal issue:</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Describe your situation..."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="documentUpload">
              <Form.Label>Upload supporting documents:</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleDocumentsUpload}
              />
            </Form.Group>

            <div className="mb-3">
              <p>Or call us to describe your issue:</p>
              <Button 
                variant="outline-primary" 
                href="tel:123-456-7890"
              >
                Call 123-456-7890
              </Button>
            </div>

            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
