import ThreadList from "../components/ThreadList";
// import CommentList from "../components/CommentList";
import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const Profile: React.FC = () => {
    const params = useParams();

    return (
        <>
            <Typography>{params.username}</Typography>

            <Box>
                <ThreadList filter_url={`/threads_filter_user/${params.username}`} />
                {/* <CommentList thread_id={undefined} filter_url={`/threads_filter_user/${params.username}`} /> */}
            </Box>
        </>
    );
};

export default Profile;
