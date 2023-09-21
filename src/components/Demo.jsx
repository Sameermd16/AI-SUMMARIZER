import React, { useState } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { BiSubdirectoryRight } from "react-icons/bi"

export default function Demo() {
    const [article, setArticle] = useState(
        {
            url: "",
            summary: ""
        }
    )
    console.log(article.url)
    function handleSubmit() {
        console.log('submitted')
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
            </div>
        </section>
    )
}