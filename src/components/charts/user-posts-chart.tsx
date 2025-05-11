"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Post } from "@/types";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface UserPostsChartProps {
  posts: Post[];
  userId: number;
}

export default function UserPostsChart({ posts, userId }: UserPostsChartProps) {
  const [chartData, setChartData] = useState<{
    options: ApexOptions;
    series: { name: string; data: number[] }[];
  }>({
    options: {
      chart: {
        id: "user-posts",
        type: "bar",
        toolbar: { show: false },
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        title: {
          text: "Post Count",
        },
      },
      colors: ["#3b82f6"],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: "40%",
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        name: "Posts",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const userPosts = posts.filter((post) => post.userId === userId);
    const categories = userPosts.map((post) => `Post ${post.id}`);
    const data = userPosts.map(() => 1); // each post is 1

    setChartData((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        xaxis: { ...prev.options.xaxis, categories },
      },
      series: [{ name: "Posts", data }],
    }));
  }, [posts, userId]);

  return (
    <div className="w-full h-80">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height="100%" />
    </div>
  );
}
