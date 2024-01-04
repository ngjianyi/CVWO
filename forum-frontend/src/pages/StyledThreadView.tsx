import BasicCommentList from "../components/CommentList";
import Thread from "../types/Thread";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const StyledThreadView: React.FC = () => {
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

    // const no_threads = (<></>);
    const all_threads = threads.map((thread: Thread) => (
        <Card key="" style={{ backgroundColor: "red" }}>
            <CardContent>
                <Typography component="p">{"Viewing thread:"}</Typography>
                <Typography variant="h5" component="h5">
                    {thread.title}
                </Typography>
                <Typography variant="body2" component="p">
                    {thread.content}
                </Typography>
            </CardContent>
        </Card>
    ));

    return (
        <div style={{ width: "30vw", margin: "auto" }}>
            <div>{all_threads}</div>

            <BasicCommentList styled={true} />

            <Link to="/">
                <Button variant="contained" color="secondary">
                    {"Back to threads"}
                </Button>
            </Link>
        </div>
    );
};

export default StyledThreadView;
