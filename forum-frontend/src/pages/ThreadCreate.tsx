import Category from "../types/Category";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { ThemeProvider } from "@mui/material/styles";

type Body = {
    title: string;
    content: string;
    user_id: number;
    forum_category_id: number;
};

const ThreadCreate: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryoptions, setCategoryOptions] = useState([]);
    const [selectedcategory, setSelectedCategory] = useState("");

    const stripHtmlEntities = (str: string): string => {
        return String(str).replace(/\n/g, "<br> <br>").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = "http://localhost:4000/forum_threads";
        const body: Body = {
            title: stripHtmlEntities(title),
            content: stripHtmlEntities(content),
            user_id: 6, // TO UPDATE
            forum_category_id: parseInt(selectedcategory),
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

        navigate("/");
    };

    useEffect(() => {
        const url = "http://localhost:4000/forum_categories";
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
                    <FormControl required variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
                        {"Create new thread!"}
                    </Button>
                </Box>
            </Box>
        </Container>
        // </ThemeProvider>
    );
};

export default ThreadCreate;
