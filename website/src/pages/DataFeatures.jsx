import { motion } from "framer-motion";
import { PageIntro } from "../components/ui/PageIntro";
import { regimeFeatures } from "../data/research";
import { RegimeExplorer } from "../components/ui/RegimeExplorer";
import { ForecastWalkthrough } from "../components/ui/ForecastWalkthrough";

export function DataFeatures() {
  return <section className="section page"><PageIntro eyebrow="Data & features" title="From thirty industries to one risk signal.">The pipeline preserves source chronology, builds a daily equal-industry portfolio and produces features using information available through each forecast origin.</PageIntro>
    <div className="data-contract"><div><small>INPUT</small><strong>30 industry returns</strong><span>Value-weighted source table · decimal units</span></div><i>→</i><div><small>PORTFOLIO</small><strong>1/30 per industry</strong><span>Daily rebalancing</span></div><i>→</i><div><small>TARGET</small><strong>Next 5 observations</strong><span>Root sum of squared returns</span></div></div>
    <div className="feature-grid">{regimeFeatures.map((feature, i) => <motion.article key={feature.title} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.1}}><span>0{i+1}</span><h3>{feature.title}</h3><code>{feature.formula}</code><p>{feature.body}</p></motion.article>)}</div>
    <section className="research-section explain-grid"><article><span className="eyebrow">Historical input</span><h3>Industry weights and portfolio weights differ</h3><p>The historical source is the value-weighted 30-industry returns table. Regivance then gives each industry a 1/30 portfolio weight, rebalanced daily; source percent returns are converted to decimals.</p></article><article><span className="eyebrow">21-observation lookback</span><h3>A window ending at t</h3><p>Recent portfolio RMS volatility and industry correlations summarize trailing observations. Dispersion describes the spread of industry returns on the same day. LSTM input sequences also span 21 observations through their origin.</p></article><article><span className="eyebrow">Three training-fitted clusters</span><h3>Context, not a risk guarantee</h3><p>K-means groups standardized volatility, correlation and dispersion features. Labels rank the training centers by portfolio volatility. Their meanings are relative to each fold, not universal thresholds.</p></article></section>
    <RegimeExplorer />
    <div className="callout"><strong>Timing rule</strong><p>Rolling features use only observations through date t. The five future returns used for the target are labels—not inputs.</p></div>
    <ForecastWalkthrough/>
  </section>;
}
