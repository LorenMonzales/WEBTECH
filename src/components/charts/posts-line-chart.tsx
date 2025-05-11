"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Post } from "@/types";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Fake date generation (using post ID as seed)
function generatePostDates(posts: Post[]) {
  return posts.map((post, index) => ({
    date: `2024-05-${(index % 30) + 1}`, // Fake dates for demo
    count: 1,
  }));
}

export default function PostsLineChart({ posts }: { posts: Post[] }) {
  const [chartData, setChartData] = useState<{
    options: ApexOptions;
    series: { name: string; data: { x: string; y: number }[] }[];
  }>({
    options: {
      chart: {
        id: "posts-line",
        type: "line",
        zoom: { enabled: false },
        toolbar: { show: false },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "category",
        title: { text: "Date" },
        labels: { rotate: -45 },
      },
      yaxis: {
        title: { text: "Post Count" },
        min: 0,
        forceNiceScale: true,
      },
      colors: ["#3b82f6"],
      dataLabels: { enabled: false },
      tooltip: {
        x: { format: "yyyy-MM-dd" },
      },
    },
    series: [],
  });

  useEffect(() => {
    const rawData = generatePostDates(posts);
    const grouped = rawData.reduce((acc, post) => {
      const existing = acc.find((item) => item.x === post.date);
      if (existing) existing.y += 1;
      else acc.push({ x: post.date, y: 1 });
      return acc;
    }, [] as { x: string; y: number }[]);

    setChartData((prev) => ({
      ...prev,
      series: [{ name: "Posts", data: grouped }],
    }));
  }, [posts]);

  return (
    <div className="w-full h-80">
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height="100%" />
    </div>
  );
}
