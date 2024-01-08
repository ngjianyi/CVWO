import CommentItem from "./CommentItem";
import Comment from "../types/Comment";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

const BasicCommentList: React.FC = () => {
    const params = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const url = `http://localhost:4000/thread_comments/${params.id}`;
        axios
            .get(url)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
            });
    }, [params.id]);

    const no_comments: JSX.Element = <p>Be the first to comment!</p>;
    const all_comments: JSX.Element[] = comments.map((comment: Comment) => (
        <CommentItem comment={comment} key={comment.id} />
    ));

    return <ul>{comments.length > 0 ? all_comments : no_comments}</ul>;
};

export default BasicCommentList;
