import ThreadList from "../components/ThreadList";
import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Home: React.FC = () => {
    return (
        <>
            <h3>{"Welcome to my forum!"}</h3>
            <br />
            <Link to={"/thread/create"}>
                <Button variant="outlined" color="primary">
                    Create a new thread!
                </Button>
            </Link>
            <br />
            <ThreadList />
        </>
    );
};

export default Home;
