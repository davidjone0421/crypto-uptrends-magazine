import { useState, useEffect, useCallback } from "react";
import type { NewsArticle } from "@/types/crypto";

const STORAGE_KEY = "cryptouptrends_local_articles";

export function useLocalArticles() {
  const [localArticles, setLocalArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setLocalArticles(JSON.parse(stored));
    } catch {}
  }, []);

  const addArticle = useCallback((article: Omit<NewsArticle, "id" | "published_at" | "url">) => {
    const newArticle: NewsArticle = {
      ...article,
      id: `local-${Date.now()}`,
      published_at: new Date().toISOString(),
      url: "#",
    };
    setLocalArticles((prev) => {
      const updated = [newArticle, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    return newArticle;
  }, []);

  return { localArticles, addArticle };
}
