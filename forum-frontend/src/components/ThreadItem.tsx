import Thread from "../types/Thread";

import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

type Props = {
    thread: Thread;
    indivthread: boolean;
};

const useStyles = makeStyles(() => ({
    threadBody: {
        fontSize: 24,
        whiteSpace: "pre-wrap",
        paddingBottom: "1em",
    },
    threadCard: {
        marginBottom: "1em",
    },
    metadata: {
        fontSize: 20,
    },
}));

const ThreadItem: React.FC<Props> = ({ thread, indivthread }) => {
    const classes = useStyles();

    return (
        <Card className={classes.threadCard}>
            <CardContent>
                <Typography variant="h5" component="h5" className={classes.threadBody}>
                    {thread.title}
                </Typography>
                {indivthread && (
                    <Typography variant="body2" component="p" className={classes.metadata}>
                        {thread.content}
                    </Typography>
                )}
                {indivthread && <Typography component="p">{`Posted by: ${thread.author}`}</Typography>}
                {!indivthread && (
                    <Link to={`/thread/${thread.id}`}>
                        <Button variant="contained" color="secondary">
                            View comments
                        </Button>
                    </Link>
                )}
            </CardContent>
        </Card>
    );
};

export default ThreadItem;
