"use client"; // This is a client component 👈🏽

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ShortId() {
  const router = useRouter();
  const { shortId } = router.query;
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (shortId) {
      setUrl(localStorage.getItem(shortId));
    }
  }, [shortId]);

  useEffect(() => {
    if (url) {
      window.location.href = url;
    } else {
      router.push("/");
    }
  }, [url]);

  return null;
}
