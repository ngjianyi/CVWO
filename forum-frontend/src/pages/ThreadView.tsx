import ThreadItem from "../components/ThreadItem";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import { Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ThreadView: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [thread, setThread] = useState({ id: 0, author: "", user_id: 0, title: "", content: "" });

    useEffect(() => {
        const url = `http://localhost:4000/forum_threads/${params.id}`;
        axios
            .get(url)
            .then((response) => {
                setThread(response.data);
            })
            .catch(() => navigate("/"));
    }, [params.id]);

    const thread_view: JSX.Element = <ThreadItem thread={thread} indivthread={true} key={thread.id} />;

    return (
        <div style={{ width: "30vw", margin: "auto" }}>
            <div>{thread_view}</div>

            <CommentList />
            <CommentForm thread={thread} />

            <Link to="/">
                <Button variant="contained" color="secondary">
                    {"Back to threads"}
                </Button>
            </Link>
        </div>
    );
};

export default ThreadView;
