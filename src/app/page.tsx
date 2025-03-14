"use client"; // This is a client component 👈🏽

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const shortenUrl = async () => {
    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    setShortenedUrl(`${window.location.origin}/${data.id}`);
    localStorage.setItem(data.id, url)
  }

  return (
    <div className="grid grid-cols-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold text-center">Next.js URL Shortner</h1>
      <input type="text" value={url} onChange={handleUrlChange} className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your URL" />
      <button onClick={shortenUrl} className="px-8 py-4 text-lg font-semibold text-black bg-blue-50 rounded-lg">Shorten</button>
      {
        shortenedUrl && <div>
        <h2 className="text-2xl font-bold text-center">Shortened URL</h2>
        <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
          <span className="text-lg">{shortenedUrl}</span>
        </div>
      </div>
      }
    </div>
  );
}
