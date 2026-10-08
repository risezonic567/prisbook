import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, Headset, Sparkles } from "lucide-react";

const FEATURES = [
  {
    title: "Guaranteed Best Price",
    desc: "Our prices guarantee the best deals in the industry, giving you complete confidence that your trip stays within budget.",
    icon: Zap,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "hover:border-amber-300",
  },
  {
    title: "Safe Transactions",
    desc: "Your payments are protected with enterprise-grade encryption and security measures to keep your data completely safe.",
    icon: ShieldCheck,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "hover:border-blue-300",
  },
  {
    title: "Worldwide Destinations",
    desc: "Access over 630 global destinations through our comprehensive flight, hotel, and curated vacation packages.",
    icon: Globe,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "hover:border-emerald-300",
  },
  {
    title: "24/7 Dedicated Support",
    desc: "Our travel experts provide round-the-clock customer support to assist you anytime, anywhere during your journey.",
    icon: Headset,
    iconColor: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "hover:border-rose-300",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function Features() {
  return (
    <section className="border-y border-[#e9e2d6] bg-white py-16 font-sans sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#176b70] ring-1 ring-[#e9e2d6]">
            <Sparkles size={14} /> Why Choose Us
          </span>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#17394a] sm:text-4xl md:text-5xl">
            Why Book With <span className="text-[#176b70]">Prisbook?</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Your trusted gateway to world-class travel experiences, exceptional
            value, and dedicated round-the-clock support.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className={`group flex h-full flex-col rounded-2xl border border-[#e9e2d6] bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg ${feature.borderColor}`}
              >
                {/* Icon */}
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bgColor} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={26} className={feature.iconColor} />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-base font-bold text-[#17394a] transition-colors group-hover:text-[#176b70] sm:text-lg">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-slate-600">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}