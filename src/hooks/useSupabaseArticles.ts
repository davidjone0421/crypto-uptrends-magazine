import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { NewsArticle } from "@/types/crypto";

interface SupabaseArticle {
  id: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  category: string;
  feature_image: string | null;
  author_id: string | null;
  created_at: string;
}

function mapToNewsArticle(row: SupabaseArticle): NewsArticle {
  return {
    id: row.id,
    title: row.title,
    description: row.excerpt || row.title,
    url: `/article/${row.id}`,
    image_url: row.feature_image,
    published_at: row.created_at,
    source: "Crypto UpTrends",
    category: row.category || "General",
    author: "Admin",
    body: row.content || undefined,
  };
}

export function useSupabaseArticles() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      setError("Supabase env vars missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env, then restart.");
      return;
    }
    try {
      setLoading(true);
      const { data, error: dbError } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (dbError) throw dbError;
      setArticles((data || []).map(mapToNewsArticle));
      setError(null);
    } catch (err: any) {
      console.error("Supabase fetch error:", err);
      setError(err.message);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const insertArticle = useCallback(
    async (article: {
      title: string;
      content: string;
      excerpt: string;
      category: string;
      feature_image: string;
    }) => {
      const { data, error } = await supabase
        .from("articles")
        .insert([article])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setArticles((prev) => [mapToNewsArticle(data), ...prev]);
      }
      return data;
    },
    []
  );

  return { articles, loading, error, refetch: fetchArticles, insertArticle };
}
