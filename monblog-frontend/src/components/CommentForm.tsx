'use client';

import React, { useState } from "react";
import { postComment } from "@lib/api";

interface Props {
  articleId: string; 
  onCommentAdded: () => void; // callback pour rafraîchir la liste
}

export default function CommentForm({ articleId, onCommentAdded }: Props) {
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postComment(articleId, authorName, content);
      setAuthorName("");
      setContent("");
      onCommentAdded();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi du commentaire");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 border-t pt-6" aria-labelledby="add-comment-title">
      <h2 id="add-comment-title" className="text-xl font-semibold">Laisser un commentaire</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Votre nom</label>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:ring focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Commentaire</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:ring focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Envoi..." : "Publier"}
      </button>
    </form>
  );
}
