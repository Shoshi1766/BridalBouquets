import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { httpAddUser } from "../api/userService";
import { userIn } from "../features/userSlice";
import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material";

const SignUp = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  let { register, handleSubmit, formState: { errors }, setError } = useForm();

  const save = (data) => {
    if (!data.email) {
      delete data.email;
    }
    httpAddUser(data)
      .then(res => {
        alert("User signed up successfully.");
        console.log(res)
        dispatch(userIn(res.data));
        navigate("/home");
      })
      .catch(err => {
        console.log("Error with add new user: " + err);
        if (err.response) {
          const { message, title } = err.response.data;
          if (message === "error There is already such a user") {
            alert("There is already such a user, you need to login");
          } else {
            setError("root.serverError", { message: message });
            console.log("title: " + title + " message: " + message);
          }
        } else {
          setError("root.serverError", { message: "Unknown error" });
        }
      });
  };

  return (
    <Container maxWidth="xs"  style={{ marginLeft: 200 }}>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h5" color="primary" align="center">
          Sign Up
        </Typography>
        {errors.root?.serverError && (
          <Box sx={{ marginBottom: 2, color: 'red', textAlign: 'center' }}>
            <Typography>{errors.root.serverError.message}</Typography>
          </Box>
        )}
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

          {/* Tz Field */}
          <TextField
            label="Tz"
            variant="outlined"
            fullWidth
            {...register("tz", {
              required: "User tz is required."
            })}
            error={!!errors.tz}
            helperText={errors.tz?.message}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register("password", {
              required: "Password is required.",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Strong password is required."
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {/* Email Field */}
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Correct email is required."
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
