import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeOneFromCart, addToCart } from "../features/cartSlice";
import { IconButton, Typography, Grid, Box } from "@mui/material";
import { Remove, Add, ShoppingCart } from "@mui/icons-material"; // אייקונים של MUI
import { Link } from "react-router-dom"; // שימוש ב-Link מ-react-router-dom
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { httpGetOneStaticFlower } from '../api/flowerService'

const MiniCart = () => {
    const { arr, totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="mini-cart" style={{
            position: "fixed",
            bottom: "20px", // מיקום מלמטה
            right: "20px", // מיקום מימין
            padding: "16px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            width: "300px",
            zIndex: 1000, // כדי לוודא שזה נמצא מעל תוכן אחר
        }}>
            <Typography variant="h6" align="center" color="primary" gutterBottom>
                Your Mini Cart
            </Typography>

            {/* הצגת המוצרים */}
            <Grid container spacing={2}>
                {arr.map((flower, index) => (
                    <Grid item xs={12} key={index}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            {/* תמונה */}
                            <img
                                src={httpGetOneStaticFlower(flower.img)}
                                alt={flower.name}
                                width={50}
                                height={50}
                                style={{ objectFit: "cover", marginRight: '8px' }}
                            />
                            {/* פרטי פרח */}
                            <Box flexGrow={1}>
                                <Typography variant="body2" color="primary">{flower.name}</Typography>
                                <Typography variant="body2">Price: {flower.price}</Typography>
                            </Box>
                            {/* כפתורים */}
                            <Box display="flex" alignItems="center">
                                <IconButton onClick={() => dispatch(removeOneFromCart(flower))} size="small">
                                    <Remove />
                                </IconButton>
                                <Typography variant="body2" style={{ display: 'inline-block', margin: '0 8px' }}>
                                    {flower.qty}
                                </Typography>
                                <IconButton onClick={() => dispatch(addToCart(flower))} size="small">
                                    <Add />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* סך הכל */}
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="16px">
                <Typography variant="body2" color="primary">Total: {totalPrice}</Typography>
            </Box>

            {/* כפתור מעבר לסל קניות */}
            <Box marginTop="16px">
                <ListItemButton
                    component={Link}
                    to="/cart"
                    sx={{
                        "&:hover": {
                            backgroundColor: "#f06292", // ורוד בהיר
                            color: "#880e4f", // ורוד כהה
                        },
                        backgroundColor: "#fff", // רקע לבן
                        color: "#880e4f", // צבע טקסט ורוד כהה
                    }}
                >
                    <ListItemIcon sx={{ color: "#880e4f" }}>
                        <ShoppingCart />
                    </ListItemIcon>
                    <ListItemText primary="Go to Cart" />
                </ListItemButton>
            </Box>
        </div>
    );
};

export default MiniCart;
