<template>
  <div class="admin-page">
    <!-- Toast Notifications -->
    <ToastContainer />

    <!-- Confirm Dialog -->
    <ConfirmDialog
      :is-open="showConfirmDialog"
      :title="confirmTitle"
      :message="confirmMessage"
      :confirm-text="confirmButtonText"
      :confirm-class="confirmButtonClass"
      @confirm="handleConfirmAction"
      @cancel="showConfirmDialog = false"
      @close="showConfirmDialog = false"
    />

    <!-- Print Header (hidden on screen) -->
    <div class="print-header">
      <h1>DiveBuddy Admin Report</h1>
      <p>Generated on {{ printDate }}</p>
    </div>

    <!-- Sidebar Navigation -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <span class="logo-icon">🤿</span>
          <span class="logo-text">DiveBuddy</span>
        </div>
        <span class="logo-badge">Admin</span>
      </div>

      <nav class="sidebar-nav">
        <button v-for="item in menuItems" :key="item.id" :class="['sidebar-item', { active: activeView === item.id }]" @click="activeView = item.id">
          <span class="sidebar-icon">{{ item.icon }}</span>
          <span class="sidebar-label">{{ item.label }}</span>
          <span v-if="item.badge" class="sidebar-badge">{{ item.badge }}</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <div class="user-info">
          <span class="user-name">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>
          <span class="user-role">{{ currentUser?.role }}</span>
        </div>
        <button @click="handleLogout" class="btn-logout">
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="admin-main">
      <!-- Top Header -->
      <header class="admin-topbar">
        <h1 class="page-title">{{ currentPageTitle }}</h1>
        <div class="topbar-actions">
          <ThemeToggle />
          <button class="btn-icon" title="Notifications">🔔</button>
          <button class="btn-icon" title="Settings" @click="activeView = 'settings'">⚙️</button>
        </div>
      </header>

      <!-- Content Container -->
      <div class="admin-content-area">
        <!-- Overview Dashboard -->
        <AdminOverview
          v-if="activeView === 'overview'"
          :bookings="bookings"
          :schedules="schedules"
          :users="users"
          :revenue-chart="revenueChart"
          :months="months"
        />

        <!-- Bookings Management -->
        <section v-if="activeView === 'bookings'" class="view-section">
          <!-- Bulk Actions -->
          <BulkActionBar
            :selected-count="selectedBookings.length"
            :actions="[
              { id: 'confirm', label: 'Confirm', icon: '✓', class: 'success' },
              { id: 'cancel', label: 'Cancel', icon: '✕', class: 'danger' },
              { id: 'export', label: 'Export', icon: '📥' },
            ]"
            @action="handleBulkAction"
            @clear="selectedBookings = []"
          />

          <div class="view-header">
            <div class="filter-bar">
              <input v-model="searchQuery" type="text" placeholder="Search bookings..." class="search-input" />
              <select v-model="statusFilter" class="filter-select">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div class="header-actions">
              <button @click="printReport" class="btn btn-secondary btn-sm">🖨️ Print</button>
              <button @click="exportBookings" class="btn btn-secondary btn-sm">📥 Export</button>
            </div>
          </div>

          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Course</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="booking in filteredBookings" :key="booking.id" :class="{ selected: selectedBookings.includes(booking.id) }">
                  <td class="cell-checkbox">
                    <input type="checkbox" :checked="selectedBookings.includes(booking.id)" @change="toggleBookingSelection(booking.id)" />
                  </td>
                  <td class="cell-id">{{ booking.id }}</td>
                  <td>{{ booking.user?.firstName }} {{ booking.user?.lastName }}</td>
                  <td>{{ booking.course?.name }}</td>
                  <td>{{ booking.startDate }}</td>
                  <td>
                    <span :class="['status-pill', booking.status]">
                      {{ booking.status }}
                    </span>
                  </td>
                  <td>{{ booking.paymentStatus }}</td>
                  <td class="cell-actions">
                    <button @click="confirmBooking(booking.id)" class="btn btn-success btn-xs">✓</button>
                    <button @click="cancelBooking(booking.id)" class="btn btn-danger btn-xs">✕</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Courses Management -->
        <section v-if="activeView === 'courses'" class="view-section">
          <div class="view-header">
            <button @click="showAddCourse = true" class="btn btn-primary btn-md">
              <span>+</span>
              <span>Add Course</span>
            </button>
          </div>

          <div class="courses-grid">
            <div v-for="course in courses" :key="course.id" class="course-card">
              <img :src="course.image" :alt="course.name" class="course-image" />
              <div class="course-content">
                <h3 class="course-title">{{ course.name }}</h3>
                <p class="course-meta">{{ course.level }} • {{ course.duration }}</p>
                <p class="course-price">{{ formatCurrency(course.price) }}</p>
                <div class="course-actions">
                  <button @click="editCourse(course)" class="btn btn-outline btn-xs">Edit</button>
                  <button @click="toggleCourse(course.id)" :class="['btn', 'btn-xs', course.active ? 'btn-success' : 'btn-ghost']">
                    {{ course.active ? "Active" : "Inactive" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Users Management -->
        <section v-if="activeView === 'users'" class="view-section">
          <div class="view-header">
            <input v-model="userSearch" type="text" placeholder="Search users..." class="search-input" />
          </div>

          <div class="users-list">
            <div v-for="user in filteredUsers" :key="user.id" class="user-card">
              <div class="user-avatar">{{ user.firstName[0] }}{{ user.lastName[0] }}</div>
              <div class="user-details">
                <span class="user-fullname">{{ user.firstName }} {{ user.lastName }}</span>
                <span class="user-email">{{ user.email }}</span>
              </div>
              <select v-model="user.role" @change="updateRole(String(user.id), user.role)" class="role-select">
                <option value="customer">Customer</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Schedules Calendar -->
        <section v-if="activeView === 'schedules'" class="view-section">
          <div class="cal-wrap">
            <!-- Calendar Header -->
            <div class="cal-header">
              <div class="cal-header__nav">
                <button @click="calPrevMonth" class="cal-nav-btn" title="Previous month">‹</button>
                <div class="cal-header__title">
                  <h2 class="cal-month-label">{{ calMonthLabel }}</h2>
                  <span class="cal-year-label">{{ calYear }}</span>
                </div>
                <button @click="calNextMonth" class="cal-nav-btn" title="Next month">›</button>
              </div>
              <div class="cal-header__actions">
                <button @click="calGoToday" class="cal-today-btn">Today</button>
                <div class="cal-legend">
                  <span class="cal-legend__dot cal-legend__dot--open"></span><span class="cal-legend__text">Open</span>
                  <span class="cal-legend__dot cal-legend__dot--full"></span><span class="cal-legend__text">Full</span>
                  <span class="cal-legend__dot cal-legend__dot--closed"></span><span class="cal-legend__text">Closed</span>
                </div>
              </div>
            </div>

            <!-- Day-of-week header -->
            <div class="cal-grid">
              <div v-for="d in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="d" class="cal-dow">{{ d }}</div>

              <!-- Empty leading cells -->
              <div v-for="n in calLeadingBlanks" :key="`b${n}`" class="cal-cell cal-cell--blank"></div>

              <!-- Day cells -->
              <div
                v-for="day in calDaysInMonth"
                :key="day"
                :class="[
                  'cal-cell',
                  isToday(calYear, calMonth, day) && 'cal-cell--today',
                  selectedCalDay === day && 'cal-cell--selected',
                  calEventsForDay(day).length > 0 && 'cal-cell--has-events',
                ]"
                @click="selectedCalDay = day"
              >
                <span class="cal-cell__num">{{ day }}</span>
                <div class="cal-cell__dots">
                  <span v-for="(ev, i) in calEventsForDay(day).slice(0, 3)" :key="i" :class="['cal-dot', `cal-dot--${ev.status}`]"></span>
                  <span v-if="calEventsForDay(day).length > 3" class="cal-dot-more">+{{ calEventsForDay(day).length - 3 }}</span>
                </div>
              </div>
            </div>

            <!-- Selected Day Panel -->
            <div v-if="selectedCalDay" class="cal-day-panel">
              <div class="cal-day-panel__header">
                <h3 class="cal-day-panel__title">{{ calMonthLabel }} {{ selectedCalDay }}, {{ calYear }}</h3>
                <span class="cal-day-panel__count">
                  {{ calEventsForDay(selectedCalDay).length }} session{{ calEventsForDay(selectedCalDay).length !== 1 ? "s" : "" }}
                </span>
              </div>
              <div v-if="calEventsForDay(selectedCalDay).length === 0" class="cal-day-panel__empty">No sessions scheduled for this day.</div>
              <div v-for="ev in calEventsForDay(selectedCalDay)" :key="ev.id" class="cal-event">
                <div :class="['cal-event__bar', `cal-event__bar--${ev.status}`]"></div>
                <div class="cal-event__body">
                  <div class="cal-event__top">
                    <span class="cal-event__course">{{ ev.course?.name ?? "Course" }}</span>
                    <span :class="['cal-event__status', `cal-event__status--${ev.status}`]">{{ ev.status }}</span>
                  </div>
                  <div class="cal-event__meta">
                    <span class="cal-event__instructor">👤 {{ ev.instructor?.firstName }} {{ ev.instructor?.lastName }}</span>
                    <span class="cal-event__location">📍 {{ ev.location }}</span>
                    <span class="cal-event__slots">🪑 {{ ev.bookedSlots }}/{{ ev.maxParticipants }} booked</span>
                    <span class="cal-event__price">฿{{ ev.price.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Inventory Management -->
        <section v-if="activeView === 'inventory'" class="view-section">
          <div class="view-header">
            <h2>Equipment Inventory</h2>
            <button @click="showAddEquipment = true" class="btn btn-primary btn-md">+ Add Equipment</button>
          </div>

          <div class="inventory-stats">
            <div class="inv-stat">
              <span class="inv-number">{{ totalEquipment }}</span>
              <span class="inv-label">Total Items</span>
            </div>
            <div class="inv-stat">
              <span class="inv-number">{{ availableEquipment }}</span>
              <span class="inv-label">Available</span>
            </div>
            <div class="inv-stat">
              <span class="inv-number">{{ inUseEquipment }}</span>
              <span class="inv-label">In Use</span>
            </div>
            <div class="inv-stat">
              <span class="inv-number">{{ maintenanceEquipment }}</span>
              <span class="inv-label">Maintenance</span>
            </div>
          </div>

          <div class="inventory-grid">
            <div v-for="item in inventory" :key="item.id" class="inventory-card">
              <div class="inv-card-header">
                <div class="inv-card-icon">{{ item.icon }}</div>
                <span :class="['inv-card-status', `inv-card-status-${item.status}`]">
                  {{ item.status.replace("-", " ") }}
                </span>
              </div>
              <div class="inv-card-body">
                <h4 class="inv-card-name">{{ item.name }}</h4>
                <p class="inv-card-type">{{ item.type }}</p>
                <p class="inv-card-serial">SN: {{ item.serialNumber }}</p>
                <div class="inv-card-condition">
                  <span class="inv-card-condition-label">Condition</span>
                  <div class="inv-card-condition-bar">
                    <div
                      class="inv-card-condition-fill"
                      :style="{
                        width: `${item.condition * 10}%`,
                        background:
                          item.condition >= 8
                            ? 'var(--status-confirmed-text)'
                            : item.condition >= 5
                              ? 'var(--status-pending-text)'
                              : 'var(--status-cancelled-text)',
                      }"
                    ></div>
                  </div>
                  <span class="inv-card-condition-val">{{ item.condition }}/10</span>
                </div>
              </div>
              <div class="inv-card-footer">
                <button @click="editEquipment(item)" class="inv-card-btn">Edit</button>
                <button @click="logMaintenance(item.id)" class="inv-card-btn inv-card-btn-maint">Maintenance</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Reviews Management -->
        <section v-if="activeView === 'reviews'" class="view-section">
          <div class="view-header">
            <h2>Customer Reviews</h2>
            <div class="review-filters">
              <select v-model="reviewFilter" class="filter-select">
                <option value="">All Reviews</option>
                <option value="pending">Pending Approval</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div class="reviews-list">
            <div v-for="review in filteredReviews" :key="review.id" class="review-card">
              <div class="review-header">
                <div class="reviewer-info">
                  <div class="reviewer-avatar">{{ review.userName[0] }}</div>
                  <div>
                    <h4>{{ review.userName }}</h4>
                    <p class="review-course">{{ review.courseName }}</p>
                  </div>
                </div>
                <div class="review-rating">
                  <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= review.rating }">★</span>
                </div>
              </div>
              <p class="review-text">{{ review.comment }}</p>
              <div class="review-meta">
                <span class="review-date">{{ review.date }}</span>
                <span :class="['review-status', review.status]">{{ review.status }}</span>
              </div>
              <div class="review-actions">
                <button v-if="review.status === 'pending'" @click="approveReview(review.id)" class="btn btn-success btn-sm">Approve</button>
                <button v-if="review.status === 'pending'" @click="rejectReview(review.id)" class="btn btn-danger btn-sm">Reject</button>
                <button @click="replyToReview(review.id)" class="btn btn-ghost btn-sm">Reply</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Reports & Analytics -->
        <AdminReports
          v-if="activeView === 'reports'"
          :report-period="reportPeriod"
          :booking-trends="bookingTrends"
          :revenue-by-course="revenueByCourse"
          :top-courses="topCourses"
          @generate="generateReport"
          @update:report-period="reportPeriod = $event"
        />

        <!-- Email Templates -->
        <section v-if="activeView === 'emails'" class="view-section">
          <div class="view-header">
            <h2>Email Templates</h2>
            <button @click="showAddTemplate = true" class="btn btn-primary btn-md">+ New Template</button>
          </div>

          <div class="templates-list">
            <div v-for="template in emailTemplates" :key="template.id" class="template-card">
              <div class="template-header">
                <h3>{{ template.name }}</h3>
                <span :class="['template-status', template.isActive ? 'active' : 'inactive']">
                  {{ template.isActive ? "Active" : "Inactive" }}
                </span>
              </div>
              <p class="template-subject">Subject: {{ template.subject }}</p>
              <div class="template-preview">{{ template.body.substring(0, 100) }}...</div>
              <div class="template-variables">
                <span v-for="variable in template.variables" :key="variable" class="var-tag">{{ variable }}</span>
              </div>
              <div class="template-actions">
                <button @click="editTemplate(template)" class="btn btn-outline btn-xs">Edit</button>
                <button @click="previewTemplate(template)" class="btn btn-ghost btn-xs">Preview</button>
                <button @click="sendTestEmail(template.id)" class="btn btn-secondary btn-xs">Send Test</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Settings -->
        <AdminSettings
          v-if="activeView === 'settings'"
          :settings="settings"
          :settings-tabs="settingsTabs"
          @save="handleSaveSettings"
          @reset="resetSettings"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/stores/auth";
import { useCourses } from "@/composables/useCourses";
import { useBookings } from "@/composables/useBookings";
import { useToast } from "@/composables/useToast";
import ToastContainer from "@/components/ui/ToastContainer.vue";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";
import ThemeToggle from "@/components/ui/ThemeToggle.vue";
import BulkActionBar from "@/components/admin/BulkActionBar.vue";
import AdminOverview from "@/components/admin/AdminOverview.vue";
import AdminReports from "@/components/admin/AdminReports.vue";
import AdminSettings from "@/components/admin/AdminSettings.vue";

const router = useRouter();
const auth = useAuthStore();
const currentUser = computed(() => auth.currentUser);

function handleLogout() {
  auth.logout();
  router.push({ name: "admin-login" });
}
const { courses, fetchCourses } = useCourses();
const { bookings, schedules, fetchBookings, fetchSchedules } = useBookings();
const { success, warning } = useToast();

const activeView = ref("overview");
const searchQuery = ref("");
const statusFilter = ref("");
const userSearch = ref("");
const showAddCourse = ref(false);
const showAddEquipment = ref(false);
const showAddTemplate = ref(false);
const reviewFilter = ref("");
const reportPeriod = ref("month");

// ── Calendar state ──────────────────────────────────────────────
const today = new Date();
const calMonth = ref(today.getMonth()); // 0-indexed
const calYear = ref(today.getFullYear());
const selectedCalDay = ref<number | null>(null);

const calMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const calMonthLabel = computed(() => calMonthNames[calMonth.value]);

const calDaysInMonth = computed(() => new Array(new Date(calYear.value, calMonth.value + 1, 0).getDate()).fill(0).map((_, i) => i + 1));
const calLeadingBlanks = computed(() => new Array(new Date(calYear.value, calMonth.value, 1).getDay()).fill(0).map((_, i) => i));

function calPrevMonth() {
  selectedCalDay.value = null;
  if (calMonth.value === 0) {
    calMonth.value = 11;
    calYear.value--;
  } else calMonth.value--;
}
function calNextMonth() {
  selectedCalDay.value = null;
  if (calMonth.value === 11) {
    calMonth.value = 0;
    calYear.value++;
  } else calMonth.value++;
}
function calGoToday() {
  selectedCalDay.value = today.getDate();
  calMonth.value = today.getMonth();
  calYear.value = today.getFullYear();
}
function isToday(y: number, m: number, d: number) {
  return y === today.getFullYear() && m === today.getMonth() && d === today.getDate();
}

// ── 1-year mock schedule data ────────────────────────────────────
const Y = today.getFullYear();
type MockScheduleStatus = "open" | "full" | "closed";
interface MockSchedule {
  id: string;
  courseId: string;
  instructorId: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  bookedSlots: number;
  availableSlots: number;
  status: MockScheduleStatus;
  location: string;
  price: number;
  course?: { name: string; duration: string; price: number };
  instructor?: { id: string; firstName: string; lastName: string };
}
function ms(
  id: string,
  mm: number,
  dd: number,
  courseName: string,
  instructorFirst: string,
  instructorLast: string,
  booked: number,
  max: number,
  price: number,
  location: string,
  status: MockScheduleStatus,
): MockSchedule {
  const d = String(dd).padStart(2, "0");
  const m = String(mm).padStart(2, "0");
  return {
    id,
    courseId: `c_${id}`,
    instructorId: `i_${id}`,
    startDate: `${Y}-${m}-${d}`,
    endDate: `${Y}-${m}-${d}`,
    maxParticipants: max,
    bookedSlots: booked,
    availableSlots: max - booked,
    status,
    location,
    price,
    course: { name: courseName, duration: "3 days", price },
    instructor: { id: `i_${id}`, firstName: instructorFirst, lastName: instructorLast },
  };
}

const mockSchedules = ref<MockSchedule[]>([
  // January
  ms("s001", 1, 5, "Open Water Diver", "Mike", "Chen", 6, 8, 8900, "Kata Beach", "open"),
  ms("s002", 1, 12, "Advanced Open Water", "Sarah", "Rivera", 8, 8, 12900, "Patong Bay", "full"),
  ms("s003", 1, 19, "Rescue Diver", "Mike", "Chen", 4, 6, 15900, "Kata Beach", "open"),
  ms("s004", 1, 26, "Open Water Diver", "Tom", "Hughes", 2, 8, 8900, "Karon Beach", "open"),
  // February
  ms("s005", 2, 2, "Divemaster Course", "Sarah", "Rivera", 3, 4, 45000, "Patong Bay", "open"),
  ms("s006", 2, 9, "Open Water Diver", "Mike", "Chen", 8, 8, 8900, "Kata Beach", "full"),
  ms("s007", 2, 14, "Night Diving Specialty", "Tom", "Hughes", 5, 6, 9500, "Karon Beach", "open"),
  ms("s008", 2, 21, "Advanced Open Water", "Sarah", "Rivera", 6, 8, 12900, "Patong Bay", "open"),
  ms("s009", 2, 28, "Deep Diver Specialty", "Mike", "Chen", 4, 6, 11900, "Kata Beach", "open"),
  // March
  ms("s010", 3, 4, "Open Water Diver", "Tom", "Hughes", 8, 8, 8900, "Karon Beach", "full"),
  ms("s011", 3, 8, "Rescue Diver", "Sarah", "Rivera", 3, 6, 15900, "Patong Bay", "open"),
  ms("s012", 3, 15, "Open Water Diver", "Mike", "Chen", 7, 8, 8900, "Kata Beach", "open"),
  ms("s013", 3, 22, "Advanced Open Water", "Tom", "Hughes", 8, 8, 12900, "Karon Beach", "full"),
  ms("s014", 3, 29, "Wreck Diver Specialty", "Sarah", "Rivera", 5, 6, 13500, "Patong Bay", "open"),
  // April
  ms("s015", 4, 3, "Open Water Diver", "Mike", "Chen", 6, 8, 8900, "Kata Beach", "open"),
  ms("s016", 4, 5, "Night Diving Specialty", "Tom", "Hughes", 6, 6, 9500, "Karon Beach", "full"),
  ms("s017", 4, 12, "Advanced Open Water", "Sarah", "Rivera", 4, 8, 12900, "Patong Bay", "open"),
  ms("s018", 4, 19, "Rescue Diver", "Mike", "Chen", 0, 6, 15900, "Kata Beach", "closed"),
  ms("s019", 4, 26, "Open Water Diver", "Tom", "Hughes", 8, 8, 8900, "Karon Beach", "full"),
  // May
  ms("s020", 5, 3, "Deep Diver Specialty", "Sarah", "Rivera", 3, 6, 11900, "Patong Bay", "open"),
  ms("s021", 5, 10, "Open Water Diver", "Mike", "Chen", 5, 8, 8900, "Kata Beach", "open"),
  ms("s022", 5, 10, "Divemaster Course", "Tom", "Hughes", 2, 4, 45000, "Karon Beach", "open"),
  ms("s023", 5, 17, "Advanced Open Water", "Sarah", "Rivera", 8, 8, 12900, "Patong Bay", "full"),
  ms("s024", 5, 24, "Wreck Diver Specialty", "Mike", "Chen", 4, 6, 13500, "Kata Beach", "open"),
  ms("s025", 5, 31, "Open Water Diver", "Tom", "Hughes", 6, 8, 8900, "Karon Beach", "open"),
  // June
  ms("s026", 6, 7, "Rescue Diver", "Sarah", "Rivera", 6, 6, 15900, "Patong Bay", "full"),
  ms("s027", 6, 7, "Open Water Diver", "Mike", "Chen", 3, 8, 8900, "Kata Beach", "open"),
  ms("s028", 6, 14, "Night Diving Specialty", "Tom", "Hughes", 5, 6, 9500, "Karon Beach", "open"),
  ms("s029", 6, 21, "Advanced Open Water", "Sarah", "Rivera", 7, 8, 12900, "Patong Bay", "open"),
  ms("s030", 6, 28, "Open Water Diver", "Mike", "Chen", 8, 8, 8900, "Kata Beach", "full"),
  // July
  ms("s031", 7, 5, "Deep Diver Specialty", "Tom", "Hughes", 4, 6, 11900, "Karon Beach", "open"),
  ms("s032", 7, 12, "Open Water Diver", "Sarah", "Rivera", 6, 8, 8900, "Patong Bay", "open"),
  ms("s033", 7, 12, "Divemaster Course", "Mike", "Chen", 4, 4, 45000, "Kata Beach", "full"),
  ms("s034", 7, 19, "Advanced Open Water", "Tom", "Hughes", 5, 8, 12900, "Karon Beach", "open"),
  ms("s035", 7, 26, "Rescue Diver", "Sarah", "Rivera", 6, 6, 15900, "Patong Bay", "full"),
  // August
  ms("s036", 8, 2, "Open Water Diver", "Mike", "Chen", 7, 8, 8900, "Kata Beach", "open"),
  ms("s037", 8, 9, "Wreck Diver Specialty", "Tom", "Hughes", 3, 6, 13500, "Karon Beach", "open"),
  ms("s038", 8, 16, "Night Diving Specialty", "Sarah", "Rivera", 6, 6, 9500, "Patong Bay", "full"),
  ms("s039", 8, 16, "Open Water Diver", "Mike", "Chen", 4, 8, 8900, "Kata Beach", "open"),
  ms("s040", 8, 23, "Advanced Open Water", "Tom", "Hughes", 8, 8, 12900, "Karon Beach", "full"),
  ms("s041", 8, 30, "Open Water Diver", "Sarah", "Rivera", 2, 8, 8900, "Patong Bay", "open"),
  // September
  ms("s042", 9, 6, "Rescue Diver", "Mike", "Chen", 5, 6, 15900, "Kata Beach", "open"),
  ms("s043", 9, 6, "Deep Diver Specialty", "Tom", "Hughes", 6, 6, 11900, "Karon Beach", "full"),
  ms("s044", 9, 13, "Open Water Diver", "Sarah", "Rivera", 8, 8, 8900, "Patong Bay", "full"),
  ms("s045", 9, 20, "Advanced Open Water", "Mike", "Chen", 3, 8, 12900, "Kata Beach", "open"),
  ms("s046", 9, 27, "Divemaster Course", "Tom", "Hughes", 2, 4, 45000, "Karon Beach", "open"),
  // October
  ms("s047", 10, 4, "Open Water Diver", "Sarah", "Rivera", 6, 8, 8900, "Patong Bay", "open"),
  ms("s048", 10, 11, "Night Diving Specialty", "Mike", "Chen", 6, 6, 9500, "Kata Beach", "full"),
  ms("s049", 10, 11, "Advanced Open Water", "Tom", "Hughes", 4, 8, 12900, "Karon Beach", "open"),
  ms("s050", 10, 18, "Wreck Diver Specialty", "Sarah", "Rivera", 5, 6, 13500, "Patong Bay", "open"),
  ms("s051", 10, 25, "Open Water Diver", "Mike", "Chen", 8, 8, 8900, "Kata Beach", "full"),
  ms("s052", 10, 25, "Rescue Diver", "Tom", "Hughes", 3, 6, 15900, "Karon Beach", "open"),
  // November
  ms("s053", 11, 1, "Open Water Diver", "Sarah", "Rivera", 5, 8, 8900, "Patong Bay", "open"),
  ms("s054", 11, 8, "Advanced Open Water", "Mike", "Chen", 7, 8, 12900, "Kata Beach", "open"),
  ms("s055", 11, 8, "Deep Diver Specialty", "Tom", "Hughes", 6, 6, 11900, "Karon Beach", "full"),
  ms("s056", 11, 15, "Divemaster Course", "Sarah", "Rivera", 4, 4, 45000, "Patong Bay", "full"),
  ms("s057", 11, 22, "Open Water Diver", "Mike", "Chen", 3, 8, 8900, "Kata Beach", "open"),
  ms("s058", 11, 29, "Night Diving Specialty", "Tom", "Hughes", 4, 6, 9500, "Karon Beach", "open"),
  // December
  ms("s059", 12, 6, "Advanced Open Water", "Sarah", "Rivera", 8, 8, 12900, "Patong Bay", "full"),
  ms("s060", 12, 6, "Open Water Diver", "Mike", "Chen", 5, 8, 8900, "Kata Beach", "open"),
  ms("s061", 12, 13, "Rescue Diver", "Tom", "Hughes", 6, 6, 15900, "Karon Beach", "full"),
  ms("s062", 12, 20, "Open Water Diver", "Sarah", "Rivera", 4, 8, 8900, "Patong Bay", "open"),
  ms("s063", 12, 20, "Wreck Diver Specialty", "Mike", "Chen", 3, 6, 13500, "Kata Beach", "open"),
  ms("s064", 12, 27, "Advanced Open Water", "Tom", "Hughes", 6, 8, 12900, "Karon Beach", "open"),
]);

function calEventsForDay(day: number): MockSchedule[] {
  const m = String(calMonth.value + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  const key = `${calYear.value}-${m}-${d}`;
  return mockSchedules.value.filter((s) => s.startDate === key);
}

// Bulk Selection
const selectedBookings = ref<string[]>([]);

// Confirm Dialog
const showConfirmDialog = ref(false);
const confirmTitle = ref("");
const confirmMessage = ref("");
const confirmButtonText = ref("Confirm");
const confirmButtonClass = ref("danger");
let confirmCallback: (() => void) | null = null;

// Print
const printDate = computed(() => new Date().toLocaleString());

const menuItems = [
  { id: "overview", label: "Dashboard", icon: "📊" },
  { id: "bookings", label: "Bookings", icon: "📅", badge: 0 },
  { id: "courses", label: "Courses", icon: "🎓" },
  { id: "schedules", label: "Schedules", icon: "📆" },
  { id: "users", label: "Users", icon: "👥" },
  { id: "inventory", label: "Inventory", icon: "🏊" },
  { id: "reviews", label: "Reviews", icon: "⭐" },
  { id: "reports", label: "Reports", icon: "📈" },
  { id: "emails", label: "Emails", icon: "📧" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const settingsTabs = [
  { id: "business", label: "Business Info" },
  { id: "payment", label: "Payment" },
  { id: "seo", label: "SEO" },
  { id: "social", label: "Social" },
];

const currentPageTitle = computed(() => {
  const item = menuItems.find((i) => i.id === activeView.value);
  return item?.label || "Dashboard";
});

const filteredBookings = computed(() => {
  let result = bookings.value;
  if (searchQuery.value) {
    result = result.filter(
      (b) =>
        b.user?.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        b.course?.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }
  if (statusFilter.value) {
    result = result.filter((b) => b.status === statusFilter.value);
  }
  return result;
});

const users = ref<User[]>([]);

const filteredUsers = computed(() => {
  if (!userSearch.value) return users.value;
  return users.value.filter(
    (u) => u.firstName.toLowerCase().includes(userSearch.value.toLowerCase()) || u.email.toLowerCase().includes(userSearch.value.toLowerCase()),
  );
});

// Mock Inventory Data
const inventory = ref([
  { id: "eq_001", name: "BCD - ScubaPro Hydros Pro", type: "BCD", serialNumber: "SP12345", status: "available", condition: 9, icon: "🎽" },
  { id: "eq_002", name: "Regulator - Apeks XTX200", type: "Regulator", serialNumber: "AP67890", status: "in-use", condition: 8, icon: "🌊" },
  { id: "eq_003", name: "Wetsuit - 3mm Full", type: "Wetsuit", serialNumber: "WS11111", status: "maintenance", condition: 6, icon: "👔" },
  { id: "eq_004", name: "Fins - Mares Avanti Quattro", type: "Fins", serialNumber: "FN22222", status: "available", condition: 9, icon: "🦶" },
  { id: "eq_005", name: "Mask - Atomic Aquatics", type: "Mask", serialNumber: "MK33333", status: "available", condition: 10, icon: "🥽" },
]);

const totalEquipment = computed(() => {
  try {
    return inventory.value.length;
  } catch (error) {
    console.error("Error calculating total equipment:", error);
    return 0;
  }
});

const availableEquipment = computed(() => {
  try {
    return inventory.value.filter((i) => i.status === "available").length;
  } catch (error) {
    console.error("Error calculating available equipment:", error);
    return 0;
  }
});

const inUseEquipment = computed(() => {
  try {
    return inventory.value.filter((i) => i.status === "in-use").length;
  } catch (error) {
    console.error("Error calculating in-use equipment:", error);
    return 0;
  }
});

const maintenanceEquipment = computed(() => {
  try {
    return inventory.value.filter((i) => i.status === "maintenance").length;
  } catch (error) {
    console.error("Error calculating maintenance equipment:", error);
    return 0;
  }
});

// Mock Reviews Data
const reviews = ref([
  {
    id: "rev_001",
    userName: "John Doe",
    courseName: "Open Water Diver",
    rating: 5,
    comment: "Amazing experience! The instructors were professional and patient.",
    date: "2024-01-15",
    status: "approved",
  },
  {
    id: "rev_002",
    userName: "Sarah Smith",
    courseName: "Advanced Open Water",
    rating: 4,
    comment: "Great course, but equipment was a bit worn.",
    date: "2024-01-14",
    status: "pending",
  },
  {
    id: "rev_003",
    userName: "Mike Johnson",
    courseName: "Rescue Diver",
    rating: 5,
    comment: "Challenging but rewarding. Highly recommend!",
    date: "2024-01-13",
    status: "approved",
  },
]);

const filteredReviews = computed(() => {
  if (!reviewFilter.value) return reviews.value;
  return reviews.value.filter((r) => r.status === reviewFilter.value);
});

// Mock Email Templates
const emailTemplates = ref([
  {
    id: "tpl_001",
    name: "Booking Confirmation",
    subject: "Your Dive Course Booking is Confirmed!",
    body: "Dear {{name}},\n\nYour booking for {{course}} on {{date}} has been confirmed.\n\nBest regards,\nDiveBuddy Team",
    variables: ["{{name}}", "{{course}}", "{{date}}"],
    isActive: true,
  },
  {
    id: "tpl_002",
    name: "Payment Receipt",
    subject: "Payment Received - {{amount}}",
    body: "Thank you for your payment of {{amount}} for {{course}}.\n\nTransaction ID: {{transactionId}}",
    variables: ["{{amount}}", "{{course}}", "{{transactionId}}"],
    isActive: true,
  },
  {
    id: "tpl_003",
    name: "Course Reminder",
    subject: "Reminder: Your Course Starts Tomorrow!",
    body: "Hi {{name}},\n\nJust a friendly reminder that your {{course}} starts tomorrow at {{time}}.\n\nPlease arrive 30 minutes early.",
    variables: ["{{name}}", "{{course}}", "{{time}}"],
    isActive: true,
  },
  {
    id: "tpl_004",
    name: "Review Request",
    subject: "How was your diving experience?",
    body: "Hi {{name}},\n\nWe hope you enjoyed your {{course}}!\n\nPlease leave us a review: {{reviewLink}}",
    variables: ["{{name}}", "{{course}}", "{{reviewLink}}"],
    isActive: false,
  },
]);

// Mock Report Data
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const revenueChart = ref([45000, 52000, 48000, 61000, 55000, 67000]);
const bookingTrends = ref([65, 78, 90, 85, 92, 88]);
const revenueByCourse = ref([
  { name: "Open Water", percentage: 35, color: "var(--chart-1)", rotation: 0 },
  { name: "Advanced", percentage: 25, color: "var(--chart-2)", rotation: 126 },
  { name: "Rescue", percentage: 20, color: "var(--chart-3)", rotation: 216 },
  { name: "Specialty", percentage: 20, color: "var(--chart-4)", rotation: 288 },
]);
const topCourses = ref([
  { id: "c001", name: "Open Water Diver", bookings: 45, revenue: 135000, rating: 4.8 },
  { id: "c002", name: "Advanced Open Water", bookings: 32, revenue: 96000, rating: 4.9 },
  { id: "c003", name: "Rescue Diver", bookings: 18, revenue: 72000, rating: 4.7 },
  { id: "c004", name: "Deep Diver Specialty", bookings: 15, revenue: 45000, rating: 4.6 },
]);

// Settings
const settings = ref({
  businessName: "DiveBuddy SMO",
  email: "info@divebuddy.com",
  phone: "+66 76 123 456",
  address: "123 Beach Road, Patong, Phuket 83150",
  currency: "THB",
  paymentGateway: "promptpay",
  taxRate: 7,
  depositPercent: 30,
  siteTitle: "DiveBuddy - Professional Diving Courses in Phuket",
  metaDescription: "PADI certified diving courses in Phuket. Open Water, Advanced, Rescue Diver and more.",
  keywords: "diving, scuba, padi, phuket, open water, advanced diver",
  facebook: "https://facebook.com/divebuddy",
  instagram: "https://instagram.com/divebuddy",
  line: "@divebuddy",
  youtube: "https://youtube.com/divebuddy",
});

onMounted(async () => {
  await Promise.all([fetchCourses(), fetchBookings(), fetchSchedules()]);
  users.value = [
    { id: "usr_001", email: "admin@divebuddy.com", firstName: "Admin", lastName: "System", role: "admin", divesCount: 150, joinedDate: "2020-01-15" },
    { id: "usr_002", email: "john@example.com", firstName: "John", lastName: "Doe", role: "customer", divesCount: 12, joinedDate: "2023-06-20" },
    {
      id: "usr_003",
      email: "instructor@divebuddy.com",
      firstName: "Mike",
      lastName: "Ocean",
      role: "instructor",
      divesCount: 500,
      joinedDate: "2019-03-10",
    },
  ];
});

function formatCurrency(value: number): string {
  return `฿${value.toLocaleString()}`;
}

// TODO: Connect to booking API
function confirmBooking(_id: string) {
  success("Booking confirmed");
}

function cancelBooking(_id: string) {
  warning("Booking cancelled");
}

function exportBookings() {
  success("Bookings exported to CSV");
}

// TODO: Connect to course API
function editCourse(_course: Record<string, unknown>) {
  success("Course editor opened");
}

function toggleCourse(_id: string) {
  success("Course status toggled");
}

function updateRole(_userId: string, _role: string) {
  success("User role updated");
}

// TODO: Connect to inventory API
function editEquipment(_item: Record<string, unknown>) {
  success("Equipment editor opened");
}

function logMaintenance(_id: string) {
  success("Maintenance logged");
}

// TODO: Connect to review API
function approveReview(_id: string) {
  success("Review approved");
}

function rejectReview(_id: string) {
  warning("Review rejected");
}

function replyToReview(_id: string) {
  success("Reply sent");
}

function generateReport() {
  success("Report generated");
}

// TODO: Connect to template API
function editTemplate(_template: Record<string, unknown>) {
  success("Template editor opened");
}

function previewTemplate(_template: Record<string, unknown>) {
  success("Template preview opened");
}

function sendTestEmail(_id: string) {
  success("Test email sent");
}

function handleSaveSettings(updatedSettings: typeof settings.value) {
  Object.assign(settings.value, updatedSettings);
  success("Settings saved successfully!");
}

function resetSettings() {
  success("Settings reset to defaults");
}

// Bulk Actions
function toggleBookingSelection(id: string) {
  const index = selectedBookings.value.indexOf(id);
  if (index > -1) {
    selectedBookings.value.splice(index, 1);
  } else {
    selectedBookings.value.push(id);
  }
}

function handleBulkAction(actionId: string) {
  if (selectedBookings.value.length === 0) {
    warning("Please select at least one booking");
    return;
  }

  switch (actionId) {
    case "confirm":
      showConfirm("Confirm Bookings", `Are you sure you want to confirm ${selectedBookings.value.length} bookings?`, "Confirm", "primary", () => {
        success(`Confirmed ${selectedBookings.value.length} bookings`);
        selectedBookings.value = [];
      });
      break;
    case "cancel":
      showConfirm("Cancel Bookings", `Are you sure you want to cancel ${selectedBookings.value.length} bookings?`, "Cancel", "danger", () => {
        success(`Cancelled ${selectedBookings.value.length} bookings`);
        selectedBookings.value = [];
      });
      break;
    case "export":
      success(`Exported ${selectedBookings.value.length} bookings to CSV`);
      break;
  }
}

// Confirm Dialog
function showConfirm(title: string, message: string, buttonText: string, buttonClass: string, callback: () => void) {
  confirmTitle.value = title;
  confirmMessage.value = message;
  confirmButtonText.value = buttonText;
  confirmButtonClass.value = buttonClass;
  confirmCallback = callback;
  showConfirmDialog.value = true;
}

function handleConfirmAction() {
  if (confirmCallback) {
    confirmCallback();
    confirmCallback = null;
  }
  showConfirmDialog.value = false;
}

// Print
function printReport() {
  window.print();
}
</script>

<style scoped>
.admin-page {
  display: flex;
  min-height: 100vh;
  background: var(--lightgray);
}

/* Sidebar */
.admin-sidebar {
  width: 260px;
  background: var(--deepblue);
  color: var(--white);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 100;
}

.sidebar-header {
  padding: var(--gap-md);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
}

.logo-icon {
  font-size: var(--font-lg);
}

.logo-text {
  font-weight: 700;
  font-size: var(--font-md);
}

.logo-badge {
  background: var(--orange);
  padding: 2px 8px;
  border-radius: var(--radius-xs);
  font-size: var(--font-xs);
  font-weight: 600;
}

.sidebar-nav {
  flex: 1;
  padding: var(--gap-sm) 0;
  overflow-y: auto;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  padding: var(--gap-sm) var(--gap-md);
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.2s;
}

.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--white);
}

.sidebar-item.active {
  background: var(--orange);
  color: var(--white);
}

.sidebar-icon {
  font-size: var(--font-md);
}

.sidebar-label {
  flex: 1;
}

.sidebar-badge {
  background: var(--orange);
  padding: 2px 6px;
  border-radius: 10px;
  font-size: var(--font-xs);
}

.sidebar-footer {
  padding: var(--gap-md);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  margin-bottom: var(--gap-sm);
}

.user-name {
  display: block;
  font-weight: 600;
}

.user-role {
  font-size: var(--font-sm);
  opacity: 0.7;
  text-transform: capitalize;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  width: 100%;
  padding: var(--gap-xs) var(--gap-sm);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: var(--white);
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.btn-logout:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Main Content */
.admin-main {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
}

.admin-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--gap-md) var(--gap-lg);
  background: var(--white);
  border-bottom: 1px solid var(--gray);
  position: sticky;
  top: 0;
  z-index: 50;
}

.page-title {
  font-size: var(--font-lg);
  color: var(--darkblue);
  margin: 0;
}

.topbar-actions {
  display: flex;
  gap: var(--gap-sm);
}

.btn-icon {
  padding: var(--gap-xs);
  background: transparent;
  border: none;
  font-size: var(--font-md);
  cursor: pointer;
}

/* Content Area */
.admin-content-area {
  flex: 1;
  padding: var(--gap-lg);
  overflow-y: auto;
}

.view-section {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
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
}

.stat-icon {
  font-size: var(--font-2xl);
}

.stat-details {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--darkblue);
}

.stat-desc {
  font-size: var(--font-sm);
  color: var(--gray);
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
  padding: var(--gap-md);
  box-shadow: var(--shadow-sm);
}

.card-wide {
  grid-column: 1 / -1;
}

.dashboard-card h3 {
  margin: 0 0 var(--gap-md);
  color: var(--darkblue);
  font-size: var(--font-md);
}

/* Chart */
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
}

.chart-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  height: 100%;
  position: relative;
}

.bar-fill {
  width: 100%;
  background: linear-gradient(to top, var(--deepblue), var(--orange));
  border-radius: var(--radius-xs) var(--radius-xs) 0 0;
  transition: height 0.3s ease;
}

.bar-label {
  position: absolute;
  bottom: -25px;
  font-size: var(--font-sm);
  color: var(--gray);
}

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
  padding: var(--gap-sm);
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
  color: var(--darkblue);
}

.booking-course,
.schedule-time {
  font-size: var(--font-sm);
  color: var(--gray);
}

.booking-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: var(--font-xs);
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
}

/* View Header */
.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap-lg);
}

.filter-bar {
  display: flex;
  gap: var(--gap-sm);
}

.search-input,
.filter-select {
  padding: var(--gap-sm) var(--gap-md);
  border: 1px solid var(--gray);
  border-radius: var(--radius-sm);
  background: var(--white);
}

.search-input {
  width: 300px;
}

/* Data Table */
.data-table-wrapper {
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: var(--gap-sm) var(--gap-md);
  text-align: left;
  border-bottom: 1px solid var(--lightgray);
}

.data-table th {
  background: var(--deepblue);
  color: var(--white);
  font-weight: 600;
}

.cell-id {
  font-family: monospace;
  font-size: var(--font-sm);
  color: var(--gray);
}

.cell-actions {
  display: flex;
  gap: var(--gap-xs);
}

.status-pill {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: var(--font-xs);
  text-transform: capitalize;
}

.status-pill.pending {
  background: var(--status-pending-bg);
  color: var(--status-pending-text);
}
.status-pill.confirmed {
  background: var(--status-confirmed-bg);
  color: var(--status-confirmed-text);
}
.status-pill.cancelled {
  background: var(--status-cancelled-bg);
  color: var(--status-cancelled-text);
}

/* Courses Grid */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--gap-md);
}

.course-card {
  background: var(--white);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.course-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.course-content {
  padding: var(--gap-md);
}

.course-title {
  margin: 0 0 var(--gap-xs);
  color: var(--darkblue);
}

.course-meta {
  font-size: var(--font-sm);
  color: var(--gray);
  margin-bottom: var(--gap-sm);
}

.course-price {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--orange);
  margin-bottom: var(--gap-sm);
}

.course-actions {
  display: flex;
  gap: var(--gap-sm);
}

/* Users List */
.users-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
}

.user-card {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  padding: var(--gap-md);
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--deepblue);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.user-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.user-fullname {
  font-weight: 600;
  color: var(--darkblue);
}

.user-email {
  font-size: var(--font-sm);
  color: var(--gray);
}

.role-select {
  padding: var(--gap-xs) var(--gap-sm);
  border: 1px solid var(--gray);
  border-radius: var(--radius-sm);
  background: var(--white);
}

/* ── Calendar ── */
.cal-wrap {
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.cal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--gap-md) var(--gap-lg);
  background: var(--deepblue);
  color: var(--white);
  gap: var(--gap-md);
  flex-wrap: wrap;
}

.cal-header__nav {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
}

.cal-nav-btn {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: var(--radius-sm);
  color: var(--white);
  font-size: var(--font-lg);
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.cal-nav-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.cal-header__title {
  display: flex;
  align-items: baseline;
  gap: var(--gap-sm);
}

.cal-month-label {
  font-size: var(--font-xl);
  font-weight: 700;
  margin: 0;
  color: var(--white);
}

.cal-year-label {
  font-size: var(--font-md);
  opacity: 0.8;
}

.cal-header__actions {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  flex-wrap: wrap;
}

.cal-today-btn {
  padding: var(--gap-xs) var(--gap-md);
  background: var(--orange);
  color: var(--white);
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.cal-today-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.cal-legend {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  font-size: var(--font-xs);
  opacity: 0.9;
}

.cal-legend__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.cal-legend__dot--open {
  background: var(--status-confirmed-text);
}
.cal-legend__dot--full {
  background: var(--status-pending-text);
}
.cal-legend__dot--closed {
  background: var(--status-cancelled-text);
}
.cal-legend__text {
  margin-right: var(--gap-xs);
}

/* Grid */
.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-left: 1px solid var(--lightgray);
  border-top: 1px solid var(--lightgray);
}

.cal-dow {
  padding: var(--gap-sm);
  text-align: center;
  font-size: var(--font-xs);
  font-weight: 700;
  color: var(--gray);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: var(--lightgray);
  border-right: 1px solid var(--lightgray);
  border-bottom: 1px solid var(--lightgray);
}

.cal-cell {
  min-height: 80px;
  padding: var(--gap-xs);
  border-right: 1px solid var(--lightgray);
  border-bottom: 1px solid var(--lightgray);
  cursor: pointer;
  transition: background 0.15s;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cal-cell:hover {
  background: rgba(var(--orange-rgb, 239, 108, 51), 0.06);
}

.cal-cell--blank {
  background: var(--lightgray);
  cursor: default;
}

.cal-cell--blank:hover {
  background: var(--lightgray);
}

.cal-cell--today .cal-cell__num {
  background: var(--orange);
  color: var(--white);
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cal-cell--selected {
  background: rgba(var(--deepblue-rgb, 10, 22, 40), 0.06);
  outline: 2px solid var(--deepblue);
  outline-offset: -2px;
}

.cal-cell__num {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--darkblue);
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cal-cell__dots {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  align-items: center;
}

.cal-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.cal-dot--open {
  background: var(--status-confirmed-text);
}
.cal-dot--full {
  background: var(--status-pending-text);
}
.cal-dot--closed {
  background: var(--status-cancelled-text);
}

.cal-dot-more {
  font-size: var(--font-xs);
  color: var(--gray);
  font-weight: 600;
}

/* Day Panel */
.cal-day-panel {
  border-top: 2px solid var(--lightgray);
  padding: var(--gap-lg);
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}

.cal-day-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cal-day-panel__title {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--darkblue);
  margin: 0;
}

.cal-day-panel__count {
  font-size: var(--font-sm);
  color: var(--gray);
  background: var(--lightgray);
  padding: 2px var(--gap-sm);
  border-radius: var(--radius-xs);
}

.cal-day-panel__empty {
  color: var(--gray);
  font-size: var(--font-sm);
  text-align: center;
  padding: var(--gap-md);
}

/* Event Cards */
.cal-event {
  display: flex;
  gap: var(--gap-md);
  background: var(--lightgray);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.cal-event__bar {
  width: 5px;
  flex-shrink: 0;
}

.cal-event__bar--open {
  background: var(--status-confirmed-text);
}
.cal-event__bar--full {
  background: var(--status-pending-text);
}
.cal-event__bar--closed {
  background: var(--status-cancelled-text);
}

.cal-event__body {
  padding: var(--gap-sm) var(--gap-sm) var(--gap-sm) 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
}

.cal-event__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cal-event__course {
  font-weight: 700;
  font-size: var(--font-sm);
  color: var(--darkblue);
}

.cal-event__status {
  font-size: var(--font-xs);
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: capitalize;
}

.cal-event__status--open {
  background: var(--status-confirmed-bg);
  color: var(--status-confirmed-text);
}
.cal-event__status--full {
  background: var(--status-pending-bg);
  color: var(--status-pending-text);
}
.cal-event__status--closed {
  background: var(--status-cancelled-bg);
  color: var(--status-cancelled-text);
}

.cal-event__meta {
  display: flex;
  gap: var(--gap-md);
  font-size: var(--font-xs);
  color: var(--gray);
  flex-wrap: wrap;
}

.cal-event__price {
  font-weight: 700;
  color: var(--orange);
  margin-left: auto;
}

@media (max-width: 768px) {
  .cal-cell {
    min-height: 52px;
  }
  .cal-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .cal-event__meta {
    flex-direction: column;
    gap: 2px;
  }
  .cal-event__price {
    margin-left: 0;
  }
}

/* Inventory Styles */
.inventory-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap-md);
  margin-bottom: var(--gap-lg);
}

.inv-stat {
  background: var(--white);
  padding: var(--gap-md);
  border-radius: var(--radius-md);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.inv-number {
  display: block;
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--deepblue);
}

.inv-label {
  font-size: var(--font-sm);
  color: var(--gray);
}

.inventory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--gap-md);
}

.inventory-card {
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Card header — icon + status badge */
.inv-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--gap-md);
  background: var(--lightgray);
  border-bottom: 1px solid var(--lightgray);
}

.inv-card-icon {
  font-size: var(--font-2xl);
  line-height: 1;
}

.inv-card-status {
  font-size: var(--font-xs);
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  text-transform: capitalize;
  white-space: nowrap;
}

.inv-card-status-available {
  background: var(--status-confirmed-bg);
  color: var(--status-confirmed-text);
}
.inv-card-status-in-use {
  background: var(--status-info-bg);
  color: var(--status-info-text);
}
.inv-card-status-maintenance {
  background: var(--status-cancelled-bg);
  color: var(--status-cancelled-text);
}

/* Card body */
.inv-card-body {
  padding: var(--gap-md);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
}

.inv-card-name {
  margin: 0;
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--darkblue);
  line-height: 1.3;
}

.inv-card-type {
  font-size: var(--font-xs);
  color: var(--gray);
  margin: 0;
}

.inv-card-serial {
  font-size: var(--font-xs);
  color: var(--gray);
  font-family: monospace;
  margin: 0;
}

/* Condition bar */
.inv-card-condition {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  margin-top: var(--gap-sm);
}

.inv-card-condition-label {
  font-size: var(--font-xs);
  color: var(--gray);
  white-space: nowrap;
}

.inv-card-condition-bar {
  flex: 1;
  height: 6px;
  background: var(--lightgray);
  border-radius: 3px;
  overflow: hidden;
}

.inv-card-condition-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease;
}

.inv-card-condition-val {
  font-size: var(--font-xs);
  font-weight: 700;
  color: var(--darkblue);
  white-space: nowrap;
}

/* Card footer */
.inv-card-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-xs);
  padding: var(--gap-sm) var(--gap-md);
  border-top: 1px solid var(--lightgray);
  background: var(--white);
}

.inv-card-btn {
  padding: var(--gap-xs) var(--gap-xs);
  border: none;
  border-radius: var(--radius-xs);
  font-size: var(--font-xs);
  font-weight: 600;
  cursor: pointer;
  background: var(--lightgray);
  color: var(--darkblue);
  transition: background 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  width: 100%;
}

.inv-card-btn:hover {
  background: var(--deepblue);
  color: var(--white);
}

.inv-card-btn-maint {
  background: var(--status-pending-bg);
  color: var(--status-pending-text);
}

.inv-card-btn-maint:hover {
  background: var(--status-pending-text);
  color: var(--white);
}

@media (max-width: 768px) {
  .inventory-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}

@media (max-width: 480px) {
  .inventory-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Reviews Styles */
.review-filters {
  display: flex;
  gap: var(--gap-sm);
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}

.review-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: var(--gap-md);
  box-shadow: var(--shadow-sm);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap-sm);
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
}

.reviewer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--deepblue);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.reviewer-info h4 {
  margin: 0;
  color: var(--darkblue);
}

.review-course {
  font-size: var(--font-sm);
  color: var(--gray);
  margin: 0;
}

.review-rating {
  display: flex;
  gap: 2px;
}

.star {
  color: var(--star-empty);
  font-size: var(--font-md);
}

.star.filled {
  color: var(--star-filled);
}

.review-text {
  color: var(--darkblue);
  line-height: 1.5;
  margin-bottom: var(--gap-sm);
}

.review-meta {
  display: flex;
  gap: var(--gap-md);
  font-size: var(--font-sm);
  color: var(--gray);
  margin-bottom: var(--gap-sm);
}

.review-status {
  padding: 2px 8px;
  border-radius: 8px;
  font-size: var(--font-xs);
  text-transform: capitalize;
}

.review-status.pending {
  background: var(--status-pending-bg);
  color: var(--status-pending-text);
}

.review-status.approved {
  background: var(--status-confirmed-bg);
  color: var(--status-confirmed-text);
}

.review-actions {
  display: flex;
  gap: var(--gap-sm);
}

/* Reports Styles */
.reports-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap-lg);
}

.report-filters {
  display: flex;
  gap: var(--gap-sm);
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-lg);
}

.report-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: var(--gap-md);
  box-shadow: var(--shadow-sm);
}

.report-card h3 {
  margin: 0 0 var(--gap-md);
  color: var(--darkblue);
}

.card-full {
  grid-column: 1 / -1;
}

.report-chart {
  height: 200px;
  position: relative;
}

.trend-line {
  position: relative;
  height: 100%;
  border-left: 2px solid var(--gray);
  border-bottom: 2px solid var(--gray);
}

.trend-point {
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--orange);
  border-radius: 50%;
  transform: translate(-50%, 50%);
}

.point-value {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--font-xs);
  color: var(--darkblue);
  font-weight: 600;
}

.pie-chart {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  margin: 0 auto;
  background: conic-gradient(var(--chart-1) 0deg 126deg, var(--chart-2) 126deg 216deg, var(--chart-3) 216deg 288deg, var(--chart-4) 288deg 360deg);
}

/* Templates Styles */
.templates-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}

.template-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: var(--gap-md);
  box-shadow: var(--shadow-sm);
}

.template-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap-sm);
}

.template-header h3 {
  margin: 0;
  color: var(--darkblue);
}

.template-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: var(--font-xs);
}

.template-status.active {
  background: var(--status-confirmed-bg);
  color: var(--status-confirmed-text);
}

.template-status.inactive {
  background: var(--gray);
  color: var(--white);
}

.template-subject {
  font-size: var(--font-sm);
  color: var(--gray);
  margin-bottom: var(--gap-sm);
}

.template-preview {
  background: var(--lightgray);
  padding: var(--gap-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  color: var(--darkblue);
  margin-bottom: var(--gap-sm);
}

.template-variables {
  display: flex;
  gap: var(--gap-xs);
  margin-bottom: var(--gap-sm);
}

.var-tag {
  padding: 2px 8px;
  background: var(--status-neutral-bg);
  color: var(--status-neutral-text);
  border-radius: 4px;
  font-size: var(--font-xs);
  font-family: monospace;
}

.template-actions {
  display: flex;
  gap: var(--gap-sm);
}

/* Settings Styles */
.settings-container {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: var(--gap-lg);
  box-shadow: var(--shadow-sm);
}

.settings-tabs {
  display: flex;
  gap: var(--gap-sm);
  margin-bottom: var(--gap-lg);
  border-bottom: 2px solid var(--lightgray);
  padding-bottom: var(--gap-sm);
}

.settings-tab {
  padding: var(--gap-sm) var(--gap-md);
  background: transparent;
  border: none;
  color: var(--gray);
  cursor: pointer;
  font-weight: 500;
}

.settings-tab.active {
  color: var(--darkblue);
  border-bottom: 2px solid var(--orange);
  margin-bottom: -10px;
}

.settings-panel h3 {
  margin: 0 0 var(--gap-lg);
  color: var(--darkblue);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-md);
}

.form-input {
  padding: var(--gap-sm) var(--gap-md);
  border: 1px solid var(--gray);
  border-radius: var(--radius-sm);
  font-size: var(--font-md);
}

.form-input:focus {
  outline: none;
  border-color: var(--orange);
}

.settings-actions {
  display: flex;
  gap: var(--gap-sm);
  margin-top: var(--gap-lg);
  padding-top: var(--gap-lg);
  border-top: 1px solid var(--lightgray);
}

/* Responsive */
@media (max-width: 1024px) {
  .stats-row,
  .inventory-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-grid,
  .reports-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) and (min-width: 769px) {
  .admin-sidebar {
    width: 72px;
  }

  .sidebar-label,
  .sidebar-badge,
  .logo-text,
  .logo-badge,
  .user-name,
  .user-role {
    display: none;
  }

  .sidebar-item {
    justify-content: center;
    padding: var(--gap-sm);
  }

  .admin-main {
    margin-left: 72px;
  }
}

@media (max-width: 768px) {
  .admin-page {
    flex-direction: column;
  }

  .admin-sidebar {
    width: 100%;
    position: fixed;
    bottom: 0;
    top: auto;
    height: auto;
    flex-direction: row;
    z-index: 200;
    overflow-x: auto;
    padding: var(--gap-xs) 0;
  }

  .sidebar-header,
  .sidebar-footer {
    display: none;
  }

  .sidebar-nav {
    display: flex;
    flex-direction: row;
    padding: 0;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .sidebar-item {
    flex-direction: column;
    justify-content: center;
    padding: var(--gap-xs);
    min-width: 56px;
    font-size: var(--font-xs);
    gap: 4px;
  }

  .sidebar-label {
    font-size: var(--font-xs);
  }

  .admin-main {
    margin-left: 0;
    padding-bottom: 80px;
  }

  .admin-topbar {
    padding: var(--gap-sm) var(--gap-md);
  }

  .page-title {
    font-size: var(--font-md);
  }

  .stats-row,
  .inventory-stats {
    grid-template-columns: 1fr 1fr;
  }

  .courses-grid,
  .inventory-grid {
    grid-template-columns: 1fr;
  }

  .view-header {
    flex-direction: column;
    gap: var(--gap-sm);
    align-items: stretch;
  }

  .header-actions {
    display: flex;
    gap: var(--gap-sm);
  }

  .data-table-wrapper {
    overflow-x: auto;
  }

  .data-table {
    min-width: 600px;
  }
}

@media (max-width: 480px) {
  .stats-row,
  .inventory-stats {
    grid-template-columns: 1fr;
  }

  .admin-content-area {
    padding: var(--gap-sm);
  }
}
</style>
