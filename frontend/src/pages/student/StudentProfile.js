import React, { useState } from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  Container,
  Paper,
  Button,
  Input,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  stuffDone,
} from "../../redux/studentRelated/studentSlice";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const StudentProfile = () => {
  const [gender, setGender] = useState(""); // Declare gender only once
  const handleChange = (event) => setGender(event.target.value); // One handleChange function for gender

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [address, setAddress] = useState(currentUser?.address || "");
  const [emergencyContact, setEmergencyContact] = useState(currentUser?.emergencyContact || "");
  const [dob, setDob] = useState(dayjs(currentUser?.dob || dayjs()));
  const [sclassName, studentSchool] = [currentUser.sclassName, currentUser.school];

  const updateProfile = async () => {
    setLoading(true);
    const inputDate = new Date(dob).toLocaleDateString();
    try {
      const data = { email, phone, address, emergencyContact, dob: inputDate, gender };
      const result = await axios.put(
        `${REACT_APP_BASE_URL}/Student/profile/${currentUser._id}`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      // Handle update logic here
    } catch (error) {
      dispatch(getError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      {/* Main Profile Section */}
      <StyledPaper elevation={3}>
        <Grid container spacing={3}>
          {/* Student Avatar */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" marginBottom={2}>
              <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                {String(currentUser?.name || "").charAt(0)}
              </Avatar>
            </Box>
          </Grid>

          {/* Student Name Card */}
          <Grid item xs={12} sm={4}>
            <CardStyled>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Name
                </Typography>
                <Typography variant="body2">{currentUser?.name}</Typography>
              </CardContent>
            </CardStyled>
          </Grid>

          {/* Student Email Card */}
          <Grid item xs={12} sm={4}>
            <CardStyled>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body2">{currentUser?.email}</Typography>
              </CardContent>
            </CardStyled>
          </Grid>

          {/* Student College Card */}
          <Grid item xs={12} sm={4}>
            <CardStyled>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  College
                </Typography>
                <Typography variant="body2">{studentSchool?.schoolName}</Typography>
              </CardContent>
            </CardStyled>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Form Section */}
      <Card style={{ padding: "20px", maxWidth: "600px", margin: "20px auto" }}>
        <form noValidate autoComplete="off">
          {/* Email Input */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Email1</InputLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
            />
          </FormControl>

          {/* Phone Input */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Phone</InputLabel>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="Enter Phone"
            />
          </FormControl>

          {/* Address Input */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Address</InputLabel>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Enter Address"
            />
          </FormControl>

          {/* Emergency Contact Input */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Emergency Contact</InputLabel>
            <Input
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              type="text"
              placeholder="Enter Emergency Contact"
            />
          </FormControl>

          {/* Date of Birth Picker */}
          <FormControl fullWidth margin="normal">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={dob}
                onChange={(newValue) => setDob(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          {/* Gender Selection */}
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="gender-label">Select Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender-select"
              value={gender}
              onChange={handleChange}
              label="Select Gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          {/* Update Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={updateProfile}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default StudentProfile;

// Styled components for card and paper
const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;

const CardStyled = styled(Card)`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

