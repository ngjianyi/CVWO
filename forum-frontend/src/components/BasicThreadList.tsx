import "../App.css";

import Thread from "../types/Thread";
import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const BasicThreadList: React.FC = () => {
    const navigate = useNavigate();
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        const url = "http://localhost:4000/forum_threads";
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((res) => setThreads(res))
            .catch(() => navigate("/"));
    }, []);

    const no_threads: JSX.Element = <h3>Sign in the add a thread!</h3>;
    const all_threads: JSX.Element[] = threads.map((thread: Thread) => (
        <Card key={thread.id} variant="outlined">
            <CardContent>
                <Typography component="p">{"Viewing thread:"}</Typography>
                <Typography variant="h5" component="h5">
                    {thread.title}
                </Typography>
                <Typography variant="body2" component="p">
                    {thread.content}
                </Typography>
                <Link to={`/thread/${thread.id}`}>
                    <Button variant="contained" color="secondary">
                        View comments
                    </Button>
                </Link>
            </CardContent>
        </Card>
    ));

    return (
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <h4>{"Welcome to my forum!"}</h4>
            <div>{threads.length > 0 ? all_threads : no_threads}</div>
            {/* <ul>
                <li>
                    <Link to="/thread/1">{"Inspirational Quotes"}</Link>
                    {" by Aiken"}
                </li>
            </ul> */}
        </div>
    );
};

export default BasicThreadList;
