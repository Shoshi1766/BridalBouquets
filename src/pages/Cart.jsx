import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlowerInCart from "../components/FlowerInCart";
import { Link } from "react-router-dom";
import { Box, Button, Container, Paper, Typography } from "@mui/material";

const Cart = () => {
    let navigate = useNavigate();
    let { arr, totalPrice, sumProducts } = useSelector((state) => state.cart);
    let user = useSelector(state => state.user.currentUser);

    const finish = () => {
        navigate("/CheckOut");
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 5 }}  style={{ marginLeft: 200 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" color="primary" gutterBottom align="center">
                    Cart List
                </Typography>

                {/* הצגת הפרחים */}
                {arr.length > 0 ? (
                    arr.map((flower, index) => (
                        <Box key={index} sx={{ marginBottom: 2 }}>
                            <FlowerInCart flower={flower} />
                        </Box>
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary" align="center">
                        No flowers in the cart
                    </Typography>
                )}

                {/* הוספת כפתור לסיום רכישה */}
                {arr.length > 0 ? (
                    user && user.role !== "Manager" ? (
                        <Box sx={{ textAlign: "center", marginTop: 2 }}>
                            <Button variant="contained" color="primary" onClick={finish} fullWidth>
                                Finish Buying
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: "center", marginTop: 2 }}>
                            <Typography variant="body2" color="textSecondary">
                                For finishing the purchase:
                            </Typography>
                            <Link to="/signUp">
                                <Button variant="text" color="secondary">
                                    Sign Up
                                </Button>
                            </Link>
                            <span> / </span>
                            <Link to="/login">
                                <Button variant="text" color="secondary">
                                    Login
                                </Button>
                            </Link>
                        </Box>
                    )
                ) : (
                    ""
                )}

                {/* הצגת מידע על המחיר והכמות */}
                {arr.length > 0 && (
                    <Box sx={{ marginTop: 3, textAlign: "center" }}>
                        <Typography variant="h6" color="primary">
                            Total Price: ${totalPrice} 
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Sum of Products: {sumProducts}
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default Cart;
