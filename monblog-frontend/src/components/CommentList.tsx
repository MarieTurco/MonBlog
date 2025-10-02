"use client";

import React from "react";

import { Comment } from '@lib/types';

export default function CommentList({ comments }: { comments: Comment[] }) {

  if (!comments || comments.length === 0) {
    return <p className="text-gray-500">Aucun commentaire pour l’instant.</p>;
  }

  return (
    <ul className="space-y-4 mb-8">
      {comments.map((comment) => (
        <li key={comment.id} className="rounded-lg border border-neutral-200 p-4 bg-white shadow-sm">
          <p className="text-sm text-neutral-600 mb-1">
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
          <p className="text-neutral-800">{comment.content}</p>
        </li>
      ))}
    </ul>
  );
}
