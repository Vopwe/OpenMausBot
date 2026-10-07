import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { SidebarDensity } from "@/lib/sidebar-preferences";

const fixture = vi.hoisted(() => ({ dispatch: vi.fn(), pluginsOpen: false }));
vi.mock("@/state/store", () => ({
  useStore: () => ({ state: { pluginsOpen: fixture.pluginsOpen }, dispatch: fixture.dispatch }),
}));
import { SidebarAppsButton, SidebarFooterNav } from "./SidebarFooterNav";

function render(density: SidebarDensity) {
  function Capture() { return SidebarFooterNav({ density }); }
  return renderToStaticMarkup(createElement(Capture));
}

function renderAppsButton() {
  function Capture() { return SidebarAppsButton(); }
  return renderToStaticMarkup(createElement(Capture));
}

beforeEach(() => {
  vi.stubGlobal("window", {});
  fixture.dispatch.mockReset();
  fixture.pluginsOpen = false;
});
afterEach(() => vi.unstubAllGlobals());

describe("sidebar footer places", () => {
  it("renders only the tour anchor, nav moved to the profile menu", () => {
    const html = render("comfortable");
    expect(html).toContain('data-tour="tools"');
    expect(html).not.toContain("data-sidebar-nav=");
  });

  it("offers Apps beside the profile", () => {
    const html = renderAppsButton();
    expect(html).toContain('data-sidebar-nav="apps"');
    expect(html).toContain('aria-label="Apps"');
  });
});
