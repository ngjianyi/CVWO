import { getWithExpiry } from "../helpers/LocalStorage";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
    const stored_username = getWithExpiry("username");

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = async () => {
        await axios
            .get("/logout", { withCredentials: true })
            .then((res) => {
                localStorage.removeItem("username");
                console.log(res);
                handleMenuClose();
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
            });

        navigate("/");
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to={`/profile/${stored_username}`}>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="medium"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <IconButton
                    size="medium"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <LogoutIcon />
                </IconButton>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Link to={"/"}>
                            <Button variant="contained" color="secondary">
                                SATORU
                            </Button>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        {stored_username ? (
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        ) : (
                            <Link to="/login">
                                <Button variant="contained" color="secondary">
                                    Log In
                                </Button>
                            </Link>
                        )}
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        {stored_username ? (
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        ) : (
                            <Link to="/login">
                                <Button variant="contained" color="secondary">
                                    Log In
                                </Button>
                            </Link>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
};

export default Header;
