import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
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
    password_confirmation: string;
};

const UserCreate = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState<boolean>(false);
    const [alert_messsage, setAlertMessage] = useState<string>("");
    const [form_data, setFormData] = useState<FormData>({
        username: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...form_data,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (form_data.password !== form_data.password_confirmation) {
            setAlert(true);
            setAlertMessage("Passwords do not match");
            return;
        }

        await axios
            .post<Body>("/users", form_data)
            .then((res) => {
                navigate("/");
                console.log(res);
            })
            .catch((error: Error | AxiosError) => {
                setAlert(true);
                setAlertMessage("Invalid username");
                console.log(error);
            });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                {alert && <Alert severity="error">{alert_messsage}</Alert>}
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Create a profile
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password_confirmation"
                            label="Retype password"
                            type="password"
                            id="password_confirmation"
                            value={form_data.password_confirmation}
                            onChange={handleChange}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Create profile
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default UserCreate;
