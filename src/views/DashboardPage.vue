<template>
  <div class="dashboard-page">
    <header class="dashboard-page-header">
      <div class="dashboard-page-header-inner">
        <router-link to="/" class="dashboard-page-logo">DiveBuddy</router-link>
        <div class="dashboard-page-header-actions">
          <router-link to="/" class="dashboard-page-nav-link">← Back to Home</router-link>
          <button class="dashboard-page-logout-btn" @click="handleLogout">
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>

    <main class="dashboard-page-main" v-if="user">
      <section class="dashboard-page-profile">
        <div class="dashboard-page-user-info">
          <div class="dashboard-page-avatar">
            <img v-if="user.avatar" :src="user.avatar" :alt="`${user.firstName} ${user.lastName}`" @error="onAvatarError" ref="avatarImgRef" />
            <span v-else class="dashboard-page-avatar-initials">{{ userInitials }}</span>
          </div>
          <div class="dashboard-page-user-details">
            <p class="dashboard-page-greeting">Welcome back,</p>
            <h1 class="dashboard-page-user-name">{{ user.firstName }} {{ user.lastName }}</h1>
            <p class="dashboard-page-user-role">{{ getRoleDisplay(user.role) }}</p>
            <p class="dashboard-page-user-email">{{ user.email }}</p>
          </div>
        </div>
      </section>

      <section class="dashboard-page-stats">
        <div class="dashboard-page-stat-card">
          <div class="dashboard-page-stat-icon">🤿</div>
          <div class="dashboard-page-stat-info">
            <h3 class="dashboard-page-stat-number">{{ user.divesCount ?? 0 }}</h3>
            <p class="dashboard-page-stat-label">Total Dives</p>
          </div>
        </div>
        <div class="dashboard-page-stat-card">
          <div class="dashboard-page-stat-icon">🎓</div>
          <div class="dashboard-page-stat-info">
            <h3 class="dashboard-page-stat-number">{{ user.certifications?.length ?? 0 }}</h3>
            <p class="dashboard-page-stat-label">Certifications</p>
          </div>
        </div>
        <div class="dashboard-page-stat-card">
          <div class="dashboard-page-stat-icon">📅</div>
          <div class="dashboard-page-stat-info">
            <h3 class="dashboard-page-stat-number">{{ formatYear(user.joinedDate) }}</h3>
            <p class="dashboard-page-stat-label">Joined {{ formatJoinedDate(user.joinedDate) }}</p>
          </div>
        </div>
      </section>

      <div class="dashboard-page-sections">
        <section class="dashboard-page-section">
          <h3 class="dashboard-page-section-title">Certifications</h3>
          <div v-if="user.certifications && user.certifications.length > 0" class="dashboard-page-cert-list">
            <div v-for="cert in user.certifications" :key="cert" class="dashboard-page-cert-item">
              <span class="dashboard-page-cert-icon">🏆</span>
              <span class="dashboard-page-cert-name">{{ cert }}</span>
            </div>
          </div>
          <div v-else class="dashboard-page-empty">
            <p>No certifications yet. <router-link to="/#courses" class="dashboard-page-link">Start your diving journey!</router-link></p>
          </div>
        </section>

        <section class="dashboard-page-section">
          <h3 class="dashboard-page-section-title">Quick Actions</h3>
          <div class="dashboard-page-actions">
            <router-link to="/#courses" class="dashboard-page-action-btn">
              <span class="dashboard-page-action-icon">📚</span>
              <span>Browse Courses</span>
            </router-link>
            <router-link to="/#destinations" class="dashboard-page-action-btn">
              <span class="dashboard-page-action-icon">🌍</span>
              <span>View Destinations</span>
            </router-link>
            <router-link to="/#gallery" class="dashboard-page-action-btn">
              <span class="dashboard-page-action-icon">📸</span>
              <span>Photo Gallery</span>
            </router-link>
            <router-link to="/#contact" class="dashboard-page-action-btn">
              <span class="dashboard-page-action-icon">💬</span>
              <span>Contact Us</span>
            </router-link>
          </div>
        </section>

        <section v-if="user.role === 'admin' || user.role === 'instructor'" class="dashboard-page-section">
          <h3 class="dashboard-page-section-title">Admin Tools</h3>
          <div class="dashboard-page-admin-actions">
            <router-link to="/admin" class="dashboard-page-admin-btn">
              <span class="dashboard-page-action-icon">⚙️</span>
              <span>Admin Panel</span>
            </router-link>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.currentUser);
const avatarImgRef = ref<HTMLImageElement | null>(null);
const avatarError = ref(false);

const userInitials = computed(() => {
  if (!user.value) return "?";
  return `${user.value.firstName[0] ?? ""}${user.value.lastName[0] ?? ""}`;
});

const onAvatarError = () => {
  avatarError.value = true;
  if (avatarImgRef.value) avatarImgRef.value.style.display = "none";
};

const getRoleDisplay = (role: string): string => {
  const roleMap: Record<string, string> = {
    admin: "Administrator",
    instructor: "Diving Instructor",
    customer: "Dive Enthusiast",
    user: "Dive Enthusiast",
  };
  return roleMap[role] || "User";
};

const formatYear = (dateString?: string): string => {
  if (!dateString) return "—";
  return new Date(dateString).getFullYear().toString();
};

const formatJoinedDate = (dateString?: string): string => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const handleLogout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: var(--lightgray);
}

.dashboard-page__header {
  background: var(--deepblue);
  padding: var(--gap-md) 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.dashboard-page-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--gap-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-page-logo {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--white);
  text-decoration: none;
}

.dashboard-page-header-actions {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
}

.dashboard-page-nav-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: var(--font-sm);
  transition: color 0.2s;
}

.dashboard-page-nav-link:hover {
  color: var(--white);
}

.dashboard-page-logout-btn {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  padding: var(--gap-xs) var(--gap-sm);
  background: rgba(255, 255, 255, 0.1);
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--font-sm);
  transition: background 0.2s;
}

.dashboard-page-logout-btn:hover {
  background: var(--accent-error);
  border-color: var(--accent-error);
}

.dashboard-page-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--gap-lg) var(--gap-md);
}

.dashboard-page-profile {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--gap-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--gap-lg);
}

.dashboard-page-user-info {
  display: flex;
  align-items: center;
  gap: var(--gap-lg);
}

.dashboard-page-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.dashboard-page-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dashboard-page-avatar-initials {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--orange);
  color: var(--white);
  font-size: var(--font-xl);
  font-weight: 700;
  border-radius: 50%;
  text-transform: uppercase;
}

.dashboard-page-greeting {
  font-size: var(--font-sm);
  color: var(--gray);
  margin-bottom: 4px;
}

.dashboard-page-user-name {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.dashboard-page-user-role {
  font-size: var(--font-sm);
  color: var(--orange);
  font-weight: 600;
  margin-bottom: calc(var(--gap-xs) * 0.5);
}

.dashboard-page-user-email {
  font-size: var(--font-sm);
  color: var(--gray);
}

.dashboard-page-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--gap-md);
  margin-bottom: var(--gap-lg);
}

.dashboard-page-stat-card {
  background: var(--white);
  padding: var(--gap-md);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s;
}

.dashboard-page-stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.dashboard-page-stat-icon {
  font-size: var(--font-xl);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--orange);
  border-radius: 50%;
  flex-shrink: 0;
}

.dashboard-page-stat-number {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--darkblue);
}

.dashboard-page-stat-label {
  font-size: var(--font-sm);
  color: var(--gray);
}

.dashboard-page-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--gap-md);
}

.dashboard-page-section {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: var(--gap-lg);
  box-shadow: var(--shadow-sm);
}

.dashboard-page-section-title {
  font-size: var(--font-md);
  font-weight: 600;
  color: var(--darkblue);
  margin-bottom: var(--gap-md);
}

.dashboard-page-cert-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
}

.dashboard-page-cert-item {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  padding: var(--gap-sm);
  background: var(--lightgray);
  border-radius: var(--radius-sm);
}

.dashboard-page-cert-icon {
  font-size: var(--font-md);
}

.dashboard-page-cert-name {
  font-size: var(--font-sm);
  color: var(--deepblue);
  font-weight: 500;
}

.dashboard-page-empty {
  text-align: center;
  padding: var(--gap-md);
  color: var(--gray);
  font-size: var(--font-sm);
}

.dashboard-page-link {
  color: var(--orange);
  text-decoration: none;
  font-weight: 600;
}

.dashboard-page-link:hover {
  color: var(--darkblue);
}

.dashboard-page-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-sm);
}

.dashboard-page-action-btn {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  padding: var(--gap-sm);
  background: var(--white);
  border: 1px solid var(--lightgray);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s;
  font-size: var(--font-sm);
  color: var(--deepblue);
  text-decoration: none;
}

.dashboard-page-action-btn:hover {
  background: var(--orange);
  color: var(--white);
  border-color: var(--orange);
  transform: translateY(-1px);
}

.dashboard-page-action-icon {
  font-size: var(--font-md);
}

.dashboard-page-admin-actions {
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
}

.dashboard-page-admin-btn {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  padding: var(--gap-sm) var(--gap-md);
  background: var(--darkblue);
  color: var(--white);
  border: none;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-size: var(--font-sm);
  transition: background 0.2s;
}

.dashboard-page-admin-btn:hover {
  background: var(--deepblue);
}

@media (max-width: 768px) {
  .dashboard-page-user-info {
    flex-direction: column;
    text-align: center;
  }

  .dashboard-page-stats {
    grid-template-columns: 1fr;
  }

  .dashboard-page-sections {
    grid-template-columns: 1fr;
  }

  .dashboard-page-actions {
    grid-template-columns: 1fr;
  }

  .dashboard-page-header-actions {
    gap: var(--gap-sm);
  }
}
</style>
