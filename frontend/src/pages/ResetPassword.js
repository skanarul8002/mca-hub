import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, FormControlLabel, TextField, CssBaseline, CircularProgress, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bgpic from "../assets/login2.svg"
import { LightPurpleButton } from '../components/buttonStyles';
import { resetPassword} from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const defaultTheme = createTheme();

const ResetPassword = ({ role }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id, token} = useParams()
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);
    console.log(status)
    console.log(currentRole)
    console.log(response)

    const [guestLoader, setGuestLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();



            const password = event.target.password.value;
            const confirmPassword = event.target.confirmPassword.value;

            if (!password || !confirmPassword) {
                if (!password) setPasswordError(true);
                if (!confirmPassword) setConfirmPasswordError(true);
                return;
            }

            if(password !== confirmPassword){
                setMessage("Passwords do not match")
                setShowPopup(true)
                return;
            }

            setLoader(true)
            dispatch(resetPassword(role,password,id,token))

    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if(name === 'password') setPasswordError(false);
        if(name === 'confirmPassword') setConfirmPasswordError(false);
    };

    useEffect(() => {
        if (status === 'Password reset successful' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Adminlogin');
            }
            else if (currentRole === 'Student') {
                navigate('/Studentlogin');
            } else if (currentRole === 'Teacher') {
                navigate('/Teacherlogin');
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
                          SET NEW PASSWORD
                         </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="New Password"
                                    type="password"
                                    name="password"
                                    autoComplete="password"
                                    autoFocus
                                    error={passwordError}
                                    helperText={passwordError && 'Password is required'}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                    autoComplete="confirmPassword"
                                    autoFocus
                                    error={confirmPasswordError}
                                    helperText={confirmPasswordError && 'Password is required'}
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
                                    : "Reset Password"}
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

export default ResetPassword

