import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography, styled } from "@mui/material";
import "./AddVacation.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { VacationModel } from "../../../Models/VacationModel";
import { useEffect, useMemo, useState } from "react";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import { Houseboat } from "@mui/icons-material";
import FormValidation from "../../SharedArea/FormValidation";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { DateValidationError } from "@mui/x-date-pickers/models";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/AppState";
import { useSelector } from "react-redux";
import ImageButton from "../ImageButton/ImageButton";
import useTitle from "../../../Utils/UseTitle";
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";

function AddVacation(): JSX.Element {

    // Set title to the page
    useTitle("Vacations | Add Vacation");

    // Defined component variables:
    const user = useSelector<AppState, UserModel>(appState => appState.user);
    const { register, handleSubmit, formState: { errors } } = useForm<VacationModel>();
    const [userStartVacation, setUserStartVacation] = useState(null);
    const [userEndVacation, setUserEndVacation] = useState(null);
    const errorDate = dayjs("YYYY-MM-DD");
    const [startDateError, setStartDateError] = useState<DateValidationError | null>(null);
    const [endDateError, setEndDateError] = useState<DateValidationError | null>(null);
    const [uploadedImage, setUploadedImage] = useState<File>(null);
    const [fileName, setFileName] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    useEffect(() => {
        if (!user || user?.roleId !== 1) {
            navigate("/login"); // If user not exist
            notify.error("You are not logged in");
            return;
        }
        if (user?.roleId !== 1) {
            navigate("/pageNotFound"); // If is not admin
            return;
        }
    }, []);

    const startDateErrorMessage = useMemo(() => {
        switch (startDateError) {
            case 'maxDate': {
                return 'Dates must be in the correct range';
            }
            case 'disablePast': {
                return 'Date must be in a future';
            }
            case 'invalidDate': {
                return 'Your date is not valid';
            }
            default: {
                return '';
            }
        }
    }, [startDateError]);

    const endDateErrorMessage = useMemo(() => {
        switch (endDateError) {
            case 'minDate': {
                return 'Dates must be in the correct range';
            }
            case 'disablePast': {
                return 'Date must be in a future';
            }
            case 'invalidDate': {
                return 'Your date is not valid';
            }
            default: {
                return '';
            }
        }
    }, [endDateError]);

    // Set file and file name:
    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) { // If file exist
            setUploadedImage(file);
            setFileName(file.name);
        }
    };

    const checkDatesAndImageIsValid = () => {
        if (!userStartVacation) setStartDateError("invalidDate");
        if (!userEndVacation) setEndDateError("invalidDate");
        if (!uploadedImage) setFileName(null);
    }

    function cancelSubmitAction(e: Event) {
        e.preventDefault();
    }

    async function send(vacation: VacationModel) {
        try {
            if (userStartVacation === null || userEndVacation === null || uploadedImage === null) {
                const mockEvent = new Event('submit'); // Create a mock event
                return cancelSubmitAction(mockEvent);
            }
            setIsSubmitting(true);
            vacation.startVacation = userStartVacation.format("YYYY-MM-DD"); // Set date in correct format
            vacation.endVacation = userEndVacation.format("YYYY-MM-DD"); // Set date in correct format
            vacation.image = (vacation.image as unknown as FileList)[0]; // Extract first image from FileList into vacation.image
            await vacationsService.addVacation(vacation);
            notify.success("Vacation has been added");
            navigate("/home");
        }
        catch (err: any) {
            notify.error(err);
            setIsSubmitting(false);
        }
    }

    return (
        <div className="AddVacation">
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box sx={AppComponentsStyle.avatarBox}>
                    <Avatar sx={AppComponentsStyle.avatar}>
                        <Houseboat />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Vacation
                    </Typography>
                    <Box
                        component="form"
                        noValidate // Because there is react validation
                        onSubmit={handleSubmit(send)}
                        sx={AppComponentsStyle.formBox}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-destination"
                                    name="destination"
                                    fullWidth
                                    label="Destination"
                                    autoFocus
                                    {...register("destination", FormValidation.destinationValidation)}
                                    error={!!errors?.destination} /* Set error if exist */
                                    helperText={errors?.destination ? errors.destination.message : null} /* Show error message if error */
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    multiline
                                    rows={4}
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    autoComplete="description-name"
                                    {...register("description", FormValidation.descriptionValidation)}
                                    error={!!errors?.description} /* Set error if exist */
                                    helperText={errors?.description ? errors.description.message : null} /* Show error message if error */
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']} >
                                        <DatePicker
                                            sx={AppComponentsStyle.getWidthPercent(100)}
                                            label="Start vacation"
                                            displayWeekNumber
                                            closeOnSelect
                                            format="YYYY-MM-DD"
                                            name="startVacation"
                                            disablePast
                                            maxDate={userEndVacation}
                                            value={startDateError ? errorDate : userStartVacation} /* Value error if error */
                                            onError={(newError) => setStartDateError(newError)} /* Set error if error */
                                            onChange={selectedDate => setUserStartVacation(selectedDate)} /* Set selected date */
                                            slotProps={{
                                                textField: {
                                                    required: true,
                                                    helperText: startDateErrorMessage, /* Show helper text if error */
                                                    color: startDateError ? "error" : "info", /* DatePicker color */
                                                },
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']} >
                                        <DatePicker
                                            sx={AppComponentsStyle.getWidthPercent(100)}
                                            label="End vacation"
                                            name="endVacation"
                                            displayWeekNumber
                                            closeOnSelect
                                            format="YYYY-MM-DD"
                                            disablePast
                                            minDate={userStartVacation}
                                            value={endDateError ? errorDate : userEndVacation} /* Value error if error */
                                            onError={(newError) => setEndDateError(newError)} /* Set error if error */
                                            onChange={selectedDate => setUserEndVacation(selectedDate)} /* Set selected date */
                                            slotProps={{
                                                textField: {
                                                    required: true,
                                                    helperText: endDateErrorMessage, /* Show helper text if error */
                                                    color: endDateError ? "error" : "info", /* DatePicker color */
                                                },
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="price"
                                    label="Price"
                                    type="number"
                                    inputProps={{ step: 0.01 }}
                                    autoComplete="new-price"
                                    {...register("price", FormValidation.priceValidation)}
                                    error={!!errors?.price} /* Set error if exist */
                                    helperText={errors?.price ? errors.price.message : null} /* Show error message if error */
                                />
                            </Grid>
                            <Grid item xs={12} sx={AppComponentsStyle.textAlignLeft}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    sx={AppComponentsStyle.getWidthPercent(50)}
                                >
                                    Vacation image
                                    <VisuallyHiddenInput
                                        type="file"
                                        {...register("image", { onChange: handleChangeImage })}
                                    />
                                </Button>
                                {fileName === null && <span className="error">Image is required</span> /* Show image error if error */}
                            </Grid>
                            <Grid item xs={12} >
                                <ImageButton image={uploadedImage} />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={AppComponentsStyle.submitButton}
                            disabled={isSubmitting}
                            onClick={checkDatesAndImageIsValid}
                        >
                            Add Vacation
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default AddVacation;
