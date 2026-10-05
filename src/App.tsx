import { useState, type ReactNode } from "react";

type Screen =
  | "splash" | "onboarding" | "login" | "home" | "energy" | "prediction"
  | "insights" | "anomaly" | "report" | "analysis" | "success" | "reports"
  | "buildings" | "building" | "carbon" | "score" | "leaderboard"
  | "notifications" | "profile" | "admin" | "admin-anomalies"
  | "admin-reports" | "admin-impact" | "assistant" | "states";

type IconName =
  | "pulse" | "home" | "energy" | "spark" | "report" | "user" | "bell"
  | "arrow" | "back" | "trend" | "leaf" | "building" | "camera" | "upload"
  | "check" | "clock" | "alert" | "chart" | "settings" | "help" | "globe"
  | "shield" | "info" | "chevron" | "search" | "send" | "trophy" | "bolt"
  | "calendar" | "filter" | "menu" | "google" | "eye" | "wifi";

const paths: Record<IconName, ReactNode> = {
  pulse: <><path d="M3 12h4l2.2-6 4.2 12 2.2-6H21"/><path d="M18.5 4.5c-2.7-.7-5 .8-6.5 3-1.5-2.2-3.8-3.7-6.5-3C1.6 5.5 1 10.2 3.3 13.2 5.3 15.8 8.4 18 12 20c3.6-2 6.7-4.2 8.7-6.8 2.3-3 1.7-7.7-2.2-8.7Z"/></>,
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
  energy: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z"/>,
  spark: <><path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z"/><path d="m18 14 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z"/></>,
  report: <><path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4.1 3.5-6 8-6s7.2 1.9 8 6"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4"/></>,
  arrow: <><path d="M5 12h14"/><path d="m15 8 4 4-4 4"/></>,
  back: <><path d="M19 12H5"/><path d="m9 8-4 4 4 4"/></>,
  trend: <><path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/></>,
  leaf: <><path d="M20 4C11 4 5 8.2 5 14c0 3.3 2.7 6 6 6 6 0 9-7 9-16Z"/><path d="M4 21c2-5 6-9 12-12"/></>,
  building: <><path d="M4 21V7l8-4 8 4v14"/><path d="M8 10h2m4 0h2M8 14h2m4 0h2M9 21v-3h6v3"/></>,
  camera: <><path d="M4 7h4l2-3h4l2 3h4v13H4z"/><circle cx="12" cy="13" r="4"/></>,
  upload: <><path d="M12 16V4m0 0L7 9m5-5 5 5"/><path d="M4 15v5h16v-5"/></>,
  check: <path d="m4 12 5 5L20 6"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></>,
  alert: <><path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5m0 3v.1"/></>,
  chart: <><path d="M4 20V10m6 10V4m6 16v-7m5 7H2"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19 13.5v-3l-2-.7-.7-1.7.9-2-2.2-2.2-2 .9-1.7-.7-.8-2h-3l-.7 2-1.7.7-2-.9L1 6.1l.9 2-.7 1.7-2 .7v3l2 .7.7 1.7-.9 2L3.1 20l2-.9 1.7.7.7 2h3l.8-2 1.7-.7 2 .9 2.2-2.1-.9-2 .7-1.7 2-.7Z"/></>,
  help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.7 2.7 0 1 1 3.6 2.5c-1.1.5-1.1 1.2-1.1 2.5m0 3v.1"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></>,
  shield: <><path d="M12 3 4 6v6c0 5 3.4 8 8 10 4.6-2 8-5 8-10V6l-8-3Z"/><path d="m8 12 3 3 5-6"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/></>,
  chevron: <path d="m9 5 7 7-7 7"/>,
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
  send: <><path d="m3 3 19 9-19 9 4-9-4-9Z"/><path d="M7 12h15"/></>,
  trophy: <><path d="M8 4h8v5c0 3-1.8 5-4 5s-4-2-4-5V4Z"/><path d="M8 6H4c0 4 2 6 5 6m7-6h4c0 4-2 6-5 6M12 14v4m-4 3h8"/></>,
  bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z"/>,
  calendar: <><path d="M4 5h16v16H4zM8 2v6m8-6v6M4 10h16"/></>,
  filter: <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  google: <><path d="M21 12.2c0-.7-.1-1.4-.2-2H12v3.7h5a4.3 4.3 0 0 1-1.9 2.8v2.4h3.1c1.8-1.7 2.8-4.1 2.8-6.9Z"/><path d="M12 21c2.5 0 4.6-.8 6.2-2.2l-3.1-2.4c-.8.6-1.9.9-3.1.9-2.4 0-4.5-1.6-5.2-3.8H3.6V16A9.3 9.3 0 0 0 12 21Z"/><path d="M6.8 13.5a5.6 5.6 0 0 1 0-3V8H3.6A9.2 9.2 0 0 0 3.6 16l3.2-2.5Z"/><path d="M12 6.7c1.4 0 2.6.5 3.6 1.4l2.7-2.7A9 9 0 0 0 3.6 8l3.2 2.5c.7-2.2 2.8-3.8 5.2-3.8Z"/></>,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
  wifi: <><path d="M3 9a14 14 0 0 1 18 0M6 13a9 9 0 0 1 12 0m-9 4a4.5 4.5 0 0 1 6 0"/><path d="M12 21v.1"/></>,
};

function Icon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Button({ children, onClick, variant = "primary", icon, full = false }: { children: ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "ghost" | "danger"; icon?: IconName; full?: boolean }) {
  return <button className={`btn btn-${variant} ${full ? "btn-full" : ""}`} onClick={onClick}>{icon && <Icon name={icon} size={18} />}<span>{children}</span></button>;
}

function Badge({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "amber" | "red" | "gray" | "blue" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return <div className={`logo ${light ? "logo-light" : ""}`}><span className="logo-mark"><Icon name="pulse" size={compact ? 20 : 25} /></span>{!compact && <span className="logo-type">GreenPulse <b>AI</b></span>}</div>;
}

function Header({ title, subtitle, back, action }: { title: string; subtitle?: string; back?: () => void; action?: ReactNode }) {
  return <header className="page-header">
    <div className="header-row">
      {back && <button className="icon-btn" onClick={back} aria-label="Go back"><Icon name="back" /></button>}
      <div className="header-copy"><div className="page-title">{title}</div>{subtitle && <div className="page-subtitle">{subtitle}</div>}</div>
      {action || <span />}
    </div>
  </header>;
}

function Card({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return <div className={`card ${className}`} onClick={onClick}>{children}</div>;
}

function Metric({ label, value, unit, icon, tone = "mint", detail }: { label: string; value: string; unit?: string; icon?: IconName; tone?: string; detail?: string }) {
  return <Card className={`metric metric-${tone}`}>
    <div className="metric-top">{icon && <span className="metric-icon"><Icon name={icon} size={18} /></span>}<span className="metric-label">{label}</span></div>
    <div><span className="metric-value">{value}</span>{unit && <span className="metric-unit"> {unit}</span>}</div>
    {detail && <div className="metric-detail">{detail}</div>}
  </Card>;
}

function MiniChart({ prediction = false, bars = false }: { prediction?: boolean; bars?: boolean }) {
  if (bars) return <div className="bar-chart">{[46, 62, 48, 76, 68, 88, 64].map((h, i) => <div key={i} className="bar-column"><span style={{ height: `${h}%` }} /><small>{["M","T","W","T","F","S","S"][i]}</small></div>)}</div>;
  return <svg className="line-chart" viewBox="0 0 340 142" preserveAspectRatio="none" aria-label="Energy consumption chart">
    <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--green)" stopOpacity=".2"/><stop offset="1" stopColor="var(--green)" stopOpacity="0"/></linearGradient></defs>
    {[25, 60, 95, 130].map(y => <line key={y} x1="0" x2="340" y1={y} y2={y} stroke="var(--line)" strokeDasharray="4 5"/>)}
    <path d="M0 112 C28 100 35 70 62 80 S105 109 132 83 S171 44 202 62 S248 90 274 52 S312 30 340 46 L340 142 L0 142Z" fill="url(#area)"/>
    <path d="M0 112 C28 100 35 70 62 80 S105 109 132 83 S171 44 202 62 S248 90 274 52 S312 30 340 46" fill="none" stroke="var(--green)" strokeWidth="3" strokeLinecap="round"/>
    {prediction && <path d="M0 105 C30 92 45 80 68 85 S104 94 132 75 S174 55 204 66 S245 81 276 58 S316 44 340 38" fill="none" stroke="var(--amber)" strokeWidth="2.5" strokeDasharray="7 5" strokeLinecap="round"/>}
  </svg>;
}

function SectionTitle({ children, action, onClick }: { children: ReactNode; action?: string; onClick?: () => void }) {
  return <div className="section-title"><span>{children}</span>{action && <button onClick={onClick}>{action}<Icon name="chevron" size={14}/></button>}</div>;
}

const navItems: { id: Screen; label: string; icon: IconName }[] = [
  { id: "home", label: "Home", icon: "home" }, { id: "energy", label: "Energy", icon: "energy" },
  { id: "insights", label: "Insights", icon: "spark" }, { id: "report", label: "Report", icon: "report" },
  { id: "profile", label: "Profile", icon: "user" },
];

function BottomNav({ screen, go }: { screen: Screen; go: (s: Screen) => void }) {
  return <nav className="bottom-nav">{navItems.map(item => <button key={item.id} className={screen === item.id ? "active" : ""} onClick={() => go(item.id)}><Icon name={item.icon} size={21}/><span>{item.label}</span></button>)}</nav>;
}

function Home({ go }: { go: (s: Screen) => void }) {
  return <div className="screen">
    <div className="home-top">
      <div><div className="eyebrow">MONDAY, 17 JUNE</div><div className="greeting">Good morning, Aarav</div><div className="muted">Your campus sustainability overview</div></div>
      <button className="avatar-btn" onClick={() => go("notifications")}><Icon name="bell" size={20}/><i /></button>
    </div>
    <Card className="hero-card">
      <div className="hero-head"><div><span className="overline">CAMPUS ENERGY TODAY</span><div><span className="hero-number">1,284</span> <span className="hero-unit">kWh</span></div></div><span className="hero-icon"><Icon name="bolt" /></span></div>
      <div className="positive"><Icon name="trend" size={15}/> 8.4% lower than yesterday</div>
      <MiniChart />
      <div className="chart-axis"><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>Now</span></div>
    </Card>
    <div className="metric-grid">
      <Metric label="Carbon impact" value="526" unit="kg CO₂e" icon="leaf" tone="soft" detail="Estimated" />
      <Metric label="Efficiency score" value="82" unit="/100" icon="pulse" tone="soft" detail="Good performance" />
    </div>
    <SectionTitle action="View all" onClick={() => go("insights")}>AI Insight of the Day</SectionTitle>
    <Card className="insight-feature">
      <div className="insight-head"><span className="ai-orb"><Icon name="spark" /></span><div><Badge tone="amber">Needs attention</Badge><div className="insight-title">Unexpected lab usage</div></div></div>
      <p>Computer Lab A is consuming more energy than expected during low-occupancy hours.</p>
      <button className="text-action" onClick={() => go("anomaly")}>View insight <Icon name="arrow" size={16}/></button>
    </Card>
    <SectionTitle>Sustainability challenge</SectionTitle>
    <Card className="challenge" onClick={() => go("leaderboard")}><span className="challenge-icon"><Icon name="trophy"/></span><div><b>Switch-Off Sprint</b><p>Campus-wide · 4 days left</p><div className="progress"><i style={{ width: "68%" }}/></div></div><strong>+120</strong></Card>
    <SectionTitle action="My reports" onClick={() => go("reports")}>Recent activity</SectionTitle>
    <Card className="activity"><span className="status-dot resolved"><Icon name="check" size={14}/></span><div><b>Library lights report resolved</b><p>Facilities team · 2 hours ago</p></div><Badge>+40 pts</Badge></Card>
    <Button full icon="camera" onClick={() => go("report")}>Report Energy Wastage</Button>
  </div>;
}

const buildings = [
  { name: "Library", kwh: "430 kWh", score: 91, trend: "−12%", tone: "good" },
  { name: "Admin Block", kwh: "520 kWh", score: 84, trend: "−4%", tone: "good" },
  { name: "Lab Block", kwh: "780 kWh", score: 72, trend: "+18%", tone: "warn" },
  { name: "Hostel A", kwh: "920 kWh", score: 61, trend: "+9%", tone: "warn" },
];

function Energy({ go }: { go: (s: Screen) => void }) {
  return <div className="screen">
    <Header title="Energy Analytics" subtitle="Live campus performance" action={<button className="icon-btn" onClick={() => go("buildings")}><Icon name="building"/></button>} />
    <div className="segmented"><button>Daily</button><button className="active">Weekly</button><button>Monthly</button></div>
    <Card className="chart-card">
      <div className="chart-card-head"><div><span className="overline">TOTAL CONSUMPTION</span><div><span className="chart-value">8,742</span> <span className="metric-unit">kWh</span></div></div><Badge>−6.2%</Badge></div>
      <MiniChart bars />
    </Card>
    <div className="stats-row"><div><Icon name="trend"/><span>Peak period<b>2–4 PM</b></span></div><div><Icon name="pulse"/><span>Daily average<b>1,249 kWh</b></span></div></div>
    <button className="filter-select"><span><Icon name="building" size={18}/>All Buildings</span><Icon name="chevron" size={17}/></button>
    <SectionTitle action="Prediction" onClick={() => go("prediction")}>Building performance</SectionTitle>
    <div className="building-list">{buildings.map((b) => <Card key={b.name} className="building-row" onClick={() => go("building")}><span className="building-icon"><Icon name="building"/></span><div className="building-copy"><b>{b.name}</b><span>{b.kwh}</span></div><div className={`trend-pill ${b.tone}`}>{b.trend}</div><div className="score-ring" style={{ "--score": `${b.score * 3.6}deg` } as React.CSSProperties}><span>{b.score}</span></div></Card>)}</div>
  </div>;
}

function Prediction({ go }: { go: (s: Screen) => void }) {
  return <div className="screen"><Header title="AI Energy Prediction" subtitle="Next 24 hours" back={() => go("energy")} />
    <Card className="chart-card prediction-card">
      <div className="legend"><span><i className="actual"/>Actual</span><span><i className="predicted"/>AI predicted</span></div><MiniChart prediction/>
      <div className="chart-axis"><span>12 AM</span><span>8 AM</span><span>4 PM</span><span>12 AM</span></div>
    </Card>
    <Card className="prediction-summary"><span className="ai-orb"><Icon name="spark"/></span><div><span>Expected consumption tomorrow</span><strong>1,350 kWh</strong><small>AI-generated estimate</small></div></Card>
    <div className="three-metrics"><div><span>Confidence</span><b>91%</b><small>High</small></div><div><span>Peak period</span><b>2–4 PM</b><small>Expected</small></div><div><span>Change</span><b className="down">−3.2%</b><small>vs. today</small></div></div>
    <Card className="explain-card"><Icon name="info"/><div><b>How this prediction works</b><p>AI analyzes historical energy usage, occupancy, temperature and time-based patterns to estimate future consumption.</p></div></Card>
    <div className="note"><Icon name="spark" size={16}/> Predictions are estimates and may vary with campus activity.</div>
  </div>;
}

function Insights({ go }: { go: (s: Screen) => void }) {
  return <div className="screen"><Header title="AI Insights" subtitle="3 insights need your attention" />
    <div className="segmented"><button className="active">Active 3</button><button>Resolved 8</button><button>All</button></div>
    <InsightCard priority="HIGH ENERGY USAGE" tone="red" building="Computer Lab A" actual="23.6" expected="14.8" deviation="+59.5%" action={() => go("anomaly")} />
    <InsightCard priority="MEDIUM PRIORITY" tone="amber" building="Hostel A — Floor 2" actual="18.2" expected="14.5" deviation="+25.5%" />
    <InsightCard priority="RESOLVED" tone="green" building="Library Reading Hall" actual="9.8" expected="10.1" deviation="−3.0%" resolved />
  </div>;
}

function InsightCard({ priority, tone, building, actual, expected, deviation, action, resolved }: { priority: string; tone: "red" | "amber" | "green"; building: string; actual: string; expected: string; deviation: string; action?: () => void; resolved?: boolean }) {
  return <Card className={`insight-card border-${tone}`}><div className="insight-card-top"><Badge tone={tone}>{priority}</Badge><Icon name={resolved ? "check" : "alert"} size={19}/></div><div className="insight-building">{building}</div>
    <div className="comparison"><div><span>Actual</span><b>{actual} <small>kWh</small></b></div><div><span>Expected</span><b>{expected} <small>kWh</small></b></div><div><span>Deviation</span><b className={tone}>{deviation}</b></div></div>
    <p>{resolved ? "Usage returned to the expected range after facilities review." : "Energy consumption is above the expected level for current occupancy and time."}</p>
    {!resolved && <div className="recommend"><Icon name="spark" size={17}/><span><small>RECOMMENDED ACTION</small>Review cooling and idle equipment usage.</span></div>}
    {!resolved && <div className="button-row"><Button variant="secondary" onClick={action}>View Details</Button><Button onClick={action}>Investigate</Button></div>}
  </Card>;
}

function Anomaly({ go }: { go: (s: Screen) => void }) {
  return <div className="screen"><Header title="Energy Anomaly" subtitle="Computer Lab A" back={() => go("insights")} action={<Badge tone="red">High anomaly</Badge>} />
    <Card className="anomaly-hero"><div className="anomaly-amount"><span>Current usage</span><strong>23.6 <small>kWh</small></strong><em>+59.5% above expected</em></div><div className="anomaly-icon"><Icon name="alert"/></div></Card>
    <div className="detail-grid"><div><span>Expected</span><b>14.8 kWh</b></div><div><span>Time</span><b>7:45 PM</b></div><div><span>Occupancy</span><b>12 people</b></div><div><span>Temperature</span><b>29°C</b></div></div>
    <SectionTitle>Actual vs expected</SectionTitle><Card className="chart-card compact-chart"><div className="legend"><span><i className="actual"/>Actual</span><span><i className="expected"/>Expected</span></div><MiniChart prediction /></Card>
    <SectionTitle>Possible factors</SectionTitle>
    <div className="factor-list">{[["bolt","High AC usage","Cooling load is elevated"],["energy","Idle equipment","18 systems may be left on"],["chart","Unexpected pattern","Unusual for this hour"]].map(([icon,title,sub]) => <div key={title}><span><Icon name={icon as IconName}/></span><div><b>{title}</b><small>{sub}</small></div></div>)}</div>
    <Card className="recommendation-card"><span className="ai-orb"><Icon name="spark"/></span><div><Badge>AI RECOMMENDATION</Badge><p>Review cooling setpoints and power down idle computer systems. Confirm occupancy before taking action.</p></div></Card>
    <Button full icon="report" onClick={() => go("report")}>Create Investigation Report</Button>
  </div>;
}

function Report({ go }: { go: (s: Screen) => void }) {
  const [category, setCategory] = useState("AC left ON");
  return <div className="screen"><Header title="Report Energy Wastage" subtitle="Help us spot avoidable energy use" back={() => go("home")} />
    <label className="field-label">Building / Location</label><button className="input-like"><span><Icon name="building" size={18}/>Computer Lab A</span><Icon name="chevron" size={16}/></button>
    <label className="field-label">Category</label><div className="category-grid">{["Lights left ON","AC left ON","Computers left ON","Equipment running","Other"].map(c => <button key={c} className={category === c ? "selected" : ""} onClick={() => setCategory(c)}><Icon name={c.includes("AC") ? "energy" : c.includes("Lights") ? "bolt" : c.includes("Computer") ? "chart" : "settings"} size={19}/><span>{c}</span>{category === c && <Icon name="check" size={14}/>}</button>)}</div>
    <label className="field-label">Description</label><textarea className="textarea" defaultValue="Air conditioner and several computer systems are running in an almost empty lab." />
    <label className="field-label">Add evidence</label><button className="upload-area" onClick={() => go("analysis")}><span className="upload-icon"><Icon name="camera" size={26}/></span><b>Take or upload a photo</b><small>JPG or PNG · Max 10 MB</small><div><span><Icon name="camera" size={16}/> Take Photo</span><span><Icon name="upload" size={16}/> Upload</span></div></button>
    <div className="privacy-note"><Icon name="shield" size={17}/><span>Your report helps the campus identify and reduce energy wastage. Personal details stay private.</span></div>
    <Button full onClick={() => go("success")}>Submit Report</Button>
  </div>;
}

function Analysis({ go }: { go: (s: Screen) => void }) {
  return <div className="screen"><Header title="AI Analysis" subtitle="AI-assisted photo review" back={() => go("report")} />
    <div className="photo-preview"><div className="room-scene"><span className="ac-unit"/><span className="desk one"/><span className="desk two"/><span className="monitor m1"/><span className="monitor m2"/><span className="light l1"/><span className="light l2"/><i className="detect-box ac">AC · 96%</i><i className="detect-box pc">Systems · 89%</i></div><Badge tone="blue">AI-assisted detection</Badge></div>
    <Card className="detection-result"><div className="result-head"><span className="warning-icon"><Icon name="alert"/></span><div><b>Possible energy wastage detected</b><p>Please confirm the detected items below.</p></div></div>
      {[["Air Conditioner","96%"],["Lights","93%"],["Computer systems","89%"]].map(([n,c]) => <div className="detected-row" key={n}><span className="status-dot resolved"><Icon name="check" size={13}/></span><b>{n}</b><span>{c} confidence</span></div>)}
    </Card>
    <Card className="ai-disclaimer"><Icon name="info"/><p>AI detections are suggestions, not verified facts. Review the photo and details before submitting.</p></Card>
    <Button full icon="check" onClick={() => go("success")}>Confirm & Submit Report</Button>
    <Button full variant="ghost" onClick={() => go("report")}>Edit report details</Button>
  </div>;
}

function Success({ go }: { go: (s: Screen) => void }) {
  return <div className="screen center-screen"><div className="success-mark"><Icon name="check" size={38}/></div><div className="success-title">Report Submitted</div><p className="success-copy">Thank you for helping make our campus greener.</p>
    <Card className="receipt"><div><span>Report ID</span><b>#GP-2048</b></div><div><span>Location</span><b>Computer Lab A</b></div><div><span>Category</span><b>AC & computers</b></div><div><span>Status</span><Badge tone="amber">Under Review</Badge></div></Card>
    <Button full onClick={() => go("reports")}>View My Reports</Button><Button full variant="ghost" onClick={() => go("home")}>Return Home</Button>
  </div>;
}

function Reports({ go }: { go: (s: Screen) => void }) {
  const data = [["Computer Lab A","AC & computers","17 Jun, 8:02 PM","Under Review","amber"],["Library · Floor 1","Lights left ON","14 Jun, 6:30 PM","Investigating","blue"],["Lecture Hall B","Equipment running","08 Jun, 5:15 PM","Resolved","green"]];
  return <div className="screen"><Header title="My Reports" subtitle="3 reports submitted" back={() => go("profile")} action={<button className="icon-btn" onClick={() => go("report")}><Icon name="camera"/></button>}/>
    <div className="segmented"><button className="active">All</button><button>Active</button><button>Resolved</button></div>
    {data.map(([place,cat,date,status,tone], i) => <Card className="report-row" key={place}><div className={`report-thumb thumb-${i}`}><Icon name={i === 0 ? "energy" : i === 1 ? "bolt" : "settings"}/></div><div><Badge tone={tone as "amber" | "blue" | "green"}>{status}</Badge><b>{place}</b><span>{cat}</span><small>{date}</small></div><Icon name="chevron" size={17}/></Card>)}
  </div>;
}

function Buildings({ go }: { go: (s: Screen) => void }) {
  return <div className="screen"><Header title="Campus Buildings" subtitle="Live sustainability performance" back={() => go("energy")} />
    <div className="search-box"><Icon name="search"/><span>Search buildings</span><Icon name="filter"/></div>
    <Card className="campus-average"><div><span>Campus average</span><b>77/100</b></div><div className="wide-progress"><i style={{ width: "77%" }}/></div><Badge>Good</Badge></Card>
    <div className="building-card-grid">{buildings.map((b, i) => <Card key={b.name} className="building-card" onClick={() => go("building")}><div className={`building-visual bv-${i}`}><Icon name="building" size={28}/><Badge>{b.score}/100</Badge></div><div className="building-card-body"><b>{b.name}</b><span>{b.kwh} today</span><div className="wide-progress"><i style={{ width: `${b.score}%` }}/></div><small>{b.score >= 85 ? "Excellent" : b.score >= 70 ? "Good" : "Needs attention"} efficiency</small></div></Card>)}</div>
  </div>;
}

function Building({ go }: { go: (s: Screen) => void }) {
  return <div className="screen"><Header title="Lab Block" subtitle="Building details" back={() => go("buildings")} action={<Badge tone="amber">72/100</Badge>} />
    <Card className="building-hero"><div><span>Energy today</span><strong>780 <small>kWh</small></strong><em>18% above campus average</em></div><Icon name="building" size={52}/></Card>
    <div className="metric-grid"><Metric label="Expected" value="662" unit="kWh" tone="soft"/><Metric label="Carbon impact" value="319" unit="kg CO₂e" tone="soft"/></div>
    <SectionTitle>Energy trend</SectionTitle><Card className="chart-card compact-chart"><MiniChart/><div className="chart-axis"><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>Now</span></div></Card>
    <div className="segmented"><button className="active">Daily usage</button><button>Campus comparison</button></div>
    <Card className="recommendation-card"><span className="ai-orb"><Icon name="spark"/></span><div><Badge>AI INSIGHT</Badge><p>Lab Block has higher afternoon consumption than expected, led by cooling and computer loads.</p><button className="text-action" onClick={() => go("anomaly")}>Review anomaly <Icon name="arrow" size={15}/></button></div></Card>
  </div>;
}

function Carbon({ go }: { go: (s: Screen) => void }) {
  return <div className="screen"><Header title="Climate Impact" subtitle="Estimated campus footprint" back={() => go("profile")} />
    <Card className="carbon-hero"><div className="carbon-ring"><Icon name="leaf" size={34}/><b>526</b><span>kg CO₂e today</span></div><p>Equivalent to an estimated <b>2,130 km</b> driven by an average petrol car.</p></Card>
    <div className="impact-grid"><Metric label="Total energy" value="1,284" unit="kWh" icon="energy"/><Metric label="Estimated CO₂e" value="526" unit="kg" icon="leaf"/><Metric label="Energy reduction" value="118" unit="kWh" icon="trend"/><Metric label="CO₂e reduction" value="48" unit="kg" icon="leaf"/></div>
    <SectionTitle>Last 7 days</SectionTitle><Card className="chart-card compact-chart"><MiniChart bars/></Card>
    <Card className="method-note"><Icon name="info"/><p>Carbon values are estimates based on energy consumption and the selected electricity emission factor.</p></Card>
  </div>;
}

function Score({ go }: { go: (s: Screen) => void }) {
  const achievements = [["energy","Energy Saver","Reduce avoidable usage"],["report","Green Reporter","Submit 5 verified reports"],["leaf","Climate Learner","Complete 3 climate lessons"],["trophy","Campus Champion","Reach 1,000 points"]];
  return <div className="screen"><Header title="My Green Score" subtitle="Your climate action journey" back={() => go("profile")} />
    <Card className="score-hero"><span className="score-medal"><Icon name="trophy" size={30}/></span><div className="score-number">780</div><span>POINTS</span><Badge>Sustainability Champion</Badge><div className="score-progress"><div><span>220 points to next badge</span><b>78%</b></div><div className="progress"><i style={{ width: "78%" }}/></div></div></Card>
    <SectionTitle>Achievements</SectionTitle><div className="achievement-grid">{achievements.map(([icon,title,sub], i) => <Card key={title} className={`achievement ${i === 3 ? "locked" : ""}`}><span><Icon name={icon as IconName}/></span><b>{title}</b><small>{sub}</small>{i < 3 && <Icon name="check" size={14}/>}</Card>)}</div>
    <SectionTitle action="View challenge" onClick={() => go("leaderboard")}>This week</SectionTitle>
    <Card className="activity"><span className="status-dot resolved"><Icon name="trend" size={14}/></span><div><b>+140 points earned</b><p>Top 15% of campus participants</p></div><Badge>Great work</Badge></Card>
  </div>;
}

function Leaderboard({ go }: { go: (s: Screen) => void }) {
  const teams = [["Team A","School of Engineering","920"],["Team B","School of Design","870"],["Team C","Science Club","810"],["Green Coders","Computer Science","780"],["Eco Circle","Commerce","745"]];
  return <div className="screen"><Header title="Green Campus Challenge" subtitle="June leaderboard" back={() => go("score")} />
    <div className="podium"><div className="podium-place second"><span>2</span><b>Team B</b><small>870 pts</small></div><div className="podium-place first"><Icon name="trophy"/><span>1</span><b>Team A</b><small>920 pts</small></div><div className="podium-place third"><span>3</span><b>Team C</b><small>810 pts</small></div></div>
    <div className="segmented"><button className="active">Teams</button><button>Classes</button><button>Buildings</button></div>
    <div className="rank-list">{teams.map((t, i) => <div className={i === 3 ? "is-you" : ""} key={t[0]}><span className="rank">{i+1}</span><span className="team-avatar">{t[0].slice(0,2)}</span><div><b>{t[0]} {i === 3 && <small>YOU</small>}</b><span>{t[1]}</span></div><strong>{t[2]} <small>pts</small></strong></div>)}</div>
  </div>;
}

function Notifications({ go }: { go: (s: Screen) => void }) {
  const notes: [IconName,string,string,string][] = [["alert","Energy anomaly detected","Lab Block usage is 18% above expected.","8 min"],["trend","Campus energy decreased","Consumption is 8.4% lower today.","1 hr"],["report","Report under investigation","Your Computer Lab A report is being reviewed.","3 hr"],["trophy","New Green Challenge","Join the Switch-Off Sprint this week.","1 day"]];
  return <div className="screen"><Header title="Notifications" subtitle="2 new updates" back={() => go("home")} action={<button className="text-btn">Mark all read</button>}/>
    <div className="notification-list">{notes.map((n,i) => <div className={i<2 ? "unread" : ""} key={n[1]}><span className={`notification-icon ni-${i}`}><Icon name={n[0]}/></span><div><b>{n[1]}</b><p>{n[2]}</p><small>{n[3]} ago</small></div>{i<2 && <i/>}</div>)}</div>
  </div>;
}

const directory: { section: string; items: [Screen,string,IconName][] }[] = [
  {section:"YOUR IMPACT",items:[["score","My Green Score","trophy"],["leaderboard","Campus Challenge","trend"],["carbon","Climate Impact","leaf"],["reports","My Reports","report"]]},
  {section:"CAMPUS",items:[["buildings","Campus Buildings","building"],["prediction","AI Prediction","spark"],["notifications","Notifications","bell"]]},
  {section:"SETTINGS",items:[["states","App states & support","settings"]]},
];

function Profile({ go }: { go: (s: Screen) => void }) {
  return <div className="screen"><Header title="Profile" action={<button className="icon-btn"><Icon name="settings"/></button>}/>
    <Card className="profile-card"><span className="profile-avatar">AK</span><div><b>Aarav Kumar</b><span>aarav.k@greencampus.edu</span><Badge>Student</Badge></div><button><Icon name="chevron"/></button></Card>
    <Card className="profile-score" onClick={() => go("score")}><span><Icon name="trophy"/></span><div><small>GREEN SCORE</small><b>780 points</b></div><Badge>Champion</Badge><Icon name="chevron" size={17}/></Card>
    {directory.map(group => <div key={group.section} className="profile-group"><span className="group-title">{group.section}</span>{group.items.map(([id,label,icon]) => <button key={id} onClick={() => go(id)}><span><Icon name={icon}/></span><b>{label}</b><Icon name="chevron" size={16}/></button>)}</div>)}
    <button className="admin-entry" onClick={() => go("admin")}><span><Icon name="shield"/></span><div><b>Admin Dashboard</b><small>Switch to facilities overview</small></div><Icon name="arrow"/></button>
    <div className="app-version"><Logo/><span>Version 1.0 Prototype</span></div>
  </div>;
}

function Admin({ go }: { go: (s: Screen) => void }) {
  return <div className="screen admin-screen"><div className="admin-header"><div><Logo light/><span>ADMIN CONSOLE</span></div><button onClick={() => go("profile")}><Icon name="user"/></button></div>
    <div className="admin-greeting"><div><span>Good morning, Priya</span><b>Campus operations overview</b></div><button onClick={() => go("notifications")}><Icon name="bell"/><i/></button></div>
    <div className="admin-metrics"><Metric label="Energy today" value="1,284" unit="kWh" icon="energy"/><Metric label="Est. CO₂e" value="526" unit="kg" icon="leaf"/><Metric label="Active anomalies" value="6" icon="alert" tone="amber"/><Metric label="Reports pending" value="12" icon="report" tone="amber"/></div>
    <SectionTitle action="Full analytics" onClick={() => go("admin-impact")}>Energy trend</SectionTitle><Card className="chart-card compact-chart"><MiniChart/><div className="chart-axis"><span>6 AM</span><span>Noon</span><span>6 PM</span><span>Now</span></div></Card>
    <SectionTitle action="View all" onClick={() => go("admin-anomalies")}>Recent alerts</SectionTitle>
    <Card className="admin-alert" onClick={() => go("anomaly")}><span className="warning-icon"><Icon name="alert"/></span><div><Badge tone="red">HIGH</Badge><b>Computer Lab A</b><p>+59.5% above expected · 8 min ago</p></div><Icon name="chevron"/></Card>
    <SectionTitle action="Manage" onClick={() => go("admin-reports")}>Wastage reports</SectionTitle>
    <Card className="admin-alert"><span className="report-thumb"><Icon name="camera"/></span><div><Badge tone="amber">NEW</Badge><b>AC left ON · Lab A</b><p>Submitted by student · 18 min ago</p></div><Icon name="chevron"/></Card>
    <div className="admin-nav"><button className="active"><Icon name="home"/><span>Overview</span></button><button onClick={() => go("admin-anomalies")}><Icon name="alert"/><span>Anomalies</span></button><button onClick={() => go("admin-reports")}><Icon name="report"/><span>Reports</span></button><button onClick={() => go("admin-impact")}><Icon name="chart"/><span>Impact</span></button></div>
  </div>;
}

function AdminAnomalies({ go }: { go: (s: Screen) => void }) {
  const rows = [["Critical","Server Room","+82.1%","7:38 PM","red"],["High","Computer Lab A","+59.5%","7:45 PM","red"],["Medium","Hostel A · F2","+25.5%","6:20 PM","amber"],["Resolved","Library Hall","−3.0%","4:10 PM","green"]];
  return <div className="screen"><Header title="Anomaly Center" subtitle="6 active energy anomalies" back={() => go("admin")} action={<button className="icon-btn"><Icon name="filter"/></button>}/>
    <div className="filter-chips"><button className="active">All 9</button><button>Critical 1</button><button>High 2</button><button>Medium 3</button><button>Resolved</button></div>
    {rows.map(([sev,place,dev,time,tone]) => <Card className="anomaly-row" key={place} onClick={() => go("anomaly")}><span className={`severity-line ${tone}`}/><div><Badge tone={tone as "red"|"amber"|"green"}>{sev}</Badge><b>{place}</b><span><Icon name="clock" size={14}/>{time}</span></div><div><small>DEVIATION</small><strong>{dev}</strong><Icon name="chevron" size={16}/></div></Card>)}
  </div>;
}

function AdminReports({ go }: { go: (s: Screen) => void }) {
  const [resolved, setResolved] = useState(false);
  return <div className="screen"><Header title="Report Management" subtitle="12 reports need review" back={() => go("admin")} action={<button className="icon-btn"><Icon name="filter"/></button>}/>
    <div className="segmented"><button className="active">Pending 12</button><button>Investigating 5</button><button>Resolved</button></div>
    <Card className="management-card"><div className="management-photo"><Icon name="camera" size={28}/><Badge tone={resolved ? "green" : "amber"}>{resolved ? "RESOLVED" : "NEW"}</Badge></div><div className="management-body"><b>AC & computers left ON</b><span><Icon name="building" size={15}/>Computer Lab A</span><p>Air conditioner and several systems running in an almost empty lab.</p><div className="reporter"><span>AK</span><div><b>Aarav Kumar</b><small>17 Jun · 8:02 PM</small></div></div>{!resolved && <div className="button-row"><Button variant="secondary">Investigate</Button><Button onClick={() => setResolved(true)}>Mark Resolved</Button></div>}</div></Card>
    <Card className="management-card compact"><div className="management-photo second"><Icon name="bolt" size={28}/></div><div className="management-body"><Badge tone="blue">INVESTIGATING</Badge><b>Lights left ON</b><span><Icon name="building" size={15}/>Library · Floor 1</span><small>14 Jun · 6:30 PM</small></div></Card>
  </div>;
}

function AdminImpact({ go }: { go: (s: Screen) => void }) {
  return <div className="screen"><Header title="Impact Report" subtitle="June 2025 · Campus-wide" back={() => go("admin")} action={<button className="icon-btn"><Icon name="calendar"/></button>}/>
    <Card className="impact-banner"><Icon name="leaf" size={30}/><div><span>MONTHLY PROGRESS</span><b>8.7% lower energy use</b><small>Compared with May 2025</small></div></Card>
    <div className="impact-grid"><Metric label="Energy used" value="38.4" unit="MWh" icon="energy"/><Metric label="Est. CO₂e" value="15.7" unit="t" icon="leaf"/><Metric label="Est. savings" value="3.6" unit="MWh" icon="trend"/><Metric label="Reports resolved" value="42" icon="check"/></div>
    <SectionTitle>Consumption trend</SectionTitle><Card className="chart-card compact-chart"><MiniChart/><div className="chart-axis"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span></div></Card>
    <SectionTitle>Building performance</SectionTitle>{buildings.slice(0,3).map(b => <div className="performance-row" key={b.name}><span>{b.name}</span><div className="wide-progress"><i style={{ width: `${b.score}%` }}/></div><b>{b.score}</b></div>)}
    <Card className="method-note"><Icon name="info"/><p>Savings and carbon figures are estimates based on selected baselines and emission factors.</p></Card>
    <Button full icon="report">Generate Report</Button>
  </div>;
}

function Assistant({ go }: { go: (s: Screen) => void }) {
  const [sent, setSent] = useState(false);
  return <div className="screen assistant-screen"><Header title="GreenPulse AI Assistant" subtitle="Campus energy analyst" back={() => go("home")} action={<span className="online-dot">Online</span>}/>
    <div className="assistant-intro"><span className="ai-orb large"><Icon name="spark" size={25}/></span><b>Ask about campus energy</b><p>I can explain patterns, summarize usage, and suggest evidence-based next steps.</p></div>
    <div className="chat"><div className="bubble user">Why is Lab Block consuming more energy?</div><div className="bubble ai"><Logo compact/><p>Lab Block is currently using <b>18% more energy</b> than its expected baseline.</p><p>The main contributors appear to be cooling demand between 2–4 PM and computer equipment remaining active after scheduled classes.</p><div className="chat-caveat"><Icon name="info" size={14}/>This is an AI interpretation of available campus data.</div></div>{sent && <div className="bubble user">How can we reduce it safely?</div>}</div>
    <div className="suggestions"><span>SUGGESTED QUESTIONS</span>{["What was today’s campus energy usage?","Which building is most efficient?","How can we reduce consumption?"].map(q => <button key={q} onClick={() => setSent(true)}>{q}<Icon name="arrow" size={15}/></button>)}</div>
    <div className="chat-input"><span>Ask about campus energy…</span><button onClick={() => setSent(true)}><Icon name="send"/></button></div>
  </div>;
}

function States({ go }: { go: (s: Screen) => void }) {
  return <div className="screen"><Header title="App States" subtitle="Reusable system patterns" back={() => go("profile")}/>
    <div className="state-grid">
      <StateCard icon="chart" title="No energy data" copy="Energy readings will appear once your campus meters sync." action="Refresh data"/>
      <StateCard icon="check" title="No anomalies" copy="Everything looks normal. We’ll alert you when usage changes."/>
      <StateCard icon="report" title="No reports yet" copy="Reports you submit will appear here." action="Create report"/>
      <StateCard icon="spark" title="Loading AI prediction" copy="Analyzing usage, occupancy and weather patterns…" loading/>
      <StateCard icon="alert" title="Unable to load data" copy="The campus data service is temporarily unavailable." action="Try again" error/>
      <StateCard icon="wifi" title="You’re offline" copy="Showing the most recently synced campus data." action="View cached data"/>
    </div>
    <div className="snackbar"><Icon name="check"/><span>Report status updated successfully.</span><button>Dismiss</button></div>
  </div>;
}

function StateCard({icon,title,copy,action,loading,error}: {icon:IconName;title:string;copy:string;action?:string;loading?:boolean;error?:boolean}) {
  return <Card className={`state-card ${error?"error":""}`}><span className={loading ? "state-icon loading" : "state-icon"}><Icon name={icon}/></span><b>{title}</b><p>{copy}</p>{action && <button>{action}</button>}</Card>;
}

function Splash({ go }: { go: (s: Screen) => void }) {
  return <div className="splash" onClick={() => go("onboarding")}><div className="splash-brand"><span className="splash-mark"><Icon name="pulse" size={46}/></span><div>GreenPulse <b>AI</b></div><p>Turning Campus Data into Climate Action.</p></div><button onClick={() => go("onboarding")}>Tap to begin <Icon name="arrow" size={17}/></button></div>;
}

const onboarding = [
  ["energy","Monitor campus energy","See clear, real-time energy trends across your campus and buildings."],
  ["spark","Discover AI-powered insights","Understand unusual usage with simple explanations and practical recommendations."],
  ["leaf","Take action for a greener campus","Report wastage, join challenges, and track your estimated climate impact."],
] as const;

function Onboarding({ go }: { go: (s: Screen) => void }) {
  const [slide,setSlide] = useState(0); const item=onboarding[slide];
  return <div className="onboarding"><div className="onboarding-top"><Logo/><button onClick={() => go("login")}>Skip</button></div><div className={`onboarding-art art-${slide}`}><span className="orbit o1"/><span className="orbit o2"/><div className="art-card back"/><div className="art-card front"><Icon name={item[0]} size={58}/><span className="art-line"/><span className="art-line short"/></div><span className="float-chip"><Icon name="trend" size={16}/>−8.4%</span></div>
    <div className="onboarding-copy"><div className="dots">{[0,1,2].map(i=><i className={i===slide?"active":""} key={i}/>)}</div><div className="onboarding-title">{item[1]}</div><p>{item[2]}</p></div>
    <Button full onClick={() => slide<2?setSlide(slide+1):go("login")} icon="arrow">{slide===2?"Get Started":"Next"}</Button>
  </div>;
}

function Login({ go }: { go: (s: Screen) => void }) {
  return <div className="login"><Logo/><div className="login-heading"><div>Welcome back</div><p>Sign in to continue making your campus greener.</p></div>
    <label className="field-label">Email address</label><div className="login-field"><Icon name="user"/><input defaultValue="aarav.k@greencampus.edu"/></div>
    <div className="password-label"><label className="field-label">Password</label><button>Forgot password?</button></div><div className="login-field"><Icon name="shield"/><input type="password" defaultValue="greenpulse"/><Icon name="eye"/></div>
    <Button full onClick={() => go("home")}>Log in</Button><div className="divider"><span>or continue with</span></div><Button full variant="secondary" icon="google" onClick={() => go("home")}>Continue with Google</Button>
    <p className="signup-copy">New to GreenPulse AI? <button>Sign up</button></p><div className="login-foot"><Icon name="shield" size={15}/>Secure campus sign-in</div>
  </div>;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const go = (next: Screen) => { setScreen(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const content: Record<Screen, ReactNode> = {
    splash:<Splash go={go}/>, onboarding:<Onboarding go={go}/>, login:<Login go={go}/>,
    home:<Home go={go}/>, energy:<Energy go={go}/>, prediction:<Prediction go={go}/>,
    insights:<Insights go={go}/>, anomaly:<Anomaly go={go}/>, report:<Report go={go}/>,
    analysis:<Analysis go={go}/>, success:<Success go={go}/>, reports:<Reports go={go}/>,
    buildings:<Buildings go={go}/>, building:<Building go={go}/>, carbon:<Carbon go={go}/>,
    score:<Score go={go}/>, leaderboard:<Leaderboard go={go}/>, notifications:<Notifications go={go}/>,
    profile:<Profile go={go}/>, admin:<Admin go={go}/>, "admin-anomalies":<AdminAnomalies go={go}/>,
    "admin-reports":<AdminReports go={go}/>, "admin-impact":<AdminImpact go={go}/>,
    assistant:<Assistant go={go}/>, states:<States go={go}/>,
  };
  const hasStudentNav = ["home","energy","insights","report","profile"].includes(screen);
  const showAssistant = !["splash","onboarding","login","assistant","success"].includes(screen) && !screen.startsWith("admin");
  return <main className="app-shell"><div className="phone">
    {content[screen]}
    {showAssistant && <button className="assistant-fab" onClick={() => go("assistant")} aria-label="Open GreenPulse AI Assistant"><Icon name="spark" size={22}/></button>}
    {hasStudentNav && <BottomNav screen={screen} go={go}/>}
  </div></main>;
}
