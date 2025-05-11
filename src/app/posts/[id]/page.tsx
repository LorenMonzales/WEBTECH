"use client";

import { useQuery } from "@tanstack/react-query";
import { getPost, getComments } from "@/lib/api";
import Navbar from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Post, Comment } from "@/types";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const {
    data: post,
    isLoading: loadingPost,
  } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => getPost(id!),
    enabled: !!id,
  });

  const {
    data: comments = [],
    isLoading: loadingComments,
  } = useQuery<Comment[]>({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  const postComments = comments.filter((comment) => comment.postId === postId);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {loadingPost ? (
            <p>Loading post...</p>
          ) : !post ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-md">
              <p>
                Post not found.{" "}
                <Link href="/" className="underline">
                  Return to homepage
                </Link>
              </p>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>{post.body}</p>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Comments</h2>
                  {loadingComments ? (
                    <p>Loading comments...</p>
                  ) : postComments.length === 0 ? (
                    <p className="text-gray-600">No comments found for this post.</p>
                  ) : (
                    <ul className="space-y-4">
                      {postComments.map((comment) => (
                        <li key={comment.id} className="border p-4 rounded shadow-sm">
                          <p className="font-semibold">{comment.name}</p>
                          <p className="text-sm text-gray-500">{comment.email}</p>
                          <p className="mt-2">{comment.body}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
