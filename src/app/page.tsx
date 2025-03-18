import Button from "@/Components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold text-gray-800">Thank You for This Assessment</h1>
        <p className="mt-6 text-gray-600 text-md"> It was an honor to showcase some of my skills through this assessment.</p>
        <p className="my-6 text-gray-500 text-md">I completed this assessment using <span className="font-semibold">HTML, CSS, Javascript, React, Next.js, Tailwind CSS</span>, and <span className="font-semibold">VS Code</span>.</p>
        <div className="flex flex-wrap gap-4 justify-center">
        <Link className="text-white rounded px-3 py-2 my-2 bg-[#2c3e50]"  href="/posts" > Go to result </Link>
        <p className="text-gray-600 text-md"> <span className="text-red-500">*</span> I used AI to get help with some details.</p>
      </div>
      </div>
    </div>
  );
}
