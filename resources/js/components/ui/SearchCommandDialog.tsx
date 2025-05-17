import * as React from "react";
import { Input } from "./input";

import { Link } from "@inertiajs/react";
const suggestions = [
  "Coucher de soleil à Paris",
  "Recette de tarte aux pommes traditionnelle",
  "Découverte des plages de Normandie",
  "Randonnée dans les Alpes",
  "Nouvelle fresque murale",
  "Impression 3D : mon premier prototype",
  "Défilé printemps-été",
  "Marathon de Paris",
  "Coup de cœur littéraire",
  "Concert en plein air",
];

export default function SearchCommandDialog({ open, onOpenChange, anchorRef }: { open: boolean; onOpenChange: (open: boolean) => void; anchorRef?: React.RefObject<HTMLDivElement> }) {
  const [query, setQuery] = React.useState("");
  const filtered = suggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Fermer le dropdown si on clique en dehors
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        anchorRef?.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onOpenChange(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onOpenChange, anchorRef]);

  // Positionnement sous la barre de recherche
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  React.useEffect(() => {
    if (open && anchorRef?.current && dropdownRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setStyle({
        position: 'absolute',
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
        minWidth: rect.width,
        maxWidth: rect.width,
        zIndex: 1000,
      });
    }
  }, [open, anchorRef]);

  if (!open) return null;

  return (
    <div ref={dropdownRef} style={style} className="bg-background mt-80 border shadow-lg rounded-xl w-full animate-in fade-in-0 zoom-in-95 overflow-hidden">
      <div className="p-4 border-b">
        <Input
          autoFocus
          placeholder="Rechercher une TheEnd..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="max-h-60 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <div className="text-muted-foreground p-4 text-center">Aucun résultat</div>
        ) : (
          filtered.map((item) => (
            <button
              key={item}
              className="w-full text-left px-4 py-2 hover:bg-accent rounded transition"
              onClick={() => {
                onOpenChange(false);
              }}
            >
                <Link href="/recherche">{item}</Link>
              
            </button>
          ))
        )}
      </div>
    </div>
  );
} 