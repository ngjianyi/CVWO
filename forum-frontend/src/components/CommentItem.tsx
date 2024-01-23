import { getWithExpiry } from "../helpers/LocalStorage";
import Comment from "../types/Comment";
import React, { useState, MouseEvent } from "react";
import axios, { AxiosError } from "axios";
import { Box, Card, CardContent, TextField, Typography, Button, Alert } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

type Props = {
    full_comment: { comment: Comment; author: string };
    updateComments: () => void;
};

type Body = {
    content: string;
};

const CommentItem: React.FC<Props> = ({ full_comment, updateComments }) => {
    const stored_username = getWithExpiry("username");
    const [alert, setAlert] = useState<boolean>(false);
    const [editable, setEditable] = useState<boolean>(false);
    const [content, setContent] = useState<string>(full_comment.comment.content);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setAnchorEl(null);
        setEditable(!editable);
    };

    const url = `/forum_comments/${full_comment.comment.id}`;

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body: Body = {
            content: content,
        };
        await axios
            .patch(url, body)
            .then((res) => {
                console.log(res);
                updateComments();
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
                setAlert(true);
                setEditable(false);
                handleClose();
            });
    };

    const handleDelete = async () => {
        await axios
            .delete(url)
            .then((res) => {
                console.log(res);
                updateComments();
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
                setAlert(true);
                handleClose();
            });
    };

    return (
        <Card>
            {alert && <Alert severity="error">You are not authorised to perform this action</Alert>}

            {editable ? (
                <Box component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        variant="filled"
                        required
                        fullWidth
                        id="content"
                        label="Content"
                        name="content"
                        value={content}
                        multiline
                        onChange={(event) => setContent(event.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Update comment!
                    </Button>
                </Box>
            ) : (
                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {full_comment.comment.content}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        {"Posted by " + full_comment.author}
                    </Typography>
                </CardContent>
            )}

            {!editable && stored_username === full_comment.author && (
                <Button
                    id="more-actions-button"
                    aria-controls={open ? "more-actions-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                >
                    <MoreHorizIcon />
                </Button>
            )}
            <Menu
                id="more-actions-menu"
                MenuListProps={{
                    "aria-labelledby": "more-actions-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEdit} disableRipple>
                    <EditIcon />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete} disableRipple>
                    <DeleteIcon />
                    Delete
                </MenuItem>
            </Menu>
        </Card>
    );
};

export default CommentItem;
