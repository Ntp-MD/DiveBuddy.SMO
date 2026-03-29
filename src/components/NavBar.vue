<template>
  <nav :class="['navbar', isScrolled && 'navbar-scrolled']" role="navigation" aria-label="Main navigation">
    <div class="nav-container">
      <div class="nav-logo">
        <a href="/" aria-label="DiveBuddy.SMO Home">DiveBuddy</a>
      </div>
      <button
        class="mobile-toggle"
        @click="toggleMobileMenu"
        :class="['mobile-toggle', isMobileMenuOpen && 'active']"
        aria-label="Toggle mobile menu"
        :aria-expanded="isMobileMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav :class="['nav-menu', isMobileMenuOpen && 'mobile-open']" role="navigation">
        <a href="/" role="menuitem" @click="toggleMobileMenu">Home</a>
        <a href="#destinations" role="menuitem" @click="toggleMobileMenu">Destinations</a>
        <a href="#courses" role="menuitem" @click="toggleMobileMenu">Courses</a>
        <a href="#pricing" role="menuitem" @click="toggleMobileMenu">Pricing</a>
        <a href="#gallery" role="menuitem" @click="toggleMobileMenu">Gallery</a>
        <a href="#contact" role="menuitem" @click="toggleMobileMenu">Contact</a>
      </nav>
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
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const showLogin = () => {
  showLoginModal.value = true;
};

const closeLogin = () => {
  showLoginModal.value = false;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
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
  background-color: transparent;
  z-index: 1000;
  padding: var(--gap-md) 0;
  transition: all 0.4s ease;
}

.navbar-scrolled {
  background-color: rgba(9, 30, 35, 0.85);
  backdrop-filter: blur(12px);
  padding: var(--gap-xs) 0;
  box-shadow: 0 2px 20px var(--shadow-deepblue);
}

.nav-container {
  max-width: 1600px;
  display: grid;
  grid-template-columns: 30% auto 30%;
  align-items: center;
  margin: 0 auto;
  padding: 0 var(--pad-container);
}

.nav-logo a {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--white);
  text-decoration: none;
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1000;
}

.mobile-toggle span {
  width: 100%;
  height: 2px;
  background-color: var(--white);
  transition: all 0.3s ease;
  transform-origin: center;
}

.mobile-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.nav-menu {
  display: flex;
  justify-content: space-evenly;
  width: stretch;
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
  margin-left: auto;
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
  padding: var(--gap-sm);
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

@media (max-width: 1023px) {
  .mobile-toggle {
    display: flex;
  }

  .nav-menu {
    display: none;
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 320px;
    height: 100vh;
    background: var(--orange);
    flex-direction: column;
    padding: calc(var(--gap-md) * 2) var(--gap-md) var(--gap-md);
    gap: var(--gap-md);
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    z-index: 999;
    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
  }

  .nav-menu.mobile-open {
    display: flex;
    right: 0;
  }

  .nav-menu a {
    display: block;
    width: 100%;
    padding: var(--gap-md);
    border-radius: var(--radius-md);
    color: var(--white);
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .nav-menu a:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
  }

  .nav-actions {
    display: none;
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
