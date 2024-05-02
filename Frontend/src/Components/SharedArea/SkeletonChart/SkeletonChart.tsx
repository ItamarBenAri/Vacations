import AppComponentsStyle from "../../../Theme/AppComponentsStyle";
import "./SkeletonChart.css";
import Skeleton from '@mui/joy/Skeleton';

// Skeleton chart component for vacations report loading:
export function SkeletonChart(): JSX.Element {
    return (
        <div className="SkeletonChart">
            <Skeleton level="body-lg" variant="text" sx={AppComponentsStyle.reportSkeletonLine} />
            <Skeleton level="body-lg" variant="rectangular" sx={AppComponentsStyle.reportSkeletonChart} />
            <Skeleton level="body-lg" variant="rectangular" width="20%" height="30px" sx={AppComponentsStyle.reportSkeletonButton} />
        </div>
    );
}
