import { useState } from "react";
import { useNavigate } from "react-router-dom";
const day1Features = [

{
  id: 1,
  emoji: "🌐",
  title: "Web Scraping & Data Awakening",
  desc: "Extract gig data and convert it into structured dataset.",
  detail:
    "Collect gig/job data from public sources - Freelancer (https://www.freelancer.com). Convert unstructured HTML into structured format (JSON/CSV). Ensure at least 50 or 50+ records. Focus is on building a scraping pipeline, not the source complexity.",
  path: "/feature01",
  file: "frontend/src/pages/f01/f01.jsx + frontend/src/pages/f01/f01.css+ backend/features/f01.py",
  color: "amber",
  outputs: [
    "Raw dataset (JSON/CSV)",
    "No garbage i.e no null heavy data",
    "Scraping logs (pages scraped, errors)",
    "validation report i.e is missing_values count, duplicate_entries count, valid_rows etc",
    "What should appear on frontend : ",
    "Message showing data is collected or not ",
    "Summary Stats in table format ",
    "Data set Preview ",
    "Logs and validation report "
  ],

},

{
  id: 2,
  emoji: "🧹",
  title: "Cleaning & EDA Engine",
  desc: "Clean scraped data and perform exploratory analysis.",
  detail:
    "Connect to backend , fetch from frontend. Use dataset generated in Feature 1. Clean raw scraped dataset by handling missing values, duplicates, and inconsistent formats ( eg., $100 -> 100 , 10 hrs -> 10 , react js -> React). Perform EDA and generate at least 6 meaningful graphs (distribution, heatmap,  scatter, categorical, etc.). Each graph must include title and insight.",
  path: "/feature02",
  file: "frontend/src/pages/f02/f02.jsx + frontend/src/pages/f02/f02.css + backend/features/f02.py",
  color: "green",
  outputs: [
    "Clean dataset",
    "Show on frontend : Cleaning report (rows before/after, duplicates removed, missing_values_fixed etc)",
    "At least 6 graphs",
    "Frontend: graphs with title + insight, dataset preview. Graphs must be visiable on frontend not console output.",
    "UI Structure - Button [Run Cleaning]"
  ],
},

{
  id: 3,
  emoji: "📊",
  title: "Stability Analysis on Scraped Data",
  desc: "Analyze stability patterns in cleaned dataset.",
  detail:
    "Evaluate income consistency, workload variation, and fluctuations. Compute basic stability indicators such as variance and identify whether dataset shows stable or unstable behavior. Example, low variance -> stable , high variance -> unstable",
  path: "/feature03",
  file: "frontend/src/pages/f03/f03.jsx + frontend/src/pages/f03/f03.css + backend/features/f03.py",
  color: "blue",
  outputs: [
    "Stability report",
    "Metrics (income variance, workload variance)",
    "Each graph MUST have: Title, Image and 1-2 lines Insight",
    "Frontend: metrics display, stability insight text, graphs, report explains reasoning"
  ],
},

{
  id: 4,
  emoji: "🌐🧹",
  title: "Data Awakening & Cleaning Engine",
  desc: "Load and clean structured dataset.",
  detail:
    "Use provided dataset: data/raw/gig_dirty_data.csv. Perform schema validation, clean missing values, remove duplicates, and prepare analysis-ready dataset.",
  path: "/feature04",
  file: "frontend/src/pages/f04/f04.jsx + frontend/src/pages/f04/f04.css + backend/features/f04.py",
  color: "amber",
  outputs: [
    "Loaded Dataset preview",
    "Schema validation report",
    "Clean dataset",
    "Cleaning summary",
    "Frontend: before vs after stats, preview table, validation information, Missing Value Report"
  ],
},

{
  id: 5,
  emoji: "⚙️📊",
  title: "Standardization & Outlier Engine",
  desc: "Standardize formats and detect anomalies.",
  detail:
    "Normalize currency, time formats, and categorical values. Detect outliers using IQR or Z-score in income and workload.",
  path: "/feature05",
  file: "frontend/src/pages/f05/f05.jsx + frontend/src/pages/f05/f05.css + backend/features/f05.py",
  color: "blue",
  outputs: [
    "Standardized dataset",
    "Outlier Detection , use any method (IQR , Z-score)",
    "Anomaly table",
    "Frontend: outlier scatter plot, box plot, summary stats, Combined insights and reasoning"
  ],
},

{
  id: 6,
  emoji: "📊⚗️",
  title: "Feature Engineering & Income Intelligence",
  desc: "Create derived metrics and analyze income, workload, and platform patterns.",
  detail:
    "Using the standardized dataset from Feature 5, generate new features such as efficiency score, income variance, and workload ratio. Perform income distribution analysis, evaluate the relationship between working hours and income, and compare gig platforms based on performance metrics. Provide insights and visualizations.",
  path: "/feature06",
  file: "frontend/src/pages/f06/f06.jsx + frontend/src/pages/f06/f06.css +  backend/features/f06.py",
  color: "purple",
  outputs: [
    "Engineered dataset",
    "Metrics report",
    "Frontend: Income distribution charts, workload vs  income scatter plot, platform comparison chart, Correlation heatmap,Analytical insights and interpretation"
  ],
},

{
  id: 7,
  emoji: "📈",
  title: "Time Series Intelligence Engine",
  desc: "Analyze temporal patterns and generate trend insights for income and workload.  ",
  detail:
    "Perform time-based analysis of income and workload. Use rolling averages and classify trends (increasing, decreasing, stable). Optional: simple forecast.",
  path: "/feature07",
  file: "frontend/src/pages/f07/f07.jsx + frontend/src/pages/f07/f07.css +  backend/features/f07.py",
  color: "green",
  outputs: [
    "Button which show - ' Trend summary report ' click here and then show summary report ",
    "Income trend line chart",
    "Workload trend chart",
    "Trend classification (growth/decline/stable)",
    "Frontend: show all above graphs on frontend with insight text"
  ],
},

{
  id: 8,
  emoji: "🧠📊",
  title: "Worker Intelligence Engine",
  desc: "Compute stability scores, segment workers, and classify risk levels.",
  detail:
    "Using the engineered dataset, calculate a stability score based on income consistency and workload variation. Segment workers into behavioral groups and classify them into risk levels (Safe, Moderate, High Risk). Provide explainable insights and visualizations.",
  path: "/feature08",
  file: "frontend/src/pages/f08/f08.jsx + frontend/src/pages/f08/f08.css +  backend/features/f08.py",
  color: "purple",
  outputs: [
    "Show on frontend formula used to calculate stability_score",
    "Stability scores",
    "Worker Segmentation, use K-Means clustering",
    "Risk classification . Risk meaning : unstable income , inconsistent workload",
    "Frontend: stability score section (avg stability), worker table ( | Worker | Stability | Segment | Risk| ), Graphs- [ Stability distribution, Segmentation chart, Risk distribution], Insight clickable panel"
  ],
},

{
  id: 9,
  emoji: "🧪",
  title: "Hypothesis Testing Engine",
  desc: "Validate assumptions about gig worker data using statistical testing.",
  detail:
    "Define a hypothesis for: 'H1: Higher working hours lead to higher income','H3: Stable workers earn more than unstable workers'. Perform statistical test (t-test/correlation/chi-square) and evaluate significance using p-value.",
  path: "/feature09",
  file: "frontend/src/pages/f09/f09.jsx + frontend/src/pages/f09/f09.css +  backend/features/f09.py",
  color: "teal",
  outputs: [
    "For every statement show on frontend - status i.e (success or failure), statement, test used, result (statistics and p_value), decision i.e Rejected or accepted, Interpretation  ",
    "Frontend: result display, graph, interpretation"
  ],
},

{
  id: 10,
  emoji: "🤖",
  title: "ML Model Training Engine",
  desc: "Train model to predict income or stability.",
  detail:
    "Train regression/classification model using dataset. Evaluate using metrics such as RMSE or accuracy.",
  path: "/feature10",
  file: "frontend/src/pages/f10/f10.jsx + frontend/src/pages/f10/f10.css + backend/features/f10.py",
  color: "red",
  outputs: [
    "Trained model",
    "Model Performance metrics",
    "Frontend: predicted vs actual chart, metrics display"
  ],
},

{
  id: 11,
  emoji: "⚙️",
  title: "Model Optimization Engine",
  desc: "Compare and improve ML models.",
  detail:
    "Train multiple models and compare performance. Select best model and justify choice.",
  path: "/feature11",
  file: "frontend/src/pages/f11/f11.jsx + frontend/src/pages/f11/f11.css +  backend/features/f11.py",
  color: "amber",
  outputs: [
    "Model comparison",
    "Best model selection",
    "Frontend: comparison charts, reasoning"
  ],
},

{
  id: 12,
  emoji: "🔮",
  title: "Live Prediction Engine",
  desc: "Predict outcomes based on user input.",
  detail:
    "Build UI form to accept worker inputs and predict income/stability using trained model.",
  path: "/feature12",
  file: "frontend/src/pages/f12/f12.jsx + frontend/src/pages/f12/f12.css + backend/features/f12.py",
  color: "green",
  outputs: [
    "Prediction result",
    "Frontend: input form, result display, explanation"
  ],
},

{
  id: 13,
  emoji: "📈🌍",
  title: "Forecasting Engine",
  desc: "Predict future income trends.",
  detail:
    "Forecast next 7 days income using simple methods (moving average or regression)",
  path: "/feature13",
  file: "frontend/src/pages/f13/f13.jsx + frontend/src/pages/f13/f13.css + backend/features/f13.py",
  color: "blue",
  outputs: [
    "7-day income forecast",
    "Frontend: forecast chart, insights"
  ],
},

{
  id: 14,
  emoji: "🔎",
  title: "Advanced Filter Engine",
  desc: "Explore dataset dynamically.",
  detail:
    "Build filtering system to explore data by platform, income, risk, etc.",
  path: "/feature14",
  file: "frontend/src/pages/f14/f14.jsx + frontend/src/pages/f14/f14.css",
  color: "teal",
  outputs: [
    "Filtered dataset, dropdown menu where user can select any one attribute and explore only related data",
    "Frontend: dynamic filters, charts, comparisons"
  ],
},

{
  id: 15,
  emoji: "✨",
  title: "What-If Simulation & Decision Engine",
  desc: "Simulate decisions and predict their impact on worker income and stability.",
  detail:
    "Allow users to modify worker parameters such as working hours, platform, or workload. Simulate different scenarios and predict how these changes impact income, stability score, and risk level using previously trained models.",
  path: "/feature15",
  file: "frontend/src/pages/f15/f15.jsx + frontend/src/pages/f15/f15.css + backend/features/f15.py",
  color: "coral",
  outputs: [
   "Frontend -- slides: hours, platform Button:Simulate ",
   "Backend --  take input, use trained model(Feature 10-12), return prediction",
   "Scenario simulation results",
   "Predicted income/stability for each scenario",
   "Comparison between current vs simulated state",
   "Frontend: interactive controls (sliders/dropdowns), comparison charts, impact insights"
  ],
},

];
 

const day2Features = [
  
];

const colorMap = {
  amber:  { bg: "#FFF8E7", border: "#F59E0B", badge: "#92400E", badgeBg: "#FEF3C7" },
  green:  { bg: "#F0FDF4", border: "#22C55E", badge: "#14532D", badgeBg: "#DCFCE7" },
  blue:   { bg: "#EFF6FF", border: "#3B82F6", badge: "#1E3A8A", badgeBg: "#DBEAFE" },
  purple: { bg: "#F5F3FF", border: "#8B5CF6", badge: "#4C1D95", badgeBg: "#EDE9FE" },
  coral:  { bg: "#FFF1F0", border: "#F97316", badge: "#7C2D12", badgeBg: "#FFEDD5" },
  teal:   { bg: "#F0FDFA", border: "#14B8A6", badge: "#134E4A", badgeBg: "#CCFBF1" },
  red:    { bg: "#FFF5F5", border: "#EF4444", badge: "#7F1D1D", badgeBg: "#FEE2E2" },
};

function FeatureCard({ feature, locked = false, onClick }) {
  const c = colorMap[feature.color];
  return (
    <div
      onClick={() => !locked && onClick && onClick(feature)}
      style={{
        background: locked ? "#1a1a2e" : c.bg,
        border: `1.5px solid ${locked ? "#2d2d4a" : c.border}`,
        borderRadius: "14px",
        padding: "18px",
        cursor: locked ? "default" : "pointer",
        opacity: locked ? 0.55 : 1,
        transition: "transform 0.18s, box-shadow 0.18s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => { if (!locked) { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${c.border}33`; }}}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
    >
      
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
        <span style={{ fontSize: "22px", lineHeight: 1 }}>{locked ? "🔒" : feature.emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: locked ? "#666" : "#111", lineHeight: 1.3 }}>
              {feature.title}
            </h3>
            <span style={{
              background: locked ? "#2d2d4a" : c.badgeBg,
              color: locked ? "#666" : c.badge,
              fontSize: "11px", fontWeight: 700,
              padding: "2px 8px", borderRadius: "20px"
            }}>
            </span>
          </div>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: "13px", color: locked ? "#555" : "#444", lineHeight: 1.6 }}>
        {locked ? "Unlocks on Day 2" : feature.desc}
      </p>
      {!locked && (
        <div style={{ marginTop: "10px", fontSize: "11px", color: c.badge, fontWeight: 600, opacity: 0.8 }}>
          {feature.path ? `→ ${feature.path}` : "→ Notebook"}
        </div>
      )}
    </div>
  );
}

function Modal({ feature, onClose, navigate })  {
  if (!feature) return null;
  const c = colorMap[feature.color];
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: "18px", padding: "28px", maxWidth: "520px", width: "100%", border: `2px solid ${c.border}`, boxShadow: `0 20px 60px ${c.border}44` }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
          <div>
            <span style={{ fontSize: "28px" }}>{feature.emoji}</span>
            <h2 style={{ margin: "6px 0 2px", fontSize: "20px", fontWeight: 800, color: "#111" }}>
              Feature {feature.id}: {feature.title}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#888", padding: "4px 8px" }}>✕</button>
        </div>

        <div style={{ background: "#f8f9fa", borderRadius: "10px", padding: "14px", marginBottom: "14px" }}>
          <p style={{ margin: 0, fontSize: "14px", color: "#333", lineHeight: 1.7 }}>{feature.detail || feature.desc}</p>
        </div>

        <div style={{ marginBottom: "14px" }}>
          <p style={{ margin: "0 0 6px", fontSize: "12px", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>📁 Implement in</p>
          <code style={{ fontSize: "12px", background: "#111", color: "#4ADE80", padding: "8px 12px", borderRadius: "8px", display: "block", lineHeight: 1.6 }}>
            {feature.file}
          </code>
        </div>

        {feature.outputs && feature.outputs.length > 0 && (
          <div>
            <p style={{ margin: "0 0 6px", fontSize: "12px", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>✅ Required outputs</p>
            <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
              {feature.outputs.map((o, i) => (
                <li key={i} style={{ fontSize: "13px", color: "#333", marginBottom: "4px" }}>{o}</li>
              ))}
            </ul>
          </div>
        )}

        {/* OPEN FEATURE BUTTON */}
{feature.path && (
  <div style={{ marginTop: "20px", textAlign: "center" }}>
    <button
      onClick={() => {
        navigate(feature.path);
        onClose();
      }}
      style={{
        background: c.border,
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "14px",
        transition: "0.2s"
      }}
      onMouseEnter={e => e.target.style.opacity = "0.85"}
      onMouseLeave={e => e.target.style.opacity = "1"}
    >
      🚀 Open Feature
    </button>
  </div>
)}
      </div>
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // const totalDay1 = day1Features.reduce((s, f) => s + f.pts, 0);
  // const totalDay2 = day2Features.reduce((s, f) => s + f.pts, 0);

  return (
    <div style={{ background: "#0a0a1a", minHeight: "100vh", color: "#fff", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "64px 24px 48px", background: "linear-gradient(180deg, #0d0d2b 0%, #0a0a1a 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, #2d1b6944 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 900, margin: "0 0 16px", letterSpacing: "-1px", background: "linear-gradient(135deg, #fff 30%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          GigSarthi
        </h1>
        <p style={{ fontSize: "18px", maxWidth: "560px", margin: "0 auto 10px", color: "#c4b5fd", fontWeight: 500 }}>
          You order food. It arrives in minutes.
        </p>
        <p style={{ fontSize: "15px", maxWidth: "480px", margin: "0 auto 32px", color: "#7c6eb0" }}>
          But what about the worker behind it? Build a system to uncover the hidden reality of gig workers.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          
          <div style={{ background: "#0f2a1a", border: "1px solid #22c55e", borderRadius: "10px", padding: "12px 22px", textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#4ade80" }}>30</div>
            <div style={{ fontSize: "12px", color: "#4b7a5a" }}>Features</div>
          </div>
          <div style={{ background: "#1a1000", border: "1px solid #f59e0b", borderRadius: "10px", padding: "12px 22px", textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#fbbf24" }}>2</div>
            <div style={{ fontSize: "12px", color: "#7a6020" }}>Days</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "32px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ background: "#111130", border: "1px solid #2d2d5a", borderRadius: "14px", padding: "20px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
          {[
            { n: "1", label: "Pick a feature", sub: "Click any card to see details" },
            { n: "2", label: "Implement it", sub: "In the specified file/path" },
            { n: "3", label: "Raise a PR", sub: "Gets reviewed and merged" },
            { n: "4", label: "Others pull", sub: "Everyone sees your work" },
          ].map(s => (
            <div key={s.n} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#4c35b0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#e2e8f0" }}>{s.label}</div>
                <div style={{ fontSize: "12px", color: "#7c6eb0" }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DAY 1 */}
      <section style={{ padding: "16px 24px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 900, margin: 0 }}>🚀 Day 1: Data Engine</h2>
          
          <span style={{ fontSize: "13px", color: "#7c6eb0", marginLeft: "auto" }}>Click any card for full brief</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {day1Features.map(f => (
            <FeatureCard key={f.id} feature={f} onClick={setSelected} />
          ))}
        </div>
      </section>

      {/* DAY 2 */}
      {/* <section style={{ padding: "0 24px 60px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 900, margin: 0 }}>🔒 Day 2: Interactive System</h2>
          <span style={{ background: "#ef444422", border: "1px solid #ef4444", color: "#f87171", borderRadius: "20px", padding: "4px 14px", fontSize: "13px", fontWeight: 700 }}>
            LOCKED · {totalDay2} pts
          </span>
        </div>
        <div style={{ background: "#111130", border: "1px dashed #2d2d5a", borderRadius: "14px", padding: "14px 18px", marginBottom: "20px", fontSize: "13px", color: "#7c6eb0" }}>
          🔒 Day 2 features unlock after Day 1 review. Complete and merge Day 1 PRs to proceed.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {day2Features.map(f => (
            <FeatureCard key={f.id} feature={f} locked />
          ))}
        </div>
      </section> */}

      <Modal feature={selected} onClose={() => setSelected(null)} navigate={navigate} />
    </div>
  );
}