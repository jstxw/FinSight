import React from "react";
import { Link } from "react-router-dom";
import { LuWalletMinimal, LuArrowRight, LuSparkles } from "react-icons/lu";
import { FaChartLine, FaShieldAlt, FaBolt, FaLock } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="aurora-page min-h-screen overflow-hidden">
      {/* Navigation */}
      <nav
        className="relative z-50 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <LuWalletMinimal
                className="text-2xl"
                style={{ color: "var(--brand-2)" }}
              />
              <h1
                className="text-xl font-semibold"
                style={{ color: "var(--text)" }}
              >
                FinSight
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium transition hover:opacity-80"
                style={{ color: "var(--text)" }}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="aurora-btn-primary px-4 py-2 text-sm font-medium rounded-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative aurora-glow overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Master Your Money with{" "}
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Precision Insight
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
              style={{ color: "var(--muted)" }}
            >
              Track expenses, analyze income, and visualize your financial
              future with the most intuitive dashboard built for modern earners.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center"></div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#05060b] via-transparent to-transparent z-20 pointer-events-none" />
            <div
              className="glass-card rounded-2xl p-2 md:p-4 mx-auto max-w-5xl"
              style={{ boxShadow: "0 25px 100px -20px var(--glow)" }}
            >
              {/* Mock Dashboard */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ background: "var(--bg-1)" }}
              >
                {/* Mock Header */}
                <div
                  className="flex items-center gap-2 px-4 py-3 border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                {/* Mock Content */}
                <div className="p-6 grid grid-cols-12 gap-4">
                  {/* Sidebar */}
                  <div className="col-span-3 hidden md:block space-y-3">
                    <div className="glass-card rounded-lg p-3 flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ background: "var(--brand)" }}
                      />
                      <div className="space-y-1">
                        <div
                          className="h-2 w-16 rounded"
                          style={{ background: "var(--border-strong)" }}
                        />
                        <div
                          className="h-2 w-12 rounded"
                          style={{ background: "var(--border)" }}
                        />
                      </div>
                    </div>
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-10 rounded-lg"
                        style={{
                          background:
                            i === 1 ? "var(--brand)" : "var(--surface)",
                        }}
                      />
                    ))}
                  </div>
                  {/* Main Content */}
                  <div className="col-span-12 md:col-span-9 space-y-4">
                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        {
                          label: "Balance",
                          value: "$24,563",
                          color: "var(--brand-2)",
                        },
                        { label: "Income", value: "$8,350", color: "#22c55e" },
                        {
                          label: "Expenses",
                          value: "$3,240",
                          color: "#f97316",
                        },
                      ].map((stat, i) => (
                        <div key={i} className="glass-card rounded-xl p-4">
                          <div
                            className="text-xs mb-1"
                            style={{ color: "var(--muted-2)" }}
                          >
                            {stat.label}
                          </div>
                          <div
                            className="text-xl font-bold"
                            style={{ color: stat.color }}
                          >
                            {stat.value}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Chart Area */}
                    <div className="glass-card rounded-xl p-4 h-48">
                      <div className="flex justify-between items-center mb-4">
                        <div
                          className="text-sm font-medium"
                          style={{ color: "var(--text)" }}
                        >
                          Financial Overview
                        </div>
                        <div className="flex gap-2">
                          <div
                            className="px-3 py-1 rounded text-xs"
                            style={{
                              background: "var(--brand)",
                              color: "white",
                            }}
                          >
                            Monthly
                          </div>
                          <div
                            className="px-3 py-1 rounded text-xs"
                            style={{
                              background: "var(--surface-2)",
                              color: "var(--muted)",
                            }}
                          >
                            Yearly
                          </div>
                        </div>
                      </div>
                      {/* Mock Chart Bars */}
                      <div className="flex items-end justify-between h-24 gap-2 px-4">
                        {[65, 40, 80, 55, 90, 45, 70, 85, 50, 75, 60, 95].map(
                          (h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t"
                              style={{
                                height: `${h}%`,
                                background:
                                  i === 11 ? "var(--brand)" : "var(--brand-2)",
                                opacity: i === 11 ? 1 : 0.4,
                              }}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
