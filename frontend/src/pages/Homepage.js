import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled, { createGlobalStyle } from 'styled-components';
import Students from "../assets/stubackimg.svg";
import './Home.css';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
`;

const Homepage = () => {
    return (
        <>
            <GlobalStyle />
            <StyledContainer>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6}>
                        <StyledPaper>
                            <StyledTitle>
                                <div className="title">
                                    <span>Welcome</span>
                                    to
                                    <span>MCA HUB</span>
                                </div>
                            </StyledTitle>
                            <StyledText>
                                Streamline college management, class organization, and add students and faculty.
                                Seamlessly track attendance, assess performance, and provide feedback.
                                Access records, view marks, and communicate effortlessly.
                            </StyledText>
                            <StyledBox>
                                <StyledLink to="/choose">
                                    <StyledButton variant="contained" fullWidth>
                                        Login
                                    </StyledButton>
                                </StyledLink>
                                <StyledLink to="/chooseasguest">
                                    <Button variant="outlined" fullWidth
                                        sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
                                    >
                                        Login as Guest
                                    </Button>
                                </StyledLink>
                                <StyledText>
                                    Don't have an account?{' '}
                                    <Link to="/Adminregister" style={{ color: "#550080" }}>
                                        Sign up
                                    </Link>
                                </StyledText>
                            </StyledBox>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={Students} alt="students" style={{ width: '100%', maxHeight: '100vh', objectFit: 'cover' }} />
                    </Grid>
                </Grid>
            </StyledContainer>
        </>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #333333;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
  .title span {
    display: block;
    color: #333333;
    font-family: 'Roboto', sans-serif;
  }
`;

const StyledText = styled.p`
  color: #252525; 
  margin-top: 30px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: 1.6;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color:#125634;
`;

const StyledButton = styled(Button)`
  background-color: #7f56da;
  color: white;
  &:hover {
    background-color: #6844b8;
  }
`;
