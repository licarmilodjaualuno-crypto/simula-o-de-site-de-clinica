import React from "react";
import { Link, NavLink } from "react-router-dom";
import { LogIn, LogOut, Star } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const LINKS = [
  { label: "Início", to: "/" },
  { label: "Linha do tempo", to: "/linha-do-tempo" },
  { label: "Temas", to: "/temas" },
  { label: "Povos", to: "/etnias" },
  { label: "Fauna", to: "/animais" },
  { label: "Monumentos", to: "/monumentos" },
  { label: "Questionários", to: "/questionarios" },
];

export default function SiteHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const nome = user?.full_name || user?.email || "";
  const iniciais = nome
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="h-[3px] bg-gradient-to-r from-secondary via-gold to-primary" aria-hidden="true" />
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-6 px-5">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary shadow-sm">
            <Star className="h-4 w-4 text-gold" fill="currentColor" strokeWidth={0} />
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-[18px] font-semibold tracking-tight">
              Memória Viva
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground sm:block">
              Guiné-Bissau
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `border-b-2 px-3 py-2 text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/65 hover:border-border hover:text-foreground"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {isAuthenticated ? (
            <>
              <span className="hidden items-center gap-2 sm:inline-flex">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                  {iniciais || "MV"}
                </span>
                <span className="max-w-[140px] truncate text-sm text-foreground/70">{nome}</span>
              </span>
              <button
                type="button"
                onClick={() => logout()}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-foreground/75 transition-colors hover:border-primary/40 hover:bg-accent hover:text-foreground"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <LogIn className="h-3.5 w-3.5" />
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}