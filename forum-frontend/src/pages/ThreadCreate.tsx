import Category from "../types/Category";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Alert } from "@mui/material";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";

type FormData = {
    title: string;
    content: string;
    // forum_category_id: number;
};

const ThreadCreate: React.FC = () => {
    const navigate = useNavigate();
    // const [title, setTitle] = useState<string>("");
    // const [content, setContent] = useState<string>("");
    const [alert, setAlert] = useState<boolean>(false);
    const [categoryoptions, setCategoryOptions] = useState<never[]>([]);
    const [selectedcategory, setSelectedCategory] = useState<string>("");

    const [form_data, setFormData] = useState<FormData>({
        title: "",
        content: "",
        // forum_category_id: 0,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...form_data,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        axios
            .get("/forum_categories")
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
        const body = {
            title: form_data.title,
            content: form_data.content,
            forum_category_id: selectedcategory,
        };

        await axios
            .post<Body>("/forum_threads", body)
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
        <Container component="main" maxWidth="xs">
            <Box
            // sx={{
            //     marginTop: 5,
            //     display: "flex",
            //     flexDirection: "column",
            //     alignItems: "center",
            //     "& .MuiTextField-root": { m: 1, width: "50ch" },
            // }}
            >
                {alert && <Alert severity="error">Please fill up all the information</Alert>}
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        variant="filled"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        value={form_data.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        variant="filled"
                        required
                        fullWidth
                        id="content"
                        label="Content"
                        name="content"
                        value={form_data.content}
                        multiline
                        rows={5}
                        onChange={handleChange}
                    />
                    <FormControl required variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="forum_category_id"
                            name="forum_category_id"
                            value={selectedcategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                        >
                            {all_categories}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Create new thread!
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ThreadCreate;
