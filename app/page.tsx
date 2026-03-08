"use client";

import { useState } from "react";
import { PlaybookInputs } from "@/lib/types";

interface Playbook extends PlaybookInputs {
  enrichedContext?: any;
  decisionArchitecture?: any;
  procurementProcess?: any;
  profilePresentation?: any;
  positioning?: any;
  generatedAt?: string;
}

export default function Home() {
  const [formData, setFormData] = useState({
    targetName: "",
    targetUrl: "",
    targetDepartment: "",
    companyName: "",
    companyDescription: "",
    companyUrl: "",
    marketType: "B2B" as "B2B" | "B2G",
  });

  const [loading, setLoading] = useState(false);
  const [playbook, setPlaybook] = useState<Playbook | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/playbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate playbook");
      }

      const data = await response.json();
      setPlaybook(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (playbook && playbook.decisionArchitecture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setPlaybook(null)}
            className="mb-8 px-6 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
          >
            ← Back to Form
          </button>

          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {playbook.targetName} Penetration Playbook
            </h1>
            <p className="text-gray-600 mb-6">
              Generated on {playbook.generatedAt ? new Date(playbook.generatedAt).toLocaleString() : 'Just now'}
            </p>

            {/* Fit Analysis */}
            <div className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Strategic Fit Analysis
              </h2>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Alignment Score</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {playbook.enrichedContext?.fitAnalysis?.alignmentScore ||
                      "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Recommended Angle
                  </p>
                  <p className="font-semibold text-gray-900">
                    {playbook.enrichedContext?.fitAnalysis?.recommendedAngle ||
                      "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Industry</p>
                  <p className="font-semibold text-gray-900">
                    {playbook.enrichedContext?.targetIntelligence?.industry ||
                      "N/A"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Best Fit</h3>
                  <ul className="space-y-1">
                    {playbook.enrichedContext?.fitAnalysis?.bestFitAreas?.map(
                      (area: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700 flex">
                          <span className="text-green-600 mr-2">✓</span>
                          {area}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Gaps</h3>
                  <ul className="space-y-1">
                    {playbook.enrichedContext?.fitAnalysis?.gaps?.map(
                      (gap: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700 flex">
                          <span className="text-amber-600 mr-2">!</span>
                          {gap}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Decision Architecture */}
            {playbook.decisionArchitecture && (
              <div className="mb-12 p-6 bg-white border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Decision Architecture
                </h2>
                <p className="text-gray-700 mb-6">
                  {playbook.decisionArchitecture.narrative}
                </p>

                {playbook.decisionArchitecture.layers?.map(
                  (layer: any, idx: number) => (
                    <div key={idx} className="mb-8 p-4 border-l-4" style={{ borderColor: layer.color }}>
                      <div
                        className="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold mb-3"
                        style={{ backgroundColor: layer.color }}
                      >
                        {layer.badge}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {layer.name}
                      </h3>
                      <p className="text-gray-700 mb-4">{layer.description}</p>

                      {layer.stakeholders?.map((stakeholder: any, sidx: number) => (
                        <div
                          key={sidx}
                          className="flex gap-4 ml-4 mb-4 p-3 bg-gray-50 rounded"
                        >
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              {stakeholder.badge}
                            </span>
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold text-gray-900">
                              {stakeholder.title}
                              {stakeholder.name && stakeholder.name !== "[To be identified]"
                                ? ` - ${stakeholder.name}`
                                : ""}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {stakeholder.role}
                            </p>
                            <p className="text-sm text-gray-700 mt-2">
                              {stakeholder.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}

                {playbook.decisionArchitecture.sentinels?.length > 0 && (
                  <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                    <h3 className="text-lg font-bold text-red-900 mb-4">
                      🔒 External Sentinels (Blocking Power)
                    </h3>
                    {playbook.decisionArchitecture.sentinels.map(
                      (sentinel: any, idx: number) => (
                        <div key={idx} className="mb-4 p-3 bg-white rounded border border-red-200">
                          <p className="font-semibold text-gray-900">
                            {sentinel.icon} {sentinel.name}
                          </p>
                          <p className="text-xs text-gray-500 mb-2">
                            Type: {sentinel.type}
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            {sentinel.detail}
                          </p>
                          <p className="text-sm font-medium text-green-700 bg-green-50 p-2 rounded">
                            Mitigation: {sentinel.mitigation}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Procurement Process */}
            {playbook.procurementProcess && (
              <div className="mb-12 p-6 bg-white border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Procurement Process
                </h2>
                <p className="text-gray-700 mb-6">
                  {playbook.procurementProcess.budgetInsight}
                </p>

                {playbook.procurementProcess.entryRequirements && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Entry Requirements
                    </h3>
                    <div className="space-y-3">
                      {playbook.procurementProcess.entryRequirements.map(
                        (req: any, idx: number) => (
                          <div
                            key={idx}
                            className={`p-4 rounded border-l-4 ${
                              req.priority === "critical" || req.priority === "blocking"
                                ? "bg-red-50 border-red-500"
                                : "bg-yellow-50 border-yellow-500"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {req.icon} {req.req}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {req.priority.toUpperCase()} • {req.timeline}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mt-2">
                              {req.detail}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {playbook.procurementProcess.cycle && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Procurement Cycle
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {playbook.procurementProcess.cycle.map(
                        (stage: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex-1 min-w-48 p-4 rounded"
                            style={{ backgroundColor: stage.color + "20" }}
                          >
                            <p
                              className="font-bold text-sm"
                              style={{ color: stage.color }}
                            >
                              {stage.stage}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {stage.duration}
                            </p>
                            <ul className="text-xs text-gray-700 mt-2 space-y-1">
                              {stage.actions?.map((action: string, aidx: number) => (
                                <li key={aidx} className="flex">
                                  <span className="mr-2">•</span>
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Positioning Strategy */}
            {playbook.positioning && (
              <div className="mb-12 p-6 bg-white border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Positioning Strategy
                </h2>

                {playbook.positioning.valueProp && (
                  <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      Value Proposition
                    </h3>
                    <p className="text-sm italic text-gray-800 mb-4">
                      "{playbook.positioning.valueProp.primary}"
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-2 font-semibold">
                          SUPPORTING VALUES
                        </p>
                        <ul className="space-y-1">
                          {playbook.positioning.valueProp.supporting?.map(
                            (point: string, i: number) => (
                              <li key={i} className="text-sm text-gray-700">
                                ✓ {point}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-2 font-semibold">
                          KEY METRICS
                        </p>
                        <ul className="space-y-1">
                          {playbook.positioning.valueProp.metrics?.map(
                            (metric: string, i: number) => (
                              <li key={i} className="text-sm text-gray-700">
                                📊 {metric}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {playbook.positioning.competitive && (
                  <div className="mb-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      Competitive Positioning
                    </h3>
                    <p className="text-sm text-gray-700 mb-4 italic">
                      {playbook.positioning.competitive.switchingNarrative}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-2 font-semibold">
                          INCUMBENT WEAKNESSES
                        </p>
                        <ul className="space-y-1">
                          {playbook.positioning.competitive.weaknesses?.map(
                            (weakness: string, i: number) => (
                              <li key={i} className="text-sm text-gray-700">
                                ⚠️ {weakness}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-2 font-semibold">
                          OUR MOAT
                        </p>
                        <ul className="space-y-1">
                          {playbook.positioning.competitive.moat?.map(
                            (moat: string, i: number) => (
                              <li key={i} className="text-sm text-gray-700">
                                🛡️ {moat}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {playbook.positioning.objections?.length > 0 && (
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Objection Handling
                    </h3>
                    <div className="space-y-4">
                      {playbook.positioning.objections.map(
                        (obj: any, idx: number) => (
                          <div key={idx} className="p-3 bg-white rounded border border-amber-100">
                            <p className="font-semibold text-gray-900 mb-2">
                              Objection: {obj.objection}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                              {obj.response}
                            </p>
                            <p className="text-xs text-gray-600 italic">
                              Evidence: {obj.evidence}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Commercial Playbook Creator
          </h1>
          <p className="text-gray-600 mb-8">
            Generate deep-dive sales playbooks for B2B and B2G targets with AI-powered
            intelligence
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Target Organization Section */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Target Organization
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    name="targetName"
                    value={formData.targetName}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Hydro-Québec, Microsoft, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Website *
                  </label>
                  <input
                    type="url"
                    name="targetUrl"
                    value={formData.targetUrl}
                    onChange={handleChange}
                    required
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Department (optional)
                  </label>
                  <input
                    type="text"
                    name="targetDepartment"
                    value={formData.targetDepartment}
                    onChange={handleChange}
                    placeholder="e.g., Infrastructure, Operations, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Seller Organization Section */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Your Organization
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="Your company name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Description *
                  </label>
                  <textarea
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Brief description of your core solutions and capabilities"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Website *
                  </label>
                  <input
                    type="url"
                    name="companyUrl"
                    value={formData.companyUrl}
                    onChange={handleChange}
                    required
                    placeholder="https://yourcompany.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Market Type */}
            <div className="pb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Market Type *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="marketType"
                    value="B2B"
                    checked={formData.marketType === "B2B"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-2 text-gray-700">B2B (Private Sector)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="marketType"
                    value="B2G"
                    checked={formData.marketType === "B2G"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-2 text-gray-700">B2G (Government)</span>
                </label>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⏳</span>
                  Generating Playbook (this may take 2-3 minutes)...
                </span>
              ) : (
                "Generate Playbook"
              )}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Playbooks are generated with confidentiality. No data is stored on our
            servers.
          </p>
        </div>
      </div>
    </div>
  );
}
