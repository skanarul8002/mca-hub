import React from "react";
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
} from "@mui/material";
import { useSelector } from "react-redux";
import StudentProfileCard from "../../components/StudentProfileCard";

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;
  return (
    // <>
    //   <Container maxWidth="md">
    //     <StyledPaper elevation={3}>
    //       <Grid container spacing={2}>
    //         <Grid item xs={12}>
    //           <Box display="flex" justifyContent="center">
    //             <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
    //               {String(currentUser.name).charAt(0)}
    //             </Avatar>
    //           </Box>
    //         </Grid>
    //         <Grid item xs={12}>
    //           <Box display="flex" justifyContent="center">
    //             <Typography variant="h5" component="h2" textAlign="center">
    //               {currentUser.name}
    //             </Typography>
    //           </Box>
    //         </Grid>
    //         <Grid item xs={12}>
    //           <Box display="flex" justifyContent="center">
    //             <Typography variant="subtitle1" component="p" textAlign="center">
    //               Student Sch.Id: {currentUser.rollNum}
    //             </Typography>
    //           </Box>
    //         </Grid>
    //         <Grid item xs={12}>
    //           <Box display="flex" justifyContent="center">
    //             <Typography variant="subtitle1" component="p" textAlign="center">
    //               Course: {sclassName.sclassName}
    //             </Typography>
    //           </Box>
    //         </Grid>
    //         <Grid item xs={12}>
    //           <Box display="flex" justifyContent="center">
    //             <Typography variant="subtitle1" component="p" textAlign="center">
    //               College: {studentSchool.schoolName}
    //             </Typography>
    //           </Box>
    //         </Grid>
    //       </Grid>
    //     </StyledPaper>
    //     <Card>
    //       <CardContent>
    //         <Typography variant="h6" gutterBottom>
    //           Personal Information:
    //         </Typography>
    //         <Grid container spacing={2}>
    //           <Grid item xs={12} sm={6}>
    //             <Typography variant="subtitle1" component="p">
    //               <strong>Date of Birth:</strong> December 19, 1999
    //             </Typography>
    //           </Grid>
    //           <Grid item xs={12} sm={6}>
    //             <Typography variant="subtitle1" component="p">
    //               <strong>Gender:</strong> Male
    //             </Typography>
    //           </Grid>
    //           <Grid item xs={12} sm={6}>
    //             <Typography variant="subtitle1" component="p">
    //               <strong>Email:</strong> example123@gmail.com
    //             </Typography>
    //           </Grid>
    //           <Grid item xs={12} sm={6}>
    //             <Typography variant="subtitle1" component="p">
    //               <strong>Phone:</strong> +91 7363802648
    //             </Typography>
    //           </Grid>
    //           <Grid item xs={12} sm={6}>
    //             <Typography variant="subtitle1" component="p">
    //               <strong>Address:</strong> Kharagpur Main Street, West Bengal, India
    //             </Typography>
    //           </Grid>
    //           <Grid item xs={12} sm={6}>
    //             <Typography variant="subtitle1" component="p">
    //               <strong>Emergency Contact:</strong> (987) 654-3210
    //             </Typography>
    //           </Grid>
    //         </Grid>
    //       </CardContent>
    //     </Card>
    //   </Container>
    // </>

    <>
      <StudentProfileCard currentUser={currentUser} />
    </>
  );
};

export default StudentProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;
