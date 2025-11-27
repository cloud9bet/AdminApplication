import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import EarningsPieChart from "../../src/components/Charts/EarningsPieChart";

// Mock Recharts væk så testen ikke kræver SVG/ResizeObserver i JSDOM
vi.mock("recharts", () => { // nødvendigt for JSX
  const React = require("react");
  const Passthrough = ({ children }) => <div>{children}</div>; // ingen rigtig chart, kun wrapper
  const Pie = ({ data, children }) => ( // simpel pie mock
    <div data-testid="pie">
      <span data-testid="data">{JSON.stringify(data)}</span>
      {children}
    </div>
  );
  const Cell = ({ fill, children }) => <div style={{ background: fill }}>{children}</div>; // simpel cell mock
  return {
    PieChart: Passthrough,
    Pie,
    Cell,
    Tooltip: () => <div>tooltip</div>,
    Legend: () => <div>legend</div>,
  };
});

describe("EarningsPieChart", () => { // hovedbeskrivelse af test suite

  const mockData = [
    { name: "Coinflip", value: 300 },
    { name: "Crash", value: 150 },
    { name: "Slot Machine", value: 550 },
  ];

  test("renders pie chart labels", () => { // test for pie chart labels
    render(<EarningsPieChart data={mockData} />);
    const data = screen.getByTestId("data").textContent;
    expect(data).toContain("Coinflip");
    expect(data).toContain("Crash");
    expect(data).toContain("Slot Machine");
  });

  test("renders chart title", () => { // test for chart titel
    render(<EarningsPieChart data={mockData} />);
    expect(screen.getByText("Total Earnings pr. Game")).toBeInTheDocument();
  });

  test("passes data to pie", () => { // test for pie data
    render(<EarningsPieChart data={mockData} />);
    const data = screen.getByTestId("data").textContent;
    expect(data).toContain("Coinflip");
    expect(data).toContain("300");
  });
});
