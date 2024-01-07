import CommentList from "../components/CommentList";
import ThreadItem from "../components/ThreadItem";
import { Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ThreadView: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [thread, setThread] = useState({ id: 0, title: "", content: "" });

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

    const all_threads: JSX.Element = <ThreadItem thread={thread} indivthread={true} key={thread.id} />;

    return (
        <div style={{ width: "30vw", margin: "auto" }}>
            <div>{all_threads}</div>

            <CommentList />

            <Link to="/">
                <Button variant="contained" color="secondary">
                    {"Back to threads"}
                </Button>
            </Link>
        </div>
    );
};

export default ThreadView;
