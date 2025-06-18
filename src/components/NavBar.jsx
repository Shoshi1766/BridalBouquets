import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import LogOutButton from "../components/LogOutButton";

// הגדרת רוחב הסיידבר
const drawerWidth = 240;

const NavBar = () => {
  const user = useSelector(state => state.user.currentUser);
  const theme = useTheme(); // גישה ל-theme


  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          border: "none",
          backgroundColor: theme.palette.success.main, // שימוש בצבע הירוק מה-theme
        },
      }}
    >

      {/* לוגו ו-"Hello" */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#880e4f", // ורוד כהה רקע
          color: "#fff", // צבע טקסט לבן
          borderRadius: 2, // פינות מעוגלות
        }}
      >
        {/* לוגו */}
        <img src="../../public/images/logo3.png" alt="logo" width={100} />
        {/* שם החנות */}

        <Typography variant="h4" sx={{ mt: 0 }} style={{ fontFamily: "Dancing Script" }}>
          R and S
        </Typography>
        <Typography variant="h4" sx={{ mt: 0 }} style={{ fontFamily: "Dancing Script" }}>
          Bridal Bouquets
        </Typography>

        {/* שם המשתמש */}
        <Typography variant="h6" sx={{ mt: 1 }}>
          {user ? `Hello, ${user.fullName}` : "Hello, Guest"}
        </Typography>
      </Box>

      <Divider />

      <List style={{ zIndex: 2 }}>
        {/* קישורים */}
        {!user && (
          <>
            <ListItem disablePadding >
              <ListItemButton
                component={Link}
                to="signUp"
                sx={{
                  "&:hover": {
                    backgroundColor: "#f06292", // ורוד בהיר
                    color: "#880e4f", // ורוד כהה
                  },
                  backgroundColor: theme.palette.success.main, // שימוש בצבע הירוק מה-theme
                  color: "#880e4f", // צבע טקסט ורוד כהה
                }}
              >
                <ListItemIcon sx={{ color: "#880e4f" }}>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton primary=""
                component={Link}
                to="login"
                sx={{
                  "&:hover": {
                    backgroundColor: "#f06292", // ורוד בהיר
                    color: "#880e4f", // ורוד כהה
                  },
                  backgroundColor: theme.palette.success.main, // שימוש בצבע הירוק מה-theme
                  color: "#880e4f", // צבע טקסט ורוד כהה
                }}
              >
                <ListItemIcon sx={{ color: "#880e4f" }}>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </>
        )}

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="home"
            sx={{
              "&:hover": {
                backgroundColor: "#f06292", // ורוד בהיר
                color: "#880e4f", // ורוד כהה
              },
              backgroundColor: theme.palette.success.main, // שימוש בצבע הירוק מה-theme
              color: "#880e4f", // צבע טקסט ורוד כהה
            }}
          >
            <ListItemIcon sx={{ color: "#880e4f" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        {user &&
          user.role === "Manager" ? (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="addNewItem"
              sx={{
                "&:hover": {
                  backgroundColor: "#f06292", // ורוד בהיר
                  color: "#880e4f", // ורוד כהה
                },
                backgroundColor: theme.palette.success.main, // שימוש בצבע הירוק מה-theme
                color: "#880e4f", // צבע טקסט ורוד כהה
              }}
            >
              <ListItemIcon sx={{ color: "#880e4f" }}>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Add Item" />
            </ListItemButton>
          </ListItem>
        ) :
          null}

        {user && (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="logOut"
              sx={{
                "&:hover": {
                  backgroundColor: "#f06292", // ורוד בהיר
                  color: "#880e4f", // ורוד כהה
                },
                backgroundColor: theme.palette.success.main, // שימוש בצבע הירוק מה-theme
                color: "#880e4f", // צבע טקסט ורוד כהה
              }}
            >
              <ListItemIcon sx={{ color: "#880e4f" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>
        )}
        {!user || user.role != "Manager" ? <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="cart"
            sx={{
              "&:hover": {
                backgroundColor: "#f06292", // ורוד בהיר
                color: "#880e4f", // ורוד כהה
              },
              backgroundColor: theme.palette.success.main, // שימוש בצבע הירוק מה-theme
              color: "#880e4f", // צבע טקסט ורוד כהה
            }}
          >
            <ListItemIcon sx={{ color: "#880e4f" }}>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItemButton>
        </ListItem> : null}
      </List>
    </Drawer>
  );
};

export default NavBar;
