import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { CssBaseline, Box, Container, Button, Typography } from "@mui/material";
// import { ThemeProvider } from "@mui/material/styles";

const ThreadDelete: React.FC = () => {
    const location = useLocation();
    const { thread } = location.state;
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = `http://localhost:4000/forum_threads/${thread.id}`;
        const header = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios
            .delete(url, header)
            .then((res) => console.log(res))
            .catch((error: Error | AxiosError) => {
                console.log(error);
            });

        navigate("/");
    };

    return (
        // <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
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
                <Typography variant="h6" color="textPrimary" component="h6">
                    {"Are you sure you want to delete the thread: " + thread.title}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                        {"Delete thread!"}
                    </Button>
                </Box>
            </Box>
        </Container>
        // </ThemeProvider>
    );
};

export default ThreadDelete;
