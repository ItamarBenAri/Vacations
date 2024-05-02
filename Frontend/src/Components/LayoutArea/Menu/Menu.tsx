import "./Menu.css";
import { NavLink } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppMenu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { ConnectingAirports, FlightTakeoffOutlined, NoteAddOutlined, SignalCellularAltOutlined } from "@mui/icons-material";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { UserModel } from "../../../Models/UserModel";
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";

function Menu(): JSX.Element {

    // Defined component variables:
    const pages = [ // App pages
        { name: "Home", link: "home", icon: <FlightTakeoffOutlined /> },
        { name: "Add Vacation", link: "new", icon: <NoteAddOutlined /> },
        { name: "report", link: "reports/vacations", icon: <SignalCellularAltOutlined /> }
    ];
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const user = useSelector<AppState, UserModel>(appState => appState.user);
    const activeBtnStyle = {
        my: 2,
        color: 'white',
        display: 'block',
        "&:hover": {
            color: "rgb(212,207,207)",
            textDecoration: "underline",
            textUnderlineOffset: "10px"
        }
    };
    
    // Event of open and close pages menu:
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <div className="Menu">
            <AppBar sx={AppComponentsStyle.menuAppBar}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <ConnectingAirports sx={AppComponentsStyle.menuConnectingAirportsMd} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={AppComponentsStyle.menuTypographyCompanyNameMd}
                        >
                            Travel
                        </Typography>
                        {user?.roleId === 1 &&  // Is admin👇
                            <Box sx={AppComponentsStyle.menuAppMenu}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <AppMenu
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={AppComponentsStyle.menuAppSettingsMenu}
                                >
                                    {pages.map((page) => (
                                        <NavLink to={"/" + page.link} key={page.name} style={AppComponentsStyle.navLink}>
                                            <MenuItem onClick={handleCloseNavMenu}>
                                                <Typography textAlign="center" >{page.icon} {page.name}</Typography>
                                            </MenuItem>
                                        </NavLink>
                                    ))}
                                </AppMenu>
                            </Box>
                        }
                        <ConnectingAirports sx={AppComponentsStyle.menuConnectingAirportsXs} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            sx={AppComponentsStyle.menuTypographyCompanyNameSm}
                        >
                            Travel
                        </Typography>
                        <Box sx={AppComponentsStyle.menuPagesMenu}>
                            {user?.roleId === 1 &&  // Is admin👇
                                pages.map((page) => (
                                    <NavLink to={"/" + page.link} key={page.name} style={AppComponentsStyle.menuPagesMenuLink}>
                                        {({ isActive }) => ( // Style active link
                                            <Button
                                                onClick={handleCloseNavMenu}
                                                sx={{ ...activeBtnStyle, ...(isActive && { color: 'rgb(172,172,172)' }) }}
                                            >
                                                {page.icon} {page.name}
                                            </Button>
                                        )}
                                    </NavLink>
                                ))}
                        </Box>
                        <AuthMenu />
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default Menu;
