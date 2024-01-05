import CommentItem from "./CommentItem";
import Comment from "../types/Comment";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const BasicCommentList: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const url = `http://localhost:4000/thread_comments/${params.id}`;
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((res) => setComments(res))
            .catch(() => navigate("/"));
    }, [params.id]);

    const no_comments: JSX.Element = <p>Be the first to comment!</p>;
    const all_comments: JSX.Element[] = comments.map((comment: Comment) => (
        <CommentItem comment={comment} key={comment.id} />
    ));

    return <ul>{comments.length > 0 ? all_comments : no_comments}</ul>;
};

export default BasicCommentList;
