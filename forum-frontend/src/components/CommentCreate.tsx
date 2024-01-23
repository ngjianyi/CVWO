import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Box, Button, Container, CssBaseline, TextField, Alert } from "@mui/material";
// import { ThemeProvider } from "@mui/material/styles";

type Props = {
    updateComments: () => void;
    thread_id: number;
};

type Body = {
    content: string;
    forum_thread_id: number;
};

const CommentForm: React.FC<Props> = ({ updateComments, thread_id }) => {
    const [alert, setAlert] = useState<boolean>(false);
    const [comment, setComment] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const url = "/forum_comments";
        const body: Body = {
            content: comment,
            forum_thread_id: parseInt(`${thread_id}`),
        };

        await axios
            .post<Body>(url, body)
            .then((res) => {
                console.log(res);
                setComment("");
                updateComments();
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
                setAlert(true);
            });
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
                {alert && <Alert severity="error">Please log in to post a comment</Alert>}
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
                        Add comment
                    </Button>
                </Box>
            </Box>
        </Container>
        // </ThemeProvider>
    );
};

export default CommentForm;
