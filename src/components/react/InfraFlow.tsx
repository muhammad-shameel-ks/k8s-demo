import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    label: "Git Push",
    desc: "Code to GitHub",
    color: "bg-pastel-blue/40",
    iconColor: "text-blue-500",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17.01" y1="12" x2="22.96" y2="12"/></svg>,
  },
  {
    label: "Actions CI",
    desc: "Build container",
    color: "bg-pastel-orange/40",
    iconColor: "text-accent",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  },
  {
    label: "Tailscale",
    desc: "Encrypted tunnel",
    color: "bg-pastel-green/40",
    iconColor: "text-green-500",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  },
  {
    label: "K8s Deploy",
    desc: "Home cluster",
    color: "bg-pastel-purple/40",
    iconColor: "text-purple-500",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  },
];

export default function InfraFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.15"]
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-20 md:py-32 bg-surface-warm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-pastel-purple/12 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-pastel-orange/12 blur-[80px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            whileHover={{ rotate: -8 }}
            className="w-10 h-10 rounded-xl bg-pastel-blue/40 flex items-center justify-center text-blue-500 shrink-0"
          >
            <img src="/kubernetes.svg" alt="K8s" className="w-5 h-5 object-contain" />
          </motion.div>
          <span className="font-[Silkscreen] text-[18px] text-accent tracking-widest uppercase">
            Infrastructure
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-3"
        >
          My code <span className="text-accent">deploys itself.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-fg-muted text-lg font-light mb-14 max-w-3xl leading-relaxed"
        >
          GitPush → GitHub Actions builds container → Tailscale encrypted tunnel →
          self-hosted K8s cluster. No cloud dashboard. No vendor lock-in.{' '}
          <span className="font-medium text-fg text-lg">Just a homelab and a lot of YAML.</span>
          <br />
          <span className="text-sm text-fg-muted/60">Next: Terraform, then cloud. One step at a time.</span>
        </motion.p>

        {/* Flow */}
        <div className="relative">
          {/* Animated line — desktop */}
          <div className="hidden md:block absolute top-[2.8rem] left-6 right-6 h-[2px] rounded-full bg-border z-0">
            <motion.div
              style={{ width: lineWidth }}
              className="h-full bg-gradient-to-r from-blue-300 via-accent/60 to-purple-300 origin-left rounded-full"
            />
          </div>

          {/* Traveling dot */}
          <div className="hidden md:block absolute top-[2.55rem] left-6 right-6 h-[5px] z-[1] overflow-hidden">
            <motion.div
              animate={{ x: ["-5%", "105%"] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "linear", repeatDelay: 1.5 }}
              className="w-6 h-1.5 rounded-full bg-accent/70 shadow-md shadow-accent/30"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.08, y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-14 h-14 rounded-2xl ${step.color} ${step.iconColor} flex items-center justify-center mb-3 border border-white/50`}
                >
                  {step.icon}
                </motion.div>
                <span className="text-sm font-semibold text-fg mb-0.5">{step.label}</span>
                <span className="text-[11px] text-fg-muted font-light">{step.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* VAIO card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-14 rounded-2xl bg-white border border-border/60 p-5 md:p-6 relative overflow-hidden"
        >
          <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-pastel-orange/15 blur-xl" />
          <div className="flex items-start gap-3.5 relative z-10">
            <motion.div
              whileHover={{ rotate: -4 }}
              className="w-10 h-10 rounded-xl bg-pastel-purple/40 flex items-center justify-center text-purple-500 shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </motion.div>
            <div>
              <p className="text-sm font-semibold text-fg mb-1.5">The Homelab Journey</p>
              <p className="text-sm text-fg-muted leading-relaxed">
                A Sony VAIO on my desk running Arch Linux. Full K8s cluster,
                Pi-hole, PocketBase, Tailscale — all self-hosted. Some people have gaming setups.
                I have a <span className="font-medium text-fg">real production environment I built from scratch.</span>
                {" "}Still learning. Still growing.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}