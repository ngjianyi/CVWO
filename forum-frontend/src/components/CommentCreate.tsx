import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Box, Button, Container, CssBaseline, TextField } from "@mui/material";
// import { ThemeProvider } from "@mui/material/styles";

type Props = {
    updateComments: () => void;
    thread_id: number;
};

type Body = {
    content: string;
    forum_thread_id: number;
    user_id: number;
};

const CommentForm: React.FC<Props> = ({ updateComments, thread_id }) => {
    const [comment, setComment] = useState<string>("");

    const stripHtmlEntities = (str: string): string => {
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
        updateComments();
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
