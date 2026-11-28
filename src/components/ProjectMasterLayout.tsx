"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, RotateCcw, Info } from "lucide-react";
import { trackAureonEvent } from "@/lib/analytics";

export interface PlotItem {
  id: string;
  phase: string;
  plotNumber: string;
  areaSqFt: number;
  dimensions?: string | null;
  facing?: string | null;
  roadWidthFt?: number | null;
  category?: string | null;
  availability: string;
  notes?: string | null;
  coordX?: number | null;
  coordY?: number | null;
  coordW?: number | null;
  coordH?: number | null;
}

interface ProjectMasterLayoutProps {
  masterLayoutImage: string;
  plots?: PlotItem[];
  onEnquirePlot?: (plot: PlotItem) => void;
}

export default function ProjectMasterLayout({
  masterLayoutImage,
}: ProjectMasterLayoutProps) {
  const [zoom, setZoom] = useState<number>(1);

  const handleZoom = (nextZoom: number) => {
    setZoom(nextZoom);
    trackAureonEvent("aureon_master_layout_view", { zoom: nextZoom });
  };

  return (
    <div id="master-layout" className="scroll-mt-24">
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#B78D42]/40 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#B78D42] block">
              Brochure Master Layout Plan
            </span>
            <h3 className="text-lg sm:text-xl font-black text-[#202020]">
              AUREON BREEZE &amp; AUREON BREEZE EXTENSION Layout
            </h3>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => handleZoom(Math.max(1, Number((zoom - 0.5).toFixed(1))))}
              disabled={zoom <= 1}
              className="p-2 rounded-lg bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              aria-label="Zoom out master layout"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2.5 text-slate-800 font-black">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              onClick={() => handleZoom(Math.min(2.5, Number((zoom + 0.5).toFixed(1))))}
              disabled={zoom >= 2.5}
              className="p-2 rounded-lg bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              aria-label="Zoom in master layout"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoom > 1 && (
              <button
                type="button"
                onClick={() => handleZoom(1)}
                className="p-2 rounded-lg bg-white text-slate-700 hover:bg-slate-50"
                aria-label="Reset layout zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="overflow-auto rounded-2xl border border-slate-200 bg-slate-50 max-h-[680px]">
          <div
            className="relative transition-transform duration-200 origin-top-left"
            style={{ width: `${zoom * 100}%`, minWidth: "100%" }}
          >
            <Image
              src={masterLayoutImage}
              alt="AUREON BREEZE Master Layout Plan showing Plots 1 to 169 and Extension Plots 1 to 89"
              width={1728}
              height={1224}
              className="w-full h-auto block select-none"
            />
          </div>
        </div>

        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
          <span>
            Master layout shown as supplied in the project brochure. Use zoom controls above to inspect plot numbers, dimensions, and road widths.
          </span>
        </p>
      </div>
    </div>
  );
}
