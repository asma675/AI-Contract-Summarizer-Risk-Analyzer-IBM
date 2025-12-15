// IBM Client Engineering-style prototype
// Focus: solution pattern, business logic, demo clarity

function randomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}
function randomLatency() {
  return Math.floor(Math.random() * 400) + 180;
}
function detectRiskClauses(text) {
  const lower = text.toLowerCase();
  const risks = [];
  if (lower.includes("indemnify") || lower.includes("indemnification")) {
    risks.push("Indemnification terms detected — may shift significant liability to your organization.");
  }
  if (lower.includes("termination") || lower.includes("term and termination")) {
    risks.push("Termination clause detected — review for unilateral termination rights or short notice periods.");
  }
  if (lower.includes("auto-renewal") || lower.includes("automatic renewal")) {
    risks.push("Automatic renewal language detected — ensure there are clear notification and opt-out mechanisms.");
  }
  if (lower.includes("limitation of liability")) {
    risks.push("Limitation of liability clause detected — confirm caps are aligned with your risk tolerance.");
  }
  if (lower.includes("data") && lower.includes("privacy")) {
    risks.push("Data privacy obligations present — verify they align with your regulatory environment.");
  }
  if (!risks.length && text.trim().length) {
    risks.push("No obvious high-risk patterns detected. A deeper legal review is still recommended.");
  }
  return risks;
}
function summarizeContract(text) {
  if (!text.trim()) {
    return "No contract text provided yet. Paste or type a section of a contract to see a simulated summary.";
  }
  const sentences = text.split(/[.!?]/).map(s => s.trim()).filter(Boolean);
  const first = sentences[0] || "This agreement defines a relationship between two or more parties.";
  const second = sentences[1] || "Key focus areas typically include scope, pricing, data handling, liability, and termination.";
  return (
    "High-level summary (simulated):\n" +
    "- " + first + ".\n" +
    "- " + second + ".\n" +
    "- The agreement appears to establish responsibilities, commercial terms, and risk allocation between the parties."
  );
}
function buildSimulatedOutput(text) {
  const summary = summarizeContract(text);
  const risks = detectRiskClauses(text);
  let bodyHtml = "";
  bodyHtml += "<p><strong>Contract Summary</strong></p>";
  bodyHtml += "<p>" + summary.replace(/\n/g, "<br>") + "</p>";
  bodyHtml += "<p><strong>Risk Highlights</strong></p><ul>";
  for (const r of risks) {
    bodyHtml += "<li>" + r + "</li>";
  }
  bodyHtml += "</ul>";
  bodyHtml += "<p><strong>Suggested Next Steps (simulated)</strong></p>";
  bodyHtml += "<p>• Route this contract to Legal and Procurement for final review.<br>" +
              "• Capture these risk flags as structured fields so future amendments can be compared side-by-side.<br>" +
              "• Use this pattern as a reusable watsonx prompt template for similar agreements.</p>";
  return bodyHtml;
}
window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("mainInput");
  const sampleBtn = document.getElementById("sampleBtn");
  const clearBtn = document.getElementById("clearBtn");
  const runBtn = document.getElementById("runBtn");
  const outputPanel = document.getElementById("outputPanel");
  const outputBody = document.getElementById("outputBody");
  const metricConfidence = document.getElementById("metricConfidence");
  const metricLatency = document.getElementById("metricLatency");
  const metricPattern = document.getElementById("metricPattern");
  sampleBtn.addEventListener("click", () => {
    input.value = `This Master Services Agreement (MSA) governs the provision of cloud-based analytics services between ClientCorp and VendorX.
The initial term is 24 months with automatic renewal for 12-month periods unless either party provides 60 days' written notice.
VendorX will process personal data in accordance with applicable privacy laws and will implement commercially reasonable security controls.
ClientCorp agrees to indemnify VendorX against third-party claims arising from ClientCorp's misuse of the platform.
The limitation of liability is capped at 12 months of fees, excluding cases of gross negligence or wilful misconduct.`;
  });
  clearBtn.addEventListener("click", () => {
    input.value = "";
    outputBody.innerHTML = "<p>Enter some text and click <strong>Run AI Analysis</strong> to see a simulated response that mimics how a watsonx-style pilot could behave in a client engagement.</p>";
    outputPanel.querySelector(".output-header").innerHTML = '<span>Awaiting input...</span><span class="chip">No run yet</span>';
    metricConfidence.textContent = "-";
    metricLatency.textContent = "-";
    metricPattern.textContent = "-";
  });
  runBtn.addEventListener("click", () => {
    const text = input.value;
    const latency = randomLatency();
    const confidence = randomFloat(0.82, 0.97);
    outputPanel.querySelector(".output-header").innerHTML = '<span>Analysis complete (simulated)</span><span class="chip">Risk-focused contract pattern</span>';
    outputBody.innerHTML = buildSimulatedOutput(text);
    metricConfidence.textContent = confidence;
    metricLatency.textContent = latency.toString();
    metricPattern.textContent = "Contract • Risk & Summary";
  });
});
