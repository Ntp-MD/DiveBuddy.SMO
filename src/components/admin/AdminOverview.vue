<template>
  <section class="view-section">
    <div class="stats-row">
      <div class="stat-box stat-primary">
        <span class="stat-icon">📅</span>
        <div class="stat-details">
          <span class="stat-number">{{ stats.totalBookings }}</span>
          <span class="stat-desc">Total Bookings</span>
        </div>
      </div>
      <div class="stat-box stat-warning">
        <span class="stat-icon">⏳</span>
        <div class="stat-details">
          <span class="stat-number">{{ stats.pendingBookings }}</span>
          <span class="stat-desc">Pending</span>
        </div>
      </div>
      <div class="stat-box stat-success">
        <span class="stat-icon">👥</span>
        <div class="stat-details">
          <span class="stat-number">{{ stats.totalUsers }}</span>
          <span class="stat-desc">Users</span>
        </div>
      </div>
      <div class="stat-box stat-info">
        <span class="stat-icon">💰</span>
        <div class="stat-details">
          <span class="stat-number">{{ formatCurrency(stats.revenue) }}</span>
          <span class="stat-desc">Revenue</span>
        </div>
      </div>
    </div>

    <!-- Revenue Chart -->
    <div class="dashboard-grid">
      <div class="dashboard-card card-wide">
        <h3>Revenue Analytics</h3>
        <div class="chart-container">
          <div class="chart-bars">
            <div v-for="(value, index) in revenueChart" :key="index" class="chart-bar">
              <div class="bar-fill" :style="{ height: `${(value / maxRevenue) * 100}%` }"></div>
              <span class="bar-label">{{ months[index] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="dashboard-card">
        <h3>Recent Bookings</h3>
        <div class="booking-list">
          <div v-for="booking in recentBookings" :key="booking.id" class="booking-item">
            <div class="booking-info">
              <span class="booking-customer">{{ booking.user?.firstName }} {{ booking.user?.lastName }}</span>
              <span class="booking-course">{{ booking.course?.name }}</span>
            </div>
            <span :class="['booking-status', booking.status]">{{ booking.status }}</span>
          </div>
        </div>
      </div>

      <div class="dashboard-card">
        <h3>Today's Schedule</h3>
        <div class="schedule-list">
          <div v-for="schedule in todaySchedules" :key="schedule.id" class="schedule-item">
            <div class="schedule-info">
              <span class="schedule-course">{{ schedule.course?.name }}</span>
              <span class="schedule-time">{{ schedule.startDate }}</span>
            </div>
            <span class="schedule-slots">{{ schedule.bookedSlots }}/{{ schedule.maxParticipants }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Booking } from "../../composables/useBookings";

interface Schedule {
  id: string;
  startDate: string;
  bookedSlots: number;
  maxParticipants: number;
  course?: { name: string };
}

interface AppUser {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Props {
  bookings: readonly Booking[];
  schedules: readonly Schedule[];
  users: readonly AppUser[];
  revenueChart: readonly number[];
  months: readonly string[];
}

const props = defineProps<Props>();

const stats = computed(() => ({
  totalBookings: props.bookings.length,
  pendingBookings: props.bookings.filter((b: Booking) => b.status === "pending").length,
  totalUsers: props.users.length,
  revenue: props.bookings.filter((b: Booking) => b.paymentStatus === "paid").reduce((sum: number, b: Booking) => sum + b.totalPrice, 0),
}));

const maxRevenue = computed(() => Math.max(...props.revenueChart));

const recentBookings = computed(() => props.bookings.slice(0, 5));

const todaySchedules = computed(() => {
  const today = new Date().toISOString().split("T")[0];
  return props.schedules.filter((s) => s.startDate === today).slice(0, 5);
});

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

/* Stats Row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap-md);
  margin-bottom: var(--gap-lg);
}

.stat-box {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  padding: var(--gap-md);
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border-left: 4px solid transparent;
}

.stat-primary {
  border-left-color: var(--orange);
}
.stat-warning {
  border-left-color: var(--status-pending-text);
}
.stat-success {
  border-left-color: var(--status-confirmed-text);
}
.stat-info {
  border-left-color: var(--accent-primary);
}

.stat-icon {
  font-size: var(--font-2xl);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--lightgray);
  flex-shrink: 0;
}

.stat-details {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--darkblue);
  line-height: 1;
}

.stat-desc {
  font-size: var(--font-sm);
  color: var(--gray);
  margin-top: 4px;
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-lg);
  margin-bottom: var(--gap-lg);
}

.dashboard-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: var(--gap-lg);
  box-shadow: var(--shadow-sm);
}

.card-wide {
  grid-column: 1 / -1;
}

.dashboard-card h3 {
  margin: 0 0 var(--gap-md);
  color: var(--darkblue);
  font-size: var(--font-md);
  font-weight: 600;
}

/* Bar Chart */
.chart-container {
  height: 200px;
  position: relative;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  padding-bottom: 30px;
  gap: var(--gap-xs);
}

.chart-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  position: relative;
}

.bar-fill {
  width: 100%;
  background: linear-gradient(to top, var(--deepblue), var(--orange));
  border-radius: var(--radius-xs) var(--radius-xs) 0 0;
  transition: height 0.4s ease;
  min-height: 4px;
}

.bar-label {
  position: absolute;
  bottom: -24px;
  font-size: var(--font-xs);
  color: var(--gray);
  white-space: nowrap;
}

/* Booking / Schedule Lists */
.booking-list,
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
}

.booking-item,
.schedule-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--gap-sm) var(--gap-md);
  background: var(--lightgray);
  border-radius: var(--radius-sm);
}

.booking-info,
.schedule-info {
  display: flex;
  flex-direction: column;
}

.booking-customer,
.schedule-course {
  font-weight: 600;
  font-size: var(--font-sm);
  color: var(--darkblue);
}

.booking-course,
.schedule-time {
  font-size: var(--font-xs);
  color: var(--gray);
}

.booking-status {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: var(--font-xs);
  font-weight: 600;
  text-transform: capitalize;
}

.booking-status.pending {
  background: var(--status-pending-bg);
  color: var(--status-pending-text);
}
.booking-status.confirmed {
  background: var(--status-confirmed-bg);
  color: var(--status-confirmed-text);
}
.booking-status.cancelled {
  background: var(--status-cancelled-bg);
  color: var(--status-cancelled-text);
}

.schedule-slots {
  font-size: var(--font-sm);
  color: var(--gray);
  font-weight: 600;
}

@media (max-width: 1024px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stats-row {
    grid-template-columns: 1fr;
  }
}
</style>
