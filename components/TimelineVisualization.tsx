import React, { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { Chart } from 'recharts';

export function TimelineVisualization() {
  const { id } = useParams();
  const [events, setEvents] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch timeline events
        const eventsResponse = await fetch(`/api/cases/${id}/timeline`);
        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch timeline events');
        }
        const eventsData = await eventsResponse.json();
        setEvents(eventsData.events);
        
        // Fetch timeline analysis
        const analysisResponse = await fetch(`/api/cases/${id}/timeline/analysis`);
        if (analysisResponse.ok) {
          const analysisData = await analysisResponse.json();
          setAnalysis(analysisData.analysis);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [id]);
  
  if (loading) return <div className="p-4">Loading timeline...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (events.length === 0) return <div className="p-4">No timeline events available</div>;
  
  // Format events for visualization
  const timelineData = events.map(event => ({
    date: new Date(event.date),
    title: event.title,
    description: event.description || '',
    id: event.id
  })).sort((a, b) => a.date.getTime() - b.date.getTime());
  
  return (
    <div className="timeline-visualization p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Timeline Visualization</h2>
      
      {/* Timeline chart component */}
      <div className="timeline-chart bg-gray-100 p-4 rounded mb-6">
        <p>Interactive timeline visualization would be displayed here using Recharts.</p>
        <p className="text-sm text-gray-600 mt-2">
          In a complete implementation, this would show a visual timeline with events plotted chronologically.
        </p>
      </div>
      
      {analysis && (
        <div className="timeline-analysis">
          <h3 className="text-xl font-semibold mb-2">Timeline Analysis</h3>
          
          <section className="mb-4">
            <h4 className="font-medium mb-2">Key Insights</h4>
            <ul className="list-disc pl-5 bg-gray-100 p-4 rounded">
              {analysis.insights.map((insight: string, i: number) => (
                <li key={i} className="mb-1">{insight}</li>
              ))}
            </ul>
          </section>
          
          <section className="mb-4">
            <h4 className="font-medium mb-2">Potential Gaps</h4>
            <ul className="list-disc pl-5 bg-gray-100 p-4 rounded">
              {analysis.gaps.map((gap: any, i: number) => (
                <li key={i} className="mb-1">
                  <strong>{gap.startDate} to {gap.endDate}</strong>: {gap.description}
                </li>
              ))}
            </ul>
          </section>
          
          <section className="mb-4">
            <h4 className="font-medium mb-2">Critical Periods</h4>
            <ul className="list-disc pl-5 bg-gray-100 p-4 rounded">
              {analysis.criticalPeriods.map((period: any, i: number) => (
                <li key={i} className="mb-1">
                  <strong>{period.startDate} to {period.endDate}</strong>: {period.description}
                </li>
              ))}
            </ul>
          </section>
          
          <section>
            <h4 className="font-medium mb-2">Suggestions</h4>
            <ul className="list-disc pl-5 bg-gray-100 p-4 rounded">
              {analysis.suggestions.map((suggestion: string, i: number) => (
                <li key={i} className="mb-1">{suggestion}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}