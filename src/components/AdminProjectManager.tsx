"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Eye,
  Upload,
  Save,
  Search,
  CheckCircle2,
  Map,
  FileText,
} from "lucide-react";

interface PlotRow {
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

export default function AdminProjectManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [project, setProject] = useState<any>(null);
  const [plots, setPlots] = useState<PlotRow[]>([]);

  // Sub-tabs inside Flagship Project Manager
  const [subTab, setSubTab] = useState<"details" | "media" | "plots">("details");
  const [plotPhase, setPlotPhase] = useState<"AUREON BREEZE" | "AUREON BREEZE EXTENSION">(
    "AUREON BREEZE"
  );
  const [plotSearch, setPlotSearch] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects/aureon-breeze");
      const data = await res.json();
      if (data.success && data.project) {
        setProject(data.project);
        setPlots(data.project.plots || []);
      }
    } catch (err) {
      console.error("Failed to fetch project:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    setSaving(true);
    setStatusMsg("");
    try {
      const res = await fetch("/api/projects/aureon-breeze", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: project.name,
          tagline: project.tagline,
          promoterName: project.promoterName,
          location: project.location,
          approvals: project.approvals,
          overview: project.overview,
          heroImage: project.heroImage,
          masterLayoutImage: project.masterLayoutImage,
          brochureUrl: project.brochureUrl,
          galleryImages: project.galleryImages,
          youtubeUrls: project.youtubeUrls,
          amenities: project.amenities,
          nearbyLocations: project.nearbyLocations,
          isVisible: project.isVisible,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg("Flagship project saved successfully.");
      } else {
        setStatusMsg(data.error || "Failed to save project.");
      }
    } catch {
      setStatusMsg("Network error while saving project.");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (
    file: File | undefined,
    field: "heroImage" | "masterLayoutImage" | "gallery"
  ) => {
    if (!file || !project) return;
    setUploadingField(field);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        if (field === "gallery") {
          const arr: string[] = JSON.parse(project.galleryImages || "[]");
          setProject({ ...project, galleryImages: JSON.stringify([...arr, data.url]) });
        } else {
          setProject({ ...project, [field]: data.url });
        }
      }
    } finally {
      setUploadingField(null);
    }
  };

  const updatePlot = async (plot: PlotRow, updates: Partial<PlotRow>) => {
    setStatusMsg("");
    try {
      const res = await fetch("/api/projects/aureon-breeze", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plotUpdate: {
            id: plot.id,
            ...updates,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.plot) {
        setPlots((prev) => prev.map((p) => (p.id === plot.id ? { ...p, ...data.plot } : p)));
        setStatusMsg(`Updated ${plot.phase} Plot #${plot.plotNumber}`);
      }
    } catch {
      setStatusMsg("Failed to update plot.");
    }
  };

  const filteredPlots = useMemo(() => {
    return plots
      .filter((p) => p.phase === plotPhase)
      .filter((p) =>
        plotSearch ? p.plotNumber.toLowerCase().includes(plotSearch.trim().toLowerCase()) : true
      )
      .sort((a, b) => Number(a.plotNumber) - Number(b.plotNumber));
  }, [plots, plotPhase, plotSearch]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center text-xs font-bold text-slate-500 border border-slate-200">
        Loading AUREON BREEZE Flagship Project CMS...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center text-xs font-bold text-red-600 border border-red-200">
        Unable to load AUREON BREEZE project record.
      </div>
    );
  }

  const galleryList: string[] = JSON.parse(project.galleryImages || "[]");

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-[#202020] text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Building2 className="w-5 h-5 text-[#F9DB5C]" />
          <div>
            <div className="font-black text-sm text-[#F9DB5C]">
              Flagship Project CMS: {project.name}
            </div>
            <div className="text-[11px] text-slate-300">
              Promoted by {project.promoterName} • {plots.length} Total Plots Tracked
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/projects/aureon-breeze"
            target="_blank"
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold inline-flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#22CDE1]" />
            <span>View Live Page</span>
          </Link>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5 text-xs font-black">
          <button
            type="button"
            onClick={() => setSubTab("details")}
            className={`px-3.5 py-2 rounded-xl transition ${
              subTab === "details" ? "bg-[#202020] text-[#F9DB5C]" : "bg-white text-slate-600 border"
            }`}
          >
            Details, Amenities &amp; Nearby
          </button>
          <button
            type="button"
            onClick={() => setSubTab("media")}
            className={`px-3.5 py-2 rounded-xl transition ${
              subTab === "media" ? "bg-[#202020] text-[#F9DB5C]" : "bg-white text-slate-600 border"
            }`}
          >
            Hero, Layout, Gallery &amp; Brochure
          </button>
          <button
            type="button"
            onClick={() => setSubTab("plots")}
            className={`px-3.5 py-2 rounded-xl transition ${
              subTab === "plots" ? "bg-[#202020] text-[#F9DB5C]" : "bg-white text-slate-600 border"
            }`}
          >
            Plot Schedule &amp; Availability ({plots.length})
          </button>
        </div>

        {statusMsg && (
          <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{statusMsg}</span>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6">
        {(subTab === "details" || subTab === "media") && (
          <form onSubmit={handleSaveDetails} className="space-y-4 text-xs">
            {subTab === "details" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Project Name</label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => setProject({ ...project, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Promoter / Developer</label>
                    <input
                      type="text"
                      value={project.promoterName}
                      onChange={(e) => setProject({ ...project, promoterName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={project.location}
                      onChange={(e) => setProject({ ...project, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={project.tagline || ""}
                      onChange={(e) => setProject({ ...project, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Approvals Reference</label>
                    <input
                      type="text"
                      value={project.approvals}
                      onChange={(e) => setProject({ ...project, approvals: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Project Overview</label>
                  <textarea
                    rows={3}
                    value={project.overview}
                    onChange={(e) => setProject({ ...project, overview: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Amenities (JSON)</label>
                    <textarea
                      rows={4}
                      value={project.amenities}
                      onChange={(e) => setProject({ ...project, amenities: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nearby Locations (JSON)</label>
                    <textarea
                      rows={4}
                      value={project.nearbyLocations}
                      onChange={(e) => setProject({ ...project, nearbyLocations: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px]"
                    />
                  </div>
                </div>

                <label className="inline-flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(project.isVisible)}
                    onChange={(e) => setProject({ ...project, isVisible: e.target.checked })}
                  />
                  <span>Project Visible on Public Website (`/projects/aureon-breeze`)</span>
                </label>
              </>
            )}

            {subTab === "media" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-800">Hero Image</span>
                      <label className="cursor-pointer px-2.5 py-1 rounded-lg bg-[#202020] text-[#F9DB5C] font-bold inline-flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        <span>{uploadingField === "heroImage" ? "Uploading..." : "Upload"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e.target.files?.[0], "heroImage")}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={project.heroImage}
                      onChange={(e) => setProject({ ...project, heroImage: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200"
                    />
                    {project.heroImage && (
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border">
                        <Image src={project.heroImage} alt="Hero" fill className="object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-800 flex items-center gap-1">
                        <Map className="w-3.5 h-3.5 text-cyan-700" />
                        Master Layout Image
                      </span>
                      <label className="cursor-pointer px-2.5 py-1 rounded-lg bg-[#202020] text-[#F9DB5C] font-bold inline-flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        <span>{uploadingField === "masterLayoutImage" ? "Uploading..." : "Upload"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e.target.files?.[0], "masterLayoutImage")}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={project.masterLayoutImage || ""}
                      onChange={(e) => setProject({ ...project, masterLayoutImage: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200"
                    />
                    {project.masterLayoutImage && (
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border">
                        <Image src={project.masterLayoutImage} alt="Master Layout" fill className="object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-amber-700" />
                      Brochure PDF URL
                    </label>
                    <input
                      type="text"
                      value={project.brochureUrl || ""}
                      onChange={(e) => setProject({ ...project, brochureUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">YouTube Video URLs (JSON Array)</label>
                    <input
                      type="text"
                      value={project.youtubeUrls}
                      onChange={(e) => setProject({ ...project, youtubeUrls: e.target.value })}
                      placeholder='["https://www.youtube.com/watch?v=..."]'
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-800">Project Gallery ({galleryList.length})</span>
                    <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 border border-amber-300 font-bold inline-flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingField === "gallery" ? "Uploading..." : "+ Add Gallery Image"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files?.[0], "gallery")}
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {galleryList.map((img, i) => (
                      <div key={i} className="relative aspect-[16/10] rounded-xl overflow-hidden border">
                        <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() =>
                            setProject({
                              ...project,
                              galleryImages: JSON.stringify(galleryList.filter((_, idx) => idx !== i)),
                            })
                          }
                          className="absolute top-1 right-1 bg-black/75 text-red-400 text-[10px] font-black px-1.5 rounded"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-[#202020] font-black inline-flex items-center gap-1.5 shadow-gold"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving..." : "Save Flagship Project Changes"}</span>
              </button>
            </div>
          </form>
        )}

        {subTab === "plots" && (
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPlotPhase("AUREON BREEZE")}
                  className={`px-3.5 py-2 rounded-xl font-black ${
                    plotPhase === "AUREON BREEZE"
                      ? "bg-[#202020] text-[#F9DB5C]"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  AUREON BREEZE (1–169)
                </button>
                <button
                  type="button"
                  onClick={() => setPlotPhase("AUREON BREEZE EXTENSION")}
                  className={`px-3.5 py-2 rounded-xl font-black ${
                    plotPhase === "AUREON BREEZE EXTENSION"
                      ? "bg-[#202020] text-[#F9DB5C]"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  EXTENSION (1–89)
                </button>
              </div>

              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Plot No..."
                  value={plotSearch}
                  onChange={(e) => setPlotSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                />
              </div>
            </div>

            <div className="overflow-x-auto max-h-[420px] border border-slate-200 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 sticky top-0 text-slate-700">
                  <tr>
                    <th className="p-2.5">Plot #</th>
                    <th className="p-2.5">Area (sq.ft)</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5">Facing</th>
                    <th className="p-2.5">Road (ft)</th>
                    <th className="p-2.5">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPlots.map((plot) => (
                    <tr key={plot.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-black">#{plot.plotNumber}</td>
                      <td className="p-2.5 font-bold">{plot.areaSqFt}</td>
                      <td className="p-2.5 text-slate-600">{plot.category || "Standard"}</td>
                      <td className="p-2.5">
                        <select
                          value={plot.facing || ""}
                          onChange={(e) => updatePlot(plot, { facing: e.target.value })}
                          className="px-2 py-1 rounded-lg border border-slate-200 bg-white"
                        >
                          <option value="">Unset</option>
                          <option value="North">North</option>
                          <option value="East">East</option>
                          <option value="South">South</option>
                          <option value="West">West</option>
                        </select>
                      </td>
                      <td className="p-2.5">
                        <input
                          type="number"
                          defaultValue={plot.roadWidthFt || ""}
                          onBlur={(e) => {
                            const val = e.target.value ? parseInt(e.target.value, 10) : null;
                            if (val !== plot.roadWidthFt) updatePlot(plot, { roadWidthFt: val });
                          }}
                          placeholder="30"
                          className="w-16 px-2 py-1 rounded-lg border border-slate-200 bg-white"
                        />
                      </td>
                      <td className="p-2.5">
                        <select
                          value={plot.availability}
                          onChange={(e) => updatePlot(plot, { availability: e.target.value })}
                          className={`px-2.5 py-1 rounded-lg border font-bold ${
                            plot.availability === "AVAILABLE"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : plot.availability === "SOLD"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : plot.availability === "RESERVED"
                              ? "bg-amber-50 text-amber-800 border-amber-300"
                              : "bg-slate-50 text-slate-700 border-slate-200"
                          }`}
                        >
                          <option value="ENQUIRE">Enquire</option>
                          <option value="AVAILABLE">Available</option>
                          <option value="RESERVED">Reserved</option>
                          <option value="SOLD">Sold</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
