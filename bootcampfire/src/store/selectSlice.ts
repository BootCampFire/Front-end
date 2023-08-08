import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface SBoxState {
    trackList : { name: string; isOn: boolean; }[];
    regionList : { name: string; isOn: boolean; }[];
    etcList : { name: string; isOn: boolean; }[];

    tmp_lst : string[];
    item_lst : string[];
    
    category : boolean[];
}

const initialState: SBoxState = {

    trackList : [],
    regionList : [],

    etcList : [{name : '온라인', isOn : false }, 
                {name : '온오프라인', isOn : false }, 
                {name : '오프라인', isOn : false }, 
                {name : '비용', isOn : false }, 
                {name : '지원금', isOn : false }, 
                {name : '코딩 테스트', isOn : false },],


    tmp_lst: [],
    item_lst: [],

    category : Array(4).fill(false),
};


const selectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {

    initTrack: (state, action: PayloadAction<{ id: number; name: string }[]>) => {
        state.trackList = action.payload.map((item) => ({
            name: item.name,
            isOn: false, 
          }));

    },
    initRegion: (state, action: PayloadAction<{ id: number; name: string }[]>) => {
        state.regionList = action.payload.map((item) => ({
            name: item.name,
            isOn: false, 
          }));    },
    
    onoff_track: (state, action) => {
        state.trackList[action.payload].isOn = !state.trackList[action.payload].isOn;
    },

    onoff_region: (state, action) => {
        state.regionList[action.payload].isOn = !state.regionList[action.payload].isOn;
    },    
    onoff_etc: (state, action) => {
        state.etcList[action.payload].isOn = !state.etcList[action.payload].isOn;
    },
        category_onoff:(state, action) => {
        state.category[action.payload] = !state.category[action.payload]; 
    },

    // onoff_text: (state, action) => {
    //     const index = state.item_lst.indexOf(action.payload)
    //     state.sel_lst[index] = !state.sel_lst[index];
    // },
  },
});
// state.tmp_lst = state.item_lst.filter((item, index) => state.sel_lst[index]);


export const { initTrack, initRegion, 
    onoff_track, onoff_region, onoff_etc,
    category_onoff } = selectSlice.actions;

// export const { onoff_text, onoff_num, category_onoff } = selectSlice.actions;
export default selectSlice.reducer;
