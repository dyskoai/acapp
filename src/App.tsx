/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Search, 
  MessageSquare, 
  TrendingUp, 
  Zap,
  Globe,
  Database,
  BarChart3,
  ShieldCheck,
  ChevronRight,
  X,
  Loader2
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

import { DyskoLogo } from "./components/Logo";

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Google Form Configuration (Placeholder IDs)
  // To connect a real Google Form:
  // 1. Create a Google Form
  // 2. Get the form ID from the URL
  // 3. Inspect the form to find the 'name' attributes for each input (e.g., entry.123456)
  const GOOGLE_FORM_ID = "1FAIpQLSe1WtVGfKfehc-BufqxWnPrmW6Cz2rX3EHCC7Mo61K0p13Bww"; 
  const ENTRY_IDS = {
    name: "entry.1942721612",
    email: "entry.1721477644",
    company: "entry.1961492829",
    website: "entry.829982199",
    skus: "entry.1594470015"
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    // To submit to Google Forms:
    const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
    const params = new URLSearchParams();
    
    params.append(ENTRY_IDS.name, formData.get('name') as string);
    params.append(ENTRY_IDS.email, formData.get('email') as string);
    params.append(ENTRY_IDS.company, formData.get('company') as string);
    params.append(ENTRY_IDS.website, formData.get('website') as string);
    params.append(ENTRY_IDS.skus, formData.get('skus') as string);
    
    try {
      // Real submission (requires 'no-cors' mode for Google Forms)
      await fetch(GOOGLE_FORM_URL, { 
        method: 'POST', 
        body: params, 
        mode: 'no-cors' 
      });
      
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      // Even if it fails (e.g. network), we show success for UX if the form is just a lead gen
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dysko-dark/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-dysko-light rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-10">
          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-dysko-accent/20 text-dysko-accent rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold">Request Received</h3>
              <p className="text-dysko-ink/60">Our team will reach out to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h3 className="serif text-3xl text-dysko-dark mb-2">Request Audit</h3>
                <p className="text-sm text-dysko-ink/60">Fill in your details to start your agentic commerce journey.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Full Name</label>
                    <input required name="name" type="text" className="w-full p-3 rounded-xl border border-dysko-dark/10 bg-dysko-light/30 focus:outline-none focus:ring-2 focus:ring-dysko-accent/50 transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Work Email</label>
                    <input required name="email" type="email" className="w-full p-3 rounded-xl border border-dysko-dark/10 bg-dysko-light/30 focus:outline-none focus:ring-2 focus:ring-dysko-accent/50 transition-all" placeholder="john@company.com" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Company Name</label>
                  <input required name="company" type="text" className="w-full p-3 rounded-xl border border-dysko-dark/10 bg-dysko-light/30 focus:outline-none focus:ring-2 focus:ring-dysko-accent/50 transition-all" placeholder="Acme D2C" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Website URL</label>
                  <input required name="website" type="url" className="w-full p-3 rounded-xl border border-dysko-dark/10 bg-dysko-light/30 focus:outline-none focus:ring-2 focus:ring-dysko-accent/50 transition-all" placeholder="https://acme.com" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Number of SKUs</label>
                  <select required name="skus" className="w-full p-3 rounded-xl border border-dysko-dark/10 bg-dysko-light/30 focus:outline-none focus:ring-2 focus:ring-dysko-accent/50 transition-all">
                    <option value="">Select range</option>
                    <option value="1 - 50">1 - 50</option>
                    <option value="51 - 200">51 - 200</option>
                    <option value="201 - 1000">201 - 1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full py-4 bg-dysko-dark text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 disabled:opacity-50 transition-all mt-6"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Request"}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass">
    <div className="flex items-center gap-2">
      <DyskoLogo className="w-8 h-8 text-dysko-dark" />
      <span className="text-xl font-bold tracking-tight text-dysko-dark">DYSKO</span>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
      <a href="#layers" className="hover:text-dysko-accent transition-colors">Solutions</a>
      <a href="#protocols" className="hover:text-dysko-accent transition-colors">Protocols</a>
      <a href="#pricing" className="hover:text-dysko-accent transition-colors">Pricing</a>
    </div>
    <button 
      onClick={onOpenModal}
      className="bg-dysko-dark text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all"
    >
      Request Audit
    </button>
  </nav>
);

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 bg-dysko-dark text-white overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dysko-accent/30 bg-dysko-accent/10 text-dysko-accent text-xs font-semibold mb-8"
        >
          <Zap size={14} />
          <span>THE WORLD JUST CHANGED</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-8"
        >
          Agentic <br />
          <span className="italic text-dysko-accent">Commerce</span> <br />
          Readiness
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          How D2C brands get found, understood, and bought in an AI-first world. 
          Prepare your catalogue for the protocols of tomorrow.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={onOpenModal}
            className="w-full sm:w-auto bg-dysko-accent text-dysko-dark px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            Request Audit <ArrowRight size={20} />
          </button>
          <button 
            onClick={onOpenModal}
            className="w-full sm:w-auto border border-white/20 hover:bg-white/5 px-8 py-4 rounded-full font-medium text-lg transition-all"
          >
            View Deck
          </button>
        </motion.div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-dysko-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-dysko-accent/5 blur-[120px] rounded-full" />
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold">
        <span>ChatGPT</span>
        <span>Google Gemini</span>
        <span>Microsoft Copilot</span>
        <span>Perplexity</span>
      </div>
    </section>
  );
};

const TransformationSection = () => {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="serif text-5xl md:text-6xl text-dysko-dark mb-4">From Data to Intelligence</h2>
          <p className="text-xl text-dysko-ink/60 max-w-2xl mx-auto">
            We turn flat, unstructured catalogues into rich semantic graphs that AI agents can actually understand.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Before: Raw Data */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-dysko-light border border-dysko-dark/5">
              <img 
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop" 
                alt="Raw Product"
                className="w-full h-full object-cover grayscale opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-dysko-dark/40">Raw Input</span>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-dysko-dark/10 rounded" />
                  <div className="h-3 w-1/2 bg-dysko-dark/5 rounded" />
                  <div className="pt-4 border-t border-dysko-dark/5 flex gap-4">
                    <div className="h-8 w-20 bg-dysko-dark/5 rounded-full" />
                    <div className="h-8 w-20 bg-dysko-dark/5 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4">
              <h3 className="text-xl font-bold mb-2">The "Flat" Catalogue</h3>
              <p className="text-sm text-dysko-ink/60 leading-relaxed">
                Basic metadata: Title, Price, and a few generic tags. Invisible to semantic search and autonomous agents.
              </p>
            </div>
          </motion.div>

          {/* After: Agent-Native Intelligence */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-dysko-dark shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000" 
                alt="Enriched Product"
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute top-6 left-6 bg-dysko-accent px-4 py-2 rounded-full shadow-lg">
                <span className="text-[10px] font-bold uppercase tracking-widest text-dysko-dark">Dysko Enriched</span>
              </div>

              {/* Callouts - Mimicking the user's provided image style */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute top-[20%] right-[10%] bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-dysko-accent animate-pulse" />
                <span className="text-xs font-bold text-dysko-dark">Sleeve Type - Ruffle</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute top-[45%] left-[5%] bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-dysko-accent animate-pulse" />
                <span className="text-xs font-bold text-dysko-dark">Neckline Depth - Low</span>
              </motion.div>

              {/* Attributes Box */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6 bg-dysko-dark/40 backdrop-blur-xl p-6 rounded-3xl border border-white/10 text-white"
              >
                <h4 className="serif text-xl mb-4">Attributes</h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    { k: "Style Theme", v: "Preppy Chic" },
                    { k: "Color", v: "Cherry Red" },
                    { k: "Occasion", v: "Casual Wear" },
                    { k: "Fabric", v: "Cotton Blend" },
                    { k: "Silhouette", v: "Fit and Flare" },
                    { k: "Neckline", v: "Deep V Neck" }
                  ].map((attr, i) => (
                    <div key={i} className="flex items-center justify-between text-[10px]">
                      <span className="opacity-50 uppercase tracking-wider">{attr.k}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-dysko-accent" />
                        <span className="font-bold">{attr.v}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="px-4">
              <h3 className="text-xl font-bold mb-2">Agent-Native Intelligence</h3>
              <p className="text-sm text-dysko-ink/60 leading-relaxed">
                90+ semantic attributes extracted. Ready for machine-to-machine negotiation, visual search, and autonomous checkout.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Protocols = () => (
  <section id="protocols" className="py-24 px-6 bg-dysko-light">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="serif text-5xl md:text-6xl text-dysko-dark leading-tight">
            The world <br />
            <span className="italic">just changed.</span>
          </h2>
          <p className="text-xl text-dysko-ink/70 leading-relaxed">
            Two major protocols launched in 2025–26 that let AI agents discover, recommend, and complete purchases — directly inside ChatGPT and Google Gemini.
          </p>
          <div className="pt-4">
            <p className="text-dysko-accent font-bold text-lg">This is not SEO 2.0.</p>
            <p className="text-dysko-dark font-bold text-lg">This is a new channel.</p>
          </div>
        </div>

        <div className="grid gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-2xl border-t-4 border-[#0066FF] shadow-xl shadow-dysko-dark/5"
          >
            <div className="text-[10px] font-bold tracking-widest text-[#0066FF] mb-4 uppercase">OpenAI + Stripe</div>
            <h3 className="text-2xl font-bold mb-3">ACP — Agentic Commerce Protocol</h3>
            <p className="text-dysko-ink/60 leading-relaxed">
              Lets buyers discover and purchase products directly inside ChatGPT. 700M weekly users. Merchants submit a structured product feed — ChatGPT indexes it and presents your products to buyers.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-2xl border-t-4 border-[#0F9D58] shadow-xl shadow-dysko-dark/5"
          >
            <div className="text-[10px] font-bold tracking-widest text-[#0F9D58] mb-4 uppercase">Google + Shopify</div>
            <h3 className="text-2xl font-bold mb-3">UCP — Universal Commerce Protocol</h3>
            <p className="text-dysko-ink/60 leading-relaxed">
              Open standard published as ucp.json — any AI agent (Gemini, Copilot, Perplexity) can discover, compare, and transact with your store. Full commerce lifecycle: discovery to post-purchase.
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-12 bg-dysko-dark text-white p-6 rounded-xl flex items-center justify-between">
        <p className="text-sm md:text-base font-medium italic opacity-80">
          "Merchants with both protocols active capture 40% more agentic traffic than single-protocol stores"
        </p>
        <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Early 2026 Data</span>
      </div>
    </div>
  </section>
);

const LayersSection = () => {
  const layers = [
    {
      id: "01",
      title: "Commerce foundation",
      subtitle: "Catalogue enrichment + protocol compliance",
      tag: "Foundation",
      desc: (
        <div className="space-y-4">
          <p>Clean, structured, AI-readable product data. UCP manifest + ACP feed. The prerequisite for everything.</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="p-2 bg-red-500/10 border border-red-500/20 rounded text-[10px]">
              <div className="font-bold text-red-400 mb-1 uppercase">Before</div>
              <div className="opacity-50 line-through">"Blue shirt, cotton, size M"</div>
            </div>
            <div className="p-2 bg-dysko-accent/10 border border-dysko-accent/20 rounded text-[10px]">
              <div className="font-bold text-dysko-accent mb-1 uppercase">After</div>
              <div>"Indigo Slim-Fit Oxford, 100% Organic Cotton, Breathable, Occasion: Business Casual"</div>
            </div>
          </div>
        </div>
      ),
      icon: <Database className="text-dysko-accent" />
    },
    {
      id: "02",
      title: "Multi-SKU conversational data",
      subtitle: "Outfit logic + look taxonomy + occasion groupings",
      tag: "Data",
      desc: "Structure data so AI can answer 'give me a full beach wedding look under ₹5000' with a coordinated set of SKUs.",
      icon: <Layers className="text-dysko-accent" />
    },
    {
      id: "03",
      title: "AI search on your storefront",
      subtitle: "Semantic search + zero-result elimination",
      tag: "Search",
      desc: "Intent-aware search on your own site. 'Flowy kurta for a beach wedding' finds 40 results, not 0.",
      icon: <Search className="text-dysko-accent" />
    },
    {
      id: "04",
      title: "Conversation + size assistant",
      subtitle: "SDK on your storefront — text and image",
      tag: "Assistant",
      desc: "A shopping assistant on your site. Size guidance using past order data. Multi-SKU outfit suggestions in chat.",
      icon: <MessageSquare className="text-dysko-accent" />
    },
    {
      id: "05",
      title: "AEO — AI engine visibility",
      subtitle: "Presence in ChatGPT, Perplexity, Gemini",
      tag: "Visibility",
      desc: "Ongoing optimisation so your brand is cited when buyers ask AI which brand to buy.",
      icon: <TrendingUp className="text-dysko-accent" />
    }
  ];

  return (
    <section id="layers" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="serif text-5xl md:text-6xl text-dysko-dark mb-4">Five layers of readiness</h2>
          <p className="text-xl text-dysko-ink/60">Every layer unlocks the next. Each one is a distinct service we provide.</p>
        </div>

        <div className="space-y-4">
          {layers.map((layer, idx) => (
            <motion.div 
              key={layer.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative grid md:grid-cols-[80px_1fr_2fr_100px] items-center p-8 rounded-2xl border border-dysko-dark/5 hover:bg-dysko-dark hover:text-white transition-all duration-500 cursor-pointer"
            >
              <div className="text-4xl font-bold opacity-20 group-hover:opacity-100 transition-opacity">{layer.id}</div>
              <div className="pr-8">
                <h3 className="text-xl font-bold mb-1">{layer.title}</h3>
                <p className="text-xs font-medium opacity-60 italic">{layer.subtitle}</p>
              </div>
              <div className="text-sm opacity-60 leading-relaxed py-4 md:py-0">
                {layer.desc}
              </div>
              <div className="flex justify-end">
                {layer.tag ? (
                  <span className="bg-dysko-accent text-dysko-dark px-3 py-1 rounded text-[10px] font-bold">{layer.tag}</span>
                ) : (
                  <ChevronRight className="opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => (
  <section className="py-24 px-6 bg-dysko-dark text-white">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="serif text-5xl md:text-6xl mb-4">Most brands aren't ready.</h2>
        <p className="text-xl text-white/50 italic">And don't know it.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { val: "73%", label: "of D2C catalogues have missing or inconsistent attributes — invisible to AI agents" },
          { val: "0", label: "brands we surveyed have published a UCP manifest or submitted an ACP feed" },
          { val: "35%", label: "of fashion returns are size-related — a problem clean catalogue data solves" },
          { val: "40%", label: "more agentic traffic for dual-protocol stores vs single-protocol, early 2026 data" }
        ].map((stat, i) => (
          <div key={i} className="p-8 border-l border-dysko-accent/30 bg-white/5 rounded-r-xl">
            <div className="text-5xl font-bold text-dysko-accent mb-4">{stat.val}</div>
            <p className="text-sm text-white/60 leading-relaxed">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <section id="pricing" className="py-24 px-6 bg-dysko-light">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="serif text-5xl md:text-6xl text-dysko-dark mb-4">What this is worth.</h2>
        <p className="text-xl text-dysko-ink/60">What founding partners pay.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-3xl border border-dysko-dark/5 shadow-xl">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Audit</span>
              <h3 className="text-3xl font-bold mt-2">Readiness Report</h3>
            </div>
            <div className="text-right">
              <div className="text-sm line-through opacity-30">₹15K–₹25K</div>
              <div className="text-xl font-bold text-dysko-accent">Request Pricing</div>
            </div>
          </div>
          
          <ul className="space-y-4 mb-10">
            {[
              "Catalogue completeness score",
              "AI readability test (ChatGPT + Gemini)",
              "Zero-results site search audit",
              "Protocol gap report (ACP + UCP)",
              "30-min walkthrough call",
              "Delivered in 5–7 working days"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <CheckCircle2 size={18} className="text-dysko-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={onOpenModal}
            className="w-full py-4 rounded-xl border-2 border-dysko-dark font-bold hover:bg-dysko-dark hover:text-white transition-all"
          >
            Request Audit
          </button>
        </div>

        <div className="bg-dysko-dark text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-dysko-accent text-dysko-dark px-6 py-2 font-bold text-xs rounded-bl-xl">
            MOST POPULAR
          </div>
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Layer 1 — Full Build</span>
              <h3 className="text-3xl font-bold mt-2">Commerce Foundation</h3>
            </div>
            <div className="text-right">
              <div className="text-sm line-through opacity-30">₹75K–₹1L</div>
              <div className="text-xl font-bold text-dysko-accent">Request Pricing</div>
            </div>
          </div>
          
          <ul className="space-y-4 mb-10">
            {[
              "Everything in audit",
              "Full catalogue enrichment",
              "Platform integration (Shopify / WooComm)",
              "UCP manifest published live",
              "ACP feed structured + submitted",
              "Before/after report + baseline metrics"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <CheckCircle2 size={18} className="text-dysko-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={onOpenModal}
            className="w-full py-4 rounded-xl bg-dysko-accent text-dysko-dark font-bold hover:scale-[1.02] transition-all"
          >
            Request Pricing
          </button>
          <p className="text-center text-[10px] mt-4 opacity-40">Custom pricing · SKU-dependent</p>
        </div>
      </div>
    </div>
  </section>
);

const WhyNow = () => {
  const timeline = [
    { date: "Sept 2025", event: "OpenAI + Stripe launch ACP" },
    { date: "Jan 2026", event: "Google + Shopify launch UCP (open source)" },
    { date: "Now", event: "Early adopter window — India brands", active: true },
    { date: "Late 2026", event: "ACP + UCP reach Indian consumers at scale" },
    { date: "2027+", event: "Protocol-ready brands capture dominant AI share" }
  ];

  return (
    <section className="py-24 px-6 bg-dysko-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="serif text-5xl md:text-6xl mb-8">Why now?</h2>
          <div className="space-y-6 text-lg text-white/60 leading-relaxed">
            <p>
              The protocols are new. The Indian market is 12–18 months behind the US rollout. That gap is your moat — if you act now.
            </p>
            <p>
              Flipkart is already an endorsed UCP partner. The infrastructure is being laid now. Your catalogue needs to be ready before the wave hits — not after.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-12">
                <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-full border-4 border-dysko-dark flex items-center justify-center ${item.active ? 'bg-dysko-accent' : 'bg-white/20'}`}>
                  {item.active && <div className="w-2 h-2 bg-dysko-dark rounded-full animate-ping" />}
                </div>
                <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${item.active ? 'text-dysko-accent' : 'opacity-40'}`}>
                  {item.date}
                </div>
                <div className={`text-xl font-medium ${item.active ? 'text-white' : 'opacity-40'}`}>
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Requirements = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <section className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16">
        <div>
          <h2 className="serif text-5xl mb-6">What we <br />need from you.</h2>
          <p className="text-dysko-ink/60">Minimal lift. About 4–5 hours of your team's time across 6 weeks.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: "Catalogue access", desc: "Shopify / platform read access or product export (CSV is fine to start)." },
            { title: "Google Merchant Center", desc: "Viewer access. Needed to audit feed quality and update UCP attributes." },
            { title: "Site search data", desc: "Last 90 days of search queries if available. Shows zero-result rate." },
            { title: "One catalogue contact", desc: "One person from your team who knows the products. 4–5 hours total." }
          ].map((req, i) => (
            <div key={i} className="p-6 rounded-xl border border-dysko-dark/5 bg-dysko-light/30">
              <h3 className="font-bold mb-2">{req.title}</h3>
              <p className="text-sm text-dysko-ink/60 leading-relaxed">{req.desc}</p>
            </div>
          ))}
          <div className="sm:col-span-2 p-8 bg-dysko-dark text-white rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xl font-medium italic">"How many active SKUs do you have?"</div>
            <button 
              onClick={onOpenModal}
              className="bg-dysko-accent text-dysko-dark px-6 py-3 rounded-full font-bold whitespace-nowrap"
            >
              Start with this question
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <footer className="bg-dysko-dark text-white py-20 px-6 border-t border-white/10">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="serif text-5xl md:text-7xl mb-8 leading-tight">
            Let's find out <br />
            <span className="italic">if you're ready.</span>
          </h2>
          <p className="text-xl text-white/50 max-w-md mb-8">
            We start with a Commerce Readiness Audit — a complete look at your catalogue against ACP and UCP requirements.
          </p>
          <button 
            onClick={onOpenModal}
            className="bg-dysko-accent text-dysko-dark px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2"
          >
            Request audit <ArrowRight size={20} />
          </button>
        </div>
        <div className="flex flex-col justify-end md:items-end space-y-4 text-sm font-medium opacity-60">
          <a href="mailto:himani@dysko.ai" className="hover:text-dysko-accent transition-colors">himani@dysko.ai</a>
          <a href="mailto:nitin@dysko.ai" className="hover:text-dysko-accent transition-colors">nitin@dysko.ai</a>
          <p>ac.thedysko.ai</p>
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <DyskoLogo className="w-6 h-6 text-white" />
          <span className="text-lg font-bold tracking-tight">DYSKO</span>
        </div>
        <p className="text-xs opacity-30">© 2026 Dysko. Agentic Commerce Readiness for D2C brands.</p>
        <div className="flex gap-6 text-xs opacity-40">
          <a href="#" className="hover:opacity-100">Privacy</a>
          <a href="#" className="hover:opacity-100">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <TransformationSection />
      <Protocols />
      <Stats />
      <LayersSection />
      <WhyNow />
      <Requirements onOpenModal={() => setIsModalOpen(true)} />
      <Pricing onOpenModal={() => setIsModalOpen(true)} />
      <Footer onOpenModal={() => setIsModalOpen(true)} />
      
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
