import betsReducer from '@/redux/slices/betsSlice'
import {configureStore} from "@reduxjs/toolkit";


export const store = configureStore({
        reducer: {
            betsSlice: betsReducer
        }
    }
)

export type RootState = ReturnType<typeof store.dispatch>
export type AppDispatch = typeof store.dispatch