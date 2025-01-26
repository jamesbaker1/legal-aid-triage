import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  IconButton,
  FormControl,
  FormLabel,
  FormGroup,
  InputLabel,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

/**
 * CLIENT INTAKE FORM COMPONENT
 * 
 * Usage:
 *   1. Import and render <ClientIntakeForm /> wherever you’d like the intake form to appear.
 *   2. Upon submission, handle the collected data (e.g., send it to a server or store in state).
 */
const Home = () => {
  // State for user-entered data
  const [intakeData, setIntakeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    problemDescription: '',
    uploadedFiles: [],
  });

  // Handle text input changes
  const handleChange = (fieldName) => (e) => {
    setIntakeData((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }));
  };

  // Handle file uploads
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setIntakeData((prev) => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...files],
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, send `intakeData` to your server, or handle as needed
    alert(`
      Submission Received!

      Name: ${intakeData.firstName} ${intakeData.lastName}
      Email: ${intakeData.email}
      Phone: ${intakeData.phone}

      Problem Description:
      ${intakeData.problemDescription}

      Uploaded Files: 
      ${intakeData.uploadedFiles.map((f) => f.name).join(', ')}
    `);

    // Reset the form or navigate away, as you prefer
    setIntakeData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      problemDescription: '',
      uploadedFiles: [],
    });
  };

  return (
    <Card sx={{ maxWidth: 700, margin: 'auto', mt: 4, boxShadow: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          How can we help?
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          I understand that I am not yet a LANC client because I still have to talk to someone to determine final eligibility.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Problem Description */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Describe Your Legal Problem"
                value={intakeData.problemDescription}
                onChange={handleChange('problemDescription')}
                placeholder="Tell us about your legal issue or concern..."
              />
            </Grid>

            {/* File Uploads */}
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  Upload Supporting Documents (optional)
                </FormLabel>
                <FormGroup>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    Select Files
                    <input
                      hidden
                      multiple
                      type="file"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  {intakeData.uploadedFiles.length > 0 && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Uploaded:{' '}
                      {intakeData.uploadedFiles.map((f) => f.name).join(', ')}
                    </Typography>
                  )}
                </FormGroup>
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained"
                sx={{ mt: 2 }}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Home;
