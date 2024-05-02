import { useSelector } from "react-redux";
import "./EditVacation.css";
import { AppState } from "../../../Redux/AppState";
import { UserModel } from "../../../Models/UserModel";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography, styled } from "@mui/material";
import { Houseboat } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageButton from "../ImageButton/ImageButton";
import dayjs from "dayjs";
import { DateValidationError } from "@mui/x-date-pickers/models";
import { useForm } from "react-hook-form";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import FormValidation from "../../SharedArea/FormValidation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";
import useTitle from "../../../Utils/UseTitle";

export function EditVacation(): JSX.Element {

    // Set title to the page
    useTitle("Vacations | Edit Vacation");
    
    // Defined component variables:
    const user = useSelector<AppState, UserModel>(appState => appState.user);
    const params = useParams();
    const [globalStateVacation, setGlobalStateVacation] = useState<VacationModel>(
        useSelector<AppState, VacationModel>(appState => appState.vacations?.find(v => v.id === +params.id)) // Get vacation from global vacations if exist
    );
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<VacationModel>();
    const [userStartVacation, setUserStartVacation] = useState(null);
    const [userEndVacation, setUserEndVacation] = useState(null);
    const errorDate = dayjs("YYYY-MM-DD");
    const [startDateError, setStartDateError] = useState<DateValidationError | null>();
    const [endDateError, setEndDateError] = useState<DateValidationError | null>(null);
    const [uploadedImage, setUploadedImage] = useState<File | string>(null);
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
        if(globalStateVacation) {
            vacationSetValues(globalStateVacation); // Set values of globalStateVacation at form 
        }
        else {
            const vacationId = +params.vacationId;
            vacationsService.getOneVacation(vacationId)
                .then(vacation => {
                    vacationSetValues(vacation); // Set values of vacation at form 
                    setGlobalStateVacation(vacation); // Update globalStateVacation
                })
                .catch(err => notify.error(err));
        }
    }, []);

    // Set values of vacation at form 
    function vacationSetValues(vacation: VacationModel) {
        setValue("id", +params.vacationId)
        setValue("destination", vacation.destination);
        setValue("description", vacation.description);
        setValue("startVacation", vacation.startVacation);
        setValue("endVacation", vacation.endVacation);
        setValue("price", vacation.price);
        setValue("imageUrl", vacation.imageUrl);
        setUserStartVacation(dayjs(vacation.startVacation)); // Set date as dayjs object at DatePicker   
        setUserEndVacation(dayjs(vacation.endVacation)); // Set date as dayjs object at DatePicker
        setUploadedImage(vacation.imageUrl); // Set image for image button
    }

    const startDateErrorMessage = useMemo(() => {
        switch (startDateError) {
            case 'maxDate': {
                return 'Dates must be in the correct range';
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
        if (file) setUploadedImage(file);
    };

    const checkDatesAndImageIsValid = () => {
        if (!userStartVacation) setStartDateError("invalidDate");
        if (!userEndVacation) setEndDateError("invalidDate");
    }

    function cancelSubmitAction(e: Event) {
        e.preventDefault();
    }

    async function send(vacation: VacationModel) {
        try {
            if (userStartVacation === null || userEndVacation === null) {
                const mockEvent = new Event('submit'); // Create a mock event
                return cancelSubmitAction(mockEvent);
            }
            setIsSubmitting(true);
            vacation.startVacation = userStartVacation.format("YYYY-MM-DD"); // Set date in correct format
            vacation.endVacation = userEndVacation.format("YYYY-MM-DD"); // Set date in correct format
            if(vacation.image) vacation.image = (vacation.image as unknown as FileList)[0]; // Extract first image from FileList into vacation.image
            await vacationsService.updateVacation(vacation);
            notify.success("Vacation has been updated");
            navigate("/home");
        }
        catch (err: any) {
            notify.error(err);
            setIsSubmitting(false);
        }
    }
    
    return (
        <div className="EditVacation">
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box sx={AppComponentsStyle.avatarBox}>
                    <Avatar sx={AppComponentsStyle.avatar}>
                        <Houseboat />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Vacation
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
                                            maxDate={userEndVacation}
                                            value={startDateError && !userStartVacation ? errorDate : userStartVacation} /* Value error if error */
                                            onError={(newError) => !userStartVacation ? setStartDateError(newError) : setStartDateError(null)} /* Set error if error */
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
                                            minDate={userStartVacation}
                                            value={endDateError && !userEndVacation ? errorDate : userEndVacation} /* Value error if error */
                                            onError={(newError) => !userEndVacation ? setEndDateError(newError) : setEndDateError(null)} /* Set error if error */
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
                            <Grid item xs={12} style={{ textAlign: "left" }}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    style={AppComponentsStyle.getWidthPercent(50)}
                                >
                                    Vacation image
                                    <VisuallyHiddenInput
                                        type="file"
                                        {...register("image", { onChange: handleChangeImage })}
                                    />
                                </Button>
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
                            Edit Vacation
                        </Button>
                    </Box>
                </Box>
            </Container>        
        </div>
    );
}
