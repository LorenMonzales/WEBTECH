"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Post } from "@/types";

// Fake date generation (using post ID as seed)
function generatePostDates(posts: Post[]) {
  return posts.map((post, index) => ({
    date: `2024-05-${(index % 30) + 1}`, // Fake dates for demo
    count: 1,
  }));
}

export default function PostsLineChart({ posts }: { posts: Post[] }) {
  const data = generatePostDates(posts).reduce((acc, post) => {
    const found = acc.find((item) => item.date === post.date);
    if (found) {
      found.count += 1;
    } else {
      acc.push({ date: post.date, count: 1 });
    }
    return acc;
  }, [] as { date: string; count: number }[]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
