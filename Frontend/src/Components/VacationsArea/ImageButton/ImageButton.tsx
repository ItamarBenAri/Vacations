import { styled } from "@mui/material/styles";
import "./ImageButton.css";
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";

type ImageButtonProps = {
    image: File | string | null;
};

function ImageButton(props: ImageButtonProps): JSX.Element {

    // Component style:
    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
                opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
                opacity: 0,
            },
            '& .MuiTypography-root': {
                border: '4px solid currentColor',
            },
        },
    }));

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        backgroundColor: '#eeeeee', // Default gray background
    });

    const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));

    // Convert the image to a data URL
    let imageUrl: File | string | null;
    if (typeof props.image === "object" && props.image !== null) {
        imageUrl = URL.createObjectURL(props.image);
    }
    else if (typeof props.image === "string") imageUrl = props.image;
    else imageUrl = null;

    return ( // If image uploaded
        <Box sx={AppComponentsStyle.imageButtonBox}>
            <ImageButton
                focusRipple
                sx={AppComponentsStyle.getWidthPercent(100)}
                disabled={imageUrl === null} // If no image, so disabled the button
            >
                {imageUrl && <ImageSrc style={{ backgroundImage: `url(${imageUrl})` }} />/* Show image if exist */}
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <a style={AppComponentsStyle.imageButtonLink} href={String(imageUrl)} target="_blank"> {/* Show image in new tab */}
                    <Image>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            sx={AppComponentsStyle.imageButtonTypography}
                        >
                            Vacation Image
                            <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Image>
                </a>
            </ImageButton>
        </Box>
    );
}

export default ImageButton;
