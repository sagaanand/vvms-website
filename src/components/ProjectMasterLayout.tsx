"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, RotateCcw, Search, MapPin, CheckCircle2, Info } from "lucide-react";
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
}

interface ProjectMasterLayoutProps {
  masterLayoutImage: string;
  plots: PlotItem[];
  onEnquirePlot: (plot: PlotItem) => void;
}

const AVAILABILITY_STYLES: Record<string, string> = {
  AVAILABLE: "bg-emerald-50 text-emerald-800 border-emerald-300 hover:border-emerald-500",
  RESERVED: "bg-amber-50 text-amber-800 border-amber-300 hover:border-amber-500",
  SOLD: "bg-red-50 text-red-700 border-red-200 opacity-75",
  ENQUIRE: "bg-white text-slate-800 border-slate-200 hover:border-[#B78D42]",
};

const AVAILABILITY_LABEL: Record<string, string> = {
  AVAILABLE: "Available",
  RESERVED: "Reserved",
  SOLD: "Sold",
  ENQUIRE: "Enquire",
};

export default function ProjectMasterLayout({
  masterLayoutImage,
  plots,
  onEnquirePlot,
}: ProjectMasterLayoutProps) {
  const [zoom, setZoom] = useState<number>(1);
  const [activePhase, setActivePhase] = useState<"AUREON BREEZE" | "AUREON BREEZE EXTENSION">(
    "AUREON BREEZE"
  );
  const [searchPlot, setSearchPlot] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [selectedPlot, setSelectedPlot] = useState<PlotItem | null>(null);

  const handleZoom = (nextZoom: number) => {
    setZoom(nextZoom);
    trackAureonEvent("aureon_master_layout_view", { zoom: nextZoom });
  };

  const phasePlots = useMemo(() => {
    return plots
      .filter((p) => p.phase === activePhase)
      .filter((p) => {
        if (searchPlot && !p.plotNumber.toLowerCase().includes(searchPlot.trim().toLowerCase())) {
          return false;
        }
        if (categoryFilter !== "All" && p.category !== categoryFilter) {
          return false;
        }
        if (availabilityFilter !== "All" && p.availability !== availabilityFilter) {
          return false;
        }
        return true;
      })
      .sort((a, b) => Number(a.plotNumber) - Number(b.plotNumber));
  }, [plots, activePhase, searchPlot, categoryFilter, availabilityFilter]);

  const phaseCount = useMemo(
    () => ({
      main: plots.filter((p) => p.phase === "AUREON BREEZE").length,
      ext: plots.filter((p) => p.phase === "AUREON BREEZE EXTENSION").length,
    }),
    [plots]
  );

  return (
    <div id="master-layout" className="space-y-8 scroll-mt-24">
      {/* Zoomable Master Layout Viewer */}
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

        <div className="overflow-auto rounded-2xl border border-slate-200 bg-slate-50 max-h-[620px]">
          <div
            className="relative transition-transform duration-200 origin-top-left"
            style={{ width: `${zoom * 100}%`, minWidth: "100%" }}
          >
            <Image
              src={masterLayoutImage}
              alt="AUREON BREEZE Master Layout Plan showing Plots 1 to 169 and Extension Plots 1 to 89"
              width={1728}
              height={1224}
              className="w-full h-auto block"
            />
          </div>
        </div>
        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
          <span>
            Master layout shown as supplied in the project brochure. Use zoom controls above to inspect plot dimensions and road widths.
          </span>
        </p>
      </div>

      {/* Separate Phase Plot Schedule & Inventory */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#B78D42]/40 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-cyan-700 block">
              Brochure Plot Schedule (Separate Phase Inventory)
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-[#202020]">
              Select a Plot to View Area &amp; Enquire
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 bg-slate-100 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setActivePhase("AUREON BREEZE");
                setCategoryFilter("All");
                setSelectedPlot(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition ${
                activePhase === "AUREON BREEZE"
                  ? "bg-[#202020] text-[#F9DB5C] shadow-sm"
                  : "text-slate-600 hover:text-[#202020]"
              }`}
            >
              AUREON BREEZE ({phaseCount.main} Plots)
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePhase("AUREON BREEZE EXTENSION");
                setCategoryFilter("All");
                setSelectedPlot(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition ${
                activePhase === "AUREON BREEZE EXTENSION"
                  ? "bg-[#202020] text-[#F9DB5C] shadow-sm"
                  : "text-slate-600 hover:text-[#202020]"
              }`}
            >
              EXTENSION ({phaseCount.ext} Plots)
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Plot No. (e.g. 46, 118)..."
              value={searchPlot}
              onChange={(e) => setSearchPlot(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
            />
          </div>

          {activePhase === "AUREON BREEZE EXTENSION" ? (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
            >
              <option value="All">All Extension Categories</option>
              <option value="Luxury">Luxury Plots</option>
              <option value="Premium">Premium Plots</option>
              <option value="Clasic">Clasic Plots</option>
            </select>
          ) : (
            <div className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-semibold flex items-center">
              Phase 1: Plots 1 – 169 (Park I &amp; Park II)
            </div>
          )}

          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
          >
            <option value="All">All Statuses</option>
            <option value="AVAILABLE">Available (Admin Verified)</option>
            <option value="ENQUIRE">Enquire for Availability</option>
            <option value="RESERVED">Reserved</option>
            <option value="SOLD">Sold</option>
          </select>
        </div>

        {/* Selected Plot Detail Drawer */}
        {selectedPlot && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#202020] text-white border border-[#B78D42] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#F9DB5C] text-[#202020] font-black text-xs">
                  {selectedPlot.phase} • Plot #{selectedPlot.plotNumber}
                </span>
                {selectedPlot.category && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-[#22CDE1] border border-[#22CDE1]/40 font-bold text-xs">
                    {selectedPlot.category}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-lg bg-white/10 text-slate-200 font-bold text-xs">
                  Status: {AVAILABILITY_LABEL[selectedPlot.availability] || "Enquire"}
                </span>
              </div>
              <div className="text-sm sm:text-base font-bold pt-1">
                Brochure Plot Area: <span className="text-[#F9DB5C]">{selectedPlot.areaSqFt} sq.ft</span>
                {selectedPlot.dimensions ? ` • Dimensions: ${selectedPlot.dimensions}` : ""}
                {selectedPlot.facing ? ` • Facing: ${selectedPlot.facing}` : ""}
                {selectedPlot.roadWidthFt ? ` • Road: ${selectedPlot.roadWidthFt} ft` : ""}
              </div>
              <p className="text-[11px] text-slate-300">
                {selectedPlot.availability === "ENQUIRE"
                  ? "Live availability and exact facing/dimensions are confirmed directly by our advisor."
                  : selectedPlot.notes || "Status updated by authorized VVMS administrator."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onEnquirePlot(selectedPlot)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] text-[#202020] font-black text-xs uppercase tracking-wider whitespace-nowrap shadow-gold"
            >
              Enquire for Plot #{selectedPlot.plotNumber}
            </button>
          </div>
        )}

        {/* Plot Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-[360px] overflow-y-auto pr-1">
          {phasePlots.map((plot) => {
            const isSelected = selectedPlot?.id === plot.id;
            const statusClass =
              AVAILABILITY_STYLES[plot.availability] || AVAILABILITY_STYLES.ENQUIRE;
            return (
              <button
                key={plot.id}
                type="button"
                onClick={() => setSelectedPlot(plot)}
                className={`p-2 rounded-xl border text-left transition ${statusClass} ${
                  isSelected ? "ring-2 ring-[#202020] shadow-md" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-black text-xs">#{plot.plotNumber}</span>
                  {plot.availability === "AVAILABLE" && (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  )}
                </div>
                <div className="text-[10px] font-bold text-slate-600 truncate">
                  {plot.areaSqFt} sqft
                </div>
                {plot.category && (
                  <div className="text-[9px] font-black uppercase text-amber-800 truncate">
                    {plot.category}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#B78D42]" />
            Showing {phasePlots.length} plots in {activePhase}.
          </span>
          <span>
            Availability is shown only where updated by an authorized administrator; all others require advisor confirmation.
          </span>
        </div>
      </div>
    </div>
  );
}
