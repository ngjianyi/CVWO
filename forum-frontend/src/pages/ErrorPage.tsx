import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const ErrorPage: React.FC = () => {
    return (
        <>
            <Typography variant="h3" component="h3">
                It seems the page you are looking for does not exist...
            </Typography>
            <br />
            <Link to={"/"}>
                <Button variant="outlined" color="primary">
                    Back to safety!
                </Button>
            </Link>
        </>
    );
};

export default ErrorPage;
