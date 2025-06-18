import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useSelector } from "react-redux";
import { httpDeleteFlower,httpGetOneStaticFlower } from "../api/flowerService";
import { useState } from "react";
import MiniCart from "./MiniCart";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Typography, CardMedia, Box } from "@mui/material";
import { Visibility, AddShoppingCart, Delete, Edit } from '@mui/icons-material'; // אייקונים מ-MUI

const Flower = (props) => {
    let navigate = useNavigate();
    let { flower, deleteFlowerFromArr } = props;
    let dispatch = useDispatch();
    let currentUser = useSelector(state => state.user.currentUser);
    const [showMiniCart, setShowMiniCart] = useState(false);  // State to control visibility of MiniCart

    function addFlowerToCart() {
        dispatch(addToCart(flower));
        setShowMiniCart(true);
        setTimeout(() => {
            setShowMiniCart(false);
        }, 5000);
    }

    const flowerName = flower.name;
    const flowerNameArray = flowerName.split(" "); // מפריד את השם לפי רווחים

    // אם יש יותר ממילה אחת
    const firstLine = flowerNameArray.slice(0, flowerNameArray.length - 1).join(" "); // כל המילים מלבד האחרונה
    const lastWord = flowerNameArray[flowerNameArray.length - 1]; // המילה האחרונה
    const vv=httpGetOneStaticFlower('20.jpg')
    console.log(vv);
    return (
        <Card sx={{
            maxWidth: 345,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: "#fff",
            marginBottom: 2,
            '&:hover': {
                boxShadow: 10,
            }
        }} style={{
            minWidth: 345,
            minHeight: 384
        }}>
            <CardMedia
                component="img"
                height="200"
                image={httpGetOneStaticFlower(flower.img)}
                alt={flower.name}
            />
            <CardContent>
                <Typography
                    variant="h6"
                    color="textPrimary"
                    sx={{
                        fontWeight: "bold",
                        color: "#880e4f",
                        textAlign: "center",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        lineHeight: "28px",
                        height: "56px", // שומר תמיד מקום לשתי שורות בגובה 28px כל אחת
                        whiteSpace: "normal"
                    }}
                    title={flower.name}
                >
                    {flower.name}
                </Typography>
                
                <Typography variant="body2" color="textSecondary" sx={{ color: "#880e4f" }}>
                    Price: ${flower.price}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                    <Link to={`flowerBig/${flower._id}`}>
                        <Button
                            variant="outlined"
                            sx={{
                                color: "#880e4f",
                                borderColor: "#880e4f",
                                '&:hover': {
                                    borderColor: "#f06292", // צבע מסגרת ורוד בהובר
                                    backgroundColor: "rgba(240, 98, 146, 0.1)", // רקע ורוד בהובר
                                },
                                '&:focus': {
                                    outline: "2px solid #f06292", // מסגרת ורודה כאשר יש פוקוס
                                    backgroundColor: "rgba(240, 98, 146, 0.1)", // רקע ורוד בהובר
                                }
                            }}
                        >
                            <Visibility sx={{ marginRight: 1 }} /> View
                        </Button>
                    </Link>

                    {currentUser?.role !== "Manager" && (
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#f06292", color: "#fff",  '&:hover': {
                                borderColor: "#f06292", // צבע מסגרת ורוד בהובר
                                backgroundColor: "rgba(240, 98, 146, 0.1)", // רקע ורוד בהובר
                            }, }}
                            onClick={addFlowerToCart}>
                            <AddShoppingCart sx={{ marginRight: 1 }} /> Buy
                        </Button>
                    )}
                    {currentUser?.role === "Manager" && (
                        <>
                            <Button
                                variant="outlined"
                                color="error"
                                sx={{'&:hover': {
                                    borderColor: "#f06292", // צבע מסגרת ורוד בהובר
                                    backgroundColor: "rgba(240, 98, 146, 0.1)", // רקע ורוד בהובר
                                }, }}
                                onClick={() => {
                                    try {
                                        let id = flower._id;
                                        httpDeleteFlower(id).then(res => {
                                            deleteFlowerFromArr(id);
                                        });
                                    } catch (er) {
                                        console.log("error:" + er);
                                    }
                                }}>
                                <Delete sx={{ marginRight: 1 }} /> Delete
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ borderColor: "#880e4f", color: "#880e4f", '&:hover': {
                                    borderColor: "#f06292", // צבע מסגרת ורוד בהובר
                                    backgroundColor: "rgba(240, 98, 146, 0.1)", // רקע ורוד בהובר
                                }, }}
                                onClick={() => navigate(`/addNewItem/${flower._id}`)}>
                                <Edit sx={{ marginRight: 1 }} /> Edit
                            </Button>
                        </>
                    )}
                </Box>
            </CardContent>
            {showMiniCart && <MiniCart />}
        </Card>
    );
}

export default Flower;

