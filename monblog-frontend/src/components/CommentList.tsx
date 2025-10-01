"use client";

import React from "react";

import { Comment } from '@lib/types';

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500">Aucun commentaire pour l’instant.</p>;
  }

  return (
    <section aria-labelledby="comments-title" className="mt-8">
      <h2 id="comments-title" className="text-xl font-semibold mb-4">
        Commentaires
      </h2>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="rounded-lg border p-4 bg-gray-50 shadow-sm"
          >
            <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">{comment.authorName}</span> ·{" "}
            {new Date(comment.createdAt).toLocaleString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })}
            </p>
            <p className="text-gray-800">{comment.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
