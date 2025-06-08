import { createSlice } from "@reduxjs/toolkit";



const initialState={
    status: false,
    Featuredimage:null,
    title:null,
    slug:null,
    content:null,
    
}
const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        editPost: (state, action) => {
            state.status = true;
            state.Featuredimage = action.payload.Featuredimage;
            state.title=action.payload.title;
            state.slug=action.payload.slug;
            state.content=action.payload.content;
           
        }
    }
})
export const { editPost } = postSlice.actions
export default postSlice.reducer
