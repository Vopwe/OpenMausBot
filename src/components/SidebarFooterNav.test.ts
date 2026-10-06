import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { SidebarDensity } from "@/lib/sidebar-preferences";

vi.mock("@/state/store", () => ({ useStore: () => ({ state: {}, dispatch: () => {} }) }));
import { SidebarFooterNav } from "./SidebarFooterNav";

function render(density: SidebarDensity) {
  function Capture() { return SidebarFooterNav({ density }); }
  return renderToStaticMarkup(createElement(Capture));
}

beforeEach(() => {
  vi.stubGlobal("window", {});
});
afterEach(() => vi.unstubAllGlobals());

describe("sidebar footer places", () => {
  it("renders only the tour anchor, nav moved to the profile menu", () => {
    const html = render("comfortable");
    expect(html).toContain('data-tour="tools"');
    expect(html).not.toContain("data-sidebar-nav=");
  });
});
