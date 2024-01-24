import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { CssBaseline, Box, Container, Button, Typography, Alert } from "@mui/material";
// import { ThemeProvider } from "@mui/material/styles";

const ThreadDelete: React.FC = () => {
    const location = useLocation();
    const { thread } = location.state;
    const navigate = useNavigate();

    const [alert, setAlert] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await axios
            .delete(`/forum_threads/${thread.id}`)
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
                setAlert(true);
            });
    };

    return (
        // <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 2,
                }}
            >
                {alert && <Alert severity="error">You are not authorised to delete this thread</Alert>}
                <Typography variant="h6" component="h6">
                    {"Are you sure you want to delete the thread: '" + thread.title + "' ?"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Button type="submit" variant="contained" color="error">
                        Delete thread
                    </Button>
                </Box>
            </Box>
        </Container>
        // </ThemeProvider>
    );
};

export default ThreadDelete;
