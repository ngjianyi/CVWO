import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// import { ThemeProvider } from "@mui/material/styles";

export default function CommentForm() {
    // const navigate = useNavigate();
    const [comment, setComment] = useState("");

    const stripHtmlEntities = (str: string) => {
        return String(str).replace(/\n/g, "<br> <br>").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = "http://localhost:4000/forum_comments";
        const body = {
            content: stripHtmlEntities(comment),
            author: "test1", // PLACEHOLDER TO UPDATE!
            forum_thread_id: 1, // PLACEHOLDER TO UPDATE!
            user_id: 1, // PLACEHOLDER TO UPDATE!
        };

        // const token = document.querySelector('meta[name="csrf-token"]').content;
        const response: Response = await fetch(url, {
            method: "POST",
            headers: {
                // "X-CSRF-Token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }

        setComment("");
        return response.json();
    };

    return (
        // <ThemeProvider theme={theme}>
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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        variant="filled"
                        // required
                        fullWidth
                        id="comment"
                        label="Add a comment!"
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Add comment
                    </Button>
                </Box>
            </Box>
        </Container>
        // </ThemeProvider>
    );
}
