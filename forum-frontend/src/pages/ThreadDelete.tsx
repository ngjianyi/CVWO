// import Category from "../types/Category";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios, { AxiosError } from "axios";
// import { CssBaseline, Box, Container, Button, Typography } from "@mui/material";
// // import { ThemeProvider } from "@mui/material/styles";

// type Body = {
//     forum_thread_id: number;
// };

// const ThreadForm: React.FC = () => {
//     const navigate = useNavigate();
//     const [title, setTitle] = useState("");

//     useEffect(() => {
//         const url = "http://localhost:4000/forum_categories";
//         axios
//             .get(url)
//             .then((response) => {
//                 setTitle(response.data.forum_thread.title);
//             })
//             .catch((error: Error | AxiosError) => {
//                 console.log(error);
//             });
//     }, []);

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const url = "http://localhost:4000/forum_threads";
//         const body: Body = {
//             forum_thread_id: 0,
//         };
//         const header = {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         };

//         await axios
//             .post<Body>(url, body, header)
//             .then((res) => console.log(res))
//             .catch((error: Error | AxiosError) => {
//                 console.log(error);
//             });

//         navigate("/");
//     };

//     return (
//         // <ThemeProvider theme={theme}>
//         <Container component="main" maxWidth="xs">
//             <CssBaseline />
//             <Typography variant="body2" color="textPrimary" component="p">
//                 {"Are you sure you want to delete the thread: "}
//             </Typography>
//             <Box
//                 sx={{
//                     marginTop: 5,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     mt: 1,
//                 }}
//             >
//                 <Box component="form" onSubmit={handleSubmit} noValidate>
//                     <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
//                         {"Delete thread!"}
//                     </Button>
//                 </Box>
//             </Box>
//         </Container>
//         // </ThemeProvider>
//     );
// };

// export default ThreadForm;
