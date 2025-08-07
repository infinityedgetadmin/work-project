'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import {
  ChartBarIcon,
  BoltIcon,
  BeakerIcon,
  CpuChipIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  SparklesIcon,
  DocumentMagnifyingGlassIcon,
  LightBulbIcon,
  ClipboardDocumentCheckIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface MetricCard {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  status: 'good' | 'warning' | 'critical';
  description: string;
}

interface AIInsight {
  id: string;
  type: 'recommendation' | 'warning' | 'success' | 'info';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export default function NewRelicAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('last-24h');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);

  // Mock New Relic metrics data
  const metrics: MetricCard[] = [
    {
      title: 'Error Rate',
      value: '2.3',
      unit: '%',
      trend: 'up',
      status: 'warning',
      description: 'Application error rate across all services'
    },
    {
      title: 'Apdex Score',
      value: '0.92',
      unit: '',
      trend: 'neutral',
      status: 'good',
      description: 'User satisfaction score (target: >0.9)'
    },
    {
      title: 'Response Time',
      value: '245',
      unit: 'ms',
      trend: 'down',
      status: 'good',
      description: 'Average response time for all transactions'
    },
    {
      title: 'Throughput',
      value: '125.5',
      unit: 'rpm',
      trend: 'up',
      status: 'good',
      description: 'Requests per minute'
    },
    {
      title: 'Test Pass Rate',
      value: '87.02',
      unit: '%',
      trend: 'down',
      status: 'warning',
      description: 'Percentage of passing tests in CI/CD'
    },
    {
      title: 'Failed Deployments',
      value: '3',
      unit: 'today',
      trend: 'up',
      status: 'critical',
      description: 'Number of failed deployments'
    }
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call and AI analysis
    setTimeout(() => {
      const insights: AIInsight[] = [
        {
          id: '1',
          type: 'warning',
          title: 'Increased Error Rate Detected',
          description: 'Error rate has increased by 15% in the last 4 hours. The majority of errors (68%) are coming from the /api/v2/users/avatar endpoint with timeout exceptions.',
          confidence: 0.92,
          actionable: true,
          priority: 'high'
        },
        {
          id: '2',
          type: 'recommendation',
          title: 'Performance Optimization Opportunity',
          description: 'Database queries in the profile service are taking 40% longer than baseline. Consider implementing query caching or optimizing the getUserProfile stored procedure.',
          confidence: 0.88,
          actionable: true,
          priority: 'medium'
        },
        {
          id: '3',
          type: 'warning',
          title: 'Test Coverage Declining',
          description: 'Test pass rate has dropped below 90% threshold. Profile Upload Tests suite has 5 consistent failures related to file size validation.',
          confidence: 0.95,
          actionable: true,
          priority: 'high'
        },
        {
          id: '4',
          type: 'success',
          title: 'Apdex Score Improvement',
          description: 'User satisfaction has improved by 8% after recent performance optimizations. Current score of 0.92 exceeds target.',
          confidence: 0.90,
          actionable: false,
          priority: 'low'
        },
        {
          id: '5',
          type: 'info',
          title: 'Traffic Pattern Analysis',
          description: 'Peak traffic occurs between 2-4 PM EST with 3x normal load. Consider implementing auto-scaling rules for this time period.',
          confidence: 0.85,
          actionable: true,
          priority: 'medium'
        }
      ];
      
      setAiInsights(insights);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning': return ExclamationTriangleIcon;
      case 'recommendation': return LightBulbIcon;
      case 'success': return CheckCircleIcon;
      default: return DocumentMagnifyingGlassIcon;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'recommendation': return 'border-blue-200 bg-blue-50';
      case 'success': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient-orange">
              New Relic AI Analyzer
            </h1>
            <p className="text-gray-600 mt-2">
              Analyze your New Relic metrics with AI-powered insights and recommendations
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 glass-input rounded-xl transition-all"
            >
              <option value="last-1h">Last 1 Hour</option>
              <option value="last-24h">Last 24 Hours</option>
              <option value="last-7d">Last 7 Days</option>
              <option value="last-30d">Last 30 Days</option>
            </select>
            
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={cn(
                "px-6 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2",
                isAnalyzing
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "glass-button-primary text-white hover:shadow-lg hover:scale-105"
              )}
            >
              {isAnalyzing ? (
                <>
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <SparklesIcon className="h-5 w-5" />
                  Analyze with AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              onClick={() => setSelectedMetric(metric.title)}
              className={cn(
                "glass-card hover-lift cursor-pointer transition-all duration-300",
                selectedMetric === metric.title && "ring-2 ring-[#FF451A]"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                </div>
                <span className={cn(
                  "px-2 py-1 text-xs font-medium rounded-full",
                  getStatusColor(metric.status)
                )}>
                  {metric.status}
                </span>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                  {metric.unit && (
                    <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
                  )}
                </div>
                
                {metric.trend && (
                  <div className={cn(
                    "flex items-center gap-1 text-sm",
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 
                    'text-gray-500'
                  )}>
                    {metric.trend === 'up' ? (
                      <ArrowTrendingUpIcon className="h-4 w-4" />
                    ) : metric.trend === 'down' ? (
                      <ArrowTrendingDownIcon className="h-4 w-4" />
                    ) : (
                      <span className="h-0.5 w-4 bg-gray-400"></span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* AI Insights Section */}
        {aiInsights.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-6 w-6 text-[#FF451A]" />
              <h2 className="text-xl font-semibold text-gray-900">AI Insights & Recommendations</h2>
            </div>
            
            <div className="grid gap-4">
              {aiInsights.map((insight) => {
                const Icon = getInsightIcon(insight.type);
                return (
                  <div
                    key={insight.id}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md",
                      getInsightColor(insight.type)
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={cn(
                        "h-5 w-5 mt-0.5 flex-shrink-0",
                        insight.type === 'warning' ? 'text-yellow-600' :
                        insight.type === 'recommendation' ? 'text-[#FF451A]' :
                        insight.type === 'success' ? 'text-green-600' :
                        'text-gray-600'
                      )} />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "px-2 py-0.5 text-xs font-medium rounded-full",
                              insight.priority === 'critical' ? 'bg-red-100 text-red-700' :
                              insight.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                              insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            )}>
                              {insight.priority}
                            </span>
                            {insight.actionable && (
                              <ClipboardDocumentCheckIcon className="h-4 w-4 text-blue-600" title="Actionable" />
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Confidence: {Math.round(insight.confidence * 100)}%
                          </span>
                          
                          {insight.actionable && (
                            <button className="text-xs font-medium text-[#FF451A] hover:text-[#E63D17] transition-colors">
                              Take Action →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {aiInsights.length === 0 && !isAnalyzing && (
          <div className="text-center py-12 glass-card">
            <BoltIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Click &quot;Analyze with AI&quot; to fetch your New Relic metrics and receive AI-powered insights and recommendations.
            </p>
            <button
              onClick={handleAnalyze}
              className="px-6 py-2 glass-button-primary text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Start Analysis
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="glass-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button className="p-3 text-left border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group">
              <ChartBarIcon className="h-5 w-5 text-[#FF451A] mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">Generate Report</p>
              <p className="text-xs text-gray-500">Create detailed analysis report</p>
            </button>
            
            <button className="p-3 text-left border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group">
              <BeakerIcon className="h-5 w-5 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">Run Tests</p>
              <p className="text-xs text-gray-500">Execute test suite validation</p>
            </button>
            
            <button className="p-3 text-left border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group">
              <CpuChipIcon className="h-5 w-5 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">Configure Alerts</p>
              <p className="text-xs text-gray-500">Set up intelligent alerting</p>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}