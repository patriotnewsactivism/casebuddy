import React, { useEffect, useState } from 'react';
import { useParams } from 'wouter';

export function DocumentAnalysis() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const response = await fetch(`/api/documents/${id}/analysis`);
        if (!response.ok) {
          throw new Error('Failed to fetch analysis');
        }
        const data = await response.json();
        setAnalysis(data.analysis);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAnalysis();
  }, [id]);
  
  if (loading) return <div className="p-4">Loading analysis...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!analysis) return <div className="p-4">No analysis available</div>;
  
  return (
    <div className="document-analysis p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Document Analysis</h2>
      
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Summary</h3>
        <p className="bg-gray-100 p-4 rounded">{analysis.summary}</p>
      </section>
      
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Key Entities</h3>
        <div className="entities grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-medium mb-2">People</h4>
            <ul className="list-disc pl-5">
              {analysis.entities.people.map((person: string, i: number) => (
                <li key={i}>{person}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-medium mb-2">Organizations</h4>
            <ul className="list-disc pl-5">
              {analysis.entities.organizations.map((org: string, i: number) => (
                <li key={i}>{org}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-medium mb-2">Locations</h4>
            <ul className="list-disc pl-5">
              {analysis.entities.locations.map((loc: string, i: number) => (
                <li key={i}>{loc}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Important Dates</h3>
        <ul className="list-disc pl-5 bg-gray-100 p-4 rounded">
          {analysis.dates.map((item: any, i: number) => (
            <li key={i} className="mb-1">
              <strong>{item.date}</strong>: {item.context}
            </li>
          ))}
        </ul>
      </section>
      
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Legal Issues</h3>
        <ul className="list-disc pl-5 bg-gray-100 p-4 rounded">
          {analysis.legalIssues.map((issue: string, i: number) => (
            <li key={i} className="mb-1">{issue}</li>
          ))}
        </ul>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-2">Potential Risks</h3>
        <ul className="list-disc pl-5 bg-gray-100 p-4 rounded">
          {analysis.risks.map((risk: string, i: number) => (
            <li key={i} className="mb-1">{risk}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}