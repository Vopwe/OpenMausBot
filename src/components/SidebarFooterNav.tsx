// The foot of the sidebar. Vopwe trim: Routines, Triggers, Apps and Team map
// moved to the profile menu and Settings. This keeps only the guided tour
// anchor so existing tours do not break.
import { t } from "@/lib/i18n";
import type { SidebarDensity } from "@/lib/sidebar-preferences";

export function SidebarFooterNav({ density }: { density: SidebarDensity }) {
  void density;
  return (
    <nav data-tour="tools" aria-label={t("sidebar.tools")} className="flex flex-col gap-0.5" />
  );
}
