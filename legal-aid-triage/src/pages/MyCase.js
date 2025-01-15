// src/pages/MyCase.js
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Form,
  Button,
  Accordion
} from 'react-bootstrap';

// Mock data
const mockMeetings = [
  {
    date: '2025-01-01',
    notes: 'Initial consultation with the lawyer. Discussed basic details of the case.'
  },
  {
    date: '2025-01-08',
    notes: 'Follow-up meeting. Requested additional documents for review.'
  }
];

const MyCase = () => {
  const [meetings, setMeetings] = useState(mockMeetings);
  const [qaInput, setQaInput] = useState('');
  const [qaList, setQaList] = useState([]);

  const handleQaSubmit = () => {
    if (qaInput.trim()) {
      setQaList([...qaList, qaInput]);
      setQaInput('');
    }
  };

  const handleDocumentUpload = () => {
    alert('New document uploaded!');
  };

  const handleNewInfoSubmit = () => {
    alert('New information added!');
  };

  return (
    <Container className="my-case-container mt-4">
      <h2 className="mb-4">My Case</h2>

      {/* Case Progress */}
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Header>Case Progress</Card.Header>
            <Card.Body>
              <p>Your case is currently under review by our legal team.</p>
              {/* Sample progress (60% complete) */}
              <ProgressBar now={60} label="60%" className="mb-3" />

              <h5>Next Steps</h5>
              <ul>
                <li>Gather more evidence</li>
                <li>Schedule a court date</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Meetings & Notes */}
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Header>Meetings &amp; Notes</Card.Header>
            <Card.Body>
              {meetings.map((meeting, index) => (
                <Card key={index} className="mb-2">
                  <Card.Body>
                    <strong>{meeting.date}:</strong> {meeting.notes}
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Upload New Documents */}
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Header>Upload New Documents</Card.Header>
            <Card.Body>
              <Form.Group controlId="newDocUpload" className="mb-3">
                <Form.Label>Select files to upload</Form.Label>
                <Form.Control type="file" onChange={handleDocumentUpload} />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add New Information */}
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Header>Add New Information</Card.Header>
            <Card.Body>
              <Form.Group controlId="newInfoTextarea" className="mb-3">
                <Form.Label>Additional details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter new information here..."
                />
              </Form.Group>
              <Button variant="primary" onClick={handleNewInfoSubmit}>
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Q & A Section */}
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Header>Q &amp; A</Card.Header>
            <Card.Body>
              <Form.Group controlId="qaTextarea" className="mb-3">
                <Form.Label>Ask a question about your case</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Type your question..."
                  value={qaInput}
                  onChange={(e) => setQaInput(e.target.value)}
                />
              </Form.Group>
              <Button variant="success" onClick={handleQaSubmit}>
                Submit Question
              </Button>
            </Card.Body>
          </Card>

          {/* Display Q&A in an Accordion */}
          {qaList.length > 0 && (
            <Accordion defaultActiveKey="0">
              {qaList.map((question, idx) => (
                <Accordion.Item eventKey={idx.toString()} key={idx}>
                  <Accordion.Header>
                    Q: {question}
                  </Accordion.Header>
                  <Accordion.Body>
                    {/* In a real app, you might fetch and display answers from the legal team here */}
                    <strong>Answer:</strong> Pending response from counsel.
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyCase;
