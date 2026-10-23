import { useMemo, useState } from "react";
import { PageIntro } from "../components/ui/PageIntro";
import { MetricChart } from "../components/charts/MetricChart";
import { modelResults } from "../data/research";
import { metricDescriptions, modelDescriptions } from "../data/modelDescriptions";

export function ModelResults() {
  const [metric, setMetric] = useState("qlike");
  const [family, setFamily] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedName, setSelectedName] = useState(modelResults[0].model);
  const [comparisonName, setComparisonName] = useState(modelResults[1].model);
  const sorted = useMemo(() => modelResults.filter(row => (family === "All" || row.family === family) && row.model.toLowerCase().includes(query.toLowerCase())).sort((a,b) => a[metric]-b[metric]), [metric, family, query]);
  const selected = sorted.find(row => row.model === selectedName) ?? sorted[0];
  const description = selected && modelDescriptions[selected.model];
  const best = modelResults[0];
  const comparison = modelResults.find(row => row.model === comparisonName);
  return <section className="section page"><PageIntro eyebrow="Development results" title="Every model. Same dates. Clear ranking.">Switch metrics to inspect the full comparison. Lower is better; these results describe an inspected development period, not an untouched future holdout.</PageIntro>
    <div className="results-controls">
      <div className="metric-switch" role="group" aria-label="Select metric">{["qlike","mae","rmse"].map(item => <button key={item} title={metricDescriptions[item]} aria-describedby="metric-help" aria-pressed={metric===item} className={metric===item?"selected":""} onClick={()=>setMetric(item)}>{item.toUpperCase()}</button>)}</div>
      <label>Model family<select value={family} onChange={event => setFamily(event.target.value)}>{["All", "Statistical", "Baseline", "Regime", "Neural"].map(name => <option key={name}>{name}</option>)}</select></label>
      <label>Find a model<input type="search" placeholder="Search models…" value={query} onChange={event => setQuery(event.target.value)} /></label>
    </div>
    <p id="metric-help" className="metric-help"><strong>Lower is better for every metric.</strong> {metricDescriptions[metric]}</p>
    <p className="result-count" role="status">{sorted.length} of {modelResults.length} models shown · ranked by {metric.toUpperCase()}</p>
    {sorted.length ? <>
      <div className="results-layout"><div className="chart-card"><MetricChart data={sorted} metric={metric}/></div><aside className="winner-card"><span>BEST SHOWN {metric.toUpperCase()}</span><strong>{sorted[0][metric].toFixed(6)}</strong><h3>{sorted[0].model}</h3><p>{sorted[0].family} family</p><hr/><small>THE TAKEAWAY</small><p>Regime information is useful context, but did not consistently outperform the strongest statistical benchmark.</p></aside></div>
      <p className="fine-print">On narrow screens, scroll the chart and table horizontally. The table provides exact scores and keyboard-accessible model selection.</p>
      <div className="table-wrap" tabIndex={0} role="region" aria-label="Model scores table"><table><caption>Historical development scores · 2,520 common origins per model</caption><thead><tr><th scope="col">Rank</th><th scope="col">Model · select to inspect</th><th scope="col">Family</th>{["mae", "rmse", "qlike"].map(key => <th scope="col" key={key}><abbr title={metricDescriptions[key]}>{key.toUpperCase()}</abbr></th>)}</tr></thead><tbody>{sorted.map((row,i)=><tr key={row.model} className={selected.model===row.model?"selected-row":""}><td>{String(i+1).padStart(2,"0")}</td><td><button className="model-select" aria-pressed={selected.model===row.model} onClick={()=>setSelectedName(row.model)}>{row.model}</button></td><td><span className={`family ${row.family.toLowerCase()}`}>{row.family}</span></td><td>{row.mae.toFixed(6)}</td><td>{row.rmse.toFixed(6)}</td><td>{row.qlike.toFixed(6)}</td></tr>)}</tbody></table></div>
    </> : <div className="empty-state"><h3>No matching models</h3><button className="button" onClick={()=>{setFamily("All");setQuery("");}}>Reset filters</button></div>}
    {selected && <section className="model-detail" aria-label="Selected model details"><span className="eyebrow">Selected model · within current filters</span><h3>{selected.model}</h3><p>{selected.family} · 2,520 development origins</p><div>{["mae","rmse","qlike"].map(key=><span key={key}><small>{key.toUpperCase()}</small><strong>{selected[key].toFixed(6)}</strong></span>)}</div><dl className="model-description">{[["Purpose", description.purpose], ["Methodology", description.method], ["Inputs", description.inputs], ["Strengths & limitations", description.caveat]].map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl></section>}
    <section className="research-section comparison-panel" aria-labelledby="comparison-title"><span className="eyebrow">Across all 11 models · independent of filters</span><h2 id="comparison-title">Why did GJR-GARCH Student-t lead?</h2><p>It recorded the lowest pooled MAE, RMSE and QLIKE. Its asymmetric variance response and heavy-tailed innovations are plausible strengths; this comparison does not prove which mechanism caused the advantage.</p><label className="comparison-select">Compare the overall leader with<select value={comparisonName} onChange={event => setComparisonName(event.target.value)}>{modelResults.slice(1).map(row => <option key={row.model}>{row.model}</option>)}</select></label><div className="comparison-scores">{["mae", "rmse", "qlike"].map(key => <article key={key}><h3>{key.toUpperCase()}</h3><p>GJR-GARCH Student-t<strong>{best[key].toFixed(6)}</strong></p><p>{comparison.model}<strong>{comparison[key].toFixed(6)}</strong></p><small>Score difference: {(comparison[key] - best[key]).toFixed(6)} · lower is better</small></article>)}</div><p className="historical-note">Differences are descriptive pooled scores, not significance tests, accuracy percentages or prospective performance claims.</p></section>
  </section>;
}
