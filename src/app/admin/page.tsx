"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/constants";
import { formatPrice, extractYoutubeId, getWhatsAppUrl } from "@/lib/utils";
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

  // Add Property Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [propertyForm, setPropertyForm] = useState({
    propertyId: `VVS-TRY-${Math.floor(100 + Math.random() * 900)}`,
    title: "",
    titleTa: "",
    locality: "K.K. Nagar",
    propertyType: "Individual Houses",
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
    youtubeUrl: "",
    youtubeVideoId: "",
    coverImage: "",
    description: "",
  });

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
        setLoginError("Invalid password. Try 'vvsadmin2024'.");
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

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...propertyForm,
          price: parseFloat(propertyForm.price),
          plotAreaSqFt: parseFloat(propertyForm.plotAreaSqFt),
          builtUpAreaSqFt: parseFloat(propertyForm.builtUpAreaSqFt || "0"),
          bedrooms: parseInt(propertyForm.bedrooms || "0"),
          bathrooms: parseInt(propertyForm.bathrooms || "0"),
          roadWidthFt: parseInt(propertyForm.roadWidthFt || "30"),
          images: JSON.stringify([propertyForm.coverImage]),
          features: JSON.stringify([
            "DTCP Approved",
            "100% Vasthu",
            `${propertyForm.facing} Facing`,
            "Bank Loan Ready",
          ]),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAddModalOpen(false);
        fetchData();
        setPropertyForm({
          propertyId: `VVS-TRY-${Math.floor(100 + Math.random() * 900)}`,
          title: "",
          titleTa: "",
          locality: "K.K. Nagar",
          propertyType: "Individual Houses",
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
          youtubeUrl: "",
          youtubeVideoId: "",
          coverImage: "",
          description: "",
        });
      }
    } catch (err) {
      console.error(err);
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
                placeholder="Enter admin password (vvsadmin2024)"
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

          <div className="text-[11px] text-slate-400">
            Default credentials: <code className="text-gold-400 font-bold">vvsadmin2024</code>
          </div>
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
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition ${
                activeTab === "properties"
                  ? "bg-brand-black text-gold-400 shadow-gold border border-gold-500/30"
                  : "text-slate-600 hover:text-brand-black"
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Properties ({properties.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition ${
                activeTab === "leads"
                  ? "bg-brand-black text-gold-400 shadow-gold border border-gold-500/30"
                  : "text-slate-600 hover:text-brand-black"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Inquiries & Leads ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("promotions")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition ${
                activeTab === "promotions"
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
              onClick={() => setAddModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-gold-500 hover:bg-gold-400 text-brand-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-gold transition border border-gold-300"
            >
              <Plus className="w-4 h-4" />
              <span>Add Property (Under 2 Mins)</span>
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
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {properties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3">
                        <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0 border border-slate-200">
                          <Image src={prop.coverImage} alt={prop.title} fill className="object-cover" />
                        </div>
                      </td>
                      <td className="p-3 max-w-xs">
                        <span className="font-black text-gold-600 block">{prop.propertyId}</span>
                        <span className="font-bold text-slate-900 line-clamp-1">{prop.title}</span>
                        <span className="text-[10px] text-cyan-700 font-bold">{prop.propertyType}</span>
                      </td>
                      <td className="p-3 text-slate-700 font-bold">
                        {prop.locality}, Trichy
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
                        <button
                          onClick={() => togglePropertySold(prop.id, prop.isSold)}
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                            prop.isSold
                              ? "bg-red-100 text-red-800 border border-red-300"
                              : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          }`}
                        >
                          {prop.isSold ? "Sold Out" : "Available"}
                        </button>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <Link
                          href={`/properties/${prop.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-600 hover:text-cyan-700 inline-block"
                          title="View on site"
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
                  ))}
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      leadFilterType === type
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
                        `Hello ${lead.name}, this is Er. J. Vairavel's office (Veedu Veettumanai Santhai Pvt Ltd) following up on your request regarding ${
                          lead.propertyTitle || lead.preferredLocality || lead.selectedPackage || "property services"
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

      {/* FAST 2-MINUTE PROPERTY CREATION MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto border-2 border-gold-400">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-black text-brand-black">
                  Add New Property Listing (Fast 2-Minute Mode)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Paste a YouTube video URL to automatically extract the video ID and thumbnail!
                </p>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProperty} className="space-y-4 text-xs">
              {/* YouTube Video URL Input with Auto-Extraction */}
              <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-200 space-y-2">
                <label className="block font-black text-red-900">
                  YouTube Video Walkthrough URL * (Auto extracts ID & Cover)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                    value={propertyForm.youtubeUrl}
                    onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white rounded-xl border border-red-300 text-slate-900 focus:outline-none focus:border-red-500 text-xs font-medium"
                  />
                </div>
                {propertyForm.youtubeVideoId && (
                  <div className="text-[11px] text-red-800 flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
                    <span>Extracted Video ID: {propertyForm.youtubeVideoId}</span>
                  </div>
                )}
              </div>

              {propertyForm.coverImage && (
                <div className="relative aspect-video max-h-36 rounded-2xl overflow-hidden bg-brand-black border-2 border-gold-400">
                  <Image src={propertyForm.coverImage} alt="Cover preview" fill className="object-cover" />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
              </div>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  <label className="block font-bold text-slate-700 mb-1">Downpayment Offer (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹1 Lakh Downpayment"
                    value={propertyForm.downPaymentDisplay}
                    onChange={(e) => setPropertyForm({ ...propertyForm, downPaymentDisplay: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Plot Area (sq.ft)</label>
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
                <label className="block font-bold text-slate-700 mb-1">Property Description</label>
                <textarea
                  rows={3}
                  value={propertyForm.description}
                  onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                  placeholder="Vasthu compliant, 30 ft road, borewell sweet water, 85% bank loan approved..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-gold-500 hover:bg-gold-400 text-brand-black font-black uppercase tracking-wider shadow-gold border border-gold-300"
                >
                  Publish Property Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
