import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const ErrorPage: React.FC = () => {
    return (
        <>
            <h3>{"It seems the page you are looking for does not exist..."}</h3>
            <br />
            <Link to={"/"}>
                <Button variant="outlined" color="primary">
                    Back to the main page!
                </Button>
            </Link>
        </>
    );
};

export default ErrorPage;
