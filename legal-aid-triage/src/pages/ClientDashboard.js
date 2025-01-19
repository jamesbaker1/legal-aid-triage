import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Grid,
  Box,
  Stepper,
  Step,
  StepLabel,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
  Avatar,
  Rating,
  Divider,
  Paper,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Send as SendIcon,
  CloudUpload as CloudUploadIcon,
  Download as DownloadIcon,
  EventAvailable as EventAvailableIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

// ------ MUI THEME RELATED IMPORTS ------
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * MAIN DASHBOARD COMPONENT
 */
const ClientDashboard = () => {
  // --------------------------------------------------------------------------
  // THEME TOGGLES
  // --------------------------------------------------------------------------
  const [darkMode, setDarkMode] = useState(false);
  const [largeText, setLargeText] = useState(false);

  // Create a dynamic theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontSize: largeText ? 18 : 14,
    },
  });

  const handleToggleDarkMode = () => setDarkMode(!darkMode);
  const handleToggleLargeText = () => setLargeText(!largeText);

  // --------------------------------------------------------------------------
  // 1. CASE DESCRIPTION / FREEFORM UPDATE
  // --------------------------------------------------------------------------
  const [caseData, setCaseData] = useState({
    title: 'Eviction Notice',
    summary: `You have received an eviction notice from your landlord. Your hearing is scheduled in 2 weeks.
    Current status: Awaiting initial attorney review.`,
    clientNotes: '', 
  });

  const handleCaseNotesChange = (e) => {
    setCaseData((prev) => ({ ...prev, clientNotes: e.target.value }));
  };

  const handleSaveCaseNotes = () => {
    // In a real application, you’d send caseData.clientNotes to the server
    alert(`Case notes updated:\n\n${caseData.clientNotes}`);
  };

  // --------------------------------------------------------------------------
  // 2. CASE STATUS & TIMELINE
  // --------------------------------------------------------------------------
  const steps = ['Initial Intake', 'Attorney Review', 'Court Date', 'Resolution'];
  const [activeStep] = useState(1); 
  // example: 0 = "Initial Intake", 1 = "Attorney Review", etc.

  // --------------------------------------------------------------------------
  // 3. KEY DATES & DEADLINES
  // --------------------------------------------------------------------------
  const [deadlines] = useState([
    { date: '2025-02-10', description: 'Deadline to file a response to the court.' },
    { date: '2025-02-14', description: 'Court hearing date.' },
    { date: '2025-02-20', description: 'Follow-up meeting with attorney.' },
  ]);

  // --------------------------------------------------------------------------
  // 4. SECURE MESSAGING
  // --------------------------------------------------------------------------
  const [messages, setMessages] = useState([
    { sender: 'attorney', text: 'Hello! Please remember to upload your latest rent receipts.' },
  ]);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const newMessage = { sender: 'client', text: messageInput };
    setMessages((prev) => [...prev, newMessage]);
    setMessageInput('');
    // In a real app, also push to server
  };

  // --------------------------------------------------------------------------
  // 5. TASKS (To-Do List)
  // --------------------------------------------------------------------------
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Upload proof of income', completed: false },
    { id: 2, text: 'Sign and submit Form X', completed: false },
    { id: 3, text: 'Provide witness contact details', completed: true },
  ]);

  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  // --------------------------------------------------------------------------
  // 6. NOTIFICATIONS CENTER
  // --------------------------------------------------------------------------
  const [notifications] = useState([
    'New message from Attorney Smith',
    'Court date reminder: 2025-02-14',
    'Document Eviction_Notice.pdf was updated by your attorney',
  ]);

  // --------------------------------------------------------------------------
  // 7. ELECTRONIC SIGNATURE & FORM-FILLING
  // --------------------------------------------------------------------------
  const [formData, setFormData] = useState({
    fieldOne: '',
    fieldTwo: '',
    signature: '',
  });

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignForm = () => {
    alert('Form submitted with e-signature (placeholder).');
  };

  // --------------------------------------------------------------------------
  // 8. ATTORNEY/CASE WORKER PROFILE
  // --------------------------------------------------------------------------
  const [attorneyProfile] = useState({
    name: 'Attorney Jane Smith',
    email: 'jane.smith@legalaid.org',
    phone: '(555) 123-4567',
    photoUrl: 'https://via.placeholder.com/100?text=Attorney',
  });

  // --------------------------------------------------------------------------
  // 9. DOCUMENT PREVIEWS & ORGANIZATION
  // --------------------------------------------------------------------------
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Eviction_Notice.pdf', category: 'Court Filings' },
    { id: 2, name: 'Lease_Agreement.pdf', category: 'Evidence' },
  ]);

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const newDocs = files.map((file, index) => ({
      id: documents.length + index + 1,
      name: file.name,
      category: 'Uncategorized',
    }));
    setDocuments([...documents, ...newDocs]);
  };

  // --------------------------------------------------------------------------
  // 11. LOCALIZED RESOURCES & REFERRALS
  // --------------------------------------------------------------------------
  const [localizedResources] = useState([
    { title: 'Local Housing Authority', link: 'https://example.com/housing-authority' },
    { title: 'Community Legal Services', link: 'https://example.com/community-legal' },
  ]);

  // --------------------------------------------------------------------------
  // 12. FAQ / SELF-HELP CENTER
  // --------------------------------------------------------------------------
  const [faqs] = useState([
    {
      question: 'How do I dress for court?',
      answer: 'Dress neatly and conservatively to show respect for the court.'
    },
    {
      question: 'What happens if I miss my hearing?',
      answer: 'Missing a hearing can lead to a default judgment against you. Contact your attorney immediately.'
    },
  ]);

  // --------------------------------------------------------------------------
  // 13. OPTIONAL FEEDBACK MECHANISM
  // --------------------------------------------------------------------------
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleFeedbackSubmit = () => {
    alert(`Thanks for your feedback!\nRating: ${rating}\nComments: ${feedback}`);
    setFeedback('');
    setRating(0);
  };

  // --------------------------------------------------------------------------
  // 15. PRIVACY & SECURITY INFORMATION
  // --------------------------------------------------------------------------
  const privacyInfo = `
  We value your privacy. All data is encrypted and stored in compliance with relevant laws.
  Only authorized staff have access to your information. Refer to our Privacy Policy for details.
  `;

  // --------------------------------------------------------------------------
  // EXPORT / DOWNLOAD ALL DATA 
  // --------------------------------------------------------------------------
  const handleExportCaseData = () => {
    const exportPayload = {
      caseData,
      steps,
      activeStep,
      deadlines,
      messages,
      tasks,
      notifications,
      formData,
      attorneyProfile,
      documents,
      localizedResources,
      faqs,
      feedback,
      rating,
      largeText,
      darkMode,
    };
    const fileData = JSON.stringify(exportPayload, null, 2);
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'case_data_export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --------------------------------------------------------------------------
  // 17. AI CHATBOT (ENHANCED UI)
  // --------------------------------------------------------------------------
  const [chatMessages, setChatMessages] = useState([{ sender: 'assistant', text: "How can I help?" }]);
  const [chatInput, setChatInput] = useState('');

  // Mock AI response function (replace with real API call in production)
  const fetchAiResponse = async (userMessage) => {
    // For demonstration, return a mock response:
    return `This is a mock AI response to your question: "${userMessage}"`;
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    // Add user's message to the chat
    setChatMessages((prev) => [...prev, { sender: 'user', text: chatInput }]);
    const aiReply = await fetchAiResponse(chatInput);
    setChatMessages((prev) => [...prev, { sender: 'assistant', text: aiReply }]);
    setChatInput('');
  };

  // Helper: Styles for user vs. AI messages
  const getMessageStyles = (sender) => {
    if (sender === 'user') {
      return {
        backgroundColor: '#d1f1d4',
        alignSelf: 'flex-end',
      };
    } else {
      return {
        backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#f5f5f5',
        alignSelf: 'flex-start',
      };
    }
  };

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Legal Aid Platform
          </Typography>
          {/* Accessibility Toggles */}
          <FormControlLabel
            control={<Switch checked={largeText} onChange={handleToggleLargeText} color="default" />}
            label="Large Text"
            sx={{ color: 'white' }}
          />
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={handleToggleDarkMode} color="default" />}
            label="Dark Mode"
            sx={{ color: 'white' }}
          />
        </Toolbar>
      </AppBar>

      <Toolbar /> {/* Spacer for the fixed AppBar */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Left column */}
          <Grid item xs={12} md={8}>
            {/* (1) Case Description & Freeform Update */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Case Description
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  <strong>Title:</strong> {caseData.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {caseData.summary}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  <strong>Update Your Case:</strong>
                </Typography>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="Add additional info or questions..."
                  value={caseData.clientNotes}
                  onChange={handleCaseNotesChange}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleSaveCaseNotes}>
                  Save Notes
                </Button>
              </CardContent>
            </Card>

            {/* (17) AI Chatbot – Brought higher on the page & improved UI */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Case AI Assistant
                </Typography>
                <Typography variant="body2" paragraph>
                  Ask the AI Assistant questions about your case, procedures, or next steps:
                </Typography>
                <Box
                  sx={{
                    maxHeight: 300,
                    overflowY: 'auto',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 1,
                    mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  {chatMessages.map((msg, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        maxWidth: '80%',
                        ...getMessageStyles(msg.sender),
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {msg.sender === 'user' ? 'You' : 'AI'}
                      </Typography>
                      <Typography variant="body2">{msg.text}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Type your question..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    startIcon={<SendIcon />}
                    onClick={handleChatSend}
                  >
                    Send
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* (2) Case Status & Timeline (Stepper) */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Case Status & Timeline
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Current step: <strong>{steps[activeStep]}</strong>.
                  <br />
                  Please complete all required tasks before the next stage.
                </Typography>
              </CardContent>
            </Card>

            {/* (3) Key Dates & Deadlines */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Key Dates & Deadlines
                </Typography>
                <List>
                  {deadlines.map((d, idx) => (
                    <ListItem key={idx}>
                      <ListItemText
                        primary={d.date}
                        secondary={d.description}
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="caption" display="block">
                  *Automated reminders will be sent via email/SMS.
                </Typography>
              </CardContent>
            </Card>

            {/* (4) Secure Messaging */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Secure Messaging
                </Typography>
                <List sx={{ maxHeight: 200, overflow: 'auto', border: '1px solid #ccc', mb: 2 }}>
                  {messages.map((m, idx) => (
                    <ListItem key={idx}>
                      <ListItemText
                        primary={`${m.sender === 'client' ? 'You' : 'Attorney'}: ${m.text}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    startIcon={<SendIcon />}
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* (5) Tasks / To-Do */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  To-Do List
                </Typography>
                <List>
                  {tasks.map((task) => (
                    <ListItem
                      key={task.id}
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          checked={task.completed}
                          onChange={() => handleToggleTask(task.id)}
                        />
                      }
                    >
                      <ListItemText
                        primary={task.text}
                        secondary={task.completed ? 'Completed' : 'Pending'}
                        sx={{
                          textDecoration: task.completed ? 'line-through' : 'none',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* (6) Notifications Center */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notifications
                </Typography>
                <List>
                  {notifications.map((note, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={note} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* (11) Localized Resources & Referrals */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Localized Resources & Referrals
                </Typography>
                <List>
                  {localizedResources.map((res, index) => (
                    <ListItem key={index}>
                      <Link
                        href={res.link}
                        target="_blank"
                        rel="noopener"
                        underline="hover"
                      >
                        {res.title}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* (12) FAQ / Self-Help Center */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  FAQ / Self-Help Center
                </Typography>
                {faqs.map((faqItem, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1">{faqItem.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">{faqItem.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>

            {/* (13) Feedback Mechanism */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  We Value Your Feedback
                </Typography>
                <Rating
                  name="feedback-rating"
                  value={rating}
                  onChange={(_, newValue) => setRating(newValue)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="Share your thoughts..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleFeedbackSubmit}>
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>

            {/* (15) Privacy & Security Info */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Privacy & Security
                </Typography>
                <Typography variant="body2" paragraph>
                  {privacyInfo}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Right column */}
          <Grid item xs={12} md={4}>
            {/* (8) Attorney/Case Worker Profile */}
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={attorneyProfile.photoUrl} sx={{ width: 64, height: 64 }} />
                <Box>
                  <Typography variant="h6">{attorneyProfile.name}</Typography>
                  <Typography variant="body2">{attorneyProfile.email}</Typography>
                  <Typography variant="body2">{attorneyProfile.phone}</Typography>
                </Box>
              </CardContent>
            </Card>

            {/* (9) Document Previews & Organization */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  My Documents
                </Typography>
                <List sx={{ maxHeight: 200, overflow: 'auto' }}>
                  {documents.map((doc) => (
                    <ListItem key={doc.id}>
                      <ListItemText
                        primary={doc.name}
                        secondary={`Category: ${doc.category}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Documents
                    <input
                      hidden
                      multiple
                      type="file"
                      onChange={handleDocumentUpload}
                    />
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Export Button */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Export/Download
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={handleExportCaseData}
                >
                  Export Case Data
                </Button>
              </CardContent>
            </Card>

            {/* Schedule a Meeting (placeholder) */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Schedule a Meeting
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<EventAvailableIcon />}
                  onClick={() => alert('Meeting scheduling placeholder')}
                  sx={{ mr: 2 }}
                >
                  Schedule
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  onClick={() => window.location.href = `mailto:${attorneyProfile.email}`}
                >
                  Email Attorney
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default ClientDashboard;
