"use client";

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { Comment, Post } from "@/types";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#22d3ee"];

export default function CommentsPieChart({ posts, comments }: { posts: Post[]; comments: Comment[] }) {
  const postCommentCount = posts.map((post) => ({
    name: post.title.slice(0, 20) + "...",
    value: comments.filter((c) => c.postId === post.id).length,
  })).filter((p) => p.value > 0);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={postCommentCount} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}>
          {postCommentCount.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
