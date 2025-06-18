import { useSelector } from "react-redux";
import { httpAddOrder } from "../api/orderService";
import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAllCart } from "../features/cartSlice";

const CheckOut = () => {
    let { arr } = useSelector(state => state.cart);
    let { currentUser } = useSelector(state => state.user);
    let dispatch = useDispatch();
let navigate= useNavigate();
    function send(e) {
        e.preventDefault(); // מונע את שליחת הטופס הדיפולטיבית

        const address = e.target[0].value; // מקבל את הכתובת שהוזנה בטופס
        const currentDate = new Date().toISOString(); // תאריך נוכחי בפורמט ISO
        const nextWeekDate = new Date();
        nextWeekDate.setDate(nextWeekDate.getDate() + 7);
        const nextWeekDateString = nextWeekDate.toISOString();

        // מיפוי הנתונים כך שנשלח רק את השדות הנדרשים
        const filteredProducts = arr.map(({ _id, name, price, qty }) => ({
            _id,
            name,
            price,
            qty
        }));

        const order = {
            userId: currentUser.tz,
            orderDate: currentDate,
            targetDate: nextWeekDateString,
            address: address,
            products: filteredProducts
        };

        console.log(order);

        httpAddOrder(order)
            .then(res => {
                alert("Your order is successfully completed!");
                dispatch(removeAllCart());
                navigate("/home");
                

            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }

    return (
        <Container maxWidth="xs" style={{ marginLeft: 200 }}>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
                <Typography variant="h5" color="primary" align="center">
                    Checkout
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={send}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    {/* Address Field */}
                    <TextField
                        label="Address to send"
                        variant="outlined"
                        fullWidth
                        required
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Submit Order
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CheckOut;

