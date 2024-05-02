import "./VacationCard.css";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import { CalendarMonth, Delete, Edit, Favorite, FavoriteTwoTone, KeyboardArrowRight } from "@mui/icons-material";
import { Box, CardActions } from "@mui/material";
import { VacationModel } from "../../../Models/VacationModel";
import { UserModel } from "../../../Models/UserModel";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LikeModel } from "../../../Models/LikeModel";
import VacationsComponentsStyle from "../../../Theme/VacationsComponentsStyle";
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";

type VacationCardProps = {
    vacation: VacationModel;
    user: UserModel;
    vacationsIsFiltered: boolean;
};

function VacationCard(props: VacationCardProps): JSX.Element {

    // Defined component variables:
    const [userIsLiked, setUserIsLiked] = useState<number>(props.vacation.isLiked);
    const [loading, setLoading] = useState<boolean>(false);
    const vacationIsFiltered = props.vacationsIsFiltered;
    const [likesCount, setLikesCount] = useState<number>(props.vacation.likesCount);
    const navigate = useNavigate();

    const handleChangeLike = async () => {
        try {
            if (!userIsLiked) { // If like event
                setUserIsLiked(1);
                setLoading(true);
                const like = new LikeModel(props.user.id, props.vacation.id, 1);
                await vacationsService.addLike(like);
                setLoading(false);
                setLikesCount(likesCount + 1);
            }
            else {  // If unlike event
                setUserIsLiked(0);
                setLoading(true);
                await vacationsService.removeLike(props.user.id, props.vacation.id);
                setLoading(false);
                setLikesCount(likesCount - 1);
            }
        }
        catch (err: any) { notify.error(err) };
    }

    // Navigate to correct vacation edit page
    const editMe = () => {
        navigate("/edit/" + props.vacation.id);
    }

    async function deleteMe() {
        try {
            // ask the user to confirm...
            const sure = window.confirm("Are you sure?");
            if (!sure) return;
            await vacationsService.deleteVacation(props.vacation.id);
            notify.success("Vacation has been deleted.");
            navigate("/pageNotFound");
            setTimeout(() => navigate("/home"), 1); // Manipulation for update home page
        }
        catch (err: any) { notify.error(err) };
    }

    return (
        <div className="VacationCard">
            <Card variant="outlined" sx={VacationsComponentsStyle.card}>
                <CardOverflow>
                    <AspectRatio ratio="2">
                        <img
                            src={props.vacation.imageUrl}
                            srcSet={props.vacation.imageUrl}
                            loading="lazy"
                        />
                    </AspectRatio>
                    {props.user.roleId === 2 && // Like button if is regular user
                        <IconButton
                            aria-label="Like minimal photography"
                            size="sm"
                            variant="solid"
                            sx={VacationsComponentsStyle.cardHeaderButton(userIsLiked)}
                            onClick={handleChangeLike}
                            disabled={loading || vacationIsFiltered}
                        >
                            {userIsLiked !== 0 ?
                                <Favorite sx={VacationsComponentsStyle.cardFavorite} />
                                :
                                <FavoriteTwoTone />
                            }
                            <Box sx={VacationsComponentsStyle.cardLikeBox}>
                                Like {likesCount}
                            </Box>
                        </IconButton>
                    }
                    {props.user.roleId === 1 && // Edit and delete buttons if is admin
                        <>
                            <IconButton
                                aria-label="Like minimal photography"
                                size="sm"
                                variant="solid"
                                sx={VacationsComponentsStyle.cardHeaderButton(0, 25)}
                                onClick={editMe}
                            >
                                <Edit fontSize="inherit" sx={VacationsComponentsStyle.cardDeleteAndEditIcon} />
                                <Box sx={VacationsComponentsStyle.cardDeleteAndEditBox}>
                                    Edit
                                </Box>
                            </IconButton>
                            <IconButton
                                aria-label="Like minimal photography"
                                size="sm"
                                variant="solid"
                                sx={VacationsComponentsStyle.cardDeleteButton}
                                onClick={deleteMe}
                            >
                                <Delete fontSize="inherit" sx={VacationsComponentsStyle.cardDeleteAndEditIcon} />
                                <Box sx={VacationsComponentsStyle.cardDeleteAndEditBox}>
                                    Delete
                                </Box>
                            </IconButton>
                        </>
                    }
                </CardOverflow>
                <CardContent>
                    <Typography level="title-md" sx={VacationsComponentsStyle.cardContentTypography}>
                        {props.vacation.destination}
                    </Typography>
                    <CardOverflow variant="outlined" sx={VacationsComponentsStyle.cardCardOverflow}>
                        <CardContent orientation="horizontal" sx={VacationsComponentsStyle.cardOverflowContent}>
                            <Typography level="body-xs" sx={VacationsComponentsStyle.cardDate}>
                                <CalendarMonth fontSize="inherit" sx={AppComponentsStyle.getMarginRightPx(5)} />
                                {props.vacation.startVacation}
                            </Typography>
                            <Typography level="body-xs" sx={VacationsComponentsStyle.cardDash}> - </Typography>
                            <Typography level="body-xs" sx={VacationsComponentsStyle.cardDate}>
                                <CalendarMonth fontSize="inherit" sx={AppComponentsStyle.getMarginRightPx(5)} />
                                {props.vacation.endVacation}
                            </Typography>
                        </CardContent>
                    </CardOverflow>
                    <CardOverflow variant="soft" sx={VacationsComponentsStyle.cardOverflowDescription}>
                        <Box sx={VacationsComponentsStyle.cardDescriptionBox}>
                            <Typography level="body-sm" sx={VacationsComponentsStyle.cardDescriptionTypography}>
                                {props.vacation.description}
                            </Typography>
                        </Box>
                    </CardOverflow>
                </CardContent>
                <Divider inset="none" />
                <CardActions >
                    <Typography level="title-lg" sx={VacationsComponentsStyle.cardActionsTypography}>
                        ${props.vacation.price}
                    </Typography>
                </CardActions>
            </Card>
        </div>
    );
}

export default VacationCard;
