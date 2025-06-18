import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { httpCheckUser } from "../api/UserService";
import { userIn } from "../features/userSlice";
import { Box, Button, TextField, Typography, Container, Paper, InputAdornment, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// פונקציה לפסול סיסמאות לא חוקיות
const passwordValidation = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Login = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    const save = (data) => {
        httpCheckUser(data)
            .then((res) => {
                if (res.data.role === "Manager") alert("Manager logged in successfully.");
                else alert("User logged in successfully.");
                dispatch(userIn(res.data));
                navigate("/home");
            })
            .catch((err) => {
                if (err.response.data.message === "there is not such a user") {
                    // אם אין כזה משתמש, נעדכן את השגיאה ב-react-hook-form
                    setError("fullName", {
                        type: "manual",
                        message: "There is no such user."
                    });

                }
                console.log("error with log user: " + err.response.data.message);
            });
    };

    return (
        <Container maxWidth="xs" style={{ marginLeft: 200 }}>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
                <Typography variant="h5" color="primary" align="center">
                    Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(save)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                    {/* Full Name Field */}
                    <TextField
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        {...register("fullName", {
                            required: "User name is required."
                        })}
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                    />

                    {/* Password Field */}
                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"} // אם showPassword הוא true, אז ה-input יהיה text, אחרת password
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />} {/* מציג את האייקון */}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        {...register("password", {
                            required: "Password is required.",
                            pattern: {
                                value: passwordValidation,
                                message: "Password must contain at least 8 characters, one uppercase letter, one number, and one special character."
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    {/* Submit Button */}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </Box>
            </Paper>
            <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                Don't have an account?{" "}
                <Link to="/signUp">
                    <Button variant="text" color="secondary">
                        Create one here
                    </Button>
                </Link>
            </Typography>
        </Container>
    );
};

export default Login;
