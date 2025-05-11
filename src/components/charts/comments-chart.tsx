"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Post, Comment } from "@/types";

export default function CommentsChart({ posts, comments }: { posts: Post[]; comments: Comment[] }) {
  const commentCounts = comments.reduce<Record<number, number>>((acc, comment) => {
    acc[comment.postId] = (acc[comment.postId] || 0) + 1;
    return acc;
  }, {});

  const data = posts.map((post) => ({
    title: post.title.substring(0, 20) + (post.title.length > 20 ? "…" : ""),
    count: commentCounts[post.id] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="title" interval={0} angle={-45} textAnchor="end" height={80} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
}
