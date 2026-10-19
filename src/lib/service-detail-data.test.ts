import { describe, expect, it } from "vitest";
import { services } from "./site-data";
import { serviceDetailSlugById, serviceDetails } from "./service-detail-data";

describe("service detail routes", () => {
  it("maps every service to its own detail route", () => {
    const slugs = services.map((service) => serviceDetailSlugById[service.id]);

    expect(slugs).toEqual([
      "web-development",
      "custom-software-development",
      "it-consulting",
      "cloud-solutions",
      "data-analytics",
      "digital-transformation",
      "mobile-app-development",
      "ai-data-solutions",
      "ui-ux-design",
    ]);
    expect(new Set(slugs).size).toBe(services.length);
  });

  it("provides distinct detail content and a sample demo for every route", () => {
    for (const service of services) {
      const slug = serviceDetailSlugById[service.id];
      const detail = serviceDetails[slug];

      expect(detail.serviceId).toBe(service.id);
      expect(detail.demoHref).toMatch(/^\/(demos|contact)(\/|$)/);
      expect(detail.focus.length).toBeGreaterThan(0);
      expect(detail.benefits.length).toBeGreaterThan(0);
      expect(detail.deliverables.length).toBeGreaterThan(0);
      expect(detail.demoLabel).toBeTruthy();
    }
  });

  it("includes architecture and roadmap work in the IT Consulting detail", () => {
    const detail = serviceDetails[serviceDetailSlugById["it-consulting"]];

    expect(detail.category).toBe("IT CONSULTING");
    expect(detail.demoId).toBe("consulting");
    expect(detail.overview).toContain("architecture");
    expect(detail.overview).toContain("technology roadmaps");
    expect(detail.overview).toContain("architecture reviews");
  });
});
