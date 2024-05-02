import "./Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Container, IconButton, InputAdornment } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { appStore } from "../../../Redux/Store";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import FormValidation from "../../SharedArea/FormValidation";
import useTitle from "../../../Utils/UseTitle";
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { UserModel } from "../../../Models/UserModel";

function Login(): JSX.Element {

    // Set title to the page
    useTitle("Vacations | Login");

    // Defined component variables:
    const user = useSelector<AppState, UserModel>(appState => appState.user);
    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

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

    // Send credentials:
    async function send(credentials: CredentialsModel) {
        setIsSubmitting(true);
        try {
            await authService.login(credentials);
            const firstName = appStore.getState().user.firstName;
            notify.success(`Welcome back ${firstName}!`);
            navigate("/home");
        }
        catch (err: any) { notify.error(err) }
        finally { setIsSubmitting(false) };
    }

    return (
        <div className="Login">
            <Container 
                component="main" 
                maxWidth="sm" 
                sx={AppComponentsStyle.loginContainer}
                >
                <CssBaseline />
                <Box sx={AppComponentsStyle.avatarBox}>
                    <Avatar sx={AppComponentsStyle.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
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
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    {...register("email", FormValidation.emailValidation )}
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
                                    {...register("password", FormValidation.passwordValidation )}
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={AppComponentsStyle.submitButton}
                            disabled={isSubmitting}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to={"/register"} style={AppComponentsStyle.loginRegisterNavLink}>
                                    {"Don't have an account? Sign Up"}
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default Login;

