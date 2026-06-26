import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/features/auth/AuthSlice';

import uiReducer from '@/features/books/uiSlice';

export const store = configureStore(
    {
        reducer: {
            auth: authReducer,
            ui: uiReducer,
        }
    }
)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch






