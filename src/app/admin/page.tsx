"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/constants";
import { formatPrice, extractYoutubeId, getWhatsAppUrl } from "@/lib/utils";
import {
  generatePropertyOptimization,
  generatePropertySlug,
  PropertyFaqItem,
} from "@/lib/propertySeo";
import {
  Lock,
  Building,
  Users,
  Video,
  Plus,
  Trash2,
  CheckCircle2,
  Download,
  Eye,
  LogOut,
  RefreshCw,
  MessageCircle,
  Phone,
  Share2,
  Pencil,
  Sparkles,
  Globe,
  MapPin,
  HelpCircle,
  Upload,
  ImagePlus,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"properties" | "leads" | "promotions">("properties");

  // Data states
  const [properties, setProperties] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const createEmptyForm = () => ({
    propertyId: `VVS-TRY-${Math.floor(100 + Math.random() * 900)}`,
    slug: "",
    title: "",
    titleTa: "",
    locality: "K.K. Nagar",
    propertyType: "Individual Houses",
    listingType: "Buy",
    address: "",
    price: "",
    priceDisplay: "",
    downPayment: "",
    downPaymentDisplay: "",
    plotAreaSqFt: "1200",
    builtUpAreaSqFt: "1100",
    bedrooms: "2",
    bathrooms: "2",
    facing: "North",
    roadWidthFt: "30",
    approvalStatus: "DTCP & RERA Approved",
    bankLoanEligible: true,
    isFeatured: true,
    youtubeUrl: "",
    youtubeVideoId: "",
    coverImage: "/images/hero-villa.jpg",
    galleryImages: [] as string[],
    description: "",
    descriptionTa: "",
    featuresText: "DTCP Approved, 100% Vasthu, North Facing, Bank Loan Ready",
    // SEO
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    canonicalUrl: "",
    // AEO
    aeoSummary: "",
    aeoFaqs: [] as PropertyFaqItem[],
    // GEO
    latitude: "",
    longitude: "",
    microMarket: "",
    nearbyLandmarks: "",
    geoSummary: "",
  });

  // Add / Edit Property Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState<"details" | "seo" | "aeo" | "geo">("details");
  const [saveError, setSaveError] = useState("");
  const [savingProperty, setSavingProperty] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [propertyForm, setPropertyForm] = useState(createEmptyForm);

  // Leads Filter
  const [leadFilterType, setLeadFilterType] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("vvs_staff_auth");
    if (token === "authenticated_vvs_staff") {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("vvs_staff_auth", "authenticated_vvs_staff");
        fetchData();
      } else {
        setLoginError("Invalid password. Please try again.");
      }
    } catch {
      setLoginError("Login failed");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("vvs_staff_auth");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [propRes, leadRes, promRes] = await Promise.all([
        fetch("/api/properties"),
        fetch("/api/leads"),
        fetch("/api/promote"),
      ]);
      const [propData, leadData, promData] = await Promise.all([
        propRes.json(),
        leadRes.json(),
        promRes.json(),
      ]);

      if (propData.properties) setProperties(propData.properties);
      if (leadData.leads) setLeads(leadData.leads);
      if (promData.promotions) setPromotions(promData.promotions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-extract YouTube ID and thumbnail cover image
  const handleYoutubeUrlChange = (url: string) => {
    const videoId = extractYoutubeId(url);
    const cover = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
    setPropertyForm((prev) => ({
      ...prev,
      youtubeUrl: url,
      youtubeVideoId: videoId,
      coverImage: cover || prev.coverImage,
    }));
  };

  const handlePriceChange = (val: string) => {
    const num = parseFloat(val);
    const display = isNaN(num) ? "" : formatPrice(num);
    setPropertyForm((prev) => ({
      ...prev,
      price: val,
      priceDisplay: display,
    }));
  };

  const openAddModal = () => {
    setEditingPropertyId(null);
    setModalTab("details");
    setSaveError("");
    setPropertyForm(createEmptyForm());
    setAddModalOpen(true);
  };

  const openEditModal = (prop: any) => {
    setEditingPropertyId(prop.id);
    setModalTab("details");
    setSaveError("");
    let parsedFaqs: PropertyFaqItem[] = [];
    try {
      parsedFaqs = prop.aeoFaqs ? JSON.parse(prop.aeoFaqs) : [];
    } catch {
      parsedFaqs = [];
    }
    let parsedFeatures = "";
    try {
      const arr = prop.features ? JSON.parse(prop.features) : [];
      parsedFeatures = Array.isArray(arr) ? arr.join(", ") : "";
    } catch {
      parsedFeatures = "";
    }
    let parsedImages: string[] = [];
    try {
      const arr = prop.images ? JSON.parse(prop.images) : [];
      parsedImages = Array.isArray(arr) ? arr.filter(Boolean) : [];
    } catch {
      parsedImages = [];
    }

    setPropertyForm({
      propertyId: prop.propertyId || "",
      slug: prop.slug || "",
      title: prop.title || "",
      titleTa: prop.titleTa || "",
      locality: prop.locality || "K.K. Nagar",
      propertyType: prop.propertyType || "Individual Houses",
      listingType: prop.listingType || "Buy",
      address: prop.address || "",
      price: prop.price ? String(prop.price) : "",
      priceDisplay: prop.priceDisplay || "",
      downPayment: prop.downPayment ? String(prop.downPayment) : "",
      downPaymentDisplay: prop.downPaymentDisplay || "",
      plotAreaSqFt: prop.plotAreaSqFt ? String(prop.plotAreaSqFt) : "1200",
      builtUpAreaSqFt: prop.builtUpAreaSqFt ? String(prop.builtUpAreaSqFt) : "",
      bedrooms: prop.bedrooms ? String(prop.bedrooms) : "",
      bathrooms: prop.bathrooms ? String(prop.bathrooms) : "",
      facing: prop.facing || "North",
      roadWidthFt: prop.roadWidthFt ? String(prop.roadWidthFt) : "30",
      approvalStatus: prop.approvalStatus || "DTCP & RERA Approved",
      bankLoanEligible: prop.bankLoanEligible !== false,
      isFeatured: Boolean(prop.isFeatured),
      youtubeUrl: prop.youtubeUrl || "",
      youtubeVideoId: prop.youtubeVideoId || "",
      coverImage: prop.coverImage || "/images/hero-villa.jpg",
      galleryImages: parsedImages,
      description: prop.description || "",
      descriptionTa: prop.descriptionTa || "",
      featuresText: parsedFeatures,
      seoTitle: prop.seoTitle || "",
      seoDescription: prop.seoDescription || "",
      seoKeywords: prop.seoKeywords || "",
      canonicalUrl: prop.canonicalUrl || "",
      aeoSummary: prop.aeoSummary || "",
      aeoFaqs: parsedFaqs,
      latitude: prop.latitude !== null && prop.latitude !== undefined ? String(prop.latitude) : "",
      longitude: prop.longitude !== null && prop.longitude !== undefined ? String(prop.longitude) : "",
      microMarket: prop.microMarket || "",
      nearbyLandmarks: prop.nearbyLandmarks || "",
      geoSummary: prop.geoSummary || "",
    });
    setAddModalOpen(true);
  };

  const handleAutoGenerateSeoAeoGeo = () => {
    if (!propertyForm.title) {
      setSaveError("Enter a Property Title first to auto-generate SEO, AEO & GEO fields.");
      return;
    }
    setSaveError("");
    const priceNum = parseFloat(propertyForm.price || "0");
    const priceDisp =
      propertyForm.priceDisplay || (priceNum > 0 ? formatPrice(priceNum) : "Price on Request");
    const generated = generatePropertyOptimization({
      propertyId: propertyForm.propertyId,
      slug: propertyForm.slug,
      title: propertyForm.title,
      description: propertyForm.description,
      propertyType: propertyForm.propertyType,
      listingType: propertyForm.listingType,
      locality: propertyForm.locality,
      address: propertyForm.address,
      priceDisplay: priceDisp,
      plotAreaSqFt: propertyForm.plotAreaSqFt || "1200",
      builtUpAreaSqFt: propertyForm.builtUpAreaSqFt,
      bedrooms: propertyForm.bedrooms,
      facing: propertyForm.facing,
      roadWidthFt: propertyForm.roadWidthFt,
      approvalStatus: propertyForm.approvalStatus,
      bankLoanEligible: propertyForm.bankLoanEligible,
    });

    setPropertyForm((prev) => ({
      ...prev,
      slug:
        prev.slug ||
        generatePropertySlug(prev.title, prev.locality, prev.propertyId),
      seoTitle: generated.seoTitle,
      seoDescription: generated.seoDescription,
      seoKeywords: generated.seoKeywords,
      aeoSummary: generated.aeoSummary,
      aeoFaqs: generated.aeoFaqs,
      latitude: String(generated.latitude),
      longitude: String(generated.longitude),
      microMarket: generated.microMarket,
      nearbyLandmarks: generated.nearbyLandmarks,
      geoSummary: generated.geoSummary,
    }));
  };

  const handleImageUpload = async (files: FileList | null, asCover: boolean) => {
    if (!files || files.length === 0) return;
    setUploadingImages(true);
    setSaveError("");
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files", file));

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.success || !Array.isArray(data.urls)) {
        setSaveError(data.error || "Image upload failed.");
        return;
      }

      setPropertyForm((prev) => {
        const mergedGallery = Array.from(
          new Set([...(prev.galleryImages || []), ...data.urls])
        );
        return {
          ...prev,
          coverImage: asCover ? data.urls[0] : prev.coverImage || data.urls[0],
          galleryImages: mergedGallery,
        };
      });
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError("");
    setSavingProperty(true);
    try {
      const featuresArray = propertyForm.featuresText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...propertyForm,
        price: parseFloat(propertyForm.price),
        downPayment: propertyForm.downPayment ? parseFloat(propertyForm.downPayment) : null,
        plotAreaSqFt: parseFloat(propertyForm.plotAreaSqFt || "1200"),
        builtUpAreaSqFt: propertyForm.builtUpAreaSqFt
          ? parseFloat(propertyForm.builtUpAreaSqFt)
          : null,
        bedrooms: propertyForm.bedrooms ? parseInt(propertyForm.bedrooms, 10) : null,
        bathrooms: propertyForm.bathrooms ? parseInt(propertyForm.bathrooms, 10) : null,
        roadWidthFt: propertyForm.roadWidthFt
          ? parseInt(propertyForm.roadWidthFt, 10)
          : null,
        latitude: propertyForm.latitude ? parseFloat(propertyForm.latitude) : null,
        longitude: propertyForm.longitude ? parseFloat(propertyForm.longitude) : null,
        images: JSON.stringify(
          Array.from(
            new Set([
              propertyForm.coverImage || "/images/hero-villa.jpg",
              ...(propertyForm.galleryImages || []),
            ].filter(Boolean))
          )
        ),
        features: JSON.stringify(
          featuresArray.length > 0
            ? featuresArray
            : [
              propertyForm.approvalStatus,
              "100% Vasthu",
              `${propertyForm.facing} Facing`,
              "Bank Loan Ready",
            ]
        ),
        aeoFaqs: JSON.stringify(propertyForm.aeoFaqs || []),
      };

      const url = editingPropertyId
        ? `/api/properties/${editingPropertyId}`
        : "/api/properties";
      const method = editingPropertyId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setAddModalOpen(false);
        setEditingPropertyId(null);
        fetchData();
        setPropertyForm(createEmptyForm());
      } else {
        setSaveError(data.details || data.error || "Failed to save property");
      }
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Failed to save property");
    } finally {
      setSavingProperty(false);
    }
  };

  const togglePropertySold = async (id: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSold: !currentStatus }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProperty = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    try {
      await fetch(`/api/properties/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const updateLeadStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const exportLeadsToCSV = () => {
    if (leads.length === 0) return;
    const headers = [
      "ID",
      "Date",
      "Lead Type",
      "Name",
      "Phone",
      "Email",
      "Property / Locality",
      "Budget",
      "Status",
      "Source",
    ];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.leadType || ""}"`,
      `"${l.name || ""}"`,
      `"${l.phone || ""}"`,
      `"${l.email || ""}"`,
      `"${l.propertyTitle || l.preferredLocality || l.plotLocation || ""}"`,
      `"${l.budget || ""}"`,
      l.status,
      l.source,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `VVS_Trichy_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-brand-dark border-2 border-gold-400/50 rounded-3xl p-8 shadow-gold text-center space-y-6">
          <div className="w-16 h-16 bg-brand-black text-gold-400 rounded-2xl flex items-center justify-center mx-auto border-2 border-gold-400/40">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-xl font-black text-white">Staff & Admin Portal</h1>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Veedu Veettumanai Santhai Pvt Ltd • Er. J. Vairavel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-brand-black border border-slate-700 text-white text-xs focus:outline-none focus:border-gold-400"
              />
            </div>

            {loginError && (
              <div className="text-xs text-red-400 bg-red-950/50 p-2 rounded-xl border border-red-800 text-center font-bold">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-gold-500 text-brand-black font-black text-xs uppercase tracking-wider transition shadow-gold border border-gold-300"
            >
              Sign In to Staff Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredLeads = leads.filter((l) => {
    if (leadFilterType === "All") return true;
    return l.leadType === leadFilterType;
  });

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      {/* Admin Top Bar Styled in Brand Black & Gold */}
      <div className="bg-brand-black text-white border-b-2 border-gold-500/40 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gold-400 bg-brand-black shadow-gold">
              <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <div>
              <div className="font-black text-sm sm:text-base text-white">
                VVS Staff Control Center
              </div>
              <div className="text-[11px] text-gold-400 font-bold">
                Veedu Veettumanai Santhai Pvt Ltd • Trichy
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="p-2.5 rounded-xl bg-brand-dark text-slate-300 hover:text-white border border-slate-700 transition"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-brand-dark hover:bg-red-950 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveTab("properties")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition ${activeTab === "properties"
                ? "bg-brand-black text-gold-400 shadow-gold border border-gold-500/30"
                : "text-slate-600 hover:text-brand-black"
                }`}
            >
              <Building className="w-4 h-4" />
              <span>Properties ({properties.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition ${activeTab === "leads"
                ? "bg-brand-black text-gold-400 shadow-gold border border-gold-500/30"
                : "text-slate-600 hover:text-brand-black"
                }`}
            >
              <Users className="w-4 h-4" />
              <span>Inquiries & Leads ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("promotions")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition ${activeTab === "promotions"
                ? "bg-brand-black text-gold-400 shadow-gold border border-gold-500/30"
                : "text-slate-600 hover:text-brand-black"
                }`}
            >
              <Share2 className="w-4 h-4" />
              <span>Promote Requests ({promotions.length})</span>
            </button>
          </div>

          {activeTab === "properties" && (
            <button
              onClick={openAddModal}
              className="px-4 py-3 rounded-2xl bg-gold-500 hover:bg-gold-400 text-brand-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-gold transition border border-gold-300"
            >
              <Plus className="w-4 h-4" />
              <span>Add Property</span>
            </button>
          )}

          {activeTab === "leads" && (
            <button
              onClick={exportLeadsToCSV}
              className="px-4 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition border border-emerald-500/30"
            >
              <Download className="w-4 h-4" />
              <span>Export Leads to CSV</span>
            </button>
          )}
        </div>

        {/* TAB 1: PROPERTIES MANAGEMENT */}
        {activeTab === "properties" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs font-black text-slate-600 uppercase tracking-wider">
              <span>All Active & Sold Properties ({properties.length})</span>
              <span className="text-gold-700">Fast 2-Minute YouTube Importer Enabled</span>
            </div>

            <div className="overflow-x-auto touch-scroll">
              <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                    <th className="p-3">Thumbnail</th>
                    <th className="p-3">ID & Title</th>
                    <th className="p-3">Locality</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">YouTube</th>
                    <th className="p-3">AEO / GEO / SEO</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {properties.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-10 text-center text-slate-500 font-semibold">
                        No properties in database yet. Click &ldquo;Add Property&rdquo; to publish your first verified listing.
                      </td>
                    </tr>
                  ) : (
                    properties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-3">
                          <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0 border border-slate-200">
                            <Image src={prop.coverImage || "/images/hero-villa.jpg"} alt={prop.title} fill className="object-cover" />
                          </div>
                        </td>
                        <td className="p-3 max-w-xs">
                          <span className="font-black text-gold-600 block">{prop.propertyId}</span>
                          <span className="font-bold text-slate-900 line-clamp-1">{prop.title}</span>
                          <span className="text-[10px] text-cyan-700 font-bold">{prop.propertyType}</span>
                        </td>
                        <td className="p-3 text-slate-700 font-bold">
                          {prop.locality}, {prop.city || "Trichy"}
                        </td>
                        <td className="p-3 font-black text-brand-black">
                          {prop.priceDisplay}
                        </td>
                        <td className="p-3">
                          {prop.youtubeVideoId ? (
                            <a
                              href={`https://www.youtube.com/watch?v=${prop.youtubeVideoId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-600 font-bold flex items-center gap-1 hover:underline"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>Watch</span>
                            </a>
                          ) : (
                            <span className="text-slate-400">No Video</span>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${prop.seoTitle ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-400"}`}>
                              SEO
                            </span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${prop.aeoSummary ? "bg-cyan-100 text-cyan-800" : "bg-slate-100 text-slate-400"}`}>
                              AEO
                            </span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${prop.geoSummary || prop.latitude ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-400"}`}>
                              GEO
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => togglePropertySold(prop.id, prop.isSold)}
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${prop.isSold
                              ? "bg-red-100 text-red-800 border border-red-300"
                              : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              }`}
                          >
                            {prop.isSold ? "Sold Out" : "Available"}
                          </button>
                        </td>
                        <td className="p-3 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => openEditModal(prop)}
                            className="p-1.5 text-slate-600 hover:text-amber-600 inline-block"
                            title="Edit Property & AEO/GEO/SEO"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/properties/${prop.slug}`}
                            target="_blank"
                            className="p-1.5 text-slate-600 hover:text-cyan-700 inline-block"
                            title="View on Marketplace"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => deleteProperty(prop.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 inline-block"
                            title="Delete Property"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: LEADS & INQUIRIES MANAGEMENT */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            {/* Filter toolbar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <span className="text-xs font-bold text-slate-600">Filter:</span>
              {["All", "Property Site Visit", "Construction Inquiry", "Survey Requirement", "General Contact"].map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => setLeadFilterType(type)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${leadFilterType === type
                      ? "bg-brand-black text-gold-400 shadow-gold border border-gold-500/40"
                      : "bg-white text-slate-600 hover:bg-slate-200"
                      }`}
                  >
                    {type}
                  </button>
                )
              )}
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto touch-scroll">
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                      <th className="p-3">Date</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Buyer Name</th>
                      <th className="p-3">Phone & WhatsApp</th>
                      <th className="p-3">Property / Locality / Specs</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Quick Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map((lead) => {
                      const waLink = getWhatsAppUrl(
                        lead.phone,
                        `Hello ${lead.name}, this is Er. J. Vairavel's office (Veedu Veettumanai Santhai Pvt Ltd) following up on your request regarding ${lead.propertyTitle || lead.preferredLocality || lead.selectedPackage || "property services"
                        }.`
                      );

                      return (
                        <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-3 text-slate-500 whitespace-nowrap font-medium">
                            {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-cyan-50 text-cyan-800 border border-cyan-200">
                              {lead.leadType}
                            </span>
                          </td>
                          <td className="p-3 font-black text-brand-black">{lead.name}</td>
                          <td className="p-3 font-bold text-slate-700">{lead.phone}</td>
                          <td className="p-3 max-w-xs">
                            <div className="font-bold text-slate-800 line-clamp-1">
                              {lead.propertyTitle || lead.preferredLocality || lead.plotLocation || "Trichy"}
                            </div>
                            {lead.budget && (
                              <div className="text-[10px] text-slate-500 font-semibold">
                                Budget: {lead.budget}
                              </div>
                            )}
                            {lead.selectedPackage && (
                              <div className="text-[10px] text-gold-600 font-black">
                                {lead.selectedPackage}
                              </div>
                            )}
                          </td>
                          <td className="p-3">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                              className="bg-slate-100 text-slate-800 font-bold px-2 py-1 rounded-xl text-xs border border-slate-200 focus:outline-none"
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="SITE_VISIT_SCHEDULED">SITE VISIT</option>
                              <option value="CLOSED">CLOSED</option>
                            </select>
                          </td>
                          <td className="p-3 text-right space-x-1">
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white inline-flex items-center gap-1 text-[11px] font-black"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href={`tel:${lead.phone}`}
                              className="p-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 inline-block"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROMOTION REQUESTS */}
        {activeTab === "promotions" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto touch-scroll">
              <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                    <th className="p-3">Date</th>
                    <th className="p-3">Owner Name</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Property Type</th>
                    <th className="p-3">Locality</th>
                    <th className="p-3">Asking Price</th>
                    <th className="p-3">Notes</th>
                    <th className="p-3 text-right">Connect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {promotions.map((prom) => {
                    const wa = getWhatsAppUrl(
                      prom.phone,
                      `Hello ${prom.ownerName}, regarding your YouTube video shoot request for your property in ${prom.locality}, Trichy...`
                    );
                    return (
                      <tr key={prom.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-3 text-slate-400 font-medium">
                          {new Date(prom.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 font-black text-brand-black">{prom.ownerName}</td>
                        <td className="p-3 font-bold text-slate-700">{prom.phone}</td>
                        <td className="p-3 font-semibold">{prom.propertyType}</td>
                        <td className="p-3 font-bold text-cyan-800">{prom.locality}</td>
                        <td className="p-3 font-black text-gold-600">{prom.askingPrice}</td>
                        <td className="p-3 max-w-xs line-clamp-1 text-slate-500">
                          {prom.notes || "None"}
                        </td>
                        <td className="p-3 text-right">
                          <a
                            href={wa}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black inline-flex items-center gap-1 shadow-sm"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ADD / EDIT PROPERTY MODAL WITH EDITABLE SEO, AEO & GEO */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto border-2 border-gold-400">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-black text-brand-black">
                  {editingPropertyId ? "Edit Property & AEO / GEO / SEO" : "Add New Property Listing"}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Full property editor with editable Search (SEO), Answer Engine (AEO), and Geographic (GEO) optimization.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAutoGenerateSeoAeoGeo}
                  className="px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-300 font-black text-xs flex items-center gap-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Auto-Generate SEO/AEO/GEO</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold px-2 py-1"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Section Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-2xl mb-5 text-xs font-black">
              <button
                type="button"
                onClick={() => setModalTab("details")}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${modalTab === "details" ? "bg-brand-black text-gold-400 shadow-sm" : "text-slate-600 hover:text-brand-black"
                  }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Core Details</span>
              </button>
              <button
                type="button"
                onClick={() => setModalTab("seo")}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${modalTab === "seo" ? "bg-brand-black text-gold-400 shadow-sm" : "text-slate-600 hover:text-brand-black"
                  }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>SEO</span>
              </button>
              <button
                type="button"
                onClick={() => setModalTab("aeo")}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${modalTab === "aeo" ? "bg-brand-black text-gold-400 shadow-sm" : "text-slate-600 hover:text-brand-black"
                  }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>AEO (FAQs)</span>
              </button>
              <button
                type="button"
                onClick={() => setModalTab("geo")}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${modalTab === "geo" ? "bg-brand-black text-gold-400 shadow-sm" : "text-slate-600 hover:text-brand-black"
                  }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>GEO (Local AI)</span>
              </button>
            </div>

            {saveError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                {saveError}
              </div>
            )}

            <form onSubmit={handleSaveProperty} className="space-y-4 text-xs">
              {modalTab === "details" && (
                <>
                  {/* YouTube Video URL Input with Auto-Extraction */}
                  <div className="bg-red-50 p-4 rounded-2xl border border-red-200 space-y-2">
                    <label className="block font-black text-red-900">
                      YouTube Video Walkthrough URL (Optional — Auto extracts ID & Thumbnail)
                    </label>
                    <input
                      type="text"
                      placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                      value={propertyForm.youtubeUrl}
                      onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-red-300 text-slate-900 focus:outline-none focus:border-red-500 text-xs font-medium"
                    />
                    {propertyForm.youtubeVideoId && (
                      <div className="text-[11px] text-red-800 flex items-center gap-1.5 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
                        <span>Extracted Video ID: {propertyForm.youtubeVideoId}</span>
                      </div>
                    )}
                  </div>

                  {/* Property Image Upload (Cover & Gallery) */}
                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <label className="block font-black text-amber-950">
                          Property Photos (Upload Cover &amp; Gallery Images) *
                        </label>
                        <p className="text-[11px] text-amber-800">
                          Upload JPG, PNG, WEBP, or AVIF photos (max 8 MB each), or paste an image URL below.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#202020] hover:bg-slate-800 text-[#F9DB5C] font-black text-[11px] transition shadow-sm">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingImages ? "Uploading..." : "Upload Cover"}</span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/avif"
                            disabled={uploadingImages}
                            onChange={(e) => {
                              handleImageUpload(e.target.files, true);
                              e.target.value = "";
                            }}
                            className="hidden"
                          />
                        </label>
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 font-black text-[11px] transition">
                          <ImagePlus className="w-3.5 h-3.5 text-amber-700" />
                          <span>+ Add Gallery Photos</span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/avif"
                            multiple
                            disabled={uploadingImages}
                            onChange={(e) => {
                              handleImageUpload(e.target.files, false);
                              e.target.value = "";
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Cover Image Preview + URL / Preset */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-3">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-amber-300">
                          <Image
                            src={propertyForm.coverImage || "/images/hero-villa.jpg"}
                            alt="Cover preview"
                            fill
                            className="object-cover"
                          />
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/75 text-[#F9DB5C] text-[9px] font-black">
                            COVER
                          </span>
                        </div>
                      </div>
                      <div className="sm:col-span-6">
                        <label className="block font-bold text-slate-700 mb-1">Cover Image Path / URL *</label>
                        <input
                          type="text"
                          required
                          placeholder="/api/uploads/... or /images/hero-villa.jpg"
                          value={propertyForm.coverImage}
                          onChange={(e) => setPropertyForm({ ...propertyForm, coverImage: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block font-bold text-slate-700 mb-1">Quick Preset</label>
                        <select
                          value={propertyForm.coverImage}
                          onChange={(e) => setPropertyForm({ ...propertyForm, coverImage: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium"
                        >
                          <option value="/images/hero-villa.jpg">Luxury Villa</option>
                          <option value="/images/dtcp-plots.jpg">DTCP Plots</option>
                          <option value="/images/turnkey-home.jpg">Individual House</option>
                          <option value="/images/luxury-interior.jpg">Villa Interior</option>
                        </select>
                      </div>
                    </div>

                    {/* Uploaded Gallery Thumbnails */}
                    {propertyForm.galleryImages.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-bold text-slate-700 block">
                          Gallery Photos ({propertyForm.galleryImages.length})
                        </span>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {propertyForm.galleryImages.map((imgUrl, idx) => (
                            <div
                              key={`${imgUrl}-${idx}`}
                              className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-slate-900 group ${
                                propertyForm.coverImage === imgUrl ? "border-gold-500" : "border-slate-200"
                              }`}
                            >
                              <Image src={imgUrl} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                              <div className="absolute inset-x-0 bottom-0 p-1 bg-black/70 flex items-center justify-between gap-1">
                                <button
                                  type="button"
                                  onClick={() => setPropertyForm((prev) => ({ ...prev, coverImage: imgUrl }))}
                                  className="text-[9px] font-black text-[#F9DB5C] hover:underline"
                                >
                                  {propertyForm.coverImage === imgUrl ? "Cover" : "Set Cover"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPropertyForm((prev) => ({
                                      ...prev,
                                      galleryImages: prev.galleryImages.filter((_, i) => i !== idx),
                                    }))
                                  }
                                  className="text-[10px] font-black text-red-400 hover:text-red-300"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Property ID *</label>
                      <input
                        type="text"
                        required
                        value={propertyForm.propertyId}
                        onChange={(e) => setPropertyForm({ ...propertyForm, propertyId: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Locality (Trichy) *</label>
                      <select
                        value={propertyForm.locality}
                        onChange={(e) => setPropertyForm({ ...propertyForm, locality: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                      >
                        {COMPANY_INFO.trichyLocalities.map((loc) => (
                          <option key={loc.en} value={loc.en}>
                            {loc.en}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Property Type *</label>
                      <select
                        value={propertyForm.propertyType}
                        onChange={(e) => setPropertyForm({ ...propertyForm, propertyType: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                      >
                        {COMPANY_INFO.propertyTypes.map((pt) => (
                          <option key={pt.en} value={pt.en}>
                            {pt.en}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Listing Type</label>
                      <select
                        value={propertyForm.listingType}
                        onChange={(e) => setPropertyForm({ ...propertyForm, listingType: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                      >
                        <option value="Buy">Buy (Sale)</option>
                        <option value="Rent">Rent / Lease</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Property Title (English) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Brand New 3BHK Luxury Duplex Villa near Ring Road"
                        value={propertyForm.title}
                        onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Property Title (Tamil - Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. கே.கே. நகர் ரிங் ரோடு அருகில் 3BHK வில்லா"
                        value={propertyForm.titleTa}
                        onChange={(e) => setPropertyForm({ ...propertyForm, titleTa: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Street / Layout Address</label>
                    <input
                      type="text"
                      placeholder="e.g. Plot 14, Ring Road Extension, K.K. Nagar, Tiruchirappalli"
                      value={propertyForm.address}
                      onChange={(e) => setPropertyForm({ ...propertyForm, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Price (₹ Numeric) *</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 4500000"
                        value={propertyForm.price}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                      />
                      {propertyForm.priceDisplay && (
                        <span className="text-[10px] text-emerald-700 font-bold mt-0.5 block">
                          Display: {propertyForm.priceDisplay}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Downpayment Offer (Text)</label>
                      <input
                        type="text"
                        placeholder="e.g. ₹1 Lakh Downpayment"
                        value={propertyForm.downPaymentDisplay}
                        onChange={(e) => setPropertyForm({ ...propertyForm, downPaymentDisplay: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Approval Status</label>
                      <select
                        value={propertyForm.approvalStatus}
                        onChange={(e) => setPropertyForm({ ...propertyForm, approvalStatus: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                      >
                        <option value="DTCP & RERA Approved">DTCP & RERA Approved</option>
                        <option value="DTCP Approved">DTCP Approved</option>
                        <option value="RERA Approved">RERA Approved</option>
                        <option value="Corporation Approved">Corporation Approved</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Plot (sq.ft)</label>
                      <input
                        type="number"
                        value={propertyForm.plotAreaSqFt}
                        onChange={(e) => setPropertyForm({ ...propertyForm, plotAreaSqFt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Built-Up (sq.ft)</label>
                      <input
                        type="number"
                        value={propertyForm.builtUpAreaSqFt}
                        onChange={(e) => setPropertyForm({ ...propertyForm, builtUpAreaSqFt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">BHK</label>
                      <input
                        type="number"
                        value={propertyForm.bedrooms}
                        onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Road (ft)</label>
                      <input
                        type="number"
                        value={propertyForm.roadWidthFt}
                        onChange={(e) => setPropertyForm({ ...propertyForm, roadWidthFt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Facing</label>
                      <select
                        value={propertyForm.facing}
                        onChange={(e) => setPropertyForm({ ...propertyForm, facing: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                      >
                        <option value="North">North</option>
                        <option value="East">East</option>
                        <option value="South">South</option>
                        <option value="West">West</option>
                        <option value="North-East">North-East</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Amenities / Highlights (comma-separated)</label>
                    <input
                      type="text"
                      value={propertyForm.featuresText}
                      onChange={(e) => setPropertyForm({ ...propertyForm, featuresText: e.target.value })}
                      placeholder="DTCP Approved, 100% Vasthu, 33ft Tar Road, Sweet Borewell Water"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Property Description</label>
                    <textarea
                      rows={3}
                      value={propertyForm.description}
                      onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                      placeholder="Vasthu compliant, 30 ft road, borewell sweet water, 80% bank loan approved..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                    />
                  </div>

                  <div className="flex flex-wrap gap-6 pt-1">
                    <label className="inline-flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={propertyForm.bankLoanEligible}
                        onChange={(e) => setPropertyForm({ ...propertyForm, bankLoanEligible: e.target.checked })}
                        className="rounded border-slate-300"
                      />
                      <span>Bank Loan Eligible (SBI / HDFC / LIC)</span>
                    </label>
                    <label className="inline-flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={propertyForm.isFeatured}
                        onChange={(e) => setPropertyForm({ ...propertyForm, isFeatured: e.target.checked })}
                        className="rounded border-slate-300"
                      />
                      <span>Feature on Homepage Marketplace</span>
                    </label>
                  </div>
                </>
              )}

              {modalTab === "seo" && (
                <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">URL Slug (Editable)</label>
                    <input
                      type="text"
                      placeholder="auto-generated-from-title-if-blank"
                      value={propertyForm.slug}
                      onChange={(e) => setPropertyForm({ ...propertyForm, slug: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="font-bold text-slate-700">SEO Meta Title</label>
                      <span className="text-[10px] text-slate-500">{propertyForm.seoTitle.length}/70 chars</span>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. 3BHK Luxury Villa for Sale in K.K. Nagar, Trichy | ₹65 Lakhs"
                      value={propertyForm.seoTitle}
                      onChange={(e) => setPropertyForm({ ...propertyForm, seoTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="font-bold text-slate-700">SEO Meta Description</label>
                      <span className="text-[10px] text-slate-500">{propertyForm.seoDescription.length}/160 chars</span>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Concise search snippet with locality, approval status, price & Er. J. Vairavel verification..."
                      value={propertyForm.seoDescription}
                      onChange={(e) => setPropertyForm({ ...propertyForm, seoDescription: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">SEO Keywords (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="DTCP plots Trichy, K.K. Nagar villa, Er J Vairavel"
                      value={propertyForm.seoKeywords}
                      onChange={(e) => setPropertyForm({ ...propertyForm, seoKeywords: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Canonical URL (Optional)</label>
                    <input
                      type="text"
                      placeholder="https://imclass.co.in/properties/..."
                      value={propertyForm.canonicalUrl}
                      onChange={(e) => setPropertyForm({ ...propertyForm, canonicalUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium"
                    />
                  </div>
                </div>
              )}

              {modalTab === "aeo" && (
                <div className="space-y-4 bg-cyan-50/50 p-4 rounded-2xl border border-cyan-200">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      AEO Direct Answer Summary (For AI Overviews, ChatGPT, Perplexity)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Clear 1-2 sentence factual answer: what it is, location, price, approval, and loan eligibility..."
                      value={propertyForm.aeoSummary}
                      onChange={(e) => setPropertyForm({ ...propertyForm, aeoSummary: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-cyan-200 text-slate-900 font-medium"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="font-black text-slate-800">
                        Property Q&amp;A / FAQPairs (Emits FAQPage JSON-LD Schema)
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setPropertyForm((prev) => ({
                            ...prev,
                            aeoFaqs: [...prev.aeoFaqs, { question: "", answer: "" }],
                          }))
                        }
                        className="px-2.5 py-1 rounded-lg bg-cyan-600 text-white font-bold text-[11px] hover:bg-cyan-700"
                      >
                        + Add Q&amp;A
                      </button>
                    </div>

                    {propertyForm.aeoFaqs.length === 0 ? (
                      <div className="p-4 rounded-xl bg-white border border-dashed border-cyan-300 text-slate-500 text-center">
                        No FAQs added yet. Click &ldquo;Auto-Generate SEO/AEO/GEO&rdquo; above or &ldquo;+ Add Q&amp;A&rdquo;.
                      </div>
                    ) : (
                      propertyForm.aeoFaqs.map((faq, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white border border-cyan-200 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-black text-cyan-700">FAQ #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() =>
                                setPropertyForm((prev) => ({
                                  ...prev,
                                  aeoFaqs: prev.aeoFaqs.filter((_, i) => i !== idx),
                                }))
                              }
                              className="text-red-500 hover:text-red-700 font-bold"
                            >
                              Remove
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Question (e.g., Is this plot DTCP approved?)"
                            value={faq.question}
                            onChange={(e) => {
                              const updated = [...propertyForm.aeoFaqs];
                              updated[idx] = { ...updated[idx], question: e.target.value };
                              setPropertyForm({ ...propertyForm, aeoFaqs: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-bold"
                          />
                          <textarea
                            rows={2}
                            placeholder="Direct factual answer..."
                            value={faq.answer}
                            onChange={(e) => {
                              const updated = [...propertyForm.aeoFaqs];
                              updated[idx] = { ...updated[idx], answer: e.target.value };
                              setPropertyForm({ ...propertyForm, aeoFaqs: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {modalTab === "geo" && (
                <div className="space-y-4 bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Latitude (GeoCoordinates)</label>
                      <input
                        type="number"
                        step="any"
                        placeholder="e.g. 10.7686"
                        value={propertyForm.latitude}
                        onChange={(e) => setPropertyForm({ ...propertyForm, latitude: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-amber-200 text-slate-900 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Longitude (GeoCoordinates)</label>
                      <input
                        type="number"
                        step="any"
                        placeholder="e.g. 78.6856"
                        value={propertyForm.longitude}
                        onChange={(e) => setPropertyForm({ ...propertyForm, longitude: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-amber-200 text-slate-900 font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Micro-Market / Growth Corridor</label>
                    <input
                      type="text"
                      placeholder="e.g. K.K. Nagar – Olaiyur Ring Road Residential Corridor"
                      value={propertyForm.microMarket}
                      onChange={(e) => setPropertyForm({ ...propertyForm, microMarket: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-amber-200 text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nearby Landmarks &amp; Distances</label>
                    <input
                      type="text"
                      placeholder="e.g. Panjappur Bus Terminus (4 km), Trichy Airport (6.5 km)"
                      value={propertyForm.nearbyLandmarks}
                      onChange={(e) => setPropertyForm({ ...propertyForm, nearbyLandmarks: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-amber-200 text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      GEO Local &amp; Generative Entity Summary
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Local market context, infrastructure connectivity, and corridor growth highlights..."
                      value={propertyForm.geoSummary}
                      onChange={(e) => setPropertyForm({ ...propertyForm, geoSummary: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-amber-200 text-slate-900 font-medium"
                    />
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProperty}
                  className="px-6 py-2.5 rounded-2xl bg-gold-500 hover:bg-gold-400 text-brand-black font-black uppercase tracking-wider shadow-gold border border-gold-300 disabled:opacity-60"
                >
                  {savingProperty
                    ? "Saving..."
                    : editingPropertyId
                      ? "Save Property Changes"
                      : "Publish Property Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
