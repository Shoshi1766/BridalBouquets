import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userOut } from "../features/userSlice";
import { removeAllCart } from "../features/cartSlice";
import { useEffect } from "react";

const LogOutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => { dispatch(userOut());
    dispatch(removeAllCart());
    navigate("/home");
}, [])

};

export default LogOutButton;
