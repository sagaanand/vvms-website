"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import {
  Send,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Compass,
  RotateCcw,
  ExternalLink,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  textTa?: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    labelTa: string;
    waTopic: string;
  };
}

const KNOWLEDGE_BASE = [
  {
    keywords: ["dtcp", "panchayat", "approval", "rera", "அப்ரூவல்", "டிடிசிபி", "பஞ்சாயத்து"],
    answerEn:
      "Under Tamil Nadu Town and Country Planning laws and the landmark 2016 Madras High Court ruling, Village Panchayats have NO legal authority to approve residential layout subdivisions. Unapproved panchayat layouts cannot be registered or financed by nationalized banks like SBI and HDFC.\n\nEvery layout listed on VVMS is 100% DTCP and RERA approved. This guarantees 30ft/33ft blacktop tar roads, OSR (Open Space Reservation) park land gift-deeded to the government, streetlights, and EB transformer reservations. Always verify the DTCP Sanction Number before paying any advance.",
    answerTa:
      "2016-ஆம் ஆண்டு சென்னை உயர்நீதிமன்ற தீர்ப்பின்படி, கிராம பஞ்சாயத்துகளுக்கு வீட்டுமனை லே-அவுட்களை அங்கீகரிக்கும் அதிகாரம் கிடையாது. பஞ்சாயத்து அப்ரூவல் மனைகளுக்கு SBI, HDFC போன்ற தேசியமயமாக்கப்பட்ட வங்கிகள் கடன் வழங்காது மற்றும் பத்திரப்பதிவு செய்வதிலும் சிக்கல்கள் ஏற்படும்.\n\nவீடு வீட்டுமனை சந்தையில் உள்ள அனைத்து மனைகளும் 100% DTCP மற்றும் RERA அங்கீகரிக்கப்பட்டவை. இதில் 30/33 அடி தார் சாலைகள், பூங்காவிற்கான OSR நிலம் அரசுக்கு தானசெட்டில்மெண்ட் செய்யப்பட்டது, மற்றும் மின்சார வசதிகள் சட்டப்பூர்வமாக உறுதி செய்யப்பட்டுள்ளன.",
    action: {
      label: "Verify DTCP Number with Er. J. Vairavel",
      labelTa: "DTCP எண்ணை Er. J. வைரவேலிடம் சரிபார்க்க",
      waTopic: "DTCP Approval Verification Request",
    },
  },
  {
    keywords: ["panjappur", "bus stand", "tidel", "பஞ்சப்பூர்", "பேருந்து"],
    answerEn:
      "Panjappur is Trichy's fastest appreciating growth corridor (+65% over the past 3 years). Key growth drivers include the ₹850-crore Trichy Integrated Bus Terminus (IBT), the multi-modal logistics hub, and the upcoming TIDEL Park Trichy.\n\nPlotted land along the Panjappur-Dindigul Highway currently benchmarks between ₹2,800 – ₹3,800/sq.ft for DTCP approved layouts. Groundwater is potable at 60-80 feet. We strongly recommend this corridor for 3-5 year capital appreciation.",
    answerTa:
      "பஞ்சப்பூர் திருச்சி மாநகரத்தின் மிக வேகமாக வளர்ந்து வரும் பகுதியாகும் (கடந்த 3 ஆண்டுகளில் +65% விலை உயர்வு). ₹850 கோடி மதிப்பிலான ஒருங்கிணைந்த புதிய பேருந்து முனையம் (IBT), மல்டி-மாடல் லாஜிஸ்டிக்ஸ் ஹப் மற்றும் வரவிருக்கும் டைடல் பார்க் (TIDEL Park Trichy) ஆகியவை இதன் முக்கிய வளர்ச்சி காரணிகள்.\n\nஇப்பகுதியில் DTCP மனைகள் சதுர அடி ₹2,800 முதல் ₹3,800 வரை விற்பனையாகின்றன. நிலத்தடி நீர் 60-80 அடியில் நல்ல நிலையில் கிடைக்கிறது. 3 முதல் 5 வருட முதலீட்டிற்கு இது மிகச் சிறந்த தேர்வு.",
    action: {
      label: "Get Panjappur Verified Plot List",
      labelTa: "பஞ்சப்பூர் மனைகள் பட்டியலை பெற",
      waTopic: "Panjappur Corridor Plots Inquiry",
    },
  },
  {
    keywords: ["construction", "turnkey", "cost", "sqft", "build", "கட்டுமானம்", "செலவு", "வீடு கட்ட"],
    answerEn:
      "VVMS provides architect-supervised Turnkey Home Construction led by Er. J. Vairavel (Civil Engineer). We offer 3 transparent, stage-milestone packages:\n\n• Basic Package: ₹1,950 / sq.ft (Standard branded materials, 53-grade cement)\n• Standard Package: ₹2,250 / sq.ft (TATA Tiscon/Kamachi Fe-550 TMT, Ultratech/Dalmia, Somany tiles, Jaquar fittings)\n• Premium Luxury: ₹2,650 / sq.ft (Teakwood main door, full modular kitchen, false ceiling, premium elevation)\n\nAll construction includes 10-year structural warranty, soil bearing audit, and zero hidden escalations.",
    answerTa:
      "Er. J. வைரவேல் (Civil Engineer) அவர்களின் நேரடி மேற்பார்வையில் வீடு வீட்டுமனை சந்தை தரமான டர்ன்கீ கட்டுமான சேவையை வழங்குகிறது:\n\n• பேசிக் திட்டம்: ₹1,950 / சதுர அடி (தரமான பிராண்டட் பொருட்கள்)\n• ஸ்டாண்டர்ட் திட்டம்: ₹2,250 / சதுர அடி (டாடா டிஸ்கான் Fe-550 TMT கம்பி, அல்ட்ராடெக் சிமெண்ட், சோமானி டைல்ஸ், ஜாகுவார் ஃபிட்டிங்ஸ்)\n• பிரீமியம் திட்டம்: ₹2,650 / சதுர அடி (தேக்கு மர நிலை, மாடுலர் கிச்சன், ஃபால்ஸ் சீலிங், நவீன முகப்பு வடிவமைப்பு)\n\n10 வருட கட்டட கட்டமைப்பு உத்தரவாதம் மற்றும் மண் பரிசோதனையுடன் வேலைகள் செய்யப்படுகின்றன.",
    action: {
      label: "Calculate Exact BOQ for My Plot",
      labelTa: "என் மனைக்கான கட்டுமான மதிப்பீட்டை பெற",
      waTopic: "Turnkey Construction Estimate Request",
    },
  },
  {
    keywords: ["loan", "bank", "sbi", "hdfc", "கடன்", "வங்கி"],
    answerEn:
      "Yes! DTCP & RERA approved plots listed on VVMS are pre-approved for up to 80% bank loans through nationalized and leading housing finance institutions including State Bank of India (SBI), HDFC Bank, ICICI Bank, and Canara Bank.\n\nLoan eligibility criteria:\n1. 100% DTCP sanction order and approved layout sketch.\n2. 30-year continuous Encumbrance Certificate (EC) without breaks.\n3. Salaried or business ITR income proof.\n\nDown payment is only 20%, and our finance desk coordinates your entire documentation and sanction process.",
    answerTa:
      "ஆம்! வீடு வீட்டுமனை சந்தையின் அனைத்து DTCP & RERA அங்கீகரிக்கப்பட்ட மனைகளுக்கும் பாரத ஸ்டேட் வங்கி (SBI), HDFC, ICICI போன்ற முன்னணி வங்கிகளில் 80% வரை வீட்டுக் கடன் வசதி எளிதாகப் பெறலாம்.\n\nதேவையான முக்கிய ஆவணங்கள்:\n1. DTCP அப்ரூவல் உத்தரவு நகல் மற்றும் மனை வரைபடம்.\n2. 30 வருட தொடர்ச்சியான வில்லங்கச் சான்றிதழ் (EC).\n3. வருமானச் சான்று அல்லது IT ரிட்டர்ன்ஸ்.\n\nவாங்குபவர் 20% முன்பணம் செலுத்தினால் போதும், மீதி 80% வங்கி கடன் மூலம் பதிவு செய்யலாம்.",
    action: {
      label: "Check My Bank Loan Eligibility",
      labelTa: "வங்கி கடன் தகுதியை சரிபார்க்க",
      waTopic: "Bank Loan Assistance Inquiry",
    },
  },
  {
    keywords: ["samayapuram", "tollgate", "nh45", "சமயபுரம்", "டோல்கேட்"],
    answerEn:
      "Samayapuram & No. 1 Tollgate along the NH-45 Chennai-Trichy Highway is one of Trichy's most stable residential growth belts. Key advantages include 20-minute direct connectivity to Central Trichy, proximity to premier CBSE schools (SRV, Sowdambika), and steady industrial/educational tenancy.\n\nPlot rates benchmark between ₹1,650 – ₹2,400 / sq.ft for DTCP approved layouts. Excellent sweet groundwater is available between 50-70 feet.",
    answerTa:
      "சென்னை - திருச்சி NH-45 தேசிய நெடுஞ்சாலையில் உள்ள சமயபுரம் மற்றும் எண்.1 டோல்கேட் பகுதி மிகச் சிறந்த குடியிருப்பு பகுதியாகும். நகரின் மையப்பகுதிக்கு 20 நிமிட பயண தூரம், SRV மற்றும் சௌடம்பிகா போன்ற முன்னணி பள்ளிகள், மற்றும் அமைதியான சூழல் இதன் சிறப்பம்சங்கள்.\n\nஇங்கு DTCP அப்ரூவ்டு மனைகள் சதுர அடி ₹1,650 முதல் ₹2,400 வரை கிடைக்கின்றன. 50 முதல் 70 அடியில் நல்ல குடிநீர் வசதி உள்ளது.",
    action: {
      label: "Explore Samayapuram Plots",
      labelTa: "சமயபுரம் மனைகளை பார்வையிட",
      waTopic: "Samayapuram Plots Inquiry",
    },
  },
  {
    keywords: ["patta", "chitta", "ec", "due diligence", "legal", "பட்டா", "சிட்டா", "வில்லங்கம்", "பத்திரம்"],
    answerEn:
      "For safe property transactions in Tamil Nadu, Er. J. Vairavel recommends our 4-point forensic check:\n\n1. 30-Year Encumbrance Certificate (EC): Must be continuous from 1975 to current date from the Sub-Registrar Office.\n2. Online Patta / Chitta: Verify on eservices.tn.gov.in that the Patta is 'Thani Patta' (individual) in the seller's name, not joint ('Kootu Patta').\n3. FMB Survey Sketch: Measure physical road width and plot boundary to match the revenue map.\n4. Section 47A Clearance: Ensure no pending stamp duty undervaluation notices exist on the parent deed.",
    answerTa:
      "தமிழ்நாட்டில் பாதுகாப்பாக நிலம் வாங்க Er. J. வைரவேல் அவர்களின் 4 முக்கிய சட்ட ஆய்வுகள்:\n\n1. 30 வருட வில்லங்கச் சான்றிதழ் (EC): 1975 முதல் இன்று வரை தொடர்ச்சியாக இருக்க வேண்டும்.\n2. ஆன்லைன் பட்டா / சிட்டா: eservices.tn.gov.in தளத்தில் தனிப்பட்டா உள்ளதா என சரிபார்க்க வேண்டும்.\n3. FMB சர்வே வரைபடம்: அரசு ஆவணத்தில் உள்ள மனை எல்லை மற்றும் சாலை அகலம் களத்தில் உள்ளதோடு ஒத்துப் போகிறதா என அளவிட வேண்டும்.\n4. 47A முத்திரைத்தாள் பாக்கி: மூலப்பத்திரத்தில் அரசுக்கு முத்திரைத்தாள் பாக்கி ஏதும் நிலுவையில் இல்லை என்பதை உறுதிப்படுத்த வேண்டும்.",
    action: {
      label: "Book Legal Deed Scrutiny with Er. J. Vairavel",
      labelTa: "சட்ட ஆவணங்களை சரிபார்க்க புக் செய்ய",
      waTopic: "Legal Deed Scrutiny Request",
    },
  },
];

const INITIAL_SUGGESTIONS = [
  {
    en: "What is the difference between DTCP and Panchayat layouts?",
    ta: "DTCP மற்றும் பஞ்சாயத்து அப்ரூவல் என்ன வித்தியாசம்?",
  },
  {
    en: "Tell me about Panjappur Bus Terminus growth corridor",
    ta: "பஞ்சப்பூர் புதிய பேருந்து நிலைய பகுதி நில மதிப்பீடு",
  },
  {
    en: "What is the Turnkey Construction cost with Er. J. Vairavel?",
    ta: "Er. J. வைரவேலின் தரமான வீடு கட்டும் செலவு என்ன?",
  },
  {
    en: "Can I get an 80% SBI bank loan for DTCP plots?",
    ta: "DTCP மனைகளுக்கு 80% வங்கி கடன் கிடைக்குமா?",
  },
  {
    en: "How do I check 30-year Patta and EC before paying advance?",
    ta: "அட்வான்ஸ் கொடுக்கும் முன் பட்டா மற்றும் EC பார்ப்பது எப்படி?",
  },
  {
    en: "What are the plot prices around Samayapuram NH-45?",
    ta: "சமயபுரம் NH-45 பகுதிகளில் மனைகளின் விலை என்ன?",
  },
];

export default function AIPropertyGuide() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "assistant",
      text: "Vanakkam! I am your VVMS Property & Engineering AI Assistant, guided by Er. J. Vairavel (Civil Engineer). Ask me anything about DTCP approvals, 30-year deed forensics, Trichy corridor rates (Panjappur, Navalpattu, Samayapuram), turnkey house construction costs, or bank loans in Tamil or English.",
      textTa:
        "வணக்கம்! நான் வீடு வீட்டுமனை சந்தையின் AI வழிகாட்டி. Er. J. வைரவேல் (Civil Engineer) அவர்களின் வழிகாட்டுதலில் செயல்படுகிறேன். DTCP அப்ரூவல், மூலப்பத்திர சட்ட ஆய்வு, திருச்சியின் நில மதிப்பு (பஞ்சப்பூர், சமயபுரம், நாவல்பட்டு), வீடுகட்டும் செலவு அல்லது வங்கிக் கடன் குறித்து எதையும் கேளுங்கள்.",
      timestamp: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || inputValue;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputValue("");
    setIsTyping(true);

    // Intelligent match in knowledge base
    const lowerQuery = textToSend.toLowerCase();
    const match = KNOWLEDGE_BASE.find((k) =>
      k.keywords.some((kw) => lowerQuery.includes(kw))
    );

    setTimeout(() => {
      let botResponse: Message;

      if (match) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: "assistant",
          text: match.answerEn,
          textTa: match.answerTa,
          timestamp: "Just now",
          suggestedAction: match.action,
        };
      } else {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: "assistant",
          text: `Thank you for your question regarding "${textToSend}". Under Er. J. Vairavel's technical standard, every property query requires rigorous ground truth verification. For specific survey numbers, parent deed scrutiny, or tailored turnkey construction estimates, connect directly with Er. J. Vairavel's engineering desk on WhatsApp.`,
          textTa: `உங்கள் கேள்விக்கு நன்றி. Er. J. வைரவேல் அவர்களின் பொறியியல் வழிகாட்டுதலின்படி, ஒவ்வொரு சொத்து விவரமும் கள ஆய்வு செய்யப்பட வேண்டும். உங்கள் மனை சர்வே எண், மூலப்பத்திர சட்ட ஆய்வு அல்லது பிரத்தியேக கட்டுமான மதிப்பீட்டிற்கு எங்கள் தலைமை அலுவலகத்தை வாட்ஸ்அப்பில் நேரடியாக தொடர்பு கொள்ளலாம்.`,
          timestamp: "Just now",
          suggestedAction: {
            label: "Connect with Er. J. Vairavel on WhatsApp",
            labelTa: "Er. J. வைரவேலிடம் வாட்ஸ்அப்பில் பேச",
            waTopic: `Consultation on: ${textToSend}`,
          },
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome-1",
        sender: "assistant",
        text: "Vanakkam! I am your VVMS Property & Engineering AI Assistant. Ask me anything about DTCP approvals, 30-year deed forensics, Trichy corridor rates, or turnkey construction costs.",
        textTa:
          "வணக்கம்! நான் வீடு வீட்டுமனை சந்தையின் AI வழிகாட்டி. DTCP அப்ரூவல், சட்ட ஆய்வு, திருச்சியின் நில மதிப்பு அல்லது வீடுகட்டும் செலவு குறித்து எதையும் கேளுங்கள்.",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <div className="bg-[#202020] rounded-3xl border-2 border-[#B78D42] shadow-2xl overflow-hidden flex flex-col h-[650px] relative">
      {/* Header Styled with Brand Palette */}
      <div className="bg-gradient-to-r from-[#202020] via-[#2A2A2A] to-[#202020] px-5 py-4 border-b border-[#B78D42]/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-2xl overflow-hidden border-2 border-[#F9DB5C] shadow-gold flex-shrink-0 bg-[#252525]">
            <Image
              src="/images/vairavel-avatar.jpg"
              alt="Er. J. Vairavel AI Guide"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-white text-sm sm:text-base tracking-tight">
                {language === "ta" ? "VVMS சொத்து & பொறியியல் AI வழிகாட்டி" : "VVMS Property & Engineering AI Guide"}
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-[#22CDE1]/20 text-[#22CDE1] border border-[#22CDE1]/40">
                24/7 Active
              </span>
            </div>
            <p className="text-[11px] text-[#F9DB5C] font-semibold">
              {language === "ta"
                ? "Er. J. வைரவேல் வழிகாட்டுதலில் • தமிழ் & ஆங்கிலம்"
                : "Guided by Er. J. Vairavel • Tamil & English"}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition border border-white/10"
          title="Reset Conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-[#202020] to-[#181818]">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? "bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] text-[#202020] font-bold rounded-tr-none shadow-gold"
                    : "bg-[#2A2A2A] text-slate-100 border border-[#B78D42]/40 rounded-tl-none shadow-md"
                }`}
              >
                <div className="whitespace-pre-line">
                  {isUser ? msg.text : language === "ta" && msg.textTa ? msg.textTa : msg.text}
                </div>

                {/* Direct Action Link for Assistant Messages */}
                {msg.suggestedAction && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <a
                      href={getWhatsAppUrl(
                        COMPANY_INFO.whatsappRaw,
                        `Hello Er. J. Vairavel, from VVMS AI Guide: I would like to consult on *${msg.suggestedAction.waTopic}*.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>
                        {language === "ta"
                          ? msg.suggestedAction.labelTa
                          : msg.suggestedAction.label}
                      </span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-500 px-1 font-medium">{msg.timestamp}</span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-2 px-3 bg-[#2A2A2A] rounded-2xl w-fit border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#F9DB5C] animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-[#22CDE1] animate-pulse delay-100" />
            <span className="w-2 h-2 rounded-full bg-[#B78D42] animate-pulse delay-200" />
            <span className="text-[11px] font-semibold text-slate-300">
              {language === "ta" ? "AI வழிகாட்டி பதிலளிக்கிறது..." : "AI Guide is analyzing..."}
            </span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="bg-[#1C1C1C] px-4 py-2.5 border-t border-white/10 overflow-x-auto scrollbar-none flex items-center gap-2">
        <span className="text-[10px] font-black uppercase text-[#B78D42] flex-shrink-0 flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-[#22CDE1]" />
          <span>Quick:</span>
        </span>
        {INITIAL_SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(language === "ta" ? item.ta : item.en)}
            className="flex-shrink-0 text-[11px] font-bold px-3 py-1 rounded-full bg-[#2A2A2A] hover:bg-[#333333] text-slate-200 hover:text-[#F9DB5C] border border-white/10 hover:border-[#B78D42]/60 transition"
          >
            {language === "ta" ? item.ta : item.en}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 sm:p-4 bg-[#202020] border-t border-[#B78D42]/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              language === "ta"
                ? "DTCP, மனை விலைகள், அல்லது வீடுகட்டும் செலவு குறித்து கேளுங்கள்..."
                : "Ask about DTCP rules, Trichy corridor rates, construction cost..."
            }
            className="flex-1 bg-[#2B2B2B] border border-white/10 focus:border-[#F9DB5C] rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition font-medium"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-3 sm:px-5 sm:py-3 rounded-2xl bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] hover:brightness-105 disabled:opacity-40 disabled:cursor-not-allowed text-[#202020] font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-gold transition"
          >
            <Send className="w-4 h-4 text-[#202020]" />
            <span className="hidden sm:inline">Ask</span>
          </button>
        </form>
      </div>
    </div>
  );
}
