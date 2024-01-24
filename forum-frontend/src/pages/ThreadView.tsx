import { getWithExpiry } from "../helpers/LocalStorage";
import Thread from "../types/Thread";
import ThreadItem from "../components/ThreadItem";
import CommentList from "../components/CommentList";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, Container } from "@mui/material";

type FullThread = {
    thread: Thread;
    author: string;
    category: string;
};

const ThreadView: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const stored_username = getWithExpiry("username");

    const [full_thread, setFullThread] = useState<FullThread>({
        thread: {
            id: 0,
            title: "",
            content: "",
            forum_category_id: 0,
        },
        author: "",
        category: "",
    });

    useEffect(() => {
        const url = `/forum_threads/${params.id}`;
        axios
            .get(url)
            .then((response) => {
                setFullThread(response.data);
            })
            .catch(() => navigate("/hmm"));
    }, [params.id]);

    const thread_view: JSX.Element = (
        <ThreadItem full_thread={full_thread} indivthread={true} key={full_thread.thread.id} />
    );

    return (
        <Container>
            <>{thread_view}</>

            <CommentList />

            <Box>
                {stored_username === full_thread.author && (
                    <>
                        <Link to="/thread/update" state={{ thread: full_thread.thread }}>
                            <Button variant="contained" color="warning">
                                Update thread
                            </Button>
                        </Link>
                        <Link to="/thread/delete" state={{ thread: full_thread.thread }}>
                            <Button variant="contained" color="error">
                                Delete thread
                            </Button>
                        </Link>
                    </>
                )}
                <Link to="/">
                    <Button variant="contained" color="primary">
                        Back to threads
                    </Button>
                </Link>
            </Box>
        </Container>
        // </div>
    );
};

export default ThreadView;
