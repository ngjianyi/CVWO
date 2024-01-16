import Comment from "../types/Comment";

import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

type Props = {
    full_comment: { comment: Comment; author: string };
};

const useStyles = makeStyles(() => ({
    commentBody: {
        fontSize: 16,
        whiteSpace: "pre-wrap",
        paddingBottom: "1em",
    },
    commentCard: {
        marginBottom: "1em",
    },
    metadata: {
        fontSize: 14,
    },
}));

const CommentItem: React.FC<Props> = ({ full_comment }) => {
    const classes = useStyles();

    return (
        <Card className={classes.commentCard}>
            <CardContent>
                <Typography variant="body2" color="textPrimary" className={classes.commentBody} component="p">
                    {full_comment.comment.content}
                </Typography>
                <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                    {"Posted by " + full_comment.author}
                </Typography>
            </CardContent>
            <Button variant="contained" color="secondary">
                {"Delete comment"}
                {/* Pass in thread id as props for confirmation with title of thread */}
            </Button>
        </Card>
    );
};

export default CommentItem;
