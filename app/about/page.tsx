"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function About() {
  const [showBlurb, setShowBlurb] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-white dark:bg-slate-900 overflow-hidden">
      {/* Left Side: Photo */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          <Image
            src="/assets/pfp.jpg"
            alt="Anirudh Rao"
            fill
            className="object-cover rounded-full shadow-xl"
            priority
          />
        </div>
      </div>

      {/* Divider (visible on desktop) */}
      <div className="hidden md:block w-px h-full bg-slate-200 dark:bg-slate-700"></div>

      {/* Right Side: Details */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full px-12 py-8 flex flex-col justify-center items-start bg-white dark:bg-slate-900">
        <div className="flex flex-col gap-4 h-64 md:h-96 justify-between w-full">
          <div className="">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">Anirudh Rao</h1>
            <p className="text-slate-500 dark:text-slate-400 text-2xl font-medium mb-4">
              Software Engineer
            </p>

            <button
              onClick={() => setShowBlurb(!showBlurb)}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 font-semibold transition-colors duration-200 underline decoration-2 decoration-transparent hover:decoration-slate-900 dark:hover:decoration-slate-100 underline-offset-4"
            >
              <span className="inline-block animate-buttonSlide" key={showBlurb ? "back" : "about"}>
                {showBlurb ? "← Back" : "About →"}
              </span>
            </button>
          </div>

          <div className="relative min-h-35">
            <div
              className={`absolute inset-0 overflow-y-auto transition-all duration-200 ${
                showBlurb
                  ? 'opacity-100 translate-y-0 delay-150'
                  : 'opacity-0 translate-y-3 pointer-events-none'
              }`}
            >
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed text-justify">
                Hey! I&apos;m Anirudh. I&apos;m a software engineer at {' '}
                <Link
                  href="https://jiffy.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 font-semibold transition-colors duration-200 underline decoration-2 decoration-transparent hover:decoration-slate-900 dark:hover:decoration-slate-100 underline-offset-4"
                >
                  Jiffy.ai
                </Link>.
                I build things mostly for the web. In my free time, I really enjoy contributing to Wikipedia and open source projects. I&apos;m always open to chatting.
              </p>
            </div>

            <div
              className={`absolute inset-0 flex flex-row md:flex-col md:justify-end gap-4 text-lg transition-all duration-200 ${
                !showBlurb
                  ? 'opacity-100 translate-y-0 delay-150'
                  : 'opacity-0 translate-y-3 pointer-events-none'
              }`}
            >
              <Link
                href="https://www.github.com/rao107"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 font-semibold transition-colors duration-200 underline decoration-2 decoration-transparent hover:decoration-slate-900 dark:hover:decoration-slate-100 underline-offset-4"
              >
                GitHub
              </Link>

              <Link
                href="https://www.linkedin.com/in/rao107107"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 font-semibold transition-colors duration-200 underline decoration-2 decoration-transparent hover:decoration-blue-700 dark:hover:decoration-blue-400 underline-offset-4"
              >
                LinkedIn
              </Link>

              <Link
                href="mailto:proanirudhrao@gmail.com"
                className="w-fit text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 font-semibold transition-colors duration-200 underline decoration-2 decoration-transparent hover:decoration-red-600 dark:hover:decoration-red-400 underline-offset-4"
              >
                Email
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
