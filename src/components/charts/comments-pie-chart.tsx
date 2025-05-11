"use client";

import dynamic from "next/dynamic";
import { Comment, Post } from "@/types";
import { useMemo } from "react";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function CommentsPieChart({
  posts,
  comments,
}: {
  posts: Post[];
  comments: Comment[];
}) {
  const chartData = useMemo(() => {
    const data = posts
      .map((post) => ({
        label: post.title.length > 20 ? post.title.slice(0, 20) + "…" : post.title,
        value: comments.filter((c) => c.postId === post.id).length,
      }))
      .filter((p) => p.value > 0);

    return {
      series: data.map((d) => d.value),
      labels: data.map((d) => d.label),
    };
  }, [posts, comments]);

  const options: ApexOptions = {
    chart: {
      type: "donut",
      background: "transparent",
      toolbar: { show: false },
    },
    labels: chartData.labels,
    legend: {
      position: "bottom",
      fontSize: "13px",
      labels: { colors: "#64748b" }, // slate-500
      itemMargin: {
        horizontal: 10,
        vertical: 4,
      },
    },
    colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#22d3ee"],
    tooltip: {
      theme: "light",
      y: {
        formatter: (val) => `${val} comments`,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "13px",
        colors: ["#fff"],
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        color: "#000",
        opacity: 0.25,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              color: "#64748b",
              offsetY: 10,
            },
            value: {
              show: true,
              fontSize: "18px",
              fontWeight: 600,
              color: "#334155",
              offsetY: -10,
              formatter: (val) => `${val}`,
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total",
              fontSize: "14px",
              fontWeight: 500,
              color: "#94a3b8",
              formatter: () => `${chartData.series.reduce((a, b) => a + b, 0)} comments`,
            },
          },
        },
      },
    },
  };

  return (
    <div className="w-full px-2">
      <ReactApexChart options={options} series={chartData.series} type="donut" height={320} />
    </div>
  );
}
