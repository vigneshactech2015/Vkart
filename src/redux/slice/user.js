import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: 'user',
    initialState: {
        id: 0,
        Product_Id: '',
        ProductName: '',
        ProductType: '',
        Price:'',
        Is_Featured:'',
        Stock:'',
        Description:'',
        Image:'',
        User:''
    },
    reducers: {
        setUserSlice: (state, action) => {
            state = action.payload
            return state
        }
    }
})
export const { setUserSlice } = user.actions
export default user.reducer