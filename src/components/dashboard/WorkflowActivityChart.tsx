import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import styles from "./Dashboard.module.css";

export type DateRange = "7d" | "30d" | "90d";

const chartData: Record<DateRange, { label: string; values: number[]; summary: string }> = {
  "7d": {
    label: "Last 7 days",
    values: [34, 42, 37, 56, 48, 68, 61, 77, 67, 83, 72, 91],
    summary: "Updated for the selected 7-day range",
  },
  "30d": {
    label: "Last 30 days",
    values: [27, 38, 34, 48, 42, 60, 52, 66, 58, 75, 69, 86],
    summary: "Updated for the selected 30-day range",
  },
  "90d": {
    label: "Last 90 days",
    values: [20, 29, 31, 42, 38, 49, 47, 58, 62, 71, 68, 84],
    summary: "Updated for the selected 90-day range",
  },
};

const xLabels: Record<DateRange, string[]> = {
  "7d": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  "30d": ["Sep 19", "Sep 23", "Sep 27", "Oct 1", "Oct 5", "Oct 9", "Oct 18"],
  "90d": ["Jul 21", "Aug 5", "Aug 20", "Sep 4", "Sep 19", "Oct 4", "Oct 18"],
};

function chartPoints(values: number[]) {
  return values.map((value, index) => `${56 + index * 72},${180 - value * 1.55}`).join(" ");
}

type WorkflowActivityChartProps = {
  dateRange: DateRange;
};

export default function WorkflowActivityChart({ dateRange }: WorkflowActivityChartProps) {
  const data = chartData[dateRange];
  const points = chartPoints(data.values);
  const areaPoints = `56,180 ${points} 848,180`;

  return (
    <section className={styles.chartCard} id="activity" aria-labelledby="activity-title">
      <div className={styles.chartHeading}>
        <div>
          <span className={styles.sectionKicker}>WORKFLOW HEALTH</span>
          <h2 id="activity-title">Workflow activity</h2>
          <p id="chart-range-description">{data.summary}</p>
        </div>
        <div className={styles.chartSummary}>
          <span className={styles.chartLegend}><i aria-hidden="true" />Completed tasks</span>
          <span className={styles.chartTotal}>84 <ArrowUpRight size={15} aria-hidden="true" /></span>
        </div>
      </div>
      <div className={styles.chartWrap}>
        <svg
          className={styles.chart}
          viewBox="0 0 900 220"
          role="img"
          aria-labelledby="activity-title chart-range-description"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" className={styles.chartGradientStart} />
              <stop offset="100%" className={styles.chartGradientEnd} />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((line) => (
            <g key={line}>
              <line x1="48" x2="860" y1={30 + line * 48} y2={30 + line * 48} className={styles.chartGrid} />
              <text x="8" y={34 + line * 48} className={styles.chartYLabel}>{100 - line * 30}</text>
            </g>
          ))}
          <polygon points={areaPoints} fill="url(#chart-fill)" />
          <polyline points={points} className={styles.chartLine} />
          {data.values.map((value, index) => (
            <circle
              key={`${dateRange}-${index}`}
              cx={56 + index * 72}
              cy={180 - value * 1.55}
              r="3.5"
              className={styles.chartPoint}
            >
              <title>{`Illustrative activity point ${index + 1}: ${value}`}</title>
            </circle>
          ))}
          {xLabels[dateRange].map((label, index) => (
            <text className={styles.chartXLabel} key={label} x={56 + index * 132} y="210" textAnchor="middle">{label}</text>
          ))}
        </svg>
      </div>
      <div className={styles.chartFooter}>
        <span>{data.label} <span aria-hidden="true">·</span> sample activity</span>
        <button className={styles.exportButton} type="button" onClick={() => window.print()}>
          <ArrowDownToLine size={15} aria-hidden="true" /> Print view
        </button>
      </div>
    </section>
  );
}
