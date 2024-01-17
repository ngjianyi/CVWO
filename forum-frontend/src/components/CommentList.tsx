import CommentItem from "./CommentItem";
import CommentCreate from "./CommentCreate";
import Comment from "../types/Comment";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

type Props = {
    thread_id: number;
};

type full_comment = {
    comment: Comment;
    author: string;
};

const CommentList: React.FC<Props> = ({ thread_id }) => {
    const params = useParams();
    const [comments, setComments] = useState<never[]>([]);

    const updateComments = () => {
        const url = `http://localhost:4000/thread_comments/${params.id}`;
        axios
            .get(url)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
            });
    };

    useEffect(() => {
        updateComments();
    }, [params.id]);

    const no_comments: JSX.Element = <p>Be the first to comment!</p>;
    const all_comments: JSX.Element[] = comments.map((full_comment: full_comment) => (
        <CommentItem full_comment={full_comment} updateComments={updateComments} key={full_comment.comment.id} />
    ));

    return (
        <>
            <ul>{comments.length > 0 ? all_comments : no_comments}</ul>
            <CommentCreate updateComments={updateComments} thread_id={thread_id} />
        </>
    );
};

export default CommentList;
