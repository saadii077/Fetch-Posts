"use client";
import { useEffect, useState } from "react";

export default function FetchPostsPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/external")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setPosts(data.data);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        setError("An unexpected error occurred");
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center">
      <div className="bg-emerald-500 p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-4xl font-bold  text-center mb-6">Posts</h1>

        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center text-gray-500">
            <p>No posts available.</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <ul className="space-y-4">
            {posts.map((post: { id: number; title: string; body: string }) => (
              <li
                key={post.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-bold text-xl text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-600 font-semibold mt-2">{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
