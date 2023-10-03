import React, { useState } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { BiSubdirectoryRight } from "react-icons/bi"
import { useLazyGetSummaryQuery } from '../services/article'

export default function Demo() {
    const [article, setArticle] = useState({
        url: '',
        summary: ''
    })
    console.log(article)
    const [allArticles, setAllArticles] = useState([])
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

    async function handleSubmit(e) {
        e.preventDefault()
        const {data} = await getSummary({ articleUrl: article.url })
        console.log(data)
        if(data?.summary) {
            const newArticle = { ...article, summary: data.summary}
            setArticle(newArticle)
            const updatedAllArticles = [newArticle, ...allArticles]
            setAllArticles(updatedAllArticles)
        }
    }
    return (
        <section className='mt-16 w-full max-w-xl'>
            <div className="flex flex-col w-full gap-2">
                <form
                    className="relative flex justify-center items-center border"
                    onSubmit={handleSubmit}
                >
                    <img src={linkIcon} alt="link_icon" className="absolute left-0 ml-3 w-5" />
                    <input 
                        type="url"
                        required 
                        value={article.url}
                        onChange={(e) => setArticle({...article, url: e.target.value})}
                        placeholder='Enter a url'
                        className="url_input peer"
                    />
                    <button 
                        type='submit' 
                        className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
                    >
                        <BiSubdirectoryRight />
                    </button>
                </form>
                {/* browser url history */}
            </div>
            {/* display results */}
        </section> 
    )
}