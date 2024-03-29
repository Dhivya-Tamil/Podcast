import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    podcasts: [],
};

const podcastsSlice = createSlice({
    name: "podcasts",
    initialState,
    reducers: {
        setPodcasts: (state, action) =>{
            state.podcasts = action.payload;
        },
    
    },
});

export const { setPodcasts } = podcastsSlice.actions;
export default podcastsSlice.reducer;