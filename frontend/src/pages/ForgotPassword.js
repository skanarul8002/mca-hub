import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bgpic from "../assets/login2.svg"
import { LightPurpleButton } from '../components/buttonStyles';
import { resetPasswordLink } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const defaultTheme = createTheme();

const ForgetPassword = ({ role }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

    const [guestLoader, setGuestLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();



            const email = event.target.email.value;

            if (!email) {
             setEmailError(true);

                return;
            }

            setLoader(true)
            dispatch(resetPasswordLink(role,email))

    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
    };


    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Admin/resetpassword');
            }
            else if (currentRole === 'Student') {
                navigate('/Student/resetpassword');
            } else if (currentRole === 'Teacher') {
                navigate('/Teacher/resetpassword');
            }
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
            setGuestLoader(false)
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <>
        <div className='mt-2 ml-3'>
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                            {role} Login
                        </Typography> */}
                        <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                          {`${role} Password Reset`}
                         </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter your email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={emailError}
                                    helperText={emailError && 'Email is required'}
                                    onChange={handleInputChange}
                                />
                            <LightPurpleButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3 }}
                            >
                                {loader ?
                                    <CircularProgress size={24} color="inherit" />
                                    : "Send Reset Link"}
                            </LightPurpleButton>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={guestLoader}
            >
                <CircularProgress color="primary" />
                Please Wait
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
        </div>
        </>
    );
}

export default ForgetPassword

