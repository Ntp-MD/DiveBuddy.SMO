<template>
  <div class="dashboard-overlay" @click="closeDashboard">
    <div class="dashboard-modal" @click.stop>
      <div class="dashboard-header">
        <div class="user-info">
          <div class="user-avatar">
            <img :src="currentUser.avatar" :alt="currentUser.firstName" />
          </div>
          <div class="user-details">
            <h2 class="user-name">{{ currentUser.firstName }} {{ currentUser.lastName }}</h2>
            <p class="user-role">{{ getRoleDisplay(currentUser.role) }}</p>
            <p class="user-email">{{ currentUser.email }}</p>
          </div>
        </div>
        <button class="close-btn" @click="closeDashboard" aria-label="Close dashboard">×</button>
      </div>

      <div class="dashboard-content">
        <div class="dashboard-stats">
          <div class="stat-card">
            <div class="stat-icon">
              <span>🤿</span>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">{{ currentUser.divesCount }}</h3>
              <p class="stat-label">Total Dives</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <span>🎓</span>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">{{ currentUser.certifications.length }}</h3>
              <p class="stat-label">Certifications</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <span>📅</span>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">{{ formatDate(currentUser.joinedDate) }}</h3>
              <p class="stat-label">Member Since</p>
            </div>
          </div>
        </div>

        <div class="dashboard-sections">
          <div class="dashboard-section">
            <h3 class="section-title">Certifications</h3>
            <div class="certifications-list">
              <div v-if="currentUser.certifications.length > 0" class="certification-items">
                <div v-for="cert in currentUser.certifications" :key="cert" class="certification-item">
                  <span class="cert-icon">🏆</span>
                  <span class="cert-name">{{ cert }}</span>
                </div>
              </div>
              <div v-else class="no-certifications">
                <p>No certifications yet. <a href="#courses" class="link">Start your diving journey!</a></p>
              </div>
            </div>
          </div>

          <div class="dashboard-section">
            <h3 class="section-title">Quick Actions</h3>
            <div class="quick-actions">
              <button class="action-btn" @click="navigateToSection('#courses')">
                <span class="btn-icon">📚</span>
                <span class="btn-text">Browse Courses</span>
              </button>
              <button class="action-btn" @click="navigateToSection('#destinations')">
                <span class="btn-icon">🌍</span>
                <span class="btn-text">View Destinations</span>
              </button>
              <button class="action-btn" @click="navigateToSection('#gallery')">
                <span class="btn-icon">📸</span>
                <span class="btn-text">Photo Gallery</span>
              </button>
              <button class="action-btn" @click="navigateToSection('#contact')">
                <span class="btn-icon">💬</span>
                <span class="btn-text">Contact Us</span>
              </button>
            </div>
          </div>

          <div class="dashboard-section" v-if="currentUser.role === 'admin' || currentUser.role === 'instructor'">
            <h3 class="section-title">Admin Tools</h3>
            <div class="admin-actions">
              <button class="admin-btn" @click="showUserManagement">
                <span class="btn-icon">👥</span>
                <span class="btn-text">User Management</span>
              </button>
              <button class="admin-btn" @click="showCourseManagement">
                <span class="btn-icon">📖</span>
                <span class="btn-text">Course Management</span>
              </button>
              <button class="admin-btn" @click="showBookingManagement">
                <span class="btn-icon">📅</span>
                <span class="btn-text">Booking Management</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-footer">
        <button class="logout-btn" @click="handleLogout">
          <span class="logout-icon">🚪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  avatar: string;
  joinedDate: string;
  certifications: string[];
  divesCount: number;
}

const { currentUser } = defineProps<{
  currentUser: User;
}>();

const emit = defineEmits<{
  close: [];
  logout: [];
  navigate: [section: string];
}>();

const closeDashboard = () => {
  emit("close");
};

const handleLogout = () => {
  emit("logout");
  emit("close");
};

const navigateToSection = (section: string) => {
  emit("navigate", section);
  emit("close");
};

const getRoleDisplay = (role: string): string => {
  const roleMap: Record<string, string> = {
    admin: "Administrator",
    instructor: "Diving Instructor",
    user: "Dive Enthusiast",
  };
  return roleMap[role] || "User";
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.getFullYear().toString();
};

// TODO: Connect to user management page
const showUserManagement = () => {
  /* navigate to user management */
};

// TODO: Connect to course management page
const showCourseManagement = () => {
  /* navigate to course management */
};

// TODO: Connect to booking management page
const showBookingManagement = () => {
  /* navigate to booking management */
};
</script>

<style scoped>
.dashboard-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.dashboard-modal {
  background: var(--white);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
}

.dashboard-header {
  padding: var(--gap-md);
  border-bottom: 1px solid var(--lightgray);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
}

.user-avatar {
  width: calc(var(--gap-md) * 3);
  height: calc(var(--gap-md) * 3);
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.user-role {
  font-size: var(--font-sm);
  color: var(--orange);
  font-weight: 600;
  margin-bottom: calc(var(--gap-xs) * 0.5);
}

.user-email {
  font-size: var(--font-sm);
  color: var(--gray);
}

.close-btn {
  background: none;
  border: none;
  font-size: var(--font-lg);
  color: var(--gray);
  cursor: pointer;
  width: calc(var(--gap-md) * 2);
  height: calc(var(--gap-md) * 2);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--lightgray);
  color: var(--darkblue);
}

.dashboard-content {
  padding: var(--gap-md);
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--gap-md);
  margin-bottom: calc(var(--gap-md) * 1.5);
}

.stat-card {
  background: var(--lightgray);
  padding: var(--gap-md);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-orange);
}

.stat-icon {
  font-size: var(--font-xl);
  width: calc(var(--gap-md) * 2);
  height: calc(var(--gap-md) * 2);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--orange);
  border-radius: 50%;
  flex-shrink: 0;
}

.stat-number {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: calc(var(--gap-xs) * 0.5);
}

.stat-label {
  font-size: var(--font-sm);
  color: var(--gray);
}

.dashboard-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--gap-md);
}

.dashboard-section {
  background: var(--white);
  border: 1px solid var(--lightgray);
  border-radius: var(--radius-md);
  padding: var(--gap-md);
}

.certification-items {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
}

.certification-item {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  padding: var(--gap-xs);
  background: var(--lightgray);
  border-radius: var(--radius-sm);
}

.cert-icon {
  font-size: var(--font-md);
}

.cert-name {
  font-size: var(--font-sm);
  color: var(--deepblue);
  font-weight: 500;
}

.no-certifications {
  text-align: center;
  padding: var(--gap-md);
  color: var(--gray);
}

.link {
  color: var(--orange);
  text-decoration: none;
  font-weight: 600;
}

.link:hover {
  color: var(--darkblue);
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-sm);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  padding: var(--gap-sm);
  background: var(--white);
  border: 1px solid var(--lightgray);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: var(--font-sm);
  color: var(--deepblue);
}

.action-btn:hover {
  background: var(--orange);
  color: var(--white);
  border-color: var(--orange);
  transform: translateY(-1px);
}

.btn-icon {
  font-size: var(--font-md);
}

.admin-actions {
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
}

.admin-btn {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  padding: var(--gap-sm);
  background: var(--darkblue);
  color: var(--white);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: var(--font-sm);
}

.admin-btn:hover {
  background: var(--deepblue);
  transform: translateY(-1px);
}

.dashboard-footer {
  padding: var(--gap-md);
  border-top: 1px solid var(--lightgray);
  text-align: center;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  margin: 0 auto;
  padding: var(--gap-sm) var(--gap-md);
  background: rgba(255, 0, 0, 0.1);
  color: var(--orange);
  border: 1px solid rgba(255, 0, 0, 0.2);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: var(--font-sm);
  font-weight: 600;
}

.logout-btn:hover {
  background: var(--orange);
  color: var(--white);
  border-color: var(--orange);
}

.logout-icon {
  font-size: var(--font-md);
}

@media (max-width: 768px) {
  .dashboard-modal {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    margin: 0;
    border-radius: 0;
  }

  .dashboard-stats {
    grid-template-columns: 1fr;
  }

  .dashboard-sections {
    grid-template-columns: 1fr;
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }

  .user-info {
    flex-direction: column;
    text-align: center;
  }
}
</style>
