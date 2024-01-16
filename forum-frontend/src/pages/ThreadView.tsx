import ThreadItem from "../components/ThreadItem";
import CommentList from "../components/CommentList";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box } from "@mui/material";

const ThreadView: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [thread, setThread] = useState({
        forum_thread: {
            id: 0,
            title: "",
            content: "",
        },
        author: "",
        forum_category: "",
    });

    useEffect(() => {
        const url = `http://localhost:4000/forum_threads/${params.id}`;
        axios
            .get(url)
            .then((response) => {
                setThread(response.data);
            })
            .catch(() => navigate("/hmm"));
    }, [params.id]);

    const thread_view: JSX.Element = <ThreadItem thread={thread} indivthread={true} key={thread.forum_thread.id} />;

    return (
        <div style={{ width: "30vw", margin: "auto" }}>
            <div>{thread_view}</div>

            <CommentList thread_id={thread.forum_thread.id} />

            <Box sx={{ "& button": { m: 1 } }}>
                <Link to="/">
                    <Button variant="contained" color="secondary">
                        {"Back to threads"}
                    </Button>
                </Link>
                <Button variant="contained" color="secondary">
                    {"Delete thread"}
                </Button>
            </Box>
        </div>
    );
};

export default ThreadView;
