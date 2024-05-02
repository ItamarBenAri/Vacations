import { Theme } from "@mui/material"

class AppComponentsStyle {

    // General App Style:
    public static navLink = {
        textDecoration: 'none',
        color: 'black'
    }

    public static flex = {
        display: 'flex'
    }

    public static avatarBox = {
        marginTop: 8,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }

    public static avatar = {
        m: 1,
        bgcolor: '#1A4373'
    }

    public static formBox = {
        mt: 3
    }

    public static getWidthPercent(width: number): Object {
        return { width: width + "%" }
    }

    public static getMarginRightPx(marginRight: number): Object {
        return { marginRight: marginRight + "px" }
    }

    public static textAlignLeft = {
        textAlign: "left"
    }

    public static submitButton = {
        mt: 3,
        mb: 2,
        bgcolor: '#1A4373'
    }

    // ----------------------------------------------------------

    // Auth Menu Components Style:
    public static authMainBox = {
        flexGrow: 0
    }

    public static authIconButton = {
        p: 0,
        display: {
            xs: 'flex'
        }
    }

    public static authAppMenu = {
        mt: '45px',
        display: {
            textTransform: "capitalize"
        }
    }

    public static authAppMenuBox = {
        margin: "6px 16px"
    }

    // ----------------------------------------------------------

    // Login && Register Pages Style:

    // ---- Login Style Only ----
    public static loginContainer = {
        height: '60vh'
    }

    // ---- Login && Register Style ----
    public static loginRegisterNavLink = {
        fontSize: "small"
    }

    // ---- Register Style Only ----
    public static registerGridButton = {
        width: '50%'
    }

    public static registerChip = {
        maxWidth: '40%',
        marginLeft: '5%'
    }

    // ----------------------------------------------------------

    // Pagination Style:
    public static paginationBox = {
        display: "flex",
        margin: "20px 0px",
        alignItems: "center",
        justifyContent: "center"
    }

    // ----------------------------------------------------------

    // Copyrights Style:
    public static copyrightsMainBox = {
        backgroundColor: "#EEEEEE",
        p: 6
    }

    public static copyrightsLink = {
        pl: 1,
        pr: 1
    }

    // ----------------------------------------------------------

    // Menu Style:
    public static menuAppBar = {
        backgroundColor: '#05203c',
        position: "static"
    }

    public static menuConnectingAirportsMd = {
        display: {
            xs: 'none',
            md: 'flex'
        }
        , mr: 1
    }

    public static menuTypographyCompanyNameMd = {
        mr: 2,
        display: {
            xs: 'none',
            md: 'flex'
        },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
    }

    public static menuAppSettingsMenu = {
        display: {
            xs: 'block',
            md: 'none',
            textTransform: 'capitalize'
        }
    }

    public static menuConnectingAirportsXs = {
        display: {
            xs: 'flex',
            md: 'none'
        },
        mr: 1
    }

    public static menuAppMenu = {
        flexGrow: 1,
        display: {
            xs: 'flex',
            md: 'none'
        }
    }

    public static menuTypographyCompanyNameSm = {
        mr: 2,
        display: { xs: 'flex', md: 'none' },
        flexGrow: 1,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none'
    }

    public static menuPagesMenu = {
        flexGrow: 1,
        display: {
            xs: 'none',
            md: 'flex'
        }
    }

    public static menuPagesMenuLink = {
        textDecoration: 'none'
    }

    // ----------------------------------------------------------

    // Report Page Style:
    public static reportChart = {
        margin: "3%",
        width: "95%",
        height: "400px"
    }
    
    public static reportChartButton = {
        margin: "0 4% 15px 0",
        marginLeft: 'auto'
    }
    
    public static reportIconButton = {
        paddingLeft: '10px',
        paddingRight: '10px',
    }
    
    public static reportSkeletonLine = { 
        marginLeft: "3%", 
        width: "40%" 
    }
    
    public static reportSkeletonChart = { 
        margin: "3%", 
        width: "93%", 
        height: "400px" 
    }
    
    public static reportSkeletonButton = { 
        margin: "0 4% 15px 0",
        marginLeft: 'auto',
        width: "20%", 
        height: "30px" 
    }

    // ----------------------------------------------------------

    // Image Button Component Style:
    public static imageButtonBox = {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%'
    }

    public static imageButtonTypography = {
        position: 'relative',
        p: 4,
        pt: 2,
        pb: (theme: Theme) => `calc(${theme.spacing(1)} + 6px)`,
    }
    
    public static imageButtonLink = {
        textDecoration: 'none',
        color: 'inherit'
    }

    // ----------------------------------------------------------
    
    // Image Button Component Style:
    public static skeletonCardContent = { 
        gap: 0.5, 
        mt: 1 
    }

}

export default AppComponentsStyle;
