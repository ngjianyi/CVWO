import BasicCommentList from "../components/CommentList";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const StyledThreadView: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [thread, setThread] = useState({ id: "", title: "", content: "" });

    useEffect(() => {
        const url = `http://localhost:4000/forum_threads/${params.id}`;
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((res) => setThread(res))
            .catch(() => navigate("/"));
    }, [params.id]);

    const threads: JSX.Element = (
        <Card key={thread.id}>
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
    );

    return (
        <div style={{ width: "30vw", margin: "auto" }}>
            <div>{threads}</div>

            <BasicCommentList />

            <Link to="/">
                <Button variant="contained" color="secondary">
                    {"Back to threads"}
                </Button>
            </Link>
        </div>
    );
};

export default StyledThreadView;
