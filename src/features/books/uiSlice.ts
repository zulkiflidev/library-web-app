import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    search: string;
    category: string;
}

const initialState: UIState = {
    search: '',
    category: '',
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setSearch: (state: UIState, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setCategory: (state: UIState, action: PayloadAction<string>) => {
            state.category = action.payload;
        }
    }
})

export const { setSearch, setCategory } = uiSlice.actions
export default uiSlice.reducer