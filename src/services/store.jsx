import { configureStore } from '@reduxjs/toolkit'
import { articleApi } from './article'

//configureStore(reducer, initialState, middleware)

const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
    
})


export default store 