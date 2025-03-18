'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { fetchData, Post } from '../../../../common/api';
import dynamic from 'next/dynamic';
import loadingAnimation from '../../../../public/animations/loading.json'; // Rename loading to loadingAnimation
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });


const Page = () => {
  const [post, setPost] = useState<Post | null>(null);  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();  

  useEffect(() => {
    if (!id) return;  

    const getPost = async () => {
      try {
        const data = await fetchData<Post>(`posts/${id}`);
        setPost(data); 
      } catch (error) {
        setError("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [id]);  

  if (loading) return (
    <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-white/20">  
      <Lottie animationData={loadingAnimation} className='h-24 w-16 md:h-24 md:w-24' />
      <span className="sr-only">Send a WhatsApp message to VQS</span>
    </div>
  )
  if (error) return <div>{error}</div>;

  return (
    <div className='container mx-auto p-5'>
      <h1 className='text-2xl font-bold text-center mb-8'>Post Details</h1>
      {post ? (
        <div>
          <h2 className='text-center text-cyan-800 font-bold capitalize text-xl mb-8'>{post.title}</h2>
          <p className='text-center text-gray-800 leading-[2] capitalize text-xl'>{post.body}</p>
        </div>
      ) : (
        <p>No post found</p>
      )}
    </div>
  );
};

export default Page;
