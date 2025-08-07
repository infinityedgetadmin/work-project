'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { getNewRelicMetrics, getTestExecutionHistory, getBuildHistory } from '@/services/mock-data';
import type { NewRelicMetrics, TestExecutionHistory, BuildData } from '@/types/api';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CpuChipIcon,
  BugAntIcon,
  ArrowPathIcon,
  FunnelIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function NewRelicDashboard() {
  const [metrics, setMetrics] = useState<NewRelicMetrics | null>(null);
  const [history, setHistory] = useState<TestExecutionHistory | null>(null);
  const [builds, setBuilds] = useState<BuildData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      refreshData();
    }, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [metricsData, historyData, buildsData] = await Promise.all([
        getNewRelicMetrics(),
        getTestExecutionHistory(),
        getBuildHistory()
      ]);
      setMetrics(metricsData);
      setHistory(historyData);
      setBuilds(buildsData);
    } catch (error) {
      console.error('Failed to load New Relic data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    try {
      const metricsData = await getNewRelicMetrics();
      setMetrics(metricsData);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading || !metrics || !history) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  const testExecutionChart = {
    labels: history.trends[timeRange].map(t => t.date),
    datasets: [
      {
        label: 'Passed',
        data: history.trends[timeRange].map(t => t.passed),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
      },
      {
        label: 'Failed',
        data: history.trends[timeRange].map(t => t.failed),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
      },
      {
        label: 'Skipped',
        data: history.trends[timeRange].map(t => t.skipped),
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        fill: true,
      }
    ]
  };

  const performanceChart = {
    labels: ['Avg', 'Median', 'P90', 'P95', 'P99'],
    datasets: [{
      label: 'Response Time (ms)',
      data: [
        metrics.performance.responseTime.avg,
        metrics.performance.responseTime.median,
        metrics.performance.responseTime.p90,
        metrics.performance.responseTime.p95,
        metrics.performance.responseTime.p99
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  const testSuiteChart = {
    labels: metrics.testExecution.testSuites.slice(0, 5).map(s => s.name.split(' ').slice(0, 2).join(' ')),
    datasets: [{
      label: 'Pass Rate',
      data: metrics.testExecution.testSuites.slice(0, 5).map(s => (s.passed / s.totalTests) * 100),
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderWidth: 0
    }]
  };

  const qualityMetricsCards = [
    {
      title: 'Test Success Rate',
      value: `${metrics.testExecution.successRate}%`,
      icon: CheckCircleIcon,
      trend: metrics.testExecution.successRate > 85 ? 'up' : 'down',
      color: metrics.testExecution.successRate > 85 ? 'text-green-600' : 'text-red-600',
      bgColor: metrics.testExecution.successRate > 85 ? 'bg-green-100' : 'bg-red-100'
    },
    {
      title: 'Code Coverage',
      value: `${metrics.testExecution.coveragePercentage}%`,
      icon: ShieldCheckIcon,
      trend: metrics.testExecution.coveragePercentage > 75 ? 'up' : 'down',
      color: metrics.testExecution.coveragePercentage > 75 ? 'text-green-600' : 'text-yellow-600',
      bgColor: metrics.testExecution.coveragePercentage > 75 ? 'bg-green-100' : 'bg-yellow-100'
    },
    {
      title: 'Automation Coverage',
      value: `${metrics.testExecution.automationCoverage}%`,
      icon: CpuChipIcon,
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'MTTR',
      value: `${metrics.quality.mttr}h`,
      icon: ClockIcon,
      trend: metrics.quality.mttr < 5 ? 'up' : 'down',
      color: metrics.quality.mttr < 5 ? 'text-green-600' : 'text-orange-600',
      bgColor: metrics.quality.mttr < 5 ? 'bg-green-100' : 'bg-orange-100'
    },
    {
      title: 'Error Rate',
      value: `${metrics.performance.errorRate}%`,
      icon: BugAntIcon,
      trend: metrics.performance.errorRate < 3 ? 'up' : 'down',
      color: metrics.performance.errorRate < 3 ? 'text-green-600' : 'text-red-600',
      bgColor: metrics.performance.errorRate < 3 ? 'bg-green-100' : 'bg-red-100'
    },
    {
      title: 'Throughput',
      value: `${metrics.performance.throughput} req/s`,
      icon: FunnelIcon,
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF451A] to-orange-600 bg-clip-text text-transparent">New Relic QA Dashboard</h1>
            <p className="text-gray-600 mt-1">Real-time test execution and performance metrics from CI/CD pipelines</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={refreshData}
              disabled={refreshing}
              className={`px-4 py-2 glass-button rounded-lg flex items-center hover:text-[#FF451A] ${
                refreshing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ArrowPathIcon className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as 'daily' | 'weekly' | 'monthly')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {qualityMetricsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="glass-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  {card.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-xs text-gray-600 mt-1">{card.title}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Test Execution Trends */}
          <div className="lg:col-span-2 glass-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Execution Trends</h2>
            <Line
              data={testExecutionChart}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
              height={300}
            />
          </div>

          {/* Test Suite Performance */}
          <div className="glass-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Suite Pass Rates</h2>
            <Bar
              data={testSuiteChart}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                  },
                },
              }}
              height={300}
            />
          </div>
        </div>

        {/* Pipeline & Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Builds */}
          <div className="glass rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Pipeline Runs</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {builds.map((build) => (
                <div key={build.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{build.displayName}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Branch: {build.branch} • {new Date(build.timestamp).toLocaleString()}
                      </p>
                      {build.testResults && (
                        <div className="flex items-center space-x-4 mt-2 text-xs">
                          <span className="text-green-600">{build.testResults.passed} passed</span>
                          <span className="text-red-600">{build.testResults.failed} failed</span>
                          <span className="text-gray-500">{build.testResults.skipped} skipped</span>
                        </div>
                      )}
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      build.result === 'SUCCESS' ? 'bg-green-100 text-green-700' :
                      build.result === 'FAILURE' ? 'bg-red-100 text-red-700' :
                      build.result === 'UNSTABLE' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {build.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="glass-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Response Time Distribution</h2>
            <Bar
              data={performanceChart}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
              height={250}
            />
          </div>
        </div>

        {/* Failed Tests Section */}
        <div className="glass rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Test Failures</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {metrics.testExecution.testSuites
              .flatMap(suite => suite.failures)
              .slice(0, 5)
              .map((failure, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${
                      failure.severity === 'critical' ? 'text-red-600' :
                      failure.severity === 'high' ? 'text-orange-600' :
                      failure.severity === 'medium' ? 'text-yellow-600' :
                      'text-gray-600'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{failure.testName}</p>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          failure.severity === 'critical' ? 'bg-red-100 text-red-700' :
                          failure.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                          failure.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {failure.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{failure.errorMessage}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {failure.suiteName} • {new Date(failure.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Quality Metrics Summary */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Release Readiness Score</h3>
              <p className="text-sm text-gray-600 mt-1">
                Based on test coverage, defect density, and quality metrics
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">{metrics.quality.releaseReadiness}%</p>
              <p className="text-sm text-gray-600 mt-1">Ready for Production</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Defect Density</p>
              <p className="text-xl font-semibold text-gray-900">{metrics.quality.defectDensity}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Escaped Defects</p>
              <p className="text-xl font-semibold text-gray-900">{metrics.quality.escapedDefects}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Test Efficiency</p>
              <p className="text-xl font-semibold text-gray-900">{(metrics.quality.testEfficiency * 100).toFixed(0)}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">APDEX Score</p>
              <p className="text-xl font-semibold text-gray-900">{metrics.performance.apdex}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}