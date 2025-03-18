import React from "react";
import { Post } from "../../common/api";
import Link from "next/link";
import Button from "./Button";
 
interface PostItemProps {
  post: Post;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onEdit, onRemove }) => {
  return (
    <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" key={post.id}>
      <div className="border border-gray-300 p-2 rounded-lg shadow-md min-h-48">
        <Link href={`posts/${post.id}`}>
          <h3 className="text-lg font-semibold truncate whitespace-nowrap overflow-hidden">{post.title}</h3>
          <p className="text-gray-600 line-clamp-3">{post.body}</p>
        </Link>
        <div className="actions flex items-center justify-between gap-3 mt-2"> 
          <Button className="w-full bg-[#27ae60] hover:bg-[#27ae60]/80" onClick={() => onEdit(post.id)} label="Edit" />  
          <Button className="w-full bg-[#c0392b] hover:bg-[#c0392b]/80" onClick={() => onRemove(post.id)} label="Remove" />  
        </div>
      </div> 
    </div>
  );
};

export default PostItem;
