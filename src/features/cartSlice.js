import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    arr: [],
    totalPrice: 0,
    sumProducts:0
};
const cartSlice = createSlice({
    name: "cart",
    initialState: initalState,
    reducers: {
        addToCart: (state, action) => {
            let index = state.arr.findIndex(item => item._id == action.payload._id);
            if (index > -1)
                state.arr[index].qty++;
            else
                state.arr.push({ ...action.payload, qty: 1 });
            state.totalPrice += action.payload.price;
            state.sumProducts += 1;

        },
        removeOneFromCart: (state, action) => {
            let index = state.arr.findIndex(item => item._id == action.payload._id);
            if (index > -1)
                if (state.arr[index].qty > 1)
                    state.arr[index].qty--;
                else
                    state.arr.splice(index, 1);
            state.totalPrice -= action.payload.price;
            state.sumProducts -= 1;

        },
        removeFromCart: (state, action) => {
            let index = state.arr.findIndex(item => item._id == action.payload._id);
            if (index > -1)
                state.arr.splice(index, 1);
            state.totalPrice -= action.payload.price*action.payload.qty;
            state.sumProducts -= action.payload.qty;

        },
        removeAllCart:(state)=>{
            state.arr=[];
            state.totalPrice=0;
            state.sumProducts=0;
        }

    }
})
export const { addToCart, removeFromCart, removeOneFromCart,removeAllCart } = cartSlice.actions;
export default cartSlice.reducer;