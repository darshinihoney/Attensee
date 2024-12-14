import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Container, 
  Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const OverallClassEngagement = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Fetch data from API or use mock data
    const mockData = {
      labels: ['Fully Engaged', 'Moderately Engaged', 'Disengaged'],
      datasets: [
        {
          data: [60, 30, 10],
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
          hoverBackgroundColor: ['#45a049', '#e6ac00', '#da190b']
        }
      ]
    };
    setChartData(mockData);
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Overall Class Engagement Analysis
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <Typography variant="h5" gutterBottom>Class Engagement Distribution</Typography>
          <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {Object.keys(chartData).length > 0 && (
              <Pie 
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          let label = context.label || '';
                          if (label) {
                            label += ': ';
                          }
                          if (context.parsed !== null) {
                            label += context.parsed + '%';
                          }
                          return label;
                        }
                      }
                    }
                  }
                }}
              />
            )}
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default OverallClassEngagement;