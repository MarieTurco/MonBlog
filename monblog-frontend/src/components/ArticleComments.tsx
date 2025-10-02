"use client";

import { useState, useEffect } from "react";
import { fetchComments } from "@lib/api";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { Comment } from "@lib/types";

export default function ArticleComments({ articleSlug, articleId }: { articleSlug: string; articleId: string;}) {
  const [comments, setComments] = useState<Comment[]>([]);

  const loadComments = async () => {
    const data = await fetchComments(articleSlug);
    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, [articleSlug]);

   return (
    <section aria-labelledby="comments-section" className="mt-12">
      <h2 id="comments-section" className="text-2xl font-semibold mb-6 text-brand-dark">Commentaires</h2>
      <CommentList comments={comments} />
      <CommentForm articleId={articleId} onCommentAdded={loadComments} />
    </section>
  );
}
