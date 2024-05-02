class VacationsComponentsStyle {

    // Vacation Card Component Style:
    public static card = {
        width: 320,
        height: 370,
        margin: "15px"
    }

    public static cardHeaderButton(pinkBackgroundColor?: number, borderRadiusPx?: number): Object {
        return {
            color: "#65676B",
            backgroundColor: pinkBackgroundColor ? "pink" : "rgb(238, 238, 238, 0.7)",
            position: 'absolute',
            zIndex: 2,
            borderRadius: borderRadiusPx ? borderRadiusPx + "px" : '10px',
            left: '1rem',
            transform: 'translateY(50%)',
            "&:hover": {
                backgroundColor: "#BCC0C4"
            }
        }
    }

    public static cardDeleteButton = {
        color: "#65676B",
        backgroundColor: "rgb(238, 238, 238, 0.7)",
        position: 'absolute',
        zIndex: 2,
        borderRadius: '25px',
        left: '1rem',
        translate: '75px 16.5px',
        "&:hover": {
            backgroundColor: "#BCC0C4"
        }
    }

    public static cardFavorite = {
        color: "red"
    }

    public static cardLikeBox = {
        padding: "5px"
    }

    public static cardDeleteAndEditIcon = {
        marginLeft: "5px"
    }

    public static cardDeleteAndEditBox = {
        margin: "0 10px 0 5px"
    }

    public static cardContentTypography = {
        fontSize: "20px",
        position: "absolute",
        color: "white",
        textShadow: "0 0 3px #FF0000, 0 0 5px #0000FF",
        top: "35%",
        left: 25,
        transform: "translateY(-50%)"
    }

    public static cardCardOverflow = {
        backgroundColor: "rgb(156, 209, 255)",
        marginTop: "-25px",
        paddingBottom: "10px",
        borderRadius: "10px 10px 0 0"
    }

    public static cardOverflowContent = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "8px 20px 8px 20px"
    }

    public static cardDate = {
        fontWeight: "bold",
        display: "flex",
        alignItems: "center"
    }

    public static cardDash = {
        fontWeight: "bold",
        marginLeft: "5px",
        marginRight: "5px"
    }

    public static cardOverflowDescription = {
        backgroundColor: "white",
        marginTop: "-15px",
        borderRadius: "10px 10px 0 0"
    }

    public static cardDescriptionBox = {
        maxHeight: "84px",
        overflow: "auto"
    }

    public static cardDescriptionTypography = {
        textAlign: "left",
        overflow: "scroll"
    }

    public static cardActionsTypography = {
        mr: 'auto'
    }
    
    // ----------------------------------------------------------
    
    // Vacations List Component Style:
    public static listMainBox = { 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3, 
        justifyContent: "left", 
        margin: "20px 0 10px 7%" 
    } 

}

export default VacationsComponentsStyle;
