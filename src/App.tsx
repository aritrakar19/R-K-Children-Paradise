import { useState, useEffect, useRef, useCallback } from "react";
import heroImg from "./assets/hero-classroom.jpg";

/* ═══════════════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════════════ */
const Ic = {
  Menu: () => (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  X: () => (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ArrowRight: ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ChevLeft: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M13 15l-5-5 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ChevRight: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Check: ({ c = "#FECC4C" }: { c?: string }) => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="11" fill={c} fillOpacity=".15" />
      <path d="M7 11.5l2.8 2.8 5.2-5.6" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Shield: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 3L5 8v9c0 6 4.9 11.6 11 12.9C22.1 28.6 27 23 27 17V8L16 3z" fill="#FECC4C" fillOpacity=".18" stroke="#FECC4C" strokeWidth="2" strokeLinejoin="round" />
      <path d="M11.5 16l3 3 6-6" stroke="#FECC4C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Phone: () => (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.581a1.5 1.5 0 01-1.025 1.696l-.784.26a11 11 0 005.268 5.268l.26-.784a1.5 1.5 0 011.696-1.025l3.581.716A1.5 1.5 0 0118 14.352V15.5A1.5 1.5 0 0116.5 17h-.5C7.716 17 1 10.284 1 2.5v-.5A1.5 1.5 0 012 .5z" transform="translate(1,1)" />
    </svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="4" width="16" height="13" rx="2" strokeLinecap="round" />
      <path d="M2 7l8 5 8-5" strokeLinecap="round" />
    </svg>
  ),
  Pin: () => (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" d="M10 2a6 6 0 016 6c0 4.5-6 10-6 10S4 12.5 4 8a6 6 0 016-6z" />
      <circle cx="10" cy="8" r="2.2" />
    </svg>
  ),
  Clock: () => (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10" cy="10" r="8" />
      <path strokeLinecap="round" d="M10 5.5V10l3 2.5" />
    </svg>
  ),
  Star: () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="#FECC4C">
      <path d="M7.5 1.5l1.65 3.35 3.7.54-2.68 2.6.63 3.68L7.5 9.9 4.2 11.67l.63-3.68L2.15 5.4l3.7-.54L7.5 1.5z" />
    </svg>
  ),
  Quote: () => (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
      <path d="M0 28V16.4C0 11.6 1.4 7.6 4.2 4.4 7 1.47 10.93 0 16 0v4.8C13.07 4.8 10.8 5.73 9.2 7.6 7.6 9.47 6.8 11.87 6.8 14.8H12V28H0zm20 0V16.4C20 11.6 21.4 7.6 24.2 4.4 27 1.47 30.93 0 36 0v4.8c-2.93 0-5.2.93-6.8 2.8-1.6 1.87-2.4 4.27-2.4 7.2H32V28H20z" fill="#FECC4C" fillOpacity=".25" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════════
   HOOK – scroll reveal
═══════════════════════════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   HOOK – animated counter
═══════════════════════════════════════════════════════════════ */
function useCounter(target: number, started: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return val;
}

/* ═══════════════════════════════════════════════════════════════
   SVG WAVES
═══════════════════════════════════════════════════════════════ */
const WaveBottom = ({ fill = "#fff" }: { fill?: string }) => (
  <svg className="wave-bottom" viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "70px", display: "block" }}>
    <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,70 L0,70 Z" fill={fill} />
  </svg>
);
const WaveTop = ({ fill = "#fff" }: { fill?: string }) => (
  <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "70px", display: "block", transform: "rotate(180deg)" }}>
    <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,70 L0,70 Z" fill={fill} />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   DECORATIVE BLOB
═══════════════════════════════════════════════════════════════ */
const Blob = ({ color, size, style }: { color: string; size: number; style?: React.CSSProperties }) => (
  <div
    style={{
      width: size, height: size,
      borderRadius: "60% 40% 55% 45% / 50% 60% 40% 55%",
      background: color,
      position: "absolute",
      pointerEvents: "none",
      zIndex: 0,
      ...style,
    }}
  />
);

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const NAV = ["Home", "About", "Academics", "Activities", "Facilities", "Gallery", "Admissions", "Contact"];

const STATS = [
  { label: "Happy Students", val: 500, suffix: "+" },
  { label: "Years of Excellence", val: 49, suffix: "+" },
  { label: "Qualified Educators", val: 10, suffix: "+" },
  { label: "Activity Programs", val: 10, suffix: "+" },
];

const TRUST = [
  { icon: "🎓", title: "Nursery – Class 5", desc: "Age-appropriate curriculum for every stage" },
  { icon: "💡", title: "Smart Learning", desc: "Technology-enabled interactive education" },
  { icon: "🌱", title: "Holistic Development", desc: "Academics · Creativity · Physical growth" },
  { icon: "🛡️", title: "Fire Safety Approved", desc: "Certified safe & secure campus" },
];

const ABOUT_CHECKS = [
  "Child-friendly learning environment",
  "Experienced & caring educators",
  "Smart classroom technology",
  "Creative & co-curricular activities",
  "Safe & disciplined campus",
  "Focus on overall development",
];

const JOURNEY = [
  { level: "Nursery", age: "3–4 yrs",  emoji: "🌟", bg: "#FFF4CC", border: "#FECC4C" },
  { level: "LKG",     age: "4–5 yrs",  emoji: "🌸", bg: "#FFE8F0", border: "#F472B6" },
  { level: "KG1",     age: "5–6 yrs",  emoji: "🦋", bg: "#F3F0FF", border: "#A78BFA" },
  { level: "KG2",     age: "6–7 yrs",  emoji: "🎨", bg: "#EAF5FF", border: "#60A5FA" },
  { level: "Class-1", age: "7–8 yrs",  emoji: "📚", bg: "#ECFDF5", border: "#34D399" },
  { level: "Class-2", age: "8–9 yrs",  emoji: "✏️", bg: "#FFF4CC", border: "#FBBF24" },
  { level: "Class-3", age: "9–10 yrs", emoji: "🔭", bg: "#EAF5FF", border: "#38BDF8" },
  { level: "Class-4", age: "10–11 yrs",emoji: "🧩", bg: "#FFE8F0", border: "#F472B6" },
  { level: "Class-5", age: "11–12 yrs",emoji: "🏆", bg: "#ECFDF5", border: "#10B981" },
];

const CLASS_LIST = JOURNEY.map(j => j.level);

const WHY_CARDS = [
  { emoji: "❤️", title: "Caring Environment", desc: "A warm, supportive school where every child feels valued, seen and celebrated every day." },
  { emoji: "🖥️", title: "Smart Classrooms", desc: "Technology-supported teaching that makes learning visual, interactive and deeply engaging." },
  { emoji: "🗣️", title: "Spoken English", desc: "Structured spoken English programs that build confident, articulate young communicators." },
  { emoji: "🔢", title: "Abacus Learning", desc: "Building concentration, mental math and logical thinking through the ancient art of the abacus." },
  { emoji: "🎨", title: "Creative Expression", desc: "Drawing, art, music, dance and drama give every child a joyful outlet for self-expression." },
  { emoji: "🏃", title: "Physical Development", desc: "Sports and PT foster healthy bodies, team spirit, discipline and lasting confidence." },
];

const ACTIVITIES = [
  { emoji: "🔢", title: "Abacus",           desc: "Mental arithmetic & deep focus",        bg: "#FFF4CC", accent: "#F59E0B" },
  { emoji: "🗣️", title: "Spoken English",   desc: "Confident communication skills",        bg: "#EAF5FF", accent: "#3B82F6" },
  { emoji: "💻", title: "Computer Edu.",    desc: "Digital literacy for young minds",       bg: "#F3F0FF", accent: "#8B5CF6" },
  { emoji: "🖥️", title: "Smart Classroom",  desc: "Interactive visual learning",            bg: "#FFF4CC", accent: "#F59E0B" },
  { emoji: "🎨", title: "Drawing & Art",    desc: "Creativity and self-expression",          bg: "#ECFDF5", accent: "#10B981" },
  { emoji: "🎵", title: "Music",            desc: "Rhythm, melody and musical joy",         bg: "#FFE8F0", accent: "#EC4899" },
  { emoji: "💃", title: "Dance",            desc: "Movement, grace and confidence",          bg: "#FFF4CC", accent: "#F59E0B" },
  { emoji: "🎭", title: "Drama",            desc: "Storytelling and performance arts",       bg: "#EAF5FF", accent: "#3B82F6" },
  { emoji: "⚽", title: "Sports & PT",      desc: "Fitness, teamwork and discipline",        bg: "#ECFDF5", accent: "#10B981" },
  { emoji: "🥋", title: "Karate",           desc: "Self-defense, focus & discipline",        bg: "#FFF4CC", accent: "#F59E0B" },
  { emoji: "🧘", title: "Yoga",             desc: "Mindfulness, balance & flexibility",      bg: "#F3F0FF", accent: "#8B5CF6" },
];

const SMART_FEATURES = [
  "Smart Classroom Technology",
  "Computer Education Lab",
  "Technology Awareness Program",
  "Interactive Visual Learning",
  "Digital Learning Support",
];

const ARTS = [
  { emoji: "🎨", title: "Drawing",       img: "https://images.unsplash.com/photo-1614712201488-9942af86b87b?w=500&h=360&fit=crop&auto=format", c: "#FFF4CC" },
  { emoji: "🖌️", title: "Art & Craft",  img: "https://images.unsplash.com/photo-1560421683-6856ea585c78?w=500&h=360&fit=crop&auto=format", c: "#F3F0FF" },
  { emoji: "🎵", title: "Music",         img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=360&fit=crop&auto=format", c: "#EAF5FF" },
  { emoji: "💃", title: "Dance",         img: "https://images.unsplash.com/photo-1667386421763-277f20ae165b?w=500&h=360&fit=crop&auto=format", c: "#FFE8F0" },
  { emoji: "🎭", title: "Drama",         img: "https://images.unsplash.com/photo-1667384443065-b15c7caa4160?w=500&h=360&fit=crop&auto=format", c: "#ECFDF5" },
];

const SPORTS_TAGS = ["⚽ Sports", "🤸 Physical Training", "🏃 Outdoor Activities", "🤝 Teamwork", "📋 Discipline", "🧘 Healthy Habits"];

const SAFETY_CARDS = [
  { emoji: "🏠", title: "Safe Campus",           desc: "A secure, child-friendly campus with supervised entry and safe spaces." },
  { emoji: "📋", title: "Disciplined Learning",   desc: "Clear routines, responsible supervision and structured daily schedules." },
  { emoji: "🔥", title: "Fire Safety Certified",  desc: "Fire Department approved school with proper safety measures in place." },
];

const TEACHERS = [
  { name: "Priya Ghosh",    role: "Head Teacher",     sub: "English & Communication", img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=420&h=420&fit=crop&auto=format&face=1" },
  { name: "Ritu Sharma",    role: "Primary Teacher",  sub: "Mathematics & Abacus",    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=420&h=420&fit=crop&auto=format" },
  { name: "Arun Kumar",     role: "PT & Sports",      sub: "Physical Education",      img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=420&h=420&fit=crop&auto=format" },
  { name: "Meena Das",      role: "Arts Teacher",     sub: "Drawing, Art & Craft",    img: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=420&h=420&fit=crop&auto=format" },
];

const SCHOOL_LIFE = [
  { label: "Classroom Learning",  img: "https://images.unsplash.com/photo-1692269725836-fbd72e98883f?w=560&h=380&fit=crop&auto=format" },
  { label: "Art Activities",      img: "https://images.unsplash.com/photo-1617117206620-b01f2919ff86?w=560&h=380&fit=crop&auto=format" },
  { label: "Sports Day",          img: "https://images.unsplash.com/photo-1763639700458-38a0fd25335d?w=560&h=380&fit=crop&auto=format" },
  { label: "Music & Dance",       img: "https://images.unsplash.com/photo-1667386427340-ea2cbca9ad01?w=560&h=380&fit=crop&auto=format" },
  { label: "Group Reading",       img: "https://images.unsplash.com/photo-1692269725911-87697c558be1?w=560&h=380&fit=crop&auto=format" },
  { label: "Cultural Events",     img: "https://images.unsplash.com/photo-1667384443065-b15c7caa4160?w=560&h=380&fit=crop&auto=format" },
];

const GALLERY_ITEMS = [
  { img: "https://images.unsplash.com/photo-1692269725836-fbd72e98883f?w=660&h=440&fit=crop&auto=format", cat: "Classroom", label: "Young learners in class" },
  { img: "https://images.unsplash.com/photo-1617117206620-b01f2919ff86?w=440&h=440&fit=crop&auto=format", cat: "Arts",      label: "Art & drawing session" },
  { img: "https://images.unsplash.com/photo-1772946277876-98ac6a2036ee?w=440&h=440&fit=crop&auto=format", cat: "Sports",    label: "Sports day fun" },
  { img: "https://images.unsplash.com/photo-1667386427340-ea2cbca9ad01?w=660&h=440&fit=crop&auto=format", cat: "Arts",      label: "Dance performance" },
  { img: "https://images.unsplash.com/photo-1692269725911-87697c558be1?w=440&h=440&fit=crop&auto=format", cat: "Classroom", label: "Reading together" },
  { img: "https://images.unsplash.com/photo-1692269725827-699e04a11cdf?w=660&h=440&fit=crop&auto=format", cat: "Classroom", label: "Classroom activity" },
  { img: "https://images.unsplash.com/photo-1667384443065-b15c7caa4160?w=440&h=440&fit=crop&auto=format", cat: "Events",    label: "Cultural performance" },
  { img: "https://images.unsplash.com/photo-1763639700458-38a0fd25335d?w=440&h=440&fit=crop&auto=format", cat: "Sports",    label: "Outdoor activities" },
  { img: "https://images.unsplash.com/photo-1560421683-6856ea585c78?w=660&h=440&fit=crop&auto=format",   cat: "Arts",      label: "Creative art work" },
];
const GALLERY_CATS = ["All", "Classroom", "Arts", "Sports", "Events"];

const TESTIMONIALS = [
  { name: "Ananya Bose",        child: "Parent — Nursery",  q: "My daughter looks forward to school every single day. The teachers are so warm and caring. She has blossomed into a confident, happy little learner since joining R.K. Children Paradise." },
  { name: "Rajesh Mondal",      child: "Parent — Class 2",  q: "The smart classroom and abacus program have made a remarkable difference. My son now loves mathematics and speaks English with so much confidence — we are truly grateful!" },
  { name: "Sumita Chatterjee",  child: "Parent — LKG",      q: "R.K. Children Paradise is not just a school, it is a nurturing second home. The activities, teachers and the emphasis on safety are genuinely outstanding." },
  { name: "Dipak Roy",          child: "Parent — Class 1",  q: "The focus on overall development — academics, arts, sports and communication — is exactly what we wanted for our child. We made the right choice." },
];

const NOTICES = [
  { date: "10 Sep 2026", cat: "Admissions", catC: "#D97706 bg-amber-50",   title: "Admissions Open 2026–27",            desc: "Open for Nursery to Class 5. Limited seats — enquire today." },
  { date: "05 Sep 2026", cat: "Events",     catC: "#2563EB bg-blue-50",    title: "Annual Cultural Day — Oct 15",        desc: "Music, dance, drama and celebrations for the whole family." },
  { date: "28 Aug 2026", cat: "Holiday",    catC: "#7C3AED bg-purple-50",  title: "Durga Puja Holiday Notice",           desc: "School closed Oct 1–10. Classes resume Oct 11, 2026." },
  { date: "20 Aug 2026", cat: "Meeting",    catC: "#059669 bg-emerald-50", title: "Parent-Teacher Meeting — Sep 25",     desc: "All parents are warmly requested to attend." },
  { date: "15 Aug 2026", cat: "Award",      catC: "#D97706 bg-amber-50",   title: "Abacus Championship Winners 🏆",     desc: "Our students won 3 gold medals at the District Championship!" },
  { date: "10 Aug 2026", cat: "Exams",      catC: "#DC2626 bg-red-50",     title: "Annual Exam Schedule Released",       desc: "Exam timetable for Classes 1–4 now available at the office." },
];

/* ═══════════════════════════════════════════════════════════════
   SECTION WRAPPER — shared padding + max-width
═══════════════════════════════════════════════════════════════ */
function Section({
  id, bg = "#fff", className = "", style = {}, children,
}: { id?: string; bg?: string; className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <section id={id} style={{ background: bg, ...style }} className={className}>
      <div className="section-container">
        {children}
      </div>
    </section>
  );
}

function SectionHead({ label, heading, sub, light = false }: { label?: string; heading: React.ReactNode; sub?: string; light?: boolean }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }} className="reveal">
      {label && <div className="section-label" style={light ? { background: "rgba(254,204,76,.18)", color: "#FECC4C" } : {}}>{label}</div>}
      <h2 style={{ fontSize: "clamp(1.5rem,3.5vw,2.6rem)", color: light ? "#fff" : "#173B5E", marginBottom: 12 }}>{heading}</h2>
      {sub && <p style={{ color: light ? "#94B8D4" : "#6B7280", maxWidth: 560, margin: "0 auto", lineHeight: 1.7, fontSize: 15, fontWeight: 500 }}>{sub}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const linkStyle = (link: string): React.CSSProperties => ({
    padding: "8px 16px",
    borderRadius: 100,
    fontSize: 14,
    fontWeight: active === link ? 800 : 600,
    color: active === link ? "#173B5E" : "#5A6A7A",
    background: active === link ? "#FECC4C" : "transparent",
    textDecoration: "none",
    transition: "all .2s",
    whiteSpace: "nowrap",
  });

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#fff",
        boxShadow: scrolled ? "0 4px 24px rgba(23,59,94,.08)" : "0 1px 0 rgba(23,59,94,.06)",
        transition: "box-shadow .3s",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <a href="#home" onClick={() => setActive("Home")} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg,#FECC4C,#F5B800)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 14px rgba(254,204,76,.4)" }}>
            🏫
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16, color: "#173B5E", lineHeight: 1.1 }}>R.K. Children</div>
            <div style={{ fontWeight: 900, fontSize: 16, color: "#FECC4C", lineHeight: 1.1 }}>Paradise</div>
          </div>
        </a>

        {/* Desktop links */}
        <div style={{ gap: 4, alignItems: "center" }} className="hidden lg:flex">
          {NAV.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setActive(n)} style={linkStyle(n)}
              onMouseEnter={e => { if (active !== n) (e.currentTarget as HTMLElement).style.color = "#173B5E"; }}
              onMouseLeave={e => { if (active !== n) (e.currentTarget as HTMLElement).style.color = "#5A6A7A"; }}>
              {n}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#admissions" className="btn-primary nav-cta-btn" style={{ fontSize: 14, padding: "10px 24px" }}>
          Admission Enquiry <Ic.ArrowRight size={15} />
        </a>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="lg:hidden" style={{ color: "#173B5E", background: "none", border: "none", cursor: "pointer", padding: 6 }} aria-label="Toggle menu">
          {open ? <Ic.X /> : <Ic.Menu />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background: "#fff", borderTop: "1px solid #F3F4F6", padding: "16px 20px 24px", maxHeight: "calc(100vh - 72px)", overflowY: "auto" }}>
          {NAV.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} onClick={() => { setActive(n); setOpen(false); }}
              style={{ display: "block", padding: "11px 14px", borderRadius: 12, fontWeight: 700, fontSize: 15, color: active === n ? "#173B5E" : "#6B7280", background: active === n ? "#FECC4C" : "transparent", marginBottom: 4, textDecoration: "none" }}>
              {n}
            </a>
          ))}
          <a href="#admissions" onClick={() => setOpen(false)} className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 12, fontSize: 15 }}>
            Admission Enquiry <Ic.ArrowRight size={15} />
          </a>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="home" style={{ paddingTop: 72, background: "linear-gradient(135deg, #FFFDF7 0%, #FFF9EB 45%, #F0F7FF 100%)", position: "relative", overflow: "hidden", minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center" }}>
      {/* Top-left organic shape */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "24vw", maxWidth: 280, minWidth: 140, height: 180, background: "#FECC4C", borderRadius: "0 0 100% 0", opacity: .85, pointerEvents: "none", zIndex: 0 }} />

      {/* Bottom-right organic shape */}
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "32vw", maxWidth: 420, minWidth: 180, height: 240, background: "#FECC4C", borderRadius: "100% 0 0 0", opacity: .9, pointerEvents: "none", zIndex: 0 }} />

      {/* Desktop Full-Bleed Right Image Container with Soft Left Gradient Fade (1024px+) */}
      <div
        className="hidden lg:block"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "50vw",
          maxWidth: "50%",
          zIndex: 1,
          overflow: "hidden",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.85) 28%, black 48%)",
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.85) 28%, black 48%)",
        }}
      >
        <img
          src={heroImg}
          alt="Happy Indian children learning at R.K. Children Paradise"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
          }}
        />
        {/* Soft background gradient overlay to blend left edge seamlessly into hero background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, #FFFDF7 0%, rgba(255,253,247,0.5) 15%, transparent 35%)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 20px 60px", width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 36, alignItems: "center" }} className="lg:grid-cols-2-hero">
          <style>{`
            @media(min-width:1024px){
              .lg\\:grid-cols-2-hero { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>
          
          {/* ── Left Content ─────────────────────────────────── */}
          <div style={{ animation: "fadeUp .8s ease both" }}>
            {/* Top Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "#FFF4CC", fontSize: 13, fontWeight: 800, color: "#173B5E", boxShadow: "0 2px 8px rgba(254,204,76,.2)" }}>
                <span>☀️</span> Nursery – Class 5
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "#EAF5FF", fontSize: 13, fontWeight: 800, color: "#173B5E", boxShadow: "0 2px 8px rgba(96,165,250,.15)" }}>
                <span>🧡</span> Safe · Caring · Progressive
              </div>
            </div>

            {/* Heading with Sunburst Accents */}
            <h1 style={{ fontSize: "clamp(1.85rem,4.8vw,3.7rem)", fontWeight: 900, color: "#173B5E", marginBottom: 20, lineHeight: 1.14, maxWidth: 580 }}>
              <span style={{ position: "relative", display: "inline-block" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", left: -30, top: 4 }} className="hidden sm:block">
                  <path d="M18 5L6 9M20 13L4 15M18 20L8 18" stroke="#FECC4C" strokeWidth="3.2" strokeLinecap="round" />
                </svg>
                Where Little Minds
              </span><br />
              <span style={{ color: "#FECC4C", position: "relative" }}>Grow Into</span>{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                Big
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", right: -32, top: 2 }} className="hidden sm:block">
                  <path d="M4 5L16 9M2 13L18 15M4 20L14 18" stroke="#FECC4C" strokeWidth="3.2" strokeLinecap="round" />
                </svg>
              </span><br />
              Dreams
            </h1>

            {/* Description Paragraph */}
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#5A6A7A", maxWidth: 520, marginBottom: 28, fontWeight: 500 }}>
              R.K. Children Paradise provides a joyful, safe and nurturing learning environment where children from Nursery to Class 5 learn, explore, create and grow with confidence.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
              <a href="#about" className="btn-navy">
                Explore Our School <Ic.ArrowRight />
              </a>
              <a href="#admissions" className="btn-primary">
                Admission Enquiry <Ic.ArrowRight />
              </a>
            </div>

            {/* Statistics Row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 24px", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "#FFF4CC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                  👥
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#173B5E", lineHeight: 1 }}>500+</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginTop: 3 }}>Happy Students</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "#FFF4CC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                  ⭐
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#173B5E", lineHeight: 1 }}>49+</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginTop: 3 }}>Years of Excellence</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "#FFF4CC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                  📙
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#173B5E", lineHeight: 1 }}>10+</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginTop: 3 }}>Activity Programs</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column (Floating Cards & Mobile Image) ──────────────── */}
          <div style={{ position: "relative", minHeight: 340 }}>
            {/* Mobile Image (< 1024px) */}
            <div className="lg:hidden" style={{ animation: "scaleIn .9s ease both .15s" }}>
              <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 48px rgba(23,59,94,.14)", aspectRatio: "16/10" }}>
                <img src={heroImg} alt="Happy Indian children learning at R.K. Children Paradise" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>

            {/* Floating card – Top-Right: Trusted School */}
            <div className="float-1" style={{ position: "absolute", top: -45, right: 0, background: "#fff", borderRadius: 18, padding: "10px 16px", boxShadow: "0 12px 36px rgba(23,59,94,.16)", display: "flex", alignItems: "center", gap: 10, zIndex: 10, maxWidth: "calc(100% - 16px)" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FFF4CC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>⭐</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#173B5E" }}>Trusted School</div>
                <div style={{ display: "flex", gap: 2, marginTop: 2 }}>{[1,2,3,4,5].map(i => <Ic.Star key={i} />)}</div>
              </div>
            </div>

            {/* Floating card – Bottom-Left: Fire Safety Approved */}
            <div className="float-2" style={{ position: "absolute", bottom: -12, left: 0, background: "#fff", borderRadius: 18, padding: "10px 16px", boxShadow: "0 12px 36px rgba(23,59,94,.16)", display: "flex", alignItems: "center", gap: 10, zIndex: 10, maxWidth: "calc(100% - 16px)" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "#FFE8E8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🔥</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#173B5E" }}>Fire Safety Approved</div>
                <div style={{ fontSize: 11, color: "#6B7280", marginTop: 1, fontWeight: 600 }}>Committed to child safety</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fluid Deep Navy Bottom Wave */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3 }}>
        <WaveBottom fill="#173B5E" />
      </div>
    </section>
  );
}

/* small CSS helper injected once */
const heroGridCSS = `
@media(min-width:1024px){
  .hero-grid{ grid-template-columns:1fr 1fr !important; }
}
`;

/* ═══════════════════════════════════════════════════════════════
   TRUST BAR
═══════════════════════════════════════════════════════════════ */
function TrustBar() {
  return (
    <section style={{ background: "#173B5E" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
          {TRUST.map((t, i) => (
            <div key={i} className="reveal card-lift" style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "20px 20px", borderRadius: 20, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", cursor: "default", transitionDelay: `${i * 80}ms` }}>
              <div style={{ fontSize: 32, lineHeight: 1, flexShrink: 0 }}>{t.icon}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#FECC4C", marginBottom: 4 }}>{t.title}</div>
                <div style={{ fontSize: 13, color: "#94B8D4", lineHeight: 1.5, fontWeight: 500 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WaveBottom fill="#fff" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STATS MARQUEE
═══════════════════════════════════════════════════════════════ */
function StatsStrip() {
  const items = [...STATS, ...STATS];
  return (
    <div style={{ background: "#FFF4CC", padding: "18px 0", overflow: "hidden" }}>
      <div className="marquee-track">
        {items.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 40px", whiteSpace: "nowrap", flexShrink: 0 }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: "#173B5E" }}>{s.val}{s.suffix}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#6B7280" }}>{s.label}</span>
            <span style={{ color: "#FECC4C", fontSize: 20 }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════════ */
function About() {
  return (
    <Section id="about" bg="#fff">
      <div style={{ display: "grid", gap: 56, alignItems: "center" }} className="about-grid">
        <style>{`.about-grid{ grid-template-columns:1fr; } @media(min-width:1024px){ .about-grid{ grid-template-columns:1fr 1fr; } }`}</style>

        {/* Images collage */}
        <div className="reveal" style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto", gap: 14 }}>
            <div className="img-zoom" style={{ gridColumn: "1 / -1", borderRadius: 24, overflow: "hidden", aspectRatio: "16/8" }}>
              <img src="https://images.unsplash.com/photo-1692609659165-1ec4d8108c0e?w=800&h=400&fit=crop&auto=format" alt="Children at school" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="img-zoom" style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "1/1" }}>
              <img src="https://images.unsplash.com/photo-1692269725911-87697c558be1?w=400&h=400&fit=crop&auto=format" alt="Students learning" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="img-zoom" style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "1/1" }}>
              <img src="https://images.unsplash.com/photo-1617117206620-b01f2919ff86?w=400&h=400&fit=crop&auto=format" alt="Art activity" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          {/* Accent badge */}
          <div style={{ position: "absolute", top: 16, right: 16, background: "#fff", borderRadius: 18, padding: "12px 18px", boxShadow: "0 8px 24px rgba(23,59,94,.15)", textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#FECC4C" }}>10+</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#173B5E", lineHeight: 1.3 }}>Years of<br/>Excellence</div>
          </div>
          {/* Deco blob behind */}
          <Blob color="#FECC4C" size={160} style={{ bottom: -30, left: -30, opacity: .18, filter: "blur(2px)", zIndex: -1 }} />
        </div>

        {/* Text */}
        <div className="reveal reveal-delay-2">
          <div className="section-label">About Our School</div>
          <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "#173B5E", marginBottom: 16 }}>
            A Happy Place to Learn,{" "}
            <span style={{ color: "#FECC4C" }}>Explore & Grow</span>
          </h2>
          <p style={{ color: "#6B7280", lineHeight: 1.8, fontSize: 15, marginBottom: 12, fontWeight: 500 }}>
            R.K. Children Paradise is a nurturing school for young learners from Nursery to Class 5 in Payradanga, West Bengal. We combine academic excellence with creative activities, communication skills, technology, sports and physical development.
          </p>
          <p style={{ color: "#6B7280", lineHeight: 1.8, fontSize: 15, marginBottom: 28, fontWeight: 500 }}>
            Our dedicated educators create a warm, stimulating environment where curiosity is celebrated and every child is encouraged to discover their unique potential.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginBottom: 32 }}>
            {ABOUT_CHECKS.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Ic.Check />
                <span style={{ fontSize: 14, fontWeight: 600, color: "#263238" }}>{item}</span>
              </div>
            ))}
          </div>

          <a href="#facilities" className="btn-primary">Know More About Us <Ic.ArrowRight /></a>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ACADEMIC JOURNEY
═══════════════════════════════════════════════════════════════ */
function AcademicJourney() {
  return (
    <section id="academics" style={{ background: "#FFF9ED", position: "relative", overflow: "hidden" }}>
      <WaveTop fill="#fff" />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 20px 70px" }}>
        <SectionHead
          label="Our Curriculum"
          heading={<>Learning Begins With <span style={{ color: "#FECC4C" }}>Curiosity</span></>}
          sub="A carefully designed journey from Nursery to Class 5 — nurturing young minds at every stage of growth."
        />

        {/* Desktop row */}
        <div className="journey-desktop reveal" style={{ position: "relative" }}>
          <style>{`
            .journey-desktop{ display:none; }
            @media(min-width:768px){ .journey-desktop{ display:flex; gap:6px; align-items:flex-start; } }
            @media(min-width:1024px){ .journey-desktop{ gap:8px; } }
            .journey-mobile{ display:flex; flex-direction:column; gap:14px; max-width:340px; margin:0 auto; }
            @media(min-width:768px){ .journey-mobile{ display:none; } }
          `}</style>

          {/* Connector line */}
          <div style={{ position: "absolute", top: 24, left: "4%", right: "4%", height: 3, background: "linear-gradient(90deg,#FECC4C,#F472B6,#A78BFA,#60A5FA,#34D399,#FBBF24,#38BDF8,#F472B6,#10B981)", borderRadius: 10, opacity: .5, zIndex: 0 }} />

          {JOURNEY.map((j, i) => (
            <div key={i} className="card-lift" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1, transitionDelay: `${i * 50}ms` }}>
              <div style={{ width: 48, height: 48, borderRadius: 15, background: j.bg, border: `3px solid ${j.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 12, boxShadow: `0 6px 18px ${j.border}44`, flexShrink: 0 }}>
                {j.emoji}
              </div>
              <div style={{ background: "#fff", borderRadius: 16, padding: "10px 4px", textAlign: "center", width: "100%", boxShadow: "0 4px 16px rgba(23,59,94,.08)", border: `1px solid ${j.border}33` }}>
                <div style={{ fontWeight: 900, fontSize: 13, color: "#173B5E", marginBottom: 2, whiteSpace: "nowrap" }}>{j.level}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", whiteSpace: "nowrap" }}>{j.age}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile column */}
        <div className="journey-mobile reveal">
          {JOURNEY.map((j, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: j.bg, border: `2px solid ${j.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                {j.emoji}
              </div>
              <div style={{ background: "#fff", borderRadius: 14, padding: "12px 16px", flex: 1, boxShadow: "0 4px 12px rgba(23,59,94,.07)" }}>
                <div style={{ fontWeight: 900, fontSize: 15, color: "#173B5E" }}>{j.level}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}>{j.age}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WaveBottom fill="#fff" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WHY CHOOSE
═══════════════════════════════════════════════════════════════ */
function WhyChoose() {
  const bgs = ["#FFF9ED", "#fff", "#EAF5FF", "#EAF5FF", "#fff", "#FFF9ED"];
  return (
    <Section id="facilities" bg="#fff">
      <SectionHead
        label="Why Choose Us"
        heading={<>Why Parents Choose <span style={{ color: "#FECC4C" }}>R.K. Children Paradise</span></>}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))", gap: 20 }}>
        {WHY_CARDS.map((c, i) => (
          <div key={i} className="card-lift reveal" style={{ background: bgs[i], borderRadius: 24, padding: "24px 22px", border: "1px solid rgba(23,59,94,.06)", transitionDelay: `${i * 60}ms` }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 16, boxShadow: "0 4px 14px rgba(23,59,94,.08)" }}>
              {c.emoji}
            </div>
            <h3 style={{ fontWeight: 800, fontSize: 17, color: "#173B5E", marginBottom: 10 }}>{c.title}</h3>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, fontWeight: 500 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BEYOND ACADEMICS
═══════════════════════════════════════════════════════════════ */
function BeyondAcademics() {
  return (
    <section id="activities" style={{ background: "#173B5E", position: "relative", overflow: "hidden" }}>
      <WaveTop fill="#fff" />
      <Blob color="#FECC4C" size={300} style={{ top: 60, right: -60, opacity: .07, filter: "blur(60px)" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 20px 70px" }}>
        <SectionHead
          light
          label="Beyond the Classroom"
          heading={<>Learning Beyond the <span style={{ color: "#FECC4C" }}>Classroom</span></>}
          sub="Because childhood is about discovering more than textbooks."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 16 }}>
          {ACTIVITIES.map((a, i) => (
            <div key={i} className="card-lift reveal group" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.10)", borderRadius: 22, padding: "20px 20px", display: "flex", alignItems: "flex-start", gap: 14, cursor: "default", transitionDelay: `${i * 50}ms` }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.11)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.06)"}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                {a.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#fff", marginBottom: 4 }}>{a.title}</div>
                <div style={{ fontSize: 13, color: "#94B8D4", fontWeight: 500 }}>{a.desc}</div>
              </div>
              <div style={{ color: "#FECC4C", opacity: .7, marginTop: 4 }}><Ic.ArrowRight /></div>
            </div>
          ))}
        </div>
      </div>
      <WaveBottom fill="#fff" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SMART CLASSROOM
═══════════════════════════════════════════════════════════════ */
function SmartClassroom() {
  return (
    <Section bg="#fff">
      <div style={{ display: "grid", gap: 40, alignItems: "center" }} className="smart-grid">
        <style>{`.smart-grid{ grid-template-columns:1fr; } @media(min-width:1024px){ .smart-grid{ grid-template-columns:1fr 1fr; } }`}</style>

        {/* Image */}
        <div className="reveal" style={{ position: "relative" }}>
          <div className="img-zoom" style={{ borderRadius: 28, overflow: "hidden", boxShadow: "0 24px 60px rgba(23,59,94,.18)", aspectRatio: "4/3" }}>
            <img src="https://images.unsplash.com/photo-1727473704274-3fbad0dbbd60?w=760&h=570&fit=crop&auto=format" alt="Smart classroom" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(23,59,94,.45) 0%,transparent 65%)" }} />
          </div>
          <div style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(255,255,255,.95)", backdropFilter: "blur(8px)", borderRadius: 16, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 24px rgba(23,59,94,.15)", maxWidth: "calc(100% - 32px)" }}>
            <span style={{ fontSize: 24, flexShrink: 0 }}>🖥️</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 13, color: "#173B5E" }}>Smart Classrooms</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>Interactive Visual Learning</div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="reveal reveal-delay-2">
          <div className="section-label">Smart Learning</div>
          <h2 style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", color: "#173B5E", marginBottom: 16 }}>
            Preparing Children for a{" "}
            <span style={{ color: "#FECC4C" }}>Changing World</span>
          </h2>
          <p style={{ color: "#6B7280", lineHeight: 1.8, fontSize: 15, marginBottom: 24, fontWeight: 500 }}>
            Modern education becomes more engaging when children can see, explore and interact with what they learn. Our technology-enabled classrooms bring concepts to life in ways that inspire curiosity.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {SMART_FEATURES.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "#FFF4CC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic.Check c="#173B5E" />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#263238" }}>{f}</span>
              </div>
            ))}
          </div>
          <a href="#activities" className="btn-navy">Discover Our Learning Approach <Ic.ArrowRight /></a>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CREATIVE ARTS
═══════════════════════════════════════════════════════════════ */
function CreativeArts() {
  return (
    <section style={{ background: "#FFF9ED", position: "relative", overflow: "hidden" }}>
      <WaveTop fill="#fff" />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 20px 70px" }}>
        <SectionHead
          label="Creative Arts"
          heading={<>Let Their <span style={{ color: "#FECC4C" }}>Creativity Shine</span></>}
          sub="Every child is an artist. We nurture imagination through expressive arts, music, movement and performance."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: 16 }}>
          {ARTS.map((a, i) => (
            <div key={i} className="card-lift img-zoom reveal" style={{ borderRadius: 22, overflow: "hidden", background: "#fff", boxShadow: "0 6px 24px rgba(23,59,94,.09)", transitionDelay: `${i * 70}ms` }}>
              <div style={{ position: "relative", aspectRatio: "4/3" }}>
                <img src={a.img} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(23,59,94,.18)" }} />
                <div style={{ position: "absolute", top: 12, left: 12, width: 36, height: 36, borderRadius: 10, background: a.c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  {a.emoji}
                </div>
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontWeight: 900, fontSize: 15, color: "#173B5E" }}>{a.title}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4, fontWeight: 500 }}>Creativity · Self-expression · Confidence</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WaveBottom fill="#173B5E" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SPORTS
═══════════════════════════════════════════════════════════════ */
function Sports() {
  return (
    <section style={{ background: "#173B5E", position: "relative", overflow: "hidden" }}>
      <Blob color="#FECC4C" size={360} style={{ top: -40, right: -80, opacity: .07, filter: "blur(70px)" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 20px 70px" }}>
        <div style={{ display: "grid", gap: 40, alignItems: "center" }} className="sports-grid">
          <style>{`.sports-grid{ grid-template-columns:1fr; } @media(min-width:1024px){ .sports-grid{ grid-template-columns:1fr 1fr; } }`}</style>

          <div className="reveal">
            <div className="section-label" style={{ background: "rgba(254,204,76,.18)", color: "#FECC4C" }}>Sports & PT</div>
            <h2 style={{ fontSize: "clamp(1.7rem,3.5vw,2.8rem)", color: "#fff", marginBottom: 18 }}>
              Strong Bodies.<br /><span style={{ color: "#FECC4C" }}>Confident Minds.</span>
            </h2>
            <p style={{ color: "#94B8D4", lineHeight: 1.8, fontSize: 15, marginBottom: 24, fontWeight: 500 }}>
              We believe physical activity plays an important role in building confidence, discipline, teamwork and healthy habits. Our sports and PT programs help children grow into well-rounded individuals.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SPORTS_TAGS.map((s, i) => (
                <div key={i} style={{ padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 700, background: "rgba(254,204,76,.14)", color: "#FECC4C", border: "1px solid rgba(254,204,76,.28)" }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2" style={{ position: "relative" }}>
            <div className="img-zoom" style={{ borderRadius: 28, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.35)", aspectRatio: "4/3" }}>
              <img src="https://images.unsplash.com/photo-1763639700458-38a0fd25335d?w=760&h=570&fit=crop&auto=format" alt="Children playing sports at school" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="float-1" style={{ position: "absolute", bottom: -12, left: -8, background: "#FECC4C", borderRadius: 16, padding: "12px 16px", boxShadow: "0 10px 28px rgba(254,204,76,.4)", maxWidth: "calc(100% - 16px)" }}>
              <div style={{ fontSize: 22 }}>⚽🏃🎽</div>
              <div style={{ fontWeight: 800, fontSize: 12, color: "#173B5E", marginTop: 4 }}>Active Every Day</div>
            </div>
          </div>
        </div>
      </div>
      <WaveBottom fill="#fff" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SAFETY
═══════════════════════════════════════════════════════════════ */
function Safety() {
  return (
    <section style={{ background: "#102F4A", position: "relative", overflow: "hidden" }}>
      <Blob color="#FECC4C" size={400} style={{ top: -80, left: -100, opacity: .05, filter: "blur(80px)" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 20px 70px" }}>
        {/* Fire badge */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 22px", borderRadius: 100, border: "2px solid rgba(254,204,76,.45)", background: "rgba(254,204,76,.08)", marginBottom: 20, maxWidth: "100%" }}>
            <Ic.Shield />
            <span style={{ fontWeight: 900, fontSize: 14, color: "#FECC4C", letterSpacing: "0.06em", textTransform: "uppercase" }}>Fire Safety Approved School</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.7rem,3.5vw,2.8rem)", color: "#fff", marginBottom: 14 }}>
            A Safe Place to Learn,{" "}
            <span style={{ color: "#FECC4C" }}>Grow & Thrive</span>
          </h2>
          <p style={{ color: "#94B8D4", maxWidth: 600, margin: "0 auto", lineHeight: 1.8, fontSize: 15, fontWeight: 500 }}>
            Your child's safety is our highest priority. R.K. Children Paradise maintains a safe and disciplined learning environment and is approved by the Fire Department.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 16 }}>
          {SAFETY_CARDS.map((c, i) => (
            <div key={i} className="card-lift reveal" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.10)", borderRadius: 22, padding: "28px 22px", textAlign: "center", transitionDelay: `${i * 100}ms` }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>{c.emoji}</div>
              <h3 style={{ fontWeight: 800, fontSize: 17, color: "#FECC4C", marginBottom: 8 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: "#94B8D4", lineHeight: 1.7, fontWeight: 500 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TEACHERS
═══════════════════════════════════════════════════════════════ */
function Teachers() {
  return (
    <Section bg="#fff">
      <SectionHead
        label="Our Educators"
        heading={<>Meet Our <span style={{ color: "#FECC4C" }}>Caring Educators</span></>}
        sub="Dedicated, experienced and passionate about helping every child reach their potential."
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,210px),1fr))", gap: 18 }}>
        {TEACHERS.map((t, i) => (
          <div key={i} className="card-lift reveal" style={{ background: "#fff", borderRadius: 22, overflow: "hidden", boxShadow: "0 6px 24px rgba(23,59,94,.09)", border: "1px solid rgba(23,59,94,.06)", transitionDelay: `${i * 80}ms` }}>
            <div className="img-zoom" style={{ aspectRatio: "1/1", overflow: "hidden" }}>
              <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "16px 16px", textAlign: "center" }}>
              <h3 style={{ fontWeight: 800, fontSize: 15, color: "#173B5E", marginBottom: 3 }}>{t.name}</h3>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#FECC4C", marginBottom: 3 }}>{t.role}</div>
              <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>{t.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCHOOL LIFE
═══════════════════════════════════════════════════════════════ */
function SchoolLifeSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section style={{ background: "#FFF9ED", padding: "60px 0 70px", overflow: "hidden", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div className="reveal">
            <div className="section-label">School Life</div>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#173B5E" }}>
              Life at <span style={{ color: "#FECC4C" }}>R.K. Children Paradise</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => scroll(-1)} aria-label="Previous" style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #FECC4C", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#173B5E" }}><Ic.ChevLeft /></button>
            <button onClick={() => scroll(1)} aria-label="Next" style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "#FECC4C", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#173B5E" }}><Ic.ChevRight /></button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} style={{ display: "flex", gap: 16, overflowX: "auto", scrollbarWidth: "none", padding: "8px 20px 16px", WebkitOverflowScrolling: "touch" }}>
        {SCHOOL_LIFE.map((item, i) => (
          <div key={i} className="img-zoom gallery-item" style={{ flexShrink: 0, width: "clamp(240px,75vw,340px)", borderRadius: 22, overflow: "hidden", boxShadow: "0 8px 28px rgba(23,59,94,.10)", position: "relative", aspectRatio: "4/3" }}>
            <img src={item.img} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div className="overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(23,59,94,.85) 0%,transparent 55%)", display: "flex", alignItems: "flex-end", padding: 16 }}>
              <span style={{ fontWeight: 800, fontSize: 14, color: "#fff" }}>{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GALLERY
═══════════════════════════════════════════════════════════════ */
function Gallery() {
  const [cat, setCat] = useState("All");
  const items = cat === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.cat === cat);

  return (
    <Section id="gallery" bg="#fff">
      <SectionHead
        label="Photo Gallery"
        heading={<>Moments That Make <span style={{ color: "#FECC4C" }}>Childhood Special</span></>}
      />
      {/* Filter buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28, flexWrap: "wrap" }} className="reveal">
        {GALLERY_CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{ padding: "7px 18px", borderRadius: 100, fontSize: 13, fontWeight: 800, border: "2px solid", borderColor: cat === c ? "#FECC4C" : "#E5E7EB", background: cat === c ? "#FECC4C" : "#fff", color: cat === c ? "#173B5E" : "#6B7280", cursor: "pointer", transition: "all .2s" }}>
            {c}
          </button>
        ))}
      </div>

      {/* Masonry-inspired grid */}
      <div style={{ columns: "var(--gallery-cols,2)", columnGap: 14 }}>
        <style>{`
          :root{ --gallery-cols:2; }
          @media(min-width:640px){ :root{ --gallery-cols:3; } }
          @media(min-width:1024px){ :root{ --gallery-cols:4; } }
        `}</style>
        {items.map((g, i) => (
          <div key={`${cat}-${i}`} className="gallery-item img-zoom" style={{ breakInside: "avoid", marginBottom: 14, borderRadius: 18, overflow: "hidden", position: "relative", boxShadow: "0 4px 16px rgba(23,59,94,.08)" }}>
            <img src={g.img} alt={g.label} style={{ width: "100%", display: "block" }} />
            <div className="overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(23,59,94,.80) 0%,transparent 55%)", display: "flex", alignItems: "flex-end", padding: "14px 14px" }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#FECC4C", marginBottom: 3, textTransform: "uppercase", letterSpacing: ".06em" }}>{g.cat}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>{g.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ADMISSION CTA
═══════════════════════════════════════════════════════════════ */
function AdmissionCTA() {
  return (
    <section style={{ background: "#FECC4C", position: "relative", overflow: "hidden", padding: "60px 20px" }}>
      <Blob color="#fff" size={400} style={{ top: -60, right: -60, opacity: .15, filter: "blur(60px)" }} />
      <Blob color="#173B5E" size={260} style={{ bottom: -40, left: -40, opacity: .08, filter: "blur(50px)" }} />

      {/* Floating emojis */}
      {["🌟", "📚", "🎨", "⚽", "🎵", "🏆"].map((e, i) => (
        <div key={i} className={`float-${(i % 4) + 1} hidden md:block`}
          style={{ position: "absolute", fontSize: 30, opacity: .35, zIndex: 1,
            top: `${[15, 12, 60, 55, 20, 65][i]}%`, left: i < 3 ? `${[4, 10, 2][i]}%` : undefined, right: i >= 3 ? `${[4, 10, 2][i - 3]}%` : undefined }}>
          {e}
        </div>
      ))}

      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 16px", borderRadius: 100, background: "rgba(23,59,94,.12)", fontSize: 12, fontWeight: 800, color: "#173B5E", marginBottom: 18, textTransform: "uppercase", letterSpacing: ".1em" }}>
          Admissions Open 2026–27
        </div>
        <h2 className="reveal" style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)", color: "#173B5E", marginBottom: 14 }}>
          Give Your Child a Joyful Start to Learning
        </h2>
        <p className="reveal" style={{ fontSize: 15, color: "#173B5E", opacity: .7, marginBottom: 28, fontWeight: 600 }}>
          Admissions open for Nursery to Class 5. Limited seats — enquire today.
        </p>
        <div className="reveal" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#admissions" className="btn-navy">Enquire for Admission <Ic.ArrowRight /></a>
          <a href="#contact" className="btn-outline" style={{ borderColor: "#173B5E" }}>Contact School <Ic.ArrowRight /></a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ADMISSION FORM
═══════════════════════════════════════════════════════════════ */
function AdmissionForm() {
  type Form = {
    child: string;
    dob: string;
    applying: string;
    current: string;
    parent: string;
    phone: string;
    email: string;
    address: string;
    msg: string;
  };
  const blank: Form = {
    child: "",
    dob: "",
    applying: "",
    current: "",
    parent: "",
    phone: "",
    email: "",
    address: "",
    msg: "",
  };
  const [form, setForm] = useState<Form>(blank);
  const [done, setDone] = useState(false);
  const set = (k: keyof Form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hello, I would like to enquire about admission.

Student Name: ${form.child}
Date of Birth: ${form.dob}
Applying For: ${form.applying}
Current Class: ${form.current || "N/A"}
Parent/Guardian Name: ${form.parent}
Phone Number: ${form.phone}
Email: ${form.email || "N/A"}
Address: ${form.address}
Message: ${form.msg || "N/A"}

Please contact me regarding the admission process.`;

    const whatsappUrl = `https://wa.me/919433176984?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    setDone(true);
    setTimeout(() => {
      setDone(false);
      setForm(blank);
    }, 5000);
  };

  return (
    <section id="admissions" style={{ background: "#EAF5FF", padding: "60px 20px", position: "relative", overflow: "hidden" }}>
      <Blob color="#FECC4C" size={300} style={{ top: -60, right: -60, opacity: .12, filter: "blur(60px)" }} />
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 36 }}>
          <div className="section-label">Admission Enquiry</div>
          <h2 style={{ fontSize: "clamp(1.7rem,3.5vw,2.6rem)", color: "#173B5E" }}>
            Enquire for <span style={{ color: "#FECC4C" }}>Admission</span>
          </h2>
          <p style={{ color: "#6B7280", marginTop: 8, fontWeight: 500, fontSize: 15 }}>Fill the form and our team will reach out within 24 hours.</p>
        </div>

        {done ? (
          <div className="reveal" style={{ background: "#fff", borderRadius: 24, padding: "48px 24px", textAlign: "center", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ fontSize: 56, marginBottom: 14 }}>🎉</div>
            <h3 style={{ fontWeight: 900, fontSize: 22, color: "#173B5E", marginBottom: 8 }}>Enquiry Submitted!</h3>
            <p style={{ color: "#6B7280", fontWeight: 500 }}>Thank you! Our team will contact you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reveal" style={{ background: "#fff", borderRadius: 24, padding: "clamp(20px,4vw,40px)", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: "16px 18px" }}>
              {/* 1. Student Name */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#173B5E", marginBottom: 6 }}>Child's Name *</label>
                <input required type="text" className="form-input" placeholder="Child's full name" value={form.child} onChange={set("child")} />
              </div>

              {/* 2. Date of Birth */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#173B5E", marginBottom: 6 }}>Date of Birth *</label>
                <input required type="date" className="form-input" style={{ colorScheme: "light" }} value={form.dob} onChange={set("dob")} />
              </div>

              {/* 3. Applying For */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#173B5E", marginBottom: 6 }}>Applying For *</label>
                <select required className="form-input" style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%236B7280' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 40 }} value={form.applying} onChange={set("applying")}>
                  <option value="">Select Class...</option>
                  {CLASS_LIST.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              {/* 4. Current Class */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#173B5E", marginBottom: 6 }}>Current Class</label>
                <select className="form-input" style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%236B7280' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 40 }} value={form.current} onChange={set("current")}>
                  <option value="">Select...</option>
                  {["Not yet in school", ...CLASS_LIST].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              {/* 5. Parent Name */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#173B5E", marginBottom: 6 }}>Parent / Guardian Name *</label>
                <input required type="text" className="form-input" placeholder="Your full name" value={form.parent} onChange={set("parent")} />
              </div>

              {/* 6. Phone Number */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#173B5E", marginBottom: 6 }}>Phone Number *</label>
                <input required type="tel" className="form-input" placeholder="+91 94331 76984" value={form.phone} onChange={set("phone")} />
              </div>

              {/* 7. Email Address */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#173B5E", marginBottom: 6 }}>Email Address</label>
                <input type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={set("email")} />
              </div>

              {/* 8. Address */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#173B5E", marginBottom: 6 }}>Address *</label>
                <textarea required rows={3} className="form-input" style={{ resize: "none", lineHeight: 1.6 }} placeholder="Complete residential address..." value={form.address} onChange={set("address")} />
              </div>

              {/* 9. Message */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#173B5E", marginBottom: 6 }}>Message (Optional)</label>
                <textarea rows={3} className="form-input" style={{ resize: "none", lineHeight: 1.6 }} placeholder="Any questions or additional information..." value={form.msg} onChange={set("msg")} />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 20, fontSize: 15, padding: "14px 24px" }}>
              Submit Enquiry 🚀
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════════════ */
function Testimonials() {
  return (
    <Section bg="#fff">
      <SectionHead
        label="Parent Testimonials"
        heading={<>What Parents <span style={{ color: "#FECC4C" }}>Say About Us</span></>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: 18 }}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="card-lift reveal" style={{ borderRadius: 22, padding: "26px 22px", background: i % 2 === 0 ? "#FFF9ED" : "#EAF5FF", transitionDelay: `${i * 80}ms` }}>
            <Ic.Quote />
            <p style={{ fontSize: 14, color: "#263238", lineHeight: 1.75, fontStyle: "italic", margin: "14px 0 20px", fontWeight: 500 }}>"{t.q}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#FECC4C", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 17, color: "#173B5E", flexShrink: 0 }}>
                {t.name[0]}
              </div>
              <div style={{ flex: 1, minWidth: 120 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: "#173B5E" }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 1, fontWeight: 500 }}>{t.child}</div>
              </div>
              <div style={{ display: "flex", gap: 2 }}>
                {[1,2,3,4,5].map(j => <Ic.Star key={j} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NOTICES
═══════════════════════════════════════════════════════════════ */
function Notices() {
  return (
    <section style={{ background: "#FFF9ED", position: "relative", overflow: "hidden" }}>
      <WaveTop fill="#fff" />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 20px 70px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 14 }}>
          <div className="reveal">
            <div className="section-label">School Updates</div>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#173B5E" }}>
              Latest School <span style={{ color: "#FECC4C" }}>Updates</span>
            </h2>
          </div>
          <button className="btn-outline reveal" style={{ padding: "9px 20px", fontSize: 13 }}>View All Notices</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 16 }}>
          {NOTICES.map((n, i) => {
            const [textC, bgC] = n.catC.split(" ");
            return (
              <div key={i} className="card-lift reveal" style={{ background: "#fff", borderRadius: 20, padding: "20px 20px", boxShadow: "0 4px 16px rgba(23,59,94,.07)", border: "1px solid rgba(23,59,94,.05)", transitionDelay: `${i * 60}ms` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                  <span style={{ padding: "4px 10px", borderRadius: 100, fontSize: 11, fontWeight: 800, color: textC, background: bgC }}>
                    {n.cat}
                  </span>
                  <span style={{ fontSize: 11, color: "#B0BAC9", fontWeight: 600 }}>{n.date}</span>
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: "#173B5E", marginBottom: 8, lineHeight: 1.4 }}>{n.title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65, marginBottom: 12, fontWeight: 500 }}>{n.desc}</p>
                <button style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 800, color: "#FECC4C", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  View Details <Ic.ArrowRight />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <WaveBottom fill="#fff" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════ */
function Contact() {
  const info = [
    { icon: <Ic.Pin />,   label: "Address",      val: "Payradanga, West Bengal, India" },
    { icon: <Ic.Phone />, label: "Phone",         val: "+91 9433176984" },
    { icon: <Ic.Mail />,  label: "Email",         val: "rkchildrenparadise@gmail.com" },
    { icon: <Ic.Clock />, label: "School Hours",  val: "Mon – Sat: 8:00 AM – 2:00 PM" },
  ];

  return (
    <Section id="contact" bg="#fff">
      <SectionHead label="Find Us" heading={<>Get in <span style={{ color: "#FECC4C" }}>Touch</span></>} />
      <div style={{ display: "grid", gap: 32, alignItems: "start" }} className="contact-grid">
        <style>{`.contact-grid{ grid-template-columns:1fr; } @media(min-width:1024px){ .contact-grid{ grid-template-columns:1fr 1fr; } }`}</style>

        {/* Info card */}
        <div className="reveal">
          <div style={{ background: "#FFF9ED", borderRadius: 24, padding: "28px 24px", boxShadow: "var(--shadow-card)", marginBottom: 16 }}>
            <h3 style={{ fontWeight: 900, fontSize: 20, color: "#173B5E", marginBottom: 4 }}>R.K. Children Paradise</h3>
            <p style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 24, fontWeight: 500 }}>Nurturing young minds from Nursery to Class 5.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {info.map((it, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: "#FFF4CC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#173B5E" }}>
                    {it.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>{it.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#173B5E", wordBreak: "break-word" }}>{it.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <a href="#admissions" className="btn-primary" style={{ justifyContent: "center", fontSize: 13, padding: "12px 16px" }}>Admission Enquiry</a>
            <a href="https://maps.app.goo.gl/LMPDfwXcgjqFSiVz7" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: 13, padding: "11px 16px", justifyContent: "center" }}>Get Directions</a>
          </div>
        </div>

        {/* Location Box with Embedded Map */}
        <div className="reveal reveal-delay-2" style={{ borderRadius: 28, overflow: "hidden", boxShadow: "var(--shadow-lg)", background: "#EAF5FF", position: "relative", display: "flex", flexDirection: "column", border: "1px solid rgba(23,59,94,.08)" }}>
          {/* Top Location Info */}
          <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(23,59,94,.08)", zIndex: 2 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "#FFF4CC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
              📍
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 900, fontSize: 16, color: "#173B5E", lineHeight: 1.2 }}>R.K. Children Paradise</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginTop: 2 }}>Payradanga, West Bengal</div>
            </div>
          </div>

          {/* Embedded Map */}
          <div style={{ flex: 1, minHeight: 300, width: "100%", position: "relative", background: "#EAF5FF" }}>
            <iframe
              title="R.K. Children Paradise Location Map"
              src="https://maps.google.com/maps?q=R.K.+Children+Paradise,+Payradanga,+West+Bengal&t=&z=15&ie=UTF8&iwloc=&output=embed"
              style={{ width: "100%", height: "100%", minHeight: 300, border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Bottom Action */}
          <div style={{ background: "#fff", padding: "14px 20px", borderTop: "1px solid rgba(23,59,94,.08)", textAlign: "center", zIndex: 2 }}>
            <a
              href="https://maps.app.goo.gl/LMPDfwXcgjqFSiVz7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy"
              style={{ fontSize: 13, padding: "11px 22px", display: "inline-flex", width: "100%", justifyContent: "center" }}
            >
              Open in Google Maps <Ic.ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function Footer() {
  const quick = ["Home", "About", "Academics", "Activities", "Gallery", "Admissions", "Contact"];
  const school = ["Nursery – Class 5", "Smart Classroom", "Activities", "Safety"];

  return (
    <footer style={{ background: "#102F4A" }}>
      <WaveTop fill="#fff" />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 36, marginBottom: 48 }}>
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: "#FECC4C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏫</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 15, color: "#fff", lineHeight: 1.1 }}>R.K. Children</div>
                <div style={{ fontWeight: 900, fontSize: 15, color: "#FECC4C", lineHeight: 1.1 }}>Paradise</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#6B8FAA", lineHeight: 1.7, marginBottom: 20, fontWeight: 500 }}>
              A joyful, safe and nurturing learning environment for children from Nursery to Class 5 in Payradanga, West Bengal.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["📘", "📸", "🐦", "▶️"].map((ic, i) => (
                <button key={i} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,.08)", border: "none", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.16)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.08)"}>
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div style={{ fontWeight: 800, fontSize: 13, color: "#FECC4C", marginBottom: 16, textTransform: "uppercase", letterSpacing: ".08em" }}>Quick Links</div>
            {quick.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ display: "block", fontSize: 14, color: "#6B8FAA", textDecoration: "none", marginBottom: 10, fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#FECC4C"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#6B8FAA"}>
                {l}
              </a>
            ))}
          </div>

          {/* School */}
          <div>
            <div style={{ fontWeight: 800, fontSize: 13, color: "#FECC4C", marginBottom: 16, textTransform: "uppercase", letterSpacing: ".08em" }}>School</div>
            {school.map(l => (
              <div key={l} style={{ fontSize: 14, color: "#6B8FAA", marginBottom: 10, fontWeight: 500 }}>{l}</div>
            ))}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 100, background: "rgba(254,204,76,.14)", border: "1px solid rgba(254,204,76,.28)", marginTop: 6 }}>
              <Ic.Shield />
              <span style={{ fontSize: 11, fontWeight: 800, color: "#FECC4C" }}>Fire Safety Approved</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontWeight: 800, fontSize: 13, color: "#FECC4C", marginBottom: 16, textTransform: "uppercase", letterSpacing: ".08em" }}>Contact</div>
            {[
              { icon: <Ic.Pin />, v: "Payradanga, West Bengal, India" },
              { icon: <Ic.Phone />, v: "+91 9433176984" },
              { icon: <Ic.Mail />, v: "rkchildrenparadise@gmail.com" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, color: "#6B8FAA" }}>
                <span style={{ marginTop: 1, flexShrink: 0 }}>{c.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{c.v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 24, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 13, color: "#4A6580" }}>© 2026 Sign Art Creations. All Rights Reserved.</p>
          <p style={{ fontSize: 13, color: "#4A6580" }}>Made with ❤️ for the children of R.K. Children Paradise Payradanga</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════════ */
export default function App() {
  useReveal();

  return (
    <>
      <style>{heroGridCSS}</style>
      <Navbar />
      <Hero />
      <TrustBar />
      <StatsStrip />
      <About />
      <AcademicJourney />
      <WhyChoose />
      <BeyondAcademics />
      <SmartClassroom />
      <CreativeArts />
      <Sports />
      <Safety />
      <Teachers />
      <SchoolLifeSection />
      <Gallery />
      <AdmissionCTA />
      <AdmissionForm />
      <Testimonials />
      <Notices />
      <Contact />
      <Footer />
    </>
  );
}
