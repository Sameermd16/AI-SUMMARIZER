import React from "react";
import { logo } from "../assets";

export default function Hero() {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className='w-full flex justify-between pt-3 mb-10'>
        <img src={logo} alt="sumz_logo" className='w-28 object-contain' />
        <button
          className="black_btn"
          onClick={() => window.open("https://github.com/Sameermd16")}
        >
          Github
        </button>
      </nav>

      <h1 className='head_text'>
        Summarize articles with <br />
        <span>OpenAi GPT-4</span>
      </h1>
    </header>
  );
}
