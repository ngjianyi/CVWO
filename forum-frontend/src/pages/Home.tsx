import { getWithExpiry } from "../helpers/LocalStorage";
import Category from "../types/Category";
import ThreadList from "../components/ThreadList";
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Home: React.FC = () => {
    const stored_username = getWithExpiry("username");
    const [category_label, setCategoryLabel] = useState<string>("Categories");
    const [selected_category, setSelectedCategory] = useState<string | null>(null);
    const [category_options, setCategoryOptions] = useState<never[]>([]);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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

    const all_categories: JSX.Element[] = category_options.map((category: Category) => (
        <MenuItem
            value={category.id}
            key={category.id}
            onClick={() => {
                setSelectedCategory(`/threads_filter_category/${category.id}`);
                setCategoryLabel(category.name);
                setAnchorEl(null);
            }}
            disableRipple
        >
            {category.name}
        </MenuItem>
    ));

    return (
        <>
            {stored_username && (
                <Link to={"/thread/create"}>
                    <Button variant="outlined" color="primary">
                        Create a new thread!
                    </Button>
                </Link>
            )}
            <br />
            <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {category_label}
            </Button>
            <Menu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {all_categories}
            </Menu>
            <ThreadList filter_url={selected_category} />
        </>
    );
};

export default Home;
