import React from "react";
import { useDispatch } from "react-redux";
import { removeOneFromCart, addToCart, removeFromCart } from "../features/cartSlice";
import { httpGetOneStaticFlower } from '../api/flowerService'
import { IconButton, Typography } from "@mui/material";
import { Remove, Add, Delete } from "@mui/icons-material"; // אייקונים של MUI

const FlowerInCart = (props) => {
    const { flower } = props;
    const dispatch = useDispatch();

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #ccc', paddingBottom: '16px' }}>
            {/* תמונה */}
            <img
                src={httpGetOneStaticFlower(flower.img)}
                alt={flower.name}
                width={100}
                height={100}
                style={{ objectFit: "cover", marginRight: '16px' }}
            />
            
            {/* פרטי הפרח */}
            <div style={{ flexGrow: 1 }}>
                <Typography variant="body1" color="primary" style={{ fontWeight: 'bold' }}>
                    {flower.name}
                </Typography>
                <Typography variant="body2">{flower.description}</Typography>
                <Typography variant="body2">Price For One Detail: {flower.price}</Typography>
                <Typography variant="body2">Total Price: {flower.price * flower.qty}</Typography>
                <Typography variant="body2">Flower contains: {flower.flowerContain?.join(", ")}.</Typography>
            </div>

            {/* כפתורים */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => dispatch(removeOneFromCart(flower))}>
                    <Remove />
                </IconButton>
                <Typography variant="body2" style={{ margin: "0 10px" }}>
                    {flower.qty}
                </Typography>
                <IconButton onClick={() => dispatch(addToCart(flower))}>
                    <Add />
                </IconButton>
                <IconButton onClick={() => dispatch(removeFromCart(flower))} color="error">
                    <Delete />
                </IconButton>
            </div>
        </div>
    );
};

export default FlowerInCart;
