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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 py-16 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => setPlaybook(null)}
              className="mb-8 px-6 py-2 bg-slate-800/50 hover:bg-slate-700 text-indigo-300 border border-slate-700 rounded-lg transition"
            >
              ← Back to Form
            </button>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8 sm:p-12">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-2">
                {playbook.targetName} Penetration Playbook
              </h1>
              <p className="text-slate-400 mb-8">
                Generated {playbook.generatedAt ? new Date(playbook.generatedAt).toLocaleDateString() : "now"}
              </p>

              <div className="mb-12 p-6 bg-gradient-to-r from-indigo-900/30 to-blue-900/30 border border-indigo-500/30 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Strategic Fit Analysis</h2>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <p className="text-xs text-slate-400 mb-2 uppercase">Alignment</p>
                    <p className="text-2xl font-bold text-indigo-400">
                      {playbook.enrichedContext?.fitAnalysis?.alignmentScore?.toUpperCase() || "N/A"}
                    </p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <p className="text-xs text-slate-400 mb-2 uppercase">Recommended Angle</p>
                    <p className="text-sm font-semibold text-slate-200">
                      {playbook.enrichedContext?.fitAnalysis?.recommendedAngle || "N/A"}
                    </p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <p className="text-xs text-slate-400 mb-2 uppercase">Industry</p>
                    <p className="text-sm font-semibold text-slate-200">
                      {playbook.enrichedContext?.targetIntelligence?.industry || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {playbook.decisionArchitecture && (
                <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg">
                  <h2 className="text-2xl font-bold text-white mb-4">Decision Architecture</h2>
                  <p className="text-slate-300 mb-6 text-sm leading-relaxed">{playbook.decisionArchitecture.narrative}</p>
                  <p className="text-slate-400 text-sm">View full playbook with stakeholder details, procurement process, positioning strategy, and objection handling templates.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center py-16 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto w-full">
          <div className="mb-12 text-center">
            <div className="inline-block mb-4">
              <div className="px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 rounded-full">
                <p className="text-sm font-semibold text-indigo-300">AI-Powered Strategic Intelligence</p>
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-white via-indigo-100 to-blue-100 bg-clip-text text-transparent mb-4">
              Commercial Playbook Creator
            </h1>
            <p className="text-lg text-slate-300 max-w-xl mx-auto">
              Generate deep-dive B2B/B2G sales penetration playbooks with AI-powered intelligence. Named stakeholders, regulatory analysis, competitive positioning.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
                  Target Organization
                </h3>
                <div className="space-y-4 ml-11">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Organization Name *</label>
                    <input
                      type="text"
                      name="targetName"
                      value={formData.targetName}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Hydro-Québec, Microsoft"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Organization Website *</label>
                    <input
                      type="url"
                      name="targetUrl"
                      value={formData.targetUrl}
                      onChange={handleChange}
                      required
                      placeholder="https://example.com"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Target Department (optional)</label>
                    <input
                      type="text"
                      name="targetDepartment"
                      value={formData.targetDepartment}
                      onChange={handleChange}
                      placeholder="e.g., Infrastructure, Operations"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-400 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
                  Your Organization
                </h3>
                <div className="space-y-4 ml-11">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Company Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      placeholder="Your company name"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Company Description *</label>
                    <textarea
                      name="companyDescription"
                      value={formData.companyDescription}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Brief description of your core solutions"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Company Website *</label>
                    <input
                      type="url"
                      name="companyUrl"
                      value={formData.companyUrl}
                      onChange={handleChange}
                      required
                      placeholder="https://yourcompany.com"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-8">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
                  Market Type *
                </h3>
                <div className="ml-11 flex gap-4">
                  <label className="flex-1 flex items-center p-4 rounded-lg border border-slate-600 cursor-pointer hover:border-indigo-500 hover:bg-slate-700/30 transition bg-slate-700/20">
                    <input
                      type="radio"
                      name="marketType"
                      value="B2B"
                      checked={formData.marketType === "B2B"}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-white">B2B</p>
                      <p className="text-xs text-slate-400">Private Sector</p>
                    </div>
                  </label>
                  <label className="flex-1 flex items-center p-4 rounded-lg border border-slate-600 cursor-pointer hover:border-indigo-500 hover:bg-slate-700/30 transition bg-slate-700/20">
                    <input
                      type="radio"
                      name="marketType"
                      value="B2G"
                      checked={formData.marketType === "B2G"}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-white">B2G</p>
                      <p className="text-xs text-slate-400">Government</p>
                    </div>
                  </label>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <div className="ml-11 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold rounded-lg transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Generating (2-3 minutes)...
                    </>
                  ) : (
                    <>✨ Generate Playbook</>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-700/50 text-center">
              <p className="text-xs text-slate-400">🔒 Secure. No data stored on our servers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
