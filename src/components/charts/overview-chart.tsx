"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Post } from "@/types";

export default function OverviewChart({ posts }: { posts: Post[] }) {
  const postCounts = posts.reduce<Record<number, number>>((acc, post) => {
    acc[post.userId] = (acc[post.userId] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(postCounts).map(([userId, count]) => ({
    userId,
    count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="userId" label={{ value: "User ID", position: "insideBottom", offset: -5 }} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}
