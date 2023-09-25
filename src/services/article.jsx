import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// const options = {
//     method: 'GET',
//     url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
//     params: {
//       url: 'https://time.com/6266679/musk-ai-open-letter/',
//       length: '3'
//     },
//     headers: {
//       'X-RapidAPI-Key': 'a9db509421mshac665244cdf8328p1180c8jsnfdac9c994057',
//       'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
//     }
//   };

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY

export const articleApi = createApi({
    reducerPath: 'articleApi', 
    baseQuery: fetchBaseQuery({
        baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey)
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com')
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
}) 

console.log(articleApi)

export const { useLazyGetSummaryQuery } = articleApi