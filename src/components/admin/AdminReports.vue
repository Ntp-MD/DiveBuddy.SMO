<template>
  <section class="view-section">
    <div class="reports-header">
      <h2 class="reports-title">Business Reports</h2>
      <div class="report-filters">
        <select v-model="localPeriod" class="filter-select">
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
        <button @click="$emit('generate')" class="btn btn-primary btn-sm">Generate Report</button>
      </div>
    </div>

    <div class="reports-grid">
      <!-- Booking Trends Bar Chart -->
      <div class="report-card">
        <h3 class="report-card-title">Booking Trends</h3>
        <div class="trend-chart">
          <div class="trend-bars">
            <div v-for="(point, index) in bookingTrends" :key="index" class="trend-bar-wrap">
              <span class="trend-value">{{ point }}</span>
              <div class="trend-bar" :style="{ height: `${point}%` }"></div>
              <span class="trend-label">{{ trendLabels[index] }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Revenue by Course Donut/Pie -->
      <div class="report-card">
        <h3 class="report-card-title">Revenue by Course</h3>
        <div class="pie-wrap">
          <div class="pie-chart"></div>
          <ul class="pie-legend">
            <li v-for="(slice, index) in revenueByCourse" :key="index" class="pie-legend-item">
              <span class="pie-legend-dot" :style="{ background: slice.color }"></span>
              <span class="pie-legend-name">{{ slice.name }}</span>
              <span class="pie-legend-pct">{{ slice.percentage }}%</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Top Performing Courses Table -->
      <div class="report-card report-card-full">
        <h3 class="report-card-title">Top Performing Courses</h3>
        <div class="table-wrap">
          <table class="report-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Course</th>
                <th>Bookings</th>
                <th>Revenue</th>
                <th>Avg Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(course, i) in topCourses" :key="course.id">
                <td class="rank-cell">{{ i + 1 }}</td>
                <td class="name-cell">{{ course.name }}</td>
                <td>{{ course.bookings }}</td>
                <td class="revenue-cell">{{ formatCurrency(course.revenue) }}</td>
                <td>
                  <span class="badge badge-neutral">{{ course.rating }} &#9733;</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  reportPeriod: string;
  bookingTrends: readonly number[];
  revenueByCourse: readonly { name: string; percentage: number; color: string; rotation: number }[];
  topCourses: readonly { id: string; name: string; bookings: number; revenue: number; rating: number }[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "generate"): void;
  (e: "update:reportPeriod", value: string): void;
}>();

const localPeriod = ref(props.reportPeriod);
watch(localPeriod, (val) => emit("update:reportPeriod", val));

const trendLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

function formatCurrency(value: number): string {
  return `฿${value.toLocaleString()}`;
}
</script>

<style scoped>
.view-section {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header */
.reports-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap-lg);
}

.reports-title {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--darkblue);
  margin: 0;
}

.report-filters {
  display: flex;
  gap: var(--gap-sm);
  align-items: center;
}

/* Grid */
.reports-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-lg);
}

.report-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: var(--gap-lg);
  box-shadow: var(--shadow-sm);
}

.report-card-full {
  grid-column: 1 / -1;
}

.report-card-title {
  margin: 0 0 var(--gap-md);
  font-size: var(--font-md);
  font-weight: 600;
  color: var(--darkblue);
}

/* Trend Bar Chart */
.trend-chart {
  height: 200px;
  padding-bottom: var(--gap-lg);
}

.trend-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  gap: var(--gap-xs);
}

.trend-bar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  justify-content: flex-end;
  gap: 4px;
}

.trend-value {
  font-size: var(--font-xs);
  color: var(--darkblue);
  font-weight: 600;
}

.trend-bar {
  width: 100%;
  background: linear-gradient(to top, var(--deepblue), var(--orange));
  border-radius: var(--radius-xs) var(--radius-xs) 0 0;
  transition: height 0.4s ease;
  min-height: 4px;
}

.trend-label {
  font-size: var(--font-xs);
  color: var(--gray);
  white-space: nowrap;
}

/* Pie Chart */
.pie-wrap {
  display: flex;
  align-items: center;
  gap: var(--gap-lg);
}

.pie-chart {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  flex-shrink: 0;
  background: conic-gradient(var(--chart-1) 0deg 126deg, var(--chart-2) 126deg 216deg, var(--chart-3) 216deg 288deg, var(--chart-4) 288deg 360deg);
}

.pie-legend {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
}

.pie-legend-item {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  font-size: var(--font-sm);
}

.pie-legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.pie-legend-name {
  flex: 1;
  color: var(--darkblue);
}

.pie-legend-pct {
  font-weight: 700;
  color: var(--gray);
}

/* Table */
.table-wrap {
  overflow-x: auto;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
}

.report-table th,
.report-table td {
  padding: var(--gap-sm) var(--gap-md);
  text-align: left;
  border-bottom: 1px solid var(--lightgray);
}

.report-table th {
  background: var(--deepblue);
  color: var(--white);
  font-weight: 600;
  font-size: var(--font-sm);
}

.report-table tbody tr:hover {
  background: var(--lightgray);
}

.rank-cell {
  font-weight: 700;
  color: var(--gray);
  width: 40px;
}

.name-cell {
  font-weight: 600;
  color: var(--darkblue);
}

.revenue-cell {
  font-weight: 700;
  color: var(--orange);
}

@media (max-width: 1024px) {
  .reports-grid {
    grid-template-columns: 1fr;
  }
  .report-card-full {
    grid-column: 1;
  }
  .pie-wrap {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .reports-header {
    flex-direction: column;
    gap: var(--gap-sm);
    align-items: flex-start;
  }
}
</style>
