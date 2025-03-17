import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Breadcrumbs as MuiBreadcrumbs, Box } from '@mui/material';

const Breadcrumbs = ({ title, breadcrumbItems }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        {title}
      </Typography>
      <MuiBreadcrumbs separator="›" aria-label="breadcrumb">
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          Dashboard
        </Link>
        {breadcrumbItems && breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {index === breadcrumbItems.length - 1 ? (
              <Typography color="text.primary">{item.title}</Typography>
            ) : (
              <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                {item.title}
              </Link>
            )}
          </React.Fragment>
        ))}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
