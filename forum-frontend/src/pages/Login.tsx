import { setWithExpiry } from "../helpers/LocalStorage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

type FormData = {
    username: string;
    password: string;
};

const Login = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState<boolean>(false);
    const [form_data, setFormData] = useState<FormData>({
        username: "",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...form_data,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        await axios
            .post("/login", form_data)
            .then((res) => {
                setWithExpiry("username", res.data.username, 1);
                console.log(res);
                navigate("/");
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
                setAlert(true);
            });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {alert && <Alert severity="error">Invalid username/password</Alert>}
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={form_data.username}
                            onChange={handleChange}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={form_data.password}
                            onChange={handleChange}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
