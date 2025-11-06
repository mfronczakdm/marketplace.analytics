"use client";

import { useState, useEffect } from "react";
import type { ApplicationContext, PagesContext } from "@sitecore-marketplace-sdk/client";
import { useMarketplaceClient } from "@/src/utils/hooks/useMarketplaceClient";
import Image from "next/image";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

function PagesContextPanel() {
  const { client, error, isInitialized } = useMarketplaceClient();
  const [pagesContext, setPagesContext] = useState<PagesContext>();
  const [appContext, setAppContext] = useState<ApplicationContext>();

  // Mock data for analytics
  const pageViewsData = [
    { date: "Nov 1", views: 2400, visitors: 1800 },
    { date: "Nov 2", views: 3200, visitors: 2300 },
    { date: "Nov 3", views: 2800, visitors: 2100 },
    { date: "Nov 4", views: 3800, visitors: 2800 },
    { date: "Nov 5", views: 4200, visitors: 3100 },
    { date: "Nov 6", views: 3900, visitors: 2900 },
    { date: "Nov 7", views: 4500, visitors: 3300 },
  ];

  const topPagesData = [
    { page: "/home", visits: 4500 },
    { page: "/products", visits: 3200 },
    { page: "/about", visits: 2800 },
    { page: "/contact", visits: 1900 },
    { page: "/blog", visits: 1500 },
  ];

  const trafficSourcesData = [
    { name: "Organic Search", value: 4200, color: "#0088FE" },
    { name: "Direct", value: 2800, color: "#00C49F" },
    { name: "Social Media", value: 1900, color: "#FFBB28" },
    { name: "Referral", value: 1500, color: "#FF8042" },
    { name: "Email", value: 800, color: "#8884D8" },
  ];

  const conversionFunnelData = [
    { stage: "Landing Page", users: 10000, rate: 100 },
    { stage: "Product View", users: 6500, rate: 65 },
    { stage: "Add to Cart", users: 3200, rate: 32 },
    { stage: "Checkout", users: 1800, rate: 18 },
    { stage: "Purchase", users: 1200, rate: 12 },
  ];

  const engagementMetricsData = [
    { month: "May", bounceRate: 45, avgSessionDuration: 185 },
    { month: "Jun", bounceRate: 42, avgSessionDuration: 210 },
    { month: "Jul", bounceRate: 38, avgSessionDuration: 235 },
    { month: "Aug", bounceRate: 35, avgSessionDuration: 265 },
    { month: "Sep", bounceRate: 32, avgSessionDuration: 290 },
    { month: "Oct", bounceRate: 30, avgSessionDuration: 310 },
  ];

  // Key metrics summary
  const keyMetrics = {
    totalVisitors: "28,450",
    conversionRate: "12.0%",
    avgOrderValue: "$127.50",
    revenue: "$153,000",
  };

  useEffect(() => {
    if (!error && isInitialized && client) {
      client.query("application.context")
        .then((res) => {
          console.log("Success retrieving application.context:", res.data);
          setAppContext(res.data);
        })
        .catch((error) => {
          console.error("Error retrieving application.context:", error);
        });
      
      client.query("pages.context", {
        subscribe: true,
        onSuccess: (res) => {
          console.log("Success retrieving pages.context:", res);
          setPagesContext(res);
        },
      }).catch((error) => {
        console.error("Error retrieving pages.context:", error);
      });
    } else if (error) {
      console.error("Error initializing Marketplace client:", error);
    }
  }, [client, error, isInitialized]);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "1200px", margin: "2rem auto" }}>
      {isInitialized && pagesContext ? (
        <>
          <h1>{appContext?.name}</h1>
          
          {/* Key Metrics Grid */}
          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>
              Key Performance Metrics
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              <div style={{ padding: "1.5rem", backgroundColor: "#f0f9ff", borderRadius: "8px", border: "1px solid #bfdbfe" }}>
                <div style={{ fontSize: "0.875rem", color: "#1e40af", fontWeight: "600" }}>Total Visitors</div>
                <div style={{ fontSize: "2rem", fontWeight: "700", color: "#1e3a8a", marginTop: "0.5rem" }}>{keyMetrics.totalVisitors}</div>
                <div style={{ fontSize: "0.75rem", color: "#3b82f6", marginTop: "0.25rem" }}>↑ 15% from last month</div>
              </div>
              <div style={{ padding: "1.5rem", backgroundColor: "#f0fdf4", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
                <div style={{ fontSize: "0.875rem", color: "#15803d", fontWeight: "600" }}>Conversion Rate</div>
                <div style={{ fontSize: "2rem", fontWeight: "700", color: "#166534", marginTop: "0.5rem" }}>{keyMetrics.conversionRate}</div>
                <div style={{ fontSize: "0.75rem", color: "#16a34a", marginTop: "0.25rem" }}>↑ 2.3% from last month</div>
              </div>
              <div style={{ padding: "1.5rem", backgroundColor: "#fef3c7", borderRadius: "8px", border: "1px solid #fde68a" }}>
                <div style={{ fontSize: "0.875rem", color: "#92400e", fontWeight: "600" }}>Avg Order Value</div>
                <div style={{ fontSize: "2rem", fontWeight: "700", color: "#78350f", marginTop: "0.5rem" }}>{keyMetrics.avgOrderValue}</div>
                <div style={{ fontSize: "0.75rem", color: "#d97706", marginTop: "0.25rem" }}>↑ $8.25 from last month</div>
              </div>
              <div style={{ padding: "1.5rem", backgroundColor: "#fce7f3", borderRadius: "8px", border: "1px solid #fbcfe8" }}>
                <div style={{ fontSize: "0.875rem", color: "#9f1239", fontWeight: "600" }}>Total Revenue</div>
                <div style={{ fontSize: "2rem", fontWeight: "700", color: "#881337", marginTop: "0.5rem" }}>{keyMetrics.revenue}</div>
                <div style={{ fontSize: "0.75rem", color: "#e11d48", marginTop: "0.25rem" }}>↑ 18% from last month</div>
              </div>
            </div>
          </div>

          {/* 1. Page Views & Visitors Trend */}
          <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
              Page Views & Visitors Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={pageViewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} name="Page Views" />
                <Line type="monotone" dataKey="visitors" stroke="#82ca9d" strokeWidth={2} name="Unique Visitors" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 2. Traffic Sources */}
          <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
              Traffic Sources Distribution
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={trafficSourcesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent as number) * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trafficSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. Conversion Funnel */}
          <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
              Conversion Funnel
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionFunnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" name="Users" />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#6b7280" }}>
              Overall conversion rate: 12% (1,200 purchases from 10,000 visitors)
            </div>
          </div>

          {/* 4. Top Pages by Visits */}
          <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
              Top Pages by Visits
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topPagesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="page" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="#82ca9d" name="Page Visits" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 5. Engagement Metrics Over Time */}
          <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
              Engagement Metrics (6 Month Trend)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={engagementMetricsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" label={{ value: 'Bounce Rate (%)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Avg Session (sec)', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="bounceRate" stroke="#ff7c7c" fill="#ff7c7c" fillOpacity={0.6} name="Bounce Rate (%)" />
                <Area yAxisId="right" type="monotone" dataKey="avgSessionDuration" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} name="Avg Session Duration (sec)" />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#6b7280" }}>
              Lower bounce rate and higher session duration indicate improved engagement
            </div>
          </div>
        </>
      ) : (
        <p>No page context available yet.</p>
      )}
    </div>
  );
}

export default PagesContextPanel;