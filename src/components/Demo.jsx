import React, { useEffect, useState } from 'react'
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

    const [copied, setCopied] = useState('')

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))
        if(articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage)
        }
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        const {data} = await getSummary({ articleUrl: article.url })
        console.log(data)
        if(data?.summary) {
            const newArticle = { ...article, summary: data.summary}
            setArticle(newArticle)

            const updatedAllArticles = [newArticle, ...allArticles]
            setAllArticles(updatedAllArticles)

            localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
        }
    }

    function handleCopy(copyUrl) {
        setCopied(copyUrl)
        navigator.clipboard.writeText(copyUrl)
        // setTimeout(() => setCopied(false, 5000))
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
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                    {
                        allArticles.map((item, index) => {
                            return (
                                <div 
                                    key={`link-${index}`} 
                                    onClick={() => setArticle(item)}
                                    className='link_card'
                                >
                                    <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                                        <img 
                                            src={copied === item.url ? tick : copy} 
                                            alt="copy_icon" 
                                            className='w-[40%] h-[40%]' 
                                        />
                                    </div>
                                    <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'> {item.url} </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* display results */}
            <div className="my-10 max-w-full flex justify-center items-center">
                {
                    isFetching ? (
                        <img src={loader} alt='loader' className="w-20 h-20 object-contain" />
                    ) : error ? (
                        <p className='font-inter font-bold text-black text-center'> 
                            there is an error  
                            <br />
                            <span>
                                {error?.data?.error}
                            </span>
                        </p>
                        
                    ) : (
                        article.summary && (
                            <div className='flex flex-col gap-3'>
                                <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                                    Article 
                                    <span className='blue_gradient'>
                                        Summary 
                                    </span>
                                </h2>
                                <div className="summary_box">
                                    <p className='font-inter font-medium text-sm text-gray-700'> {article.summary} </p>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </section> 
    )
}