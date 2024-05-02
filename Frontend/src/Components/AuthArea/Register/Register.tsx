import "./Register.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import { UserModel } from "../../../Models/UserModel";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Chip, IconButton, InputAdornment, styled } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormValidation from "../../SharedArea/FormValidation";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useTitle from "../../../Utils/UseTitle";
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";

function Register(): JSX.Element {

    // Set title to the page
    useTitle("Vacations | Register");

    // Defined component variables:
    const user = useSelector<AppState, UserModel>(appState => appState.user);
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
    const [showPassword, setShowPassword] = useState(false);
    const [fileName, setFileName] = useState(null);
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

    
    useEffect(()=>{
        if(user) {
            notify.error("You are logged already");
            navigate("/home"); // If user exist, navigate to home page
        }
    }, []);

    // Show or hide password:
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // Set or remove file name:
    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.files[0].name);
    }
    const handleDelete = () => { setFileName(null) };

    async function send(user: UserModel) {
        setIsSubmitting(true);
        try {
            user.image = (user.image as unknown as FileList)[0]; // Extract and set first image from FileList into user.image
            await authService.register(user);
            const fullName = user.firstName + " " + user.lastName;
            notify.success("Welcome " + fullName);
            navigate("/home");
        }
        catch (err: any) { notify.error(err) }
        finally { setIsSubmitting(false) };
    }

    return (
        <div className="Register">
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box sx={AppComponentsStyle.avatarBox}>
                    <Avatar sx={AppComponentsStyle.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate // Because there is react validation
                        sx={AppComponentsStyle.formBox}
                        onSubmit={handleSubmit(send)}
                        >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    fullWidth
                                    label="First Name"
                                    autoFocus
                                    {...register("firstName", FormValidation.firstNameValidation)}
                                    error={!!errors?.firstName} /* Set error if exist */
                                    helperText={errors?.firstName ? errors.firstName.message : null} /* Show helper text if error */
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    {...register("lastName", FormValidation.lastNameValidation)}
                                    error={!!errors?.lastName} /* Set error if exist */
                                    helperText={errors?.lastName ? errors.lastName.message : null} /* Show helper text if error */
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    {...register("email", FormValidation.emailValidation)}
                                    error={!!errors?.email} /* Set error if exist */
                                    helperText={errors?.email ? errors.email.message : null} /* Show helper text if error */
                                    /> 
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    {...register("password", FormValidation.passwordValidation)}
                                    error={!!errors?.password} /* Set error if exist */
                                    helperText={errors?.password ? errors.password.message : null} /* Show helper text if error */
                                    InputProps={{ /* Show or hide password icon 👇 */
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility /> /* Toggle visibility icon */}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sx={AppComponentsStyle.textAlignLeft}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    sx={AppComponentsStyle.registerGridButton}
                                >
                                    profile image
                                    <VisuallyHiddenInput
                                        type="file"
                                        {...register("image", { onChange: handleChangeImage })}
                                    />
                                </Button>
                                {(fileName && /* If user uploaded file */
                                    <Chip
                                        size="medium"
                                        label={fileName}
                                        onDelete={handleDelete}
                                        sx={AppComponentsStyle.registerChip}
                                    />
                                ) || /* Else */ null}
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel /* Send promotions component */
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                    {...register("sendPromotionEmails")}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={AppComponentsStyle.submitButton}
                            disabled={isSubmitting}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to={"/login"} style={AppComponentsStyle.loginRegisterNavLink}>
                                    {"Already have an account? Sign in"}
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default Register;