import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Plane } from "lucide-react";
import { Particles, TopBar } from "@/components/vip/Chrome";
import { getUserId } from "@/lib/session";
import { fetchCrashOdd, isVip } from "@/lib/firebase";

export const Route = createFileRoute("/crash")({
  head: () => ({
    meta: [
      { title: "كاشف لعبة الطيارة — ثغرات التطبيقات" },
      { name: "description", content: "توقع أودد لعبة الطيارة Crash على Xparibet مباشرة." },
      { property: "og:title", content: "كاشف لعبة الطيارة — ثغرات التطبيقات" },
      { property: "og:description", content: "توقع الأودد قبل الانفجار في لعبة الطيارة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CrashPage,
});

function CrashPage() {
  const [userId, setUserId] = useState("GUEST");
  const [odd, setOdd] = useState(1);
  const [running, setRunning] = useState(false);
  const raf = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSignal = useCallback(async () => {
    const currentId = getUserId();
    const remote = isVip(currentId) ? await fetchCrashOdd() : null;
    const target = remote ?? Math.round((1.01 + Math.random() * 4.99) * 100) / 100;
    setRunning(true);
    setOdd(1);
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / 2800);
      setOdd(1 + (target - 1) * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
      else {
        setRunning(false);
        timer.current = setTimeout(() => void runSignal(), 2600);
      }
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    setUserId(getUserId() || "GUEST");
    void runSignal();
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      if (timer.current !== null) clearTimeout(timer.current);
    };
  }, [runSignal]);

  return (
    <main className="page-bg screen-frame relative flex min-h-screen flex-col overflow-hidden">
      <Particles />
      <div className="relative z-10 flex min-h-screen flex-col">
        <TopBar title="كاشف الطيارة" />
        <section className="flex flex-1 flex-col items-center justify-center px-5 pb-20 pt-10 text-center">
          <div className="mb-8 flex max-w-full items-center gap-2 border border-primary/30 bg-background/70 px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[var(--glow-sm)]" />
            <span className="truncate text-[11px] text-muted-foreground">ID: {userId}</span>
          </div>

          <div className="relative flex aspect-square w-[min(78vw,430px)] items-center justify-center">
            <span className="animate-radar-pulse absolute inset-0 rounded-full border border-primary/15" />
            <span className="animate-radar-pulse absolute inset-[7%] rounded-full border border-primary/25 [animation-delay:700ms]" />
            <span className="ring-conic animate-spin-slow absolute inset-[3%] rounded-full" />
            <span className="absolute inset-[14%] rounded-full border border-dashed border-primary/35" />
            <span className="animate-orbit absolute inset-[10%]">
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[var(--glow-lg)]" />
            </span>
            <span className="animate-orbit absolute inset-[18%] [animation-direction:reverse] [animation-duration:8s]">
              <Plane className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-90 text-primary" />
            </span>
            <div className="relative flex h-[62%] w-[62%] items-center justify-center rounded-full border border-primary/45 bg-background/80 shadow-[inset_0_0_45px_color-mix(in_oklab,var(--primary)_12%,transparent),var(--glow-md)] backdrop-blur-xl">
              <span className={`neon-text text-[clamp(2.5rem,13vw,5rem)] font-black tabular-nums text-primary ${running ? "animate-glow-pulse" : ""}`}>
                x{odd.toFixed(2)}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}