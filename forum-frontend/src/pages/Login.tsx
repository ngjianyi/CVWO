import { setWithExpiry } from "../helpers/LocalStorage";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

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
        <Container maxWidth="xs">
            <CssBaseline />
            <Box>
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
                        autoComplete="username"
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
                        autoComplete="current-password"
                    />
                    <Button type="submit" variant="contained">
                        Login
                    </Button>
                </Box>
            </Box>
            <Typography>
                New to Saturo? <Link to="/user/create">Sign up</Link>
            </Typography>
        </Container>
    );
};

export default Login;
