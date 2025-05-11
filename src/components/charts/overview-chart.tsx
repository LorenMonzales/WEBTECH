"use client";

import dynamic from "next/dynamic";
import { Post } from "@/types";
import { ApexOptions } from "apexcharts";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function OverviewChart({ posts }: { posts: Post[] }) {
  const postCounts = posts.reduce<Record<number, number>>((acc, post) => {
    acc[post.userId] = (acc[post.userId] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(postCounts).map((id) => `User ${id}`);
  const values = Object.values(postCounts);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
        distributed: true,
      },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: "#64748b", // slate-500
          fontSize: "13px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#94a3b8", // slate-400
          fontSize: "12px",
        },
      },
    },
    grid: {
      borderColor: "#e2e8f0", // slate-200
      strokeDashArray: 4,
    },
    colors: ["#3b82f6", "#60a5fa", "#93c5fd", "#2563eb"], // gradient blues
    tooltip: {
      theme: "light",
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [{ name: "Posts", data: values }];

  return (
    <div className="w-full px-2">
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
}
