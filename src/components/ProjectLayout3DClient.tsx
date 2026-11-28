"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Box,
  Compass,
  Maximize2,
  MessageCircle,
  RotateCcw,
  RotateCw,
  Route,
  Search,
  Tag,
  X,
  ZoomIn,
  ZoomOut,
  Layers,
  Move,
} from "lucide-react";
import type { PlotItem } from "@/components/ProjectMasterLayout";
import { COMPANY_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { trackAureonEvent } from "@/lib/analytics";

interface ProjectLayout3DClientProps {
  projectName: string;
  masterLayoutImage: string;
  plots: PlotItem[];
}

type PlotStatus = "AVAILABLE" | "BOOKED" | "BLOCKED" | "SOLD";

const STATUS_LABEL: Record<PlotStatus, string> = {
  AVAILABLE: "Available",
  BOOKED: "Booked",
  BLOCKED: "Blocked",
  SOLD: "Sold",
};

const STATUS_COLORS: Record<
  PlotStatus,
  {
    top: string;
    topHover: string;
    border: string;
    wall: string;
    badge: string;
    dot: string;
  }
> = {
  AVAILABLE: {
    top: "rgba(16, 185, 129, 0.20)",
    topHover: "rgba(16, 185, 129, 0.42)",
    border: "rgba(16, 185, 129, 0.85)",
    wall: "rgba(5, 150, 105, 0.75)",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/50",
    dot: "bg-emerald-400",
  },
  BOOKED: {
    top: "rgba(245, 158, 11, 0.28)",
    topHover: "rgba(245, 158, 11, 0.48)",
    border: "rgba(245, 158, 11, 0.90)",
    wall: "rgba(217, 119, 6, 0.80)",
    badge: "bg-amber-500/20 text-amber-300 border-amber-400/50",
    dot: "bg-amber-400",
  },
  BLOCKED: {
    top: "rgba(100, 116, 139, 0.36)",
    topHover: "rgba(100, 116, 139, 0.56)",
    border: "rgba(148, 163, 184, 0.85)",
    wall: "rgba(71, 85, 105, 0.85)",
    badge: "bg-slate-500/30 text-slate-200 border-slate-400/50",
    dot: "bg-slate-400",
  },
  SOLD: {
    top: "rgba(239, 68, 68, 0.34)",
    topHover: "rgba(239, 68, 68, 0.52)",
    border: "rgba(248, 113, 113, 0.95)",
    wall: "rgba(185, 28, 28, 0.85)",
    badge: "bg-red-500/20 text-red-300 border-red-400/50",
    dot: "bg-red-400",
  },
};

function normalizeStatus(status?: string | null): PlotStatus {
  if (status === "BOOKED" || status === "RESERVED") return "BOOKED";
  if (status === "BLOCKED") return "BLOCKED";
  if (status === "SOLD") return "SOLD";
  return "AVAILABLE";
}

function getStatusNote(status: PlotStatus, notes?: string | null): string {
  if (notes) return notes;
  switch (status) {
    case "BOOKED":
      return "This plot is currently booked. Enquire to join the waitlist or explore adjacent available plots.";
    case "BLOCKED":
      return "This plot is temporarily blocked by management. Contact our advisor for release updates.";
    case "SOLD":
      return "This plot has been sold. Enquire for similar available plots in this phase.";
    default:
      return "This plot is available for booking. Enquire now for pricing, legal verification & site visit.";
  }
}

export default function ProjectLayout3DClient({
  projectName,
  masterLayoutImage,
  plots,
}: ProjectLayout3DClientProps) {
  const [tiltX, setTiltX] = useState<number>(46);
  const [rotateZ, setRotateZ] = useState<number>(-14);
  const [zoom, setZoom] = useState<number>(1.05);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: -20 });

  const [phaseFilter, setPhaseFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [plotsState, setPlotsState] = useState<PlotItem[]>(plots);
  const [selectedPlot, setSelectedPlot] = useState<PlotItem | null>(null);
  const [hoveredPlot, setHoveredPlot] = useState<PlotItem | null>(null);
  const [savingPlot, setSavingPlot] = useState<boolean>(false);
  const [saveFeedback, setSaveFeedback] = useState<string>("");

  useEffect(() => {
    if (window.innerWidth < 640) {
      setZoom(0.45);
      setPan({ x: 0, y: -35 });
    }
  }, []);

  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    origPanX: number;
    origPanY: number;
    moved: boolean;
  }>({ active: false, startX: 0, startY: 0, origPanX: 0, origPanY: 0, moved: false });

  const interactivePlots = useMemo(
    () =>
      plotsState.filter(
        (p) =>
          typeof p.coordX === "number" &&
          typeof p.coordY === "number" &&
          typeof p.coordW === "number" &&
          typeof p.coordH === "number"
      ),
    [plotsState]
  );

  const statusCounts = useMemo(() => {
    const counts = { AVAILABLE: 0, BOOKED: 0, BLOCKED: 0, SOLD: 0 };
    for (const p of plotsState) {
      counts[normalizeStatus(p.availability)] += 1;
    }
    return counts;
  }, [plotsState]);

  const applyPreset = (preset: "isometric" | "birdseye" | "topdown") => {
    if (preset === "isometric") {
      setTiltX(46);
      setRotateZ(-14);
      setZoom(1.05);
      setPan({ x: 0, y: -20 });
    } else if (preset === "birdseye") {
      setTiltX(30);
      setRotateZ(0);
      setZoom(1.1);
      setPan({ x: 0, y: -10 });
    } else {
      setTiltX(0);
      setRotateZ(0);
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  };

  const handleSelectPlot = (plot: PlotItem) => {
    setSelectedPlot(plot);
    setSaveFeedback("");
    trackAureonEvent("aureon_plot_select", {
      phase: plot.phase,
      plotNumber: plot.plotNumber,
      availability: normalizeStatus(plot.availability),
      viewMode: "3d",
    });
  };

  const handleUpdatePlot = async (
    plot: PlotItem,
    patch: { availability?: string; facing?: string | null; roadWidthFt?: number | null }
  ) => {
    setSavingPlot(true);
    setSaveFeedback("");
    try {
      const res = await fetch("/api/projects/aureon-breeze", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plotUpdate: {
            id: plot.id,
            ...patch,
          },
        }),
      });
      const data = await res.json();
      if (res.ok && data.plot) {
        setPlotsState((prev) => prev.map((p) => (p.id === data.plot.id ? data.plot : p)));
        setSelectedPlot(data.plot);
        setSaveFeedback("Saved!");
        setTimeout(() => setSaveFeedback(""), 2000);
      } else {
        setSaveFeedback(data.error || "Update failed");
      }
    } catch {
      setSaveFeedback("Network error");
    } finally {
      setSavingPlot(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    const match = interactivePlots.find(
      (p) =>
        p.plotNumber.toLowerCase() === q &&
        (phaseFilter === "All" || p.phase === phaseFilter)
    ) || interactivePlots.find((p) => p.plotNumber.toLowerCase() === q);

    if (match) {
      handleSelectPlot(match);
      // Center camera gently toward the matched plot
      if (match.coordX != null && match.coordY != null) {
        const normX = (match.coordX + (match.coordW || 0) / 2) / 1728 - 0.5;
        const normY = (match.coordY + (match.coordH || 0) / 2) / 1224 - 0.5;
        setZoom((z) => Math.max(z, 1.35));
        setPan({ x: -normX * 700, y: -normY * 460 });
      }
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("[data-plot-node='true']")) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      origPanX: pan.x,
      origPanY: pan.y,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragRef.current.moved = true;
    }
    setPan({
      x: dragRef.current.origPanX + dx,
      y: dragRef.current.origPanY + dy,
    });
  };

  const onPointerUp = () => {
    dragRef.current.active = false;
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY < 0 ? 0.12 : -0.12;
    setZoom((prev) => Math.min(2.6, Math.max(0.35, Number((prev + delta).toFixed(2)))));
  };

  const selectedStatus = selectedPlot ? normalizeStatus(selectedPlot.availability) : "AVAILABLE";

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#0B0E14] text-white select-none">
      {/* Top Studio Bar */}
      <header className="z-30 bg-[#141821]/95 backdrop-blur-md border-b border-white/10 px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Admin</span>
          </Link>
          <div>
            <div className="flex items-center gap-1.5">
              <Box className="w-4 h-4 text-[#F9DB5C]" />
              <h1 className="text-sm sm:text-base font-black tracking-tight text-white">
                {projectName} <span className="text-[#F9DB5C]">Admin 3D Layout</span>
              </h1>
            </div>
            <p className="text-[10px] text-slate-400 hidden md:block">
              Admin-only 3D view • Drag to pan • Scroll to zoom • Click any plot to view or update status
            </p>
          </div>
        </div>

        {/* Search & Phase Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Jump to Plot #..."
              className="w-32 sm:w-40 pl-8 pr-2.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#F9DB5C]"
            />
          </form>

          <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-[11px] font-bold">
            {[
              { id: "All", label: `All (${plots.length})` },
              { id: "AUREON BREEZE", label: "Main (169)" },
              { id: "AUREON BREEZE EXTENSION", label: "Extension (89)" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPhaseFilter(tab.id)}
                className={`px-2.5 py-1 rounded-lg transition ${
                  phaseFilter === tab.id
                    ? "bg-[#F9DB5C] text-[#202020] font-black"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => applyPreset("isometric")}
              className={`px-2.5 py-1 rounded-lg transition ${
                tiltX >= 40 ? "bg-cyan-500 text-[#0B0E14] font-black" : "text-slate-300 hover:text-white"
              }`}
            >
              3D Iso
            </button>
            <button
              type="button"
              onClick={() => applyPreset("birdseye")}
              className={`px-2.5 py-1 rounded-lg transition ${
                tiltX > 0 && tiltX < 40 ? "bg-cyan-500 text-[#0B0E14] font-black" : "text-slate-300 hover:text-white"
              }`}
            >
              Bird&apos;s Eye
            </button>
            <button
              type="button"
              onClick={() => applyPreset("topdown")}
              className={`px-2.5 py-1 rounded-lg transition ${
                tiltX === 0 ? "bg-cyan-500 text-[#0B0E14] font-black" : "text-slate-300 hover:text-white"
              }`}
            >
              2D Flat
            </button>
          </div>
        </div>
      </header>

      {/* Main 3D Interactive Stage */}
      <div
        className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, #1D2432 0%, #0E121A 55%, #07090D 100%)",
          perspective: "1700px",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
      >
        {/* Top-Left Status Filter Pills */}
        <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-1.5 bg-[#141821]/85 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setStatusFilter("All")}
            className={`px-2.5 py-1 rounded-xl transition ${
              statusFilter === "All" ? "bg-white text-[#0B0E14] font-black" : "text-slate-300 hover:bg-white/10"
            }`}
          >
            All ({plots.length})
          </button>
          {(["AVAILABLE", "BOOKED", "BLOCKED", "SOLD"] as PlotStatus[]).map((st) => {
            const active = statusFilter === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(active ? "All" : st)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition ${
                  active ? "bg-white/20 text-white ring-1 ring-white/40" : "text-slate-300 hover:bg-white/10"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${STATUS_COLORS[st].dot}`} />
                <span>
                  {STATUS_LABEL[st]} ({statusCounts[st]})
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Hover HUD Pill */}
        {hoveredPlot && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-1.5 rounded-full bg-[#141821]/95 border border-[#F9DB5C]/60 shadow-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap">
            <span className="text-[#F9DB5C] font-black">Plot #{hoveredPlot.plotNumber}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-200">
              {hoveredPlot.phase === "AUREON BREEZE EXTENSION" ? "Extension" : "Main"}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-white">{hoveredPlot.areaSqFt} sq.ft</span>
            <span className="text-slate-400">•</span>
            <span
              className={`px-2 py-0.5 rounded-md border text-[10px] font-black uppercase ${
                STATUS_COLORS[normalizeStatus(hoveredPlot.availability)].badge
              }`}
            >
              {STATUS_LABEL[normalizeStatus(hoveredPlot.availability)]}
            </span>
          </div>
        )}

        {/* 3D Architectural Model Board */}
        <div
          className="relative shrink-0 transition-transform duration-150 ease-out"
          style={{
            width: "1152px",
            height: "816px",
            transformStyle: "preserve-3d",
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${zoom}) rotateX(${tiltX}deg) rotateZ(${rotateZ}deg)`,
          }}
        >
          {/* Architectural 3D Board Thickness / Base Slab */}
          <div
            className="absolute inset-0 rounded-xl bg-[#181D27] border-2 border-[#B78D42]/60"
            style={{
              transform: "translateZ(-14px)",
              boxShadow: "0 45px 95px rgba(0, 0, 0, 0.85)",
            }}
          />

          {/* Ground Plane Image */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden border border-[#B78D42]/40 bg-white"
            style={{ transform: "translateZ(0px)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={masterLayoutImage}
              alt="AUREON BREEZE 3D Master Layout"
              draggable={false}
              className="w-full h-full object-fill block pointer-events-none"
            />
          </div>

          {/* 3D Extruded Plot Blocks Layer */}
          <div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {interactivePlots.map((plot) => {
              const status = normalizeStatus(plot.availability);
              const palette = STATUS_COLORS[status];
              const isSelected = selectedPlot?.id === plot.id;
              const isHovered = hoveredPlot?.id === plot.id;
              const isMatch =
                (phaseFilter === "All" || plot.phase === phaseFilter) &&
                (statusFilter === "All" || status === statusFilter) &&
                (!searchQuery.trim() ||
                  plot.plotNumber.toLowerCase().includes(searchQuery.trim().toLowerCase()));

              const zLift = !isMatch ? 1 : isSelected ? 22 : isHovered ? 14 : 6;
              const leftPct = (plot.coordX! / 1728) * 100;
              const topPct = (plot.coordY! / 1224) * 100;
              const widthPct = (plot.coordW! / 1728) * 100;
              const heightPct = (plot.coordH! / 1224) * 100;

              return (
                <button
                  key={plot.id}
                  type="button"
                  data-plot-node="true"
                  onMouseEnter={() => setHoveredPlot(plot)}
                  onMouseLeave={() => setHoveredPlot((prev) => (prev?.id === plot.id ? null : prev))}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlot(plot);
                  }}
                  aria-label={`${plot.phase} Plot ${plot.plotNumber}, ${plot.areaSqFt} sq.ft, ${STATUS_LABEL[status]}`}
                  className="absolute cursor-pointer transition-transform duration-150 focus:outline-none"
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    width: `${widthPct}%`,
                    height: `${heightPct}%`,
                    transformStyle: "preserve-3d",
                    transform: `translateZ(${zLift}px)`,
                    opacity: isMatch ? 1 : 0.25,
                    backgroundColor: isSelected
                      ? "rgba(249, 219, 92, 0.48)"
                      : isHovered
                      ? palette.topHover
                      : palette.top,
                    border: isSelected
                      ? "2px solid #F9DB5C"
                      : `1px solid ${palette.border}`,
                    boxShadow: isSelected
                      ? "0 0 18px rgba(249, 219, 92, 0.85)"
                      : tiltX > 5
                      ? `2px 4px 6px rgba(0,0,0,0.35)`
                      : "none",
                  }}
                >
                  {/* 3D Front Extrusion Skirt */}
                  {tiltX > 8 && isMatch && (
                    <span
                      className="absolute left-0 right-0 bottom-0 pointer-events-none"
                      style={{
                        height: `${zLift}px`,
                        backgroundColor: isSelected ? "#B78D42" : palette.wall,
                        transformOrigin: "bottom",
                        transform: "rotateX(-90deg)",
                      }}
                    />
                  )}
                  {/* 3D Right Extrusion Skirt */}
                  {tiltX > 8 && isMatch && (
                    <span
                      className="absolute top-0 bottom-0 right-0 pointer-events-none"
                      style={{
                        width: `${zLift}px`,
                        backgroundColor: isSelected ? "#8A6627" : palette.wall,
                        transformOrigin: "right",
                        transform: "rotateY(90deg)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom-Left Floating 3D Camera Gimbal */}
        <div className="absolute bottom-3 left-3 z-20 bg-[#141821]/90 backdrop-blur-md border border-white/15 rounded-2xl p-3 space-y-2.5 text-xs shadow-2xl w-64">
          <div className="flex items-center justify-between text-[11px] font-black text-slate-300 uppercase tracking-wider">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#F9DB5C]" />
              3D Camera Controls
            </span>
            <button
              type="button"
              onClick={() => applyPreset("isometric")}
              className="text-[10px] text-[#F9DB5C] hover:underline font-bold"
            >
              Reset
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>3D Tilt Angle</span>
              <span className="text-white">{tiltX}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={62}
              value={tiltX}
              onChange={(e) => setTiltX(Number(e.target.value))}
              aria-label="3D Tilt Angle"
              className="w-full accent-[#F9DB5C] h-1.5 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between gap-1.5 pt-0.5">
            <button
              type="button"
              onClick={() => setRotateZ((r) => r - 15)}
              className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center gap-1 font-bold text-[11px]"
              aria-label="Rotate 3D view left"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>-15°</span>
            </button>
            <button
              type="button"
              onClick={() => setRotateZ((r) => r + 15)}
              className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center gap-1 font-bold text-[11px]"
              aria-label="Rotate 3D view right"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>+15°</span>
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.35, Number((z - 0.2).toFixed(2))))}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20"
              aria-label="Zoom out 3D view"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2.6, Number((z + 0.2).toFixed(2))))}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20"
              aria-label="Zoom in 3D view"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <Move className="w-3 h-3 text-cyan-400" />
            <span>Drag anywhere to pan • {Math.round(zoom * 100)}% zoom</span>
          </div>
        </div>

        {/* Right / Bottom Slide-Over Plot Details Drawer */}
        {selectedPlot && (
          <aside className="absolute right-3 bottom-3 sm:top-16 sm:bottom-auto z-30 w-[calc(100%-1.5rem)] sm:w-80 bg-[#141821]/95 backdrop-blur-lg border-2 border-[#B78D42] rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#F9DB5C] text-[#202020] font-black text-xs">
                    Plot #{selectedPlot.plotNumber}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-lg border font-black text-[11px] uppercase ${STATUS_COLORS[selectedStatus].badge}`}
                  >
                    {STATUS_LABEL[selectedStatus]}
                  </span>
                  {selectedPlot.category && (
                    <span className="px-2 py-0.5 rounded-lg bg-cyan-500/20 text-[#22CDE1] border border-[#22CDE1]/40 font-bold text-[11px] inline-flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {selectedPlot.category}
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-bold text-slate-300">
                  {selectedPlot.phase}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPlot(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300"
                aria-label="Close plot details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-slate-400 flex items-center gap-1 text-[10px] font-bold">
                  <Maximize2 className="w-3 h-3 text-[#F9DB5C]" />
                  Plot Area
                </span>
                <div className="text-sm font-black text-[#F9DB5C] mt-0.5">
                  {selectedPlot.areaSqFt} sq.ft
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-slate-400 text-[10px] font-bold block">Dimensions</span>
                <div className="text-xs font-bold text-white mt-0.5">
                  {selectedPlot.dimensions || "Verify with Advisor"}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-slate-400 flex items-center gap-1 text-[10px] font-bold">
                  <Compass className="w-3 h-3 text-cyan-400" />
                  Facing
                </span>
                <div className="text-xs font-bold text-white mt-0.5">
                  {selectedPlot.facing || "Verify with Advisor"}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-slate-400 flex items-center gap-1 text-[10px] font-bold">
                  <Route className="w-3 h-3 text-emerald-400" />
                  Road Width
                </span>
                <div className="text-xs font-bold text-white mt-0.5">
                  {selectedPlot.roadWidthFt ? `${selectedPlot.roadWidthFt} ft` : "Verify with Advisor"}
                </div>
              </div>
            </div>

            {/* Admin Quick Status & Details Editor */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#F9DB5C]">
                  Admin Plot Controls
                </span>
                {(savingPlot || saveFeedback) && (
                  <span className="text-[10px] font-bold text-emerald-400">
                    {savingPlot ? "Saving..." : saveFeedback}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-4 gap-1">
                {(["AVAILABLE", "BOOKED", "BLOCKED", "SOLD"] as PlotStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    disabled={savingPlot}
                    onClick={() => handleUpdatePlot(selectedPlot, { availability: st })}
                    className={`py-1.5 rounded-lg text-[10px] font-black uppercase border transition ${
                      selectedStatus === st
                        ? STATUS_COLORS[st].badge + " ring-1 ring-white/40"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {STATUS_LABEL[st]}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={selectedPlot.facing || ""}
                  disabled={savingPlot}
                  onChange={(e) =>
                    handleUpdatePlot(selectedPlot, { facing: e.target.value || null })
                  }
                  aria-label="Update plot facing"
                  className="px-2 py-1.5 rounded-lg bg-[#0E121A] border border-white/15 text-white text-[11px] font-bold"
                >
                  <option value="">Facing: Unset</option>
                  <option value="North">North</option>
                  <option value="East">East</option>
                  <option value="South">South</option>
                  <option value="West">West</option>
                </select>

                <input
                  type="number"
                  key={`road-${selectedPlot.id}`}
                  defaultValue={selectedPlot.roadWidthFt ?? ""}
                  disabled={savingPlot}
                  placeholder="Road ft (e.g. 30)"
                  onBlur={(e) => {
                    const val = e.target.value ? parseInt(e.target.value, 10) : null;
                    if (val !== (selectedPlot.roadWidthFt ?? null)) {
                      handleUpdatePlot(selectedPlot, { roadWidthFt: val });
                    }
                  }}
                  aria-label="Update road width in feet"
                  className="px-2 py-1.5 rounded-lg bg-[#0E121A] border border-white/15 text-white text-[11px] font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <a
                href={getWhatsAppUrl(
                  COMPANY_INFO.whatsapp,
                  `AUREON BREEZE • ${selectedPlot.phase} Plot #${selectedPlot.plotNumber} (${selectedPlot.areaSqFt} sq.ft) - Status: ${STATUS_LABEL[selectedStatus]}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Share Plot #{selectedPlot.plotNumber} on WhatsApp</span>
              </a>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
