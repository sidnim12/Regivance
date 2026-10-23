import { useState } from "react";

const returns = [0.01, -0.02, 0.005, -0.01, 0.015];
const actual = Math.sqrt(returns.reduce((sum, value) => sum + value ** 2, 0));
const forecast = 0.025;
const ratio = actual ** 2 / forecast ** 2;

export function ForecastWalkthrough() {
  const [revealed, setRevealed] = useState(false);
  return <section className="walkthrough research-section" aria-labelledby="walkthrough-title"><span className="eyebrow">Illustrative numbers · educational example</span><h2 id="walkthrough-title">A forecast has a timestamp.</h2><p>No model runs here. This fixed example shows when inputs, a prediction and an outcome become available.</p><div className="explain-grid">
    <article><small>01 / AT ORIGIN t</small><h3>Observe the past</h3><p>The latest 21 observations end at t. Portfolio returns, risk features and a training-fitted regime label are available; returns after t are unknown.</p><strong className="example-value">Illustrative forecast: 0.025000</strong><p>This is a magnitude estimate for the next five observations, not a direction or a predicted cumulative return.</p></article>
    <article><small>02 / AFTER t + 5</small><h3>Reveal the outcome</h3><button className="button" aria-expanded={revealed} aria-controls="illustrative-outcome" onClick={() => setRevealed(!revealed)}>{revealed ? "Hide future observations" : "Reveal future observations"}</button><div id="illustrative-outcome" hidden={!revealed}><p>Five illustrative portfolio returns: +1%, −2%, +0.5%, −1%, +1.5%.</p><code>target = √Σ r² = {actual.toFixed(6)}</code><p>Squaring removes direction. This root sum of squares is neither an annualized volatility nor a standard deviation.</p></div></article>
    <article><small>03 / SCORE THE FORECAST</small><h3>Compare in the same units</h3>{revealed ? <div className="example-scores" aria-live="polite"><p>Absolute error <strong>{Math.abs(actual - forecast).toFixed(6)}</strong></p><p>Squared error <strong>{((actual - forecast) ** 2).toFixed(6)}</strong></p><p>QLIKE <strong>{(ratio - Math.log(ratio) - 1).toFixed(6)}</strong></p><p>Across origins, MAE averages absolute error; RMSE takes the square root of mean squared error. QLIKE averages v/v̂ − log(v/v̂) − 1, with squared volatility v.</p></div> : <p>Reveal the future observations to calculate the errors. In research, the outcome must exist before scoring.</p>}</article>
  </div></section>;
}
