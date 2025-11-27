import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import EarningsChart from "../../src/components/Charts/EarningsChart";

// Mock Recharts væk så testen kan køre i JSDOM uden ResizeObserver
vi.mock("recharts", () => {
  const React = require("react"); // nødvendigt for JSX
  const Passthrough = ({ children }) => <div>{children}</div>; // ingen rigtig chart, kun wrapper
  const Chart = ({ data, children }) => ( // simpel chart mock
    <div data-testid="chart">
      <span data-testid="data">{JSON.stringify(data)}</span>
      {children}
    </div>
  );
  return { // eksporterer de nødvendige komponenter
    ResponsiveContainer: Passthrough,
    BarChart: Chart,
    Bar: ({ dataKey }) => <div>{`bar-${dataKey}`}</div>,
    XAxis: ({ dataKey }) => <div>{`x-${dataKey}`}</div>,
    YAxis: () => <div>y-axis</div>,
    CartesianGrid: () => <div>grid</div>,
    Tooltip: () => <div>tooltip</div>,
    Legend: () => <div>legend</div>,
  };
});

describe("EarningsChart", () => { // hovedbeskrivelse af test suite

  const mockData = [
    { date: "2025-11-18", earnings: 100 },
    { date: "2025-11-19", earnings: -50 }
  ];

  test("renders chart title", () => { // test for chart titel
    render(<EarningsChart data={mockData} title="Test Chart" color="#ff0000" />);
    expect(screen.getByText("Test Chart")).toBeInTheDocument();
  });

  test("renders the earnings values", () => { // test for earnings værdier
    render(<EarningsChart data={mockData} title="Test Chart" color="#ff0000" />);
    const data = screen.getByTestId("data").textContent;
    expect(data).toContain("100");
    expect(data).toContain("-50");
  });

  test("renders the date labels", () => { // test for dato labels
    render(<EarningsChart data={mockData} title="Test Chart" color="#ff0000" />);
    const data = screen.getByTestId("data").textContent;
    expect(data).toContain("2025-11-18");
    expect(data).toContain("2025-11-19");
  });

  test("renders without crashing when empty", () => { // test for tom data
    render(<EarningsChart data={[]} title="Empty Chart" color="#00ff00" />);
    expect(screen.getByText("Empty Chart")).toBeInTheDocument();
  });

});
