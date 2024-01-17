import Comment from "../types/Comment";
import React, { useState, MouseEvent } from "react";
import axios, { AxiosError } from "axios";
import { Box, Card, CardContent, TextField, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
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

// import { styled, alpha } from "@mui/material/styles";
// import Menu, { MenuProps } from "@mui/material/Menu";

// const StyledMenu = styled((props: MenuProps) => (
//     <Menu
//         elevation={0}
//         anchorOrigin={{
//             vertical: "bottom",
//             horizontal: "right",
//         }}
//         transformOrigin={{
//             vertical: "top",
//             horizontal: "right",
//         }}
//         {...props}
//     />
// ))(({ theme }) => ({
//     "& .MuiPaper-root": {
//         borderRadius: 6,
//         marginTop: theme.spacing(1),
//         minWidth: 180,
//         color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
//         boxShadow:
//             "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
//         "& .MuiMenu-list": {
//             padding: "4px 0",
//         },
//         "& .MuiMenuItem-root": {
//             "& .MuiSvgIcon-root": {
//                 fontSize: 18,
//                 color: theme.palette.text.secondary,
//                 marginRight: theme.spacing(1.5),
//             },
//             "&:active": {
//                 backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
//             },
//         },
//     },
// }));

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

const CommentItem: React.FC<Props> = ({ full_comment, updateComments }) => {
    const classes = useStyles();
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

    const url = `http://localhost:4000/forum_comments/${full_comment.comment.id}`;
    const header = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const handleEdit = () => {
        setAnchorEl(null);
        setEditable(!editable);
    };

    const handleSubmit = async () => {
        const body: Body = {
            content: content,
        };
        await axios
            .patch(url, body, header)
            .then((res) => console.log(res))
            .catch((error: Error | AxiosError) => {
                console.log(error);
            });

        updateComments();
    };

    const handleDelete = async () => {
        await axios
            .delete(url, header)
            .then((res) => console.log(res))
            .catch((error: Error | AxiosError) => {
                console.log(error);
            });

        updateComments();
    };

    return (
        <Card className={classes.commentCard}>
            {editable ? (
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                    <Typography variant="body2" color="textPrimary" className={classes.commentBody} component="p">
                        {full_comment.comment.content}
                    </Typography>
                    <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                        {"Posted by " + full_comment.author}
                    </Typography>
                </CardContent>
            )}

            {!editable && (
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
