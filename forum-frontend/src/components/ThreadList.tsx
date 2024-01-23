import "../App.css";
import ThreadItem from "./ThreadItem";
import Thread from "../types/Thread";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Props = {
    filter_url: string | null;
};

type full_thread = { thread: Thread; author: string; category: string };

const ThreadList: React.FC<Props> = ({ filter_url }) => {
    const navigate = useNavigate();
    const [threads, setThreads] = useState<never[]>([]);

    let url = "/forum_threads";
    if (filter_url) {
        url = filter_url;
    }
    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setThreads(response.data);
            })
            .catch(() => navigate("/"));
    }, [filter_url]);

    const no_threads: JSX.Element = <h3>No threads available</h3>;
    const all_threads: JSX.Element[] = threads.map((full_thread: full_thread) => (
        <ThreadItem full_thread={full_thread} indivthread={false} key={full_thread.thread.id} />
    ));

    return (
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <div>{threads.length > 0 ? all_threads : no_threads}</div>
        </div>
    );
};

export default ThreadList;
