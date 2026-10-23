import { Code2, ExternalLink, ShieldCheck } from "lucide-react";
import { PageIntro } from "../components/ui/PageIntro";

export function About() {
  return <section className="section page"><PageIntro eyebrow="About the project" title="Research engineering with an honest conclusion.">Regivance is a college, internship and portfolio project built to connect data validation, econometrics, machine learning and reproducible evaluation.</PageIntro>
    <div className="about-grid"><article><ShieldCheck/><h3>What is complete</h3><p>The research engine, 11-model development comparison, robustness analysis, tests, report and this presentation layer.</p></article><article><Code2/><h3>What comes next</h3><p>The frozen prospective protocol needs 252 future forecast origins plus five observations to form the last target.</p></article></div>
    <section className="research-section"><span className="eyebrow">Research contributions</span><h2>Engineering that makes the evidence inspectable.</h2><div className="contribution-grid">{[
      ["An end-to-end pipeline", "Historical data validation, portfolio construction, feature engineering and forecasting in one reproducible workflow."],
      ["A common evaluation contract", "11 model specifications compared on identical dates and targets, with chronological evaluation and leakage safeguards."],
      ["Regime-aware research", "Training-fitted market regime detection and comparisons that test whether regime context helps forecasting."],
      ["Statistical uncertainty", "Dependence-aware uncertainty analysis complements pooled scores; a ranking alone does not establish significance."],
      ["Reproducible artifacts", "Recorded configurations, tests, result tables and reports connect the interface to the research workflow."],
      ["Interactive findings", "Searchable model results, metric comparisons and explanations make the research accessible to evaluators."],
    ].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="about-grid"><article><span className="eyebrow">Limitations</span><h3>Evidence with a defined scope</h3><p>The inspected development period and equal-industry portfolio limit generalization. Overlapping targets create dependence. Stronger pooled scores do not guarantee future performance, profitability or significance.</p></article><article><span className="eyebrow">Future scope</span><h3>Complete the prospective evaluation</h3><p>The frozen prospective evaluation requires 252 future forecast origins plus five subsequent observations to complete the final target. It is pending. Broader portfolios and stability checks are further research directions, not completed findings.</p></article></section>
    <a className="button primary github-link" href="https://github.com/gayatripraharshitha/Regivance" target="_blank" rel="noreferrer">Open GitHub repository <ExternalLink size={16}/></a>
    <p className="fine-print">Research and educational use only. No forecast shown here is investment advice.</p>
  </section>;
}
