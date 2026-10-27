import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  Building2,
  Globe,
  PanelLeftClose,
  LayoutGrid,
  Columns3,
  ListTodo,
  Map,
  TrendingUp,
  Settings,
  HelpCircle,
  Folder,
  CircleDot,
  Timer,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Check,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../../../stores/useAuthStore";
import { ROUTES } from "../../../routes/paths";

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.AUTH.LOGIN);
  };

  const navItems = [
    { label: "Dashboard", icon: LayoutGrid, active: true },
    { label: "Board", icon: Columns3, active: false },
    { label: "Backlog", icon: ListTodo, active: false },
    { label: "Roadmap", icon: Map, active: false },
    { label: "Reports", icon: TrendingUp, active: false },
    { label: "Project Settings", icon: Settings, active: false },
  ];

  const stats = [
    {
      label: "Total Projects",
      value: "6",
      subtext: "Across your workspace",
      icon: Folder,
      iconBg: "bg-slate-100 text-slate-600",
    },
    {
      label: "Open Issues",
      value: "24",
      subtext: "All projects · unresolved",
      icon: CircleDot,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      label: "In Progress",
      value: "8",
      subtext: "All projects · being worked on",
      icon: Timer,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      label: "Completed",
      value: "42",
      subtext: "All projects · all time",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
  ];

  const statusBreakdown = [
    { label: "To Do", count: 6, percent: "25%", dotColor: "bg-slate-600" },
    { label: "In Progress", count: 8, percent: "33%", dotColor: "bg-blue-600" },
    { label: "In Review", count: 4, percent: "17%", dotColor: "bg-purple-600" },
    { label: "Done", count: 6, percent: "25%", dotColor: "bg-emerald-600" },
  ];

  const recentActivities = [
    {
      user: "Sarah Miller",
      action: "moved an issue to In Review",
      issueKey: "PROJ-38",
      issueTitle: "Design landing page",
      time: "5 min ago",
      initials: "SM",
      avatarColor: "bg-amber-100 text-amber-800",
    },
    {
      user: "Alex Kim",
      action: "completed an issue",
      issueKey: "PROJ-32",
      issueTitle: "Build navigation components",
      time: "18 min ago",
      initials: "AK",
      avatarColor: "bg-sky-100 text-sky-800",
    },
    {
      user: "James Lee",
      action: "commented on an issue",
      issueKey: "PROJ-41",
      issueTitle: "Connect the signup flow",
      time: "42 min ago",
      initials: "JL",
      avatarColor: "bg-emerald-100 text-emerald-800",
    },
    {
      user: "Priya Shah",
      action: "created an issue",
      issueKey: "PROJ-46",
      issueTitle: "Add mobile launch checklist",
      time: "1 hour ago",
      initials: "PS",
      avatarColor: "bg-purple-100 text-purple-800",
    },
    {
      user: "Sarah Miller",
      action: "updated the due date",
      issueKey: "PROJ-35",
      issueTitle: "Finalize launch copy",
      time: "2 hours ago",
      initials: "SM",
      avatarColor: "bg-amber-100 text-amber-800",
    },
  ];

  // SVG Donut chart calculations (r = 70, circumference = 2 * pi * 70 ≈ 439.82)
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  // Segments: To Do (25%), In Progress (33%), In Review (17%), Done (25%)
  const segments = [
    { color: "#475569", fraction: 0.25 }, // To Do (Slate)
    { color: "#2563EB", fraction: 0.33 }, // In Progress (Blue)
    { color: "#7C3AED", fraction: 0.17 }, // In Review (Purple)
    { color: "#16A34A", fraction: 0.25 }, // Done (Green)
  ];

  let cumulativePercent = 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* ============================================================ */}
      {/* TOP NAVIGATION BAR                                           */}
      {/* ============================================================ */}
      <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-30">
        {/* Left: Brand & Workspace Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 pr-2">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center gap-0.5 shadow-sm">
              <span className="w-1 h-4 bg-white rounded-full" />
              <span className="w-1 h-2.5 bg-white/75 rounded-full" />
              <span className="w-1 h-3.5 bg-white/90 rounded-full" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">
              TaskFlow
            </span>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Workspace Selector */}
          <button
            type="button"
            className="hidden sm:flex items-center gap-2.5 px-2 py-1 rounded-lg hover:bg-slate-50 transition text-left"
          >
            <div className="w-7 h-7 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <div className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                Acme Studio
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-[11px] text-slate-400">
                taskflow.app/acme
              </div>
            </div>
          </button>

          <button
            type="button"
            className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-blue-700 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            Create Workspace
          </button>
        </div>

        {/* Center: Global Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-9 pr-16 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition"
            />
            <span className="absolute right-2.5 text-[11px] font-medium text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5">
              Ctrl+K
            </span>
          </div>
        </div>

        {/* Right: Actions & User Profile */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Create
          </button>

          {/* Theme Toggle Pill */}
          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              className="p-1.5 rounded-md bg-white text-slate-700 shadow-sm"
              title="Light mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-600"
              title="Dark mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Notification Bell */}
          <button
            type="button"
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#2563EB] text-white text-[10px] font-bold flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Avatar & Logout */}
          <div className="flex items-center gap-2 pl-1">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              title="Sign out"
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* BODY: LEFT SIDEBAR + MAIN CONTENT                            */}
      {/* ============================================================ */}
      <div className="flex flex-1 min-h-[calc(100vh-3.5rem)]">
        {/* Left Sidebar */}
        <aside className="w-60 bg-[#0F172A] text-slate-300 flex flex-col justify-between shrink-0 select-none">
          <div>
            {/* Project Switcher Header */}
            <div className="p-4 flex items-center justify-between border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-white">
                    Website Launch
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    PROJ
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition relative ${
                      item.active
                        ? "bg-[#1E293B] text-white"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    {item.active && (
                      <span className="w-1 h-5 bg-[#3B82F6] rounded-r-full absolute left-0" />
                    )}
                    <Icon
                      className={`w-4 h-4 ${
                        item.active ? "text-[#3B82F6]" : "text-slate-400"
                      }`}
                    />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-800/80 space-y-3">
            <button
              type="button"
              className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-slate-200 transition"
            >
              <HelpCircle className="w-4 h-4" />
              Help & feedback
            </button>
            <div className="text-[11px] text-slate-500">
              Team-managed project
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Dashboard
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Here's what's happening with your projects today.
                </p>
              </div>

              <button
                type="button"
                className="self-start sm:self-auto inline-flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                All projects
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* 4 KPI Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">
                        {stat.label}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${stat.iconBg}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 my-2">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-400">{stat.subtext}</div>
                  </div>
                );
              })}
            </div>

            {/* Middle Section: Issue Status Overview + Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Card: Issue Status Overview (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Issue Status Overview
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Website Launch · Sprint 12
                  </p>

                  {/* SVG Donut Chart */}
                  <div className="my-6 flex items-center justify-center">
                    <div className="relative w-44 h-44 flex items-center justify-center">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 180 180"
                      >
                        {segments.map((seg, idx) => {
                          const strokeDasharray = `${
                            seg.fraction * circumference - 4
                          } ${circumference}`;
                          const strokeDashoffset =
                            -cumulativePercent * circumference;
                          cumulativePercent += seg.fraction;
                          return (
                            <circle
                              key={idx}
                              cx="90"
                              cy="90"
                              r={radius}
                              fill="transparent"
                              stroke={seg.color}
                              strokeWidth="22"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                            />
                          );
                        })}
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold text-slate-900 leading-none">
                          24
                        </span>
                        <span className="text-xs text-slate-400 mt-1">
                          Sprint issues
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Legend Breakdown */}
                  <div className="space-y-3 mt-4">
                    {statusBreakdown.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${item.dotColor}`}
                          />
                          <span className="text-slate-600 font-medium">
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-slate-800">
                            {item.count}
                          </span>
                          <span className="text-slate-400 w-8 text-right">
                            {item.percent}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Oct 19 – Nov 1</span>
                  </div>
                  <span className="font-semibold text-emerald-600">
                    25% complete
                  </span>
                </div>
              </div>

              {/* Right Card: Recent Activity (7 cols) */}
              <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        Recent Activity
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Latest updates from your workspace
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-blue-700 transition"
                    >
                      View all
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Activity List */}
                  <div className="mt-5 divide-y divide-slate-100">
                    {recentActivities.map((act, idx) => (
                      <div
                        key={idx}
                        className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${act.avatarColor}`}
                          >
                            {act.initials}
                          </div>
                          <div className="text-xs leading-relaxed">
                            <div>
                              <span className="font-semibold text-slate-900">
                                {act.user}
                              </span>{" "}
                              <span className="text-slate-600">
                                {act.action}
                              </span>
                            </div>
                            <div className="mt-0.5">
                              <span className="font-medium text-[#2563EB]">
                                {act.issueKey}
                              </span>
                              <span className="text-slate-400"> · </span>
                              <span className="text-slate-500">
                                {act.issueTitle}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-400 whitespace-nowrap shrink-0">
                          {act.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-400">
                  <Check className="w-3.5 h-3.5 text-slate-400" />
                  <span>You're up to date</span>
                </div>
              </div>
            </div>

            {/* Bottom Summary Caption */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400 pt-2">
              <span>
                Summary totals cover all 6 projects. Issue status shows the
                current Website Launch sprint.
              </span>
              <span>Updated just now</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
