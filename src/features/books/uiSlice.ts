import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    search: string;
    category: string;
    categoryId: number | null;
}

const initialState: UIState = {
    search: '',
    category: '',
    categoryId: null,
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
        },
        setCategoryId: (state: UIState, action: PayloadAction<number | null>) => {
            state.categoryId = action.payload;
        }
    }
})

export const { setSearch, setCategory, setCategoryId } = uiSlice.actions

export default uiSlice.reducer