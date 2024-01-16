import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// import { ThemeProvider } from "@mui/material/styles";

type Props = {
    updatecomments: () => void;
    thread_id: number;
};

type Body = {
    content: string;
    forum_thread_id: number;
    user_id: number;
};

// const CommentForm: React.FC<Props> = ({ thread }) => {
const CommentForm: React.FC<Props> = ({ updatecomments, thread_id }) => {
    // const navigate = useNavigate();
    const [comment, setComment] = useState("");

    const stripHtmlEntities = (str: string) => {
        return String(str).replace(/\n/g, "<br> <br>").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const url = "http://localhost:4000/forum_comments";
        const body: Body = {
            content: stripHtmlEntities(comment),
            forum_thread_id: parseInt(`${thread_id}`),
            user_id: 6, // TO UPDATE
        };
        const header = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios
            .post<Body>(url, body, header)
            .then((res) => console.log(res))
            .catch((error: Error | AxiosError) => {
                console.log(error);
            });

        setComment("");
        updatecomments();
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
                }}
            >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        variant="filled"
                        required
                        fullWidth
                        id="comment"
                        label="Add a comment!"
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                        {"Add comment"}
                    </Button>
                </Box>
            </Box>
        </Container>
        // </ThemeProvider>
    );
};

export default CommentForm;
