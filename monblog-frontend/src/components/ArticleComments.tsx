"use client";

import { useState, useEffect } from "react";
import { fetchComments } from "@lib/api";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { Comment } from "@lib/types";


interface Props {
  articleSlug: string;
  articleId: string;
}

export default function ArticleComments({ articleSlug, articleId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);

  const loadComments = async () => {
    const data = await fetchComments(articleSlug);
    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, [articleSlug]);

  return (
    <div>
      <CommentList comments={comments} />
      <CommentForm articleId={articleId} onCommentAdded={loadComments} />
    </div>
  );
}
