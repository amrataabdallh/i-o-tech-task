"use client";

import React, { useEffect, useState } from "react";
import { fetchData, Post } from "../../../common/api";
import PostItem from "@/Components/PostItem";
import Button from "@/Components/Button";
import Swal from 'sweetalert2';
import Image from "next/image";
import dynamic from 'next/dynamic';
import loadingAnimation from '../../../public/animations/loading.json'; // Rename loading to loadingAnimation
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });


const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchData<Post[]>("posts/?_limit=12");
        setPosts(data);
      } catch (error) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  // Create Post
  const handleCreatePost = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Create Post",
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Title">
        <textarea id="swal-body" class="swal2-textarea" placeholder="Body"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Create",
      preConfirm: () => {
        return {
          title: (document.getElementById("swal-title") as HTMLInputElement).value,
          body: (document.getElementById("swal-body") as HTMLTextAreaElement).value,
        };
      },
    });
  
    if (formValues) {
      const newPost: Post = {
        id: Date.now(), // Temporary ID
        userId: 1, // Default user ID
        title: formValues.title,
        body: formValues.body,
      };
  
      setPosts((prevPosts) => [...prevPosts, newPost]);
  
      Swal.fire({
        icon: "success",
        title: "Post Created",
        text: "The post has been successfully created.",
      });
    }
  };
  
  //  Edit Post
  const handleEditPost = async (post: Post) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Post",
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Title" value="${post.title}">
        <textarea id="swal-body" class="swal2-textarea" placeholder="Body">${post.body}</textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        return {
          title: (document.getElementById("swal-title") as HTMLInputElement).value,
          body: (document.getElementById("swal-body") as HTMLTextAreaElement).value,
        };
      },
    });
  
    if (!formValues) return;
  
    const updatedPost: Post = {
      ...post,
      title: formValues.title,
      body: formValues.body,
    };
  
    // Check if post exists in the API (JSONPlaceholder has only IDs ≤ 100)
    if (post.id <= 100) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
          method: "PUT",
          body: JSON.stringify(updatedPost),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
  
        if (!response.ok) {
          throw new Error("Failed to update post");
        }
  
        const apiUpdatedPost = await response.json();
  
        setPosts((prevPosts) =>
          prevPosts.map((p) => (p.id === post.id ? apiUpdatedPost : p))
        );
  
        Swal.fire({
          icon: "success",
          title: "Post Updated",
          text: "The post has been successfully updated.",
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "There was an error updating the post.",
        });
      } 
    } else {
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === post.id ? updatedPost : p))
      );
  
      Swal.fire({
        icon: "success",
        title: "Post Updated Locally",
        text: "Since this post was newly created, it was updated only in the UI.",
      });
    }
  };
 
  //  Remmove Post
  const handleRemove = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setPosts(posts.filter((post) => post.id !== id));
          Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
        } else {
          console.error('Failed to delete post');
          Swal.fire('Error!', 'There was an error deleting the post.', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error!', 'There was an error with the request.', 'error');
      }
    }
  };

  if (loading) return (
    <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-white/20">  
      <Lottie animationData={loadingAnimation} className='h-24 w-16 md:h-24 md:w-24' />
      <span className="sr-only">Send a WhatsApp message to VQS</span>
    </div>
  )

  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-5">
      
      <div className="title flex items-center justify-between p-2">
        <h2 className="font-bold text-3xl mb-8">Posts</h2>
        <Button onClick={handleCreatePost} className="w-auto text-white bg-[#2c3e50] hover:bg-[#2c3e50]/80" label="Add post" />
      </div>

      {posts.length > 0 ? (
        <div className="flex items-center justify-start flex-wrap">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} onEdit={() => handleEditPost(post)}  onRemove={handleRemove} />
          ))}
        </div>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Posts;
