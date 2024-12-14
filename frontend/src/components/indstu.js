import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Container, 
  Grid2, 
  Paper, 
  Avatar, 
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const IndividualStudentEngagement = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Fetch student data from API
    // This is a mock implementation
    const mockStudentData = {
      id: studentId,
      name: 'Alice Johnson',
      colorCode: 'Green',
      engagementStatus: 'Focused',
      focusScore: 85,
      facialExpression: 'Neutral',
      historicalEngagement: '10% more engaged than peer class'
    };
    setStudentData(mockStudentData);
  }, [studentId]);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Student Engagement Analysis
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <Grid2 container spacing={3} alignItems="center">
            <Grid2 item>
              <Avatar style={{ width: 100, height: 100 }}>{studentData.name[0]}</Avatar>
            </Grid2>
            <Grid2 item>
              <Typography variant="h4">{studentData.name}</Typography>
            </Grid2>
          </Grid2>
          <Grid2 container spacing={3} style={{ marginTop: '2rem' }}>
            <Grid2 item xs={12} sm={6} md={4}>
              <Paper elevation={1} style={{ padding: '1rem', backgroundColor: '#e8f5e9' }}>
                <Typography variant="subtitle1">Color Code</Typography>
                <Typography variant="h6">{studentData.colorCode}</Typography>
              </Paper>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={4}>
              <Paper elevation={1} style={{ padding: '1rem', backgroundColor: '#e8f5e9' }}>
                <Typography variant="subtitle1">Engagement Status</Typography>
                <Typography variant="h6">{studentData.engagementStatus}</Typography>
              </Paper>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={4}>
              <Paper elevation={1} style={{ padding: '1rem', backgroundColor: '#e8f5e9' }}>
                <Typography variant="subtitle1">Focus Score</Typography>
                <Typography variant="h6">{studentData.focusScore}% - High</Typography>
              </Paper>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={4}>
              <Paper elevation={1} style={{ padding: '1rem', backgroundColor: '#e8f5e9' }}>
                <Typography variant="subtitle1">Facial Expression</Typography>
                <Typography variant="h6">{studentData.facialExpression}</Typography>
              </Paper>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={8}>
              <Paper elevation={1} style={{ padding: '1rem', backgroundColor: '#e8f5e9' }}>
                <Typography variant="subtitle1">Historical Engagement</Typography>
                <Typography variant="h6">{studentData.historicalEngagement}</Typography>
              </Paper>
            </Grid2>
          </Grid2>
          <Button 
            variant="contained" 
            color="primary" 
            style={{ marginTop: '2rem' }}
            onClick={() => navigate(-1)}
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default IndividualStudentEngagement;