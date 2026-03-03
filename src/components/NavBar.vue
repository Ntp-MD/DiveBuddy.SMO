<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }" role="navigation" aria-label="Main navigation">
    <div class="nav-container">
      <div class="nav-logo">
        <a href="/" aria-label="DiveBuddy.SMO Home">DiveBuddy.SMO</a>
      </div>
      <ul class="nav-menu" role="menubar">
        <li role="none"><a href="/" role="menuitem">Home</a></li>
        <li role="none"><a href="#destinations" role="menuitem">Destinations</a></li>
        <li role="none"><a href="#courses" role="menuitem">Courses</a></li>
        <li role="none"><a href="#pricing" role="menuitem">Pricing</a></li>
        <li role="none"><a href="#gallery" role="menuitem">Gallery</a></li>
        <li role="none"><a href="#contact" role="menuitem">Contact</a></li>
      </ul>
      <div class="nav-actions">
        <button v-if="!currentUser" class="nav-login" @click="showLogin" aria-label="Login to your account">Login</button>
        <button v-else class="nav-user" @click="showDashboardModal = true" aria-label="Open user dashboard">
          <span class="user-avatar-small">
            <img :src="currentUser.avatar" :alt="`${currentUser.firstName} ${currentUser.lastName} avatar`" />
          </span>
          <span class="user-name">{{ currentUser.firstName }}</span>
        </button>
        <button class="nav-cta" aria-label="Book a diving trip">
          <a href="#contact">Book Now</a>
        </button>
      </div>
    </div>
  </nav>
  <Login v-if="showLoginModal" @close="closeLogin" @login="handleLogin" />
  <UserDashboard
    v-if="showDashboardModal && currentUser"
    :current-user="currentUser"
    @close="closeDashboard"
    @logout="handleLogout"
    @navigate="navigateToSection"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Login from "./Login.vue";
import UserDashboard from "./UserDashboard.vue";

const isScrolled = ref(false);
const showLoginModal = ref(false);
const showDashboardModal = ref(false);
const currentUser = ref<any>(null);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const showLogin = () => {
  showLoginModal.value = true;
};

const closeLogin = () => {
  showLoginModal.value = false;
};

const handleLogin = (user: any) => {
  currentUser.value = user;
  showDashboardModal.value = true;
};

const closeDashboard = () => {
  showDashboardModal.value = false;
};

const handleLogout = () => {
  currentUser.value = null;
  localStorage.removeItem("divebuddy_user");
};

const navigateToSection = (section: string) => {
  const element = document.querySelector(section);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  padding: var(--gap-md) 0;
  transition: all 0.3s ease;
}

.navbar-scrolled {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--pad-container);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo a {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--white);
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: var(--gap-lg);
}

.nav-menu a {
  color: var(--white);
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-menu a:hover {
  color: var(--orange);
}

.nav-actions {
  display: flex;
  gap: var(--gap-sm);
  align-items: center;
}

.nav-login {
  background: var(--darkblue);
  color: var(--white);
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: all 0.3s ease;
}

.nav-login:hover {
  background: var(--white);
  color: var(--darkblue);
  transform: translateY(-2px);
}

.nav-user {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  background: var(--orange);
  color: var(--white);
  border-radius: var(--radius-sm);
  font-weight: 600;
  padding: var(--pad-sm);
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.nav-user:hover {
  background: var(--darkblue);
  transform: translateY(-2px);
}

.user-avatar-small {
  width: calc(var(--gap-sm) * 1.5);
  height: calc(var(--gap-sm) * 1.5);
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: var(--font-sm);
  font-weight: 600;
}

.nav-cta {
  background-color: var(--orange);
  color: var(--white);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  font-weight: 600;
  transition: all 0.3s ease;
}

.nav-cta:hover {
  background-color: var(--darkblue);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-orange);
}

a {
  color: var(--white);
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
}
</style>
