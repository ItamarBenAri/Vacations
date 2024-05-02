import "./AuthMenu.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppMenu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from "react-redux";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/AppState";
import { notify } from "../../../Utils/Notify";
import { authService } from "../../../Services/AuthService";
import { NavLink } from "react-router-dom";
import { AccountBox, AppRegistration, Login, Logout } from "@mui/icons-material";
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";

function AuthMenu(): JSX.Element {

    // Defined component variables:
    const settings = [ // User settings
        { name: 'login', icon: <Login /> },
        { name: 'register', icon: <AppRegistration /> }
    ];
    const user = useSelector<AppState, UserModel>(appState => appState.user);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    // Event of open and close settings menu:
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function logMeOut(): void {
        authService.logout();
        notify.success("You are logged out");
    }

    return (
        <div className="AuthMenu">
            <Box sx={AppComponentsStyle.authMainBox}>
                <Tooltip title="Open settings menu">
                    <IconButton onClick={handleOpenUserMenu} sx={AppComponentsStyle.authIconButton}>
                        <Avatar
                            alt={user?.firstName}
                            src={(!user?.imageUrl?.endsWith("null") && user?.imageUrl) || "/static/images/avatar/2.jpg"} /* User image or her first character of his name */
                        />
                    </IconButton>
                </Tooltip>
                <AppMenu
                    sx={AppComponentsStyle.authAppMenu}
                    anchorEl={anchorElUser} /* Open or close settings menu (boolean) */
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)} /* If true show the settings menu */
                    onClose={handleCloseUserMenu}
                >
                    {user &&
                        (           /* 👇 If user exist 👇 */
                            <div>
                                <Box sx={AppComponentsStyle.authAppMenuBox}>
                                    <Typography>
                                        <AccountBox /> {user.firstName} {user.lastName}
                                    </Typography>
                                </Box>
                                <NavLink onClick={logMeOut} to={"/login"} style={AppComponentsStyle.navLink}>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography>
                                            <Logout /> Logout
                                        </Typography>
                                    </MenuItem>
                                </NavLink>
                            </div>)
                        ||              /* 👇 If user not exist 👇 */
                        settings.map((setting) => (
                            <NavLink to={"/" + setting.name} key={setting.name} style={AppComponentsStyle.navLink}>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography>{setting.icon} {setting.name}</Typography>
                                </MenuItem>
                            </NavLink>
                        ))
                    }
                </AppMenu>
            </Box>
        </div>
    );
}

export default AuthMenu;
