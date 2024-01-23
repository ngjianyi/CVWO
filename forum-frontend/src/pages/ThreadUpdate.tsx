import Category from "../types/Category";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import {
    Button,
    CssBaseline,
    TextField,
    Box,
    Container,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Alert,
} from "@mui/material";
// import { ThemeProvider } from "@mui/material/styles";

type Body = {
    title: string;
    content: string;
    forum_category_id: number;
};

const ThreadUpdate: React.FC = () => {
    const location = useLocation(); // ADD TYPE
    const { thread } = location.state;
    const navigate = useNavigate();

    const [alert, setAlert] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(thread.title);
    const [content, setContent] = useState<string>(thread.content);
    const [categoryoptions, setCategoryOptions] = useState<never[]>([]);
    const [selectedcategory, setSelectedCategory] = useState<string>(String(thread.forum_category_id));

    useEffect(() => {
        const url = "/forum_categories";
        axios
            .get(url)
            .then((response) => {
                setCategoryOptions(response.data);
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
            });
    }, []);

    const all_categories: JSX.Element[] = categoryoptions.map((category: Category) => (
        <MenuItem value={category.id} key={category.id}>
            {category.name}
        </MenuItem>
    ));

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = `/forum_threads/${thread.id}`;
        const body: Body = {
            title: title,
            content: content,
            forum_category_id: parseInt(selectedcategory),
        };

        await axios
            .patch<Body>(url, body)
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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "& .MuiTextField-root": { m: 1, width: "50ch" },
                }}
            >
                {alert && <Alert severity="error">You are not authorised to update this thread</Alert>}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        variant="filled"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        variant="filled"
                        required
                        fullWidth
                        id="content"
                        label="Content"
                        name="content"
                        value={content}
                        multiline
                        rows={5}
                        onChange={(event) => setContent(event.target.value)}
                    />
                    <FormControl required variant="filled" sx={{ m: 1, minWidth: 40 }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            value={selectedcategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                        >
                            {all_categories}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Update existing thread!
                    </Button>
                </Box>
            </Box>
        </Container>
        // </ThemeProvider>
    );
};

export default ThreadUpdate;
