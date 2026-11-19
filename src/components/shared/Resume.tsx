// src/components/shared/Resume.tsx
"use client";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Resume = () => {
  return (
    <div>
      <Link
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download="Naimur_Rahman_Resume.pdf"
        className="border inline-flex items-center gap-2 border-transparent bg-linear-to-r from-purple-500 to-indigo-500 text-white transition-all duration-300 px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md cursor-pointer"
      >
        <span>Resume</span>
        <ExternalLink className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default Resume;
