import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { useTeacherContext } from './teachercontext'; // Adjust path if needed
import LogoutIcon from '@mui/icons-material/Logout';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Dashboard() {
  const { teacherData, fetchTeacherData, logout } = useTeacherContext();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    fetchTeacherData();
  }, [fetchTeacherData]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleViewSubject = (section, subject) => {
    navigate(`/upload-video/${section}/${subject}`); // Navigate to the Upload Video page
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {teacherData?.username}'s Dashboard
          </Typography>
          <Button color="inherit" onClick={fetchTeacherData} startIcon={<RefreshIcon />}>
            Refresh
          </Button>
          <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sections
        </Typography>
        {teacherData?.sections.map((section, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{ mb: 2 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {section.name}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {section.subjects.length} subjects
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {section.subjects.map((subject, subIndex) => (
                  <ListItem key={subIndex}>
                    <ListItemText
                      primary={
                        <Link
                          to={`/upload-video/${section.name}/${subject}`}
                          style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}
                        >
                          {subject}
                        </Link>
                      }
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewSubject(section.name, subject)}
                    >
                      View
                    </Button>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}




