import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid, Avatar, CardHeader, Divider, Tooltip, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div style={{ padding: '20px' }}>
            <Avatar
                alt={currentUser.name}
                src="/path/to/profile.jpg"
                sx={{ width: 100, height: 100, marginBottom: '20px', mx: 'auto' }}
            />
            <Grid container spacing={3}>
                {/* Card for Name */}
                <Grid item xs={12} sm={4}>
                    <Card variant="outlined" sx={{ backgroundColor: '#f7f7f7', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <CardHeader
                            avatar={<PersonIcon color="primary" />}
                            title="Name"
                            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                        />
                        <Divider />
                        <CardContent>
                            <Typography variant="body1" color="text.secondary" mt={1}>
                                {currentUser.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card for Email */}
                <Grid item xs={12} sm={4}>
                    <Card variant="outlined" sx={{ backgroundColor: '#f7f7f7', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <CardHeader
                            avatar={<EmailIcon color="secondary" />}
                            title="Email"
                            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                        />
                        <Divider />
                        <CardContent>
                            <Typography variant="body1" color="text.secondary" mt={1}>
                                {currentUser.email}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card for College */}
                <Grid item xs={12} sm={4}>
                    <Card variant="outlined" sx={{ backgroundColor: '#f7f7f7', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <CardHeader
                            avatar={<SchoolIcon color="action" />}
                            title="College"
                            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                        />
                        <Divider />
                        <CardContent>
                            <Typography variant="body1" color="text.secondary" mt={1}>
                                {currentUser.schoolName}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default AdminProfile;
