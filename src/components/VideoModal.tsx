"use client";

import React from "react";
import { X, MessageCircle, ExternalLink } from "lucide-react";
import { Youtube } from "@/components/icons/YoutubeIcon";
import { COMPANY_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

export default function VideoModal({ isOpen, onClose, videoId, title }: VideoModalProps) {
  if (!isOpen) return null;

  const whatsappMessage = `Hello Er. J. Vairavel, I just watched the YouTube walkthrough video "${title}" on your portal and want to inspect this property in person.`;
  const whatsappUrl = getWhatsAppUrl(COMPANY_INFO.whatsappRaw, whatsappMessage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-navy-900 rounded-2xl overflow-hidden border border-navy-700 shadow-2xl z-10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-navy-800 bg-navy-950">
          <div className="flex items-center gap-2 pr-4">
            <Youtube className="w-5 h-5 text-red-500 flex-shrink-0" />
            <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Responsive Video Iframe */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 bg-navy-950/90 border-t border-navy-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-300">
            Presented by <strong className="text-gold-400">Er. J. Vairavel</strong> • @Veeduveettumanaisandhai
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition"
            >
              <span>Open in YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
              <span>Book Site Visit on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
