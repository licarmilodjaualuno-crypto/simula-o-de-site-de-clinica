import React from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import MobileNav from "@/components/layout/MobileNav";
export default function AppLayout() { return <div className="flex min-h-screen flex-col bg-background"><SiteHeader /><main className="flex-1 pb-24 md:pb-0"><Outlet /></main><SiteFooter /><MobileNav /></div>; }
