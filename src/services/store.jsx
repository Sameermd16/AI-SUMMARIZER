import { configureStore } from '@reduxjs/toolkit'
import { articleApi } from './article'

const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(articleApi.middleware)
    }
})


export default store 