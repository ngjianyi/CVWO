import { getWithExpiry } from "../helpers/LocalStorage";
// import Category from "../types/Category";
import ThreadList from "../components/ThreadList";
// import React, { useState, useEffect } from "react";
import React from "react";
// import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { Button, Container } from "@mui/material";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Home: React.FC = () => {
    const stored_username = getWithExpiry("username");

    return (
        <Container>
            {stored_username && (
                <Link to={"/thread/create"}>
                    <Button variant="contained" color="primary">
                        Create a new thread
                    </Button>
                </Link>
            )}

            <ThreadList filtered_url={null} />
        </Container>
    );
};

export default Home;
