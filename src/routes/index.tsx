import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Activity, ShieldCheck } from "lucide-react";
import { DragonMark, Particles } from "@/components/vip/Chrome";
import { BRAND } from "@/lib/session";
import xpLogo from "@/assets/xparibet-logo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ثغرات التطبيقات — كاشف الألعاب" },
      {
        name: "description",
        content:
          "منصة ثغرات التطبيقات لكشف نتائج لعبة التفاحة ولعبة الطيارة على Xparibet بتفعيل VIP.",
      },
      { property: "og:title", content: "ثغرات التطبيقات" },
      { property: "og:description", content: "تفعيل VIP وكشف نتائج الألعاب بدقة عالية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Splash,
});


function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : Math.min(100, p + Math.random() * 5 + 2)));
    }, 95);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setLeaving(true);
      const t = setTimeout(() => navigate({ to: "/conditions" }), 650);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [progress, navigate]);


  return (
    <main
      className={`page-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 transition-all duration-700 ${
        leaving ? "scale-[1.06] opacity-0 blur-md" : "opacity-100"
      }`}
    >
      <Particles />

      <span
        aria-hidden
        className="animate-scan pointer-events-none absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-60"
      />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px,transparent 1px),linear-gradient(90deg,var(--primary) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(circle at 50% 45%, black, transparent 72%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-[390px] flex-col items-center">
        <div className="mb-8 flex items-center gap-2 border border-primary/25 bg-background/60 px-3 py-1.5 text-[9px] font-bold uppercase text-primary backdrop-blur-md">
          <Activity className="h-3 w-3" /> SYSTEM ONLINE
        </div>

        <div className="relative flex h-[190px] w-[190px] items-center justify-center">
          <span className="animate-radar-pulse absolute inset-0 rounded-full border border-primary/15" />
          <span className="ring-conic animate-spin-slow absolute inset-3 rounded-full opacity-90" />
          <span className="absolute inset-9 rounded-full border border-dashed border-primary/35" />
          <span className="animate-orbit absolute inset-5">
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-primary-glow shadow-[var(--glow-md)]" />
          </span>
          <span className="absolute h-24 w-24 rotate-45 border border-primary/30 bg-primary/5" />
          <DragonMark size={94} className="relative animate-rise" />
        </div>

        <h1 className="text-shimmer animate-fade-up mt-7 text-center text-[1.85rem] font-black leading-tight">
          {BRAND}
        </h1>
        <p className="mt-3 flex items-center gap-2 text-[10px] tracking-[0.35em] text-primary/85">
          <ShieldCheck className="h-3.5 w-3.5" /> SECURE · VIP · 2026
        </p>

        <div className="glass mt-8 flex items-center justify-center gap-3 border-primary/20 px-4 py-3">
          <img
            src={xpLogo}
            alt="Xparibet"
            width={447}
            height={447}
            className="h-8 w-8 rounded-full object-cover ring-1 ring-primary/50"
          />
          <span className="text-[11px] font-bold text-foreground">Xparibet</span>
          <span className="text-[10px] text-muted-foreground">· المنصة المعتمدة</span>
        </div>


        <div className="mt-7 w-full">
          <div className="relative h-1 w-full overflow-hidden bg-primary/10">
            <div
              className="h-full transition-[width] duration-200 ease-out"
              style={{
                width: `${progress}%`,
                backgroundImage: "var(--gradient-primary)",
                boxShadow: "var(--glow-md)",
              }}
            />
          </div>
          <div dir="ltr" className="mt-2 flex items-center justify-between">
            <span className="text-[9px] tracking-[0.35em] text-muted-foreground/60">LOADING</span>
            <span className="text-[10px] font-bold tabular-nums text-primary">
              {Math.floor(progress)}%
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
