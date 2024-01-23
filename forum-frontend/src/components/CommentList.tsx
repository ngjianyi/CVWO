import CommentItem from "./CommentItem";
import CommentCreate from "./CommentCreate";
import { getWithExpiry } from "../helpers/LocalStorage";
import Comment from "../types/Comment";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

type Props = {
    thread_id: number;
    filter_url: string;
};

type full_comment = {
    comment: Comment;
    author: string;
};

const CommentList: React.FC<Props> = ({ thread_id, filter_url }) => {
    const params = useParams();
    const stored_username = getWithExpiry("username");
    const [comments, setComments] = useState<never[]>([]);

    const updateComments = async () => {
        await axios
            .get(filter_url)
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
            {stored_username ? (
                <CommentCreate updateComments={updateComments} thread_id={thread_id} />
            ) : (
                <p>Log in to post a comment!</p>
            )}
        </>
    );
};

export default CommentList;
