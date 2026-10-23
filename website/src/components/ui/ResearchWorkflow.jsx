import { ArrowRight, Database, Layers3, Activity, ScanLine, BrainCircuit, ChartNoAxesCombined } from "lucide-react";

const steps = [
  [Database, "Historical industry returns", "30 industries"],
  [Layers3, "Portfolio construction", "Equal industry weights"],
  [Activity, "Risk features", "History through origin t"],
  [ScanLine, "Market regime detection", "Training-only K-means"],
  [BrainCircuit, "Forecasting models", "11 specifications"],
  [ChartNoAxesCombined, "Evaluation results", "Common forecast dates"],
];

export function ResearchWorkflow() {
  return <section className="research-workflow" aria-label="Research workflow"><span className="eyebrow">From observations to evidence</span><h2>One pipeline. A fair comparison.</h2><ol className="workflow-grid">{steps.map(([Icon, title, caption], i) => <li key={title}><Icon size={23} aria-hidden="true"/><small>0{i + 1}</small><h3>{title}</h3><p>{caption}</p>{i < steps.length - 1 && <ArrowRight className="workflow-arrow" size={16} aria-hidden="true"/>}</li>)}</ol></section>;
}
