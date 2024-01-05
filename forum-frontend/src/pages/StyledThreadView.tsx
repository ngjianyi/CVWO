import CommentList from "../components/CommentList";
// import ThreadItem from "../components/ThreadItem";
// import Thread from "../types/Thread";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const StyledThreadView: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [threads, setThreads] = useState({ id: "", content: "", title: "" });

    useEffect(() => {
        const url = `http://localhost:4000/forum_threads/${params.id}`;
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((res) => setThreads(res))
            .catch(() => navigate("/"));
    }, [params.id]);

    // const no_threads: JSX.Element = <p>Sign in to create a thread!</p>;
    // const all_threads: JSX.Element[] = threads.map((thread: Thread) => <ThreadItem thread={thread} key={thread.id} />);
    const thread: JSX.Element = (
        <Card key={threads.id}>
            <CardContent>
                <Typography component="p">{"Viewing thread:"}</Typography>
                <Typography variant="h5" component="h5">
                    {threads.title}
                </Typography>
                <Typography variant="body2" component="p">
                    {threads.content}
                </Typography>
            </CardContent>
        </Card>
    );

    return (
        <div style={{ width: "30vw", margin: "auto" }}>
            {/* <div>{threads.length > 0 ? all_threads : no_threads}</div> */}
            <div>{thread}</div>

            <CommentList />

            <Link to="/">
                <Button variant="contained" color="secondary">
                    {"Back to threads"}
                </Button>
            </Link>
        </div>
    );
};

export default StyledThreadView;
