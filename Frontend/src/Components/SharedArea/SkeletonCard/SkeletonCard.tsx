import "./SkeletonCard.css";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Skeleton from '@mui/joy/Skeleton';
import { Box, CardContent } from "@mui/material";
import VacationsComponentsStyle from "../../../Theme/VacationsComponentsStyle";
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";

// Skeleton card component for vacations cards loading:
export function SkeletonCard(): JSX.Element {
    return (
        <div className="SkeletonCard">
            <Box sx={VacationsComponentsStyle.listMainBox}>
                <Card variant="outlined" sx={VacationsComponentsStyle.card}>
                    <AspectRatio ratio="21/9">
                        <Skeleton variant="overlay">
                            <img
                                alt=""
                                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                            />
                        </Skeleton>
                    </AspectRatio>
                    <CardContent sx={AppComponentsStyle.skeletonCardContent}>
                        <Skeleton level="body-lg" variant="text" width="100%" />
                        <Skeleton level="body-lg" variant="text" width="100%" />
                        <Skeleton level="body-lg" variant="text" width="100%" />
                        <Skeleton level="body-lg" variant="text" width="100%" />
                        <Skeleton level="body-lg" variant="text" width="100%" />
                        <Skeleton level="body-lg" variant="text" width="100%" />
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}
