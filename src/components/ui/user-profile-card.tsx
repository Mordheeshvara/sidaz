"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Linkedin, Instagram } from 'lucide-react';

interface UserProfileCardProps {
  name: string;
  role: string;
  imageUrl: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  className?: string;
}

export function UserProfileCard({
  name,
  role,
  imageUrl,
  linkedinUrl = '#',
  instagramUrl = '#',
  className
}: UserProfileCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 p-6 transition-all duration-300 hover:bg-black/60 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10",
      className
    )}>
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Profile Image */}
      <div className="relative mb-4 mx-auto w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-purple-500/30 transition-all duration-300">
        <img
          src={imageUrl}
          alt={`${name} profile picture`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      {/* Name and Role */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-100 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {role}
        </p>
      </div>
      
      {/* Social Links Container */}
      <div className="relative h-10 flex items-center justify-center">
        {/* Initial state: Subtle placeholder dots */}
        <div className="absolute inset-0 flex items-center justify-center space-x-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>
        
        {/* Hover state: Social icons */}
        <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name}'s LinkedIn profile`}
            className="p-2 rounded-full bg-white/10 hover:bg-blue-500/20 hover:scale-110 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Linkedin className="w-4 h-4 text-white hover:text-blue-400 transition-colors duration-200" />
          </a>
          
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name}'s Instagram profile`}
            className="p-2 rounded-full bg-white/10 hover:bg-pink-500/20 hover:scale-110 transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/25"
          >
            <Instagram className="w-4 h-4 text-white hover:text-pink-400 transition-colors duration-200" />
          </a>
        </div>
      </div>
    </div>
  );
}
