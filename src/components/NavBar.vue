<template>
  <nav :class="['nav-section', isScrolled && 'nav-section--scrolled']" role="navigation" aria-label="Main navigation">
    <div class="nav-section__container">
      <div class="nav-section__logo">
        <a href="/" aria-label="DiveBuddy.SMO Home">DiveBuddy</a>
      </div>
      <button
        class="nav-section__toggle"
        @click="toggleMobileMenu"
        :class="['nav-section__toggle', isMobileMenuOpen && 'nav-section__toggle--active']"
        aria-label="Toggle mobile menu"
        :aria-expanded="isMobileMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav :class="['nav-section__menu', isMobileMenuOpen && 'nav-section__menu--open']" role="navigation">
        <a href="/" role="menuitem" @click="toggleMobileMenu">Home</a>
        <a href="#destinations" role="menuitem" @click="toggleMobileMenu">Destinations</a>
        <a href="#courses" role="menuitem" @click="toggleMobileMenu">Courses</a>
        <a href="#pricing" role="menuitem" @click="toggleMobileMenu">Pricing</a>
        <a href="#gallery" role="menuitem" @click="toggleMobileMenu">Gallery</a>
        <a href="#contact" role="menuitem" @click="toggleMobileMenu">Contact</a>
      </nav>
      <div class="nav-section__actions">
        <button v-if="!currentUser" class="nav-section__btn nav-section__btn--login" @click="showLogin" aria-label="Login to your account">
          Login
        </button>
        <button v-else class="nav-section__btn nav-section__btn--user" @click="showDashboardModal = true" aria-label="Open user dashboard">
          <span class="nav-section__user-avatar">
            <img :src="currentUser.avatar" :alt="`${currentUser.firstName} ${currentUser.lastName} avatar`" />
          </span>
          <span class="nav-section__user-name">{{ currentUser.firstName }}</span>
        </button>
        <button class="nav-section__btn nav-section__btn--cta" aria-label="Book a diving trip">
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
.nav-section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  z-index: 1000;
  padding: var(--gap-md) 0;
  transition: var(--transition-normal);
}

.nav-section--scrolled {
  background-color: rgba(9, 30, 35, 0.85);
  backdrop-filter: blur(12px);
  padding: var(--gap-xs) 0;
  box-shadow: var(--shadow-lg);
}

.nav-section__container {
  max-width: 1600px;
  display: grid;
  grid-template-columns: 30% auto 30%;
  align-items: center;
  margin: 0 auto;
  padding: 0 var(--pad-container);
}

.nav-section__logo a {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--font-white);
  text-decoration: none;
}

.nav-section__toggle {
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

.nav-section__toggle span {
  width: 100%;
  height: 2px;
  background-color: var(--font-white);
  transition: var(--transition-normal);
  transform-origin: center;
}

.nav-section__toggle--active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.nav-section__toggle--active span:nth-child(2) {
  opacity: 0;
}

.nav-section__toggle--active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.nav-section__menu {
  display: flex;
  justify-content: space-evenly;
  width: stretch;
}

.nav-section__menu a {
  color: var(--font-white);
  font-weight: 500;
  transition: var(--transition-normal);
}

.nav-section__menu a:hover {
  color: var(--font-white);
}

.nav-section__actions {
  display: flex;
  gap: var(--gap-sm);
  align-items: center;
  margin-left: auto;
}

.nav-section__btn {
  padding: var(--gap-xs) var(--gap-sm);
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: var(--transition-normal);
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.nav-section__btn--login {
  background: var(--main-color-2);
  color: var(--font-white);
}

.nav-section__btn--login:hover {
  background: var(--main-color-3);
}

.nav-section__btn--user {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  background: var(--accent-primary);
  color: var(--font-white);
}

.nav-section__btn--user:hover {
  background: var(--accent-secondary);
}

.nav-section__user-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.nav-section__user-name {
  color: var(--font-white);
  font-weight: 500;
}

.nav-section__btn--cta {
  background: var(--accent-primary);
  color: var(--font-white);
}

.nav-section__btn--cta:hover {
  background: var(--accent-secondary);
}

.nav-section__btn a {
  color: var(--font-white);
  text-decoration: none;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .nav-section__toggle {
    display: flex;
  }

  .nav-section__menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    height: 100vh;
    background: var(--main-color-2);
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: var(--gap-xl) var(--gap-lg);
    transition: var(--transition-normal);
    z-index: 999;
  }

  .nav-section__menu--open {
    right: 0;
  }

  .nav-section__menu a {
    display: block;
    width: 100%;
    padding: var(--gap-md) 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: var(--font-lg);
  }

  .nav-section__actions {
    position: fixed;
    bottom: var(--gap-lg);
    left: var(--gap-lg);
    right: var(--gap-lg);
  }

  .nav-section__container {
    grid-template-columns: 1fr auto;
    padding: 0 var(--gap-md);
  }
}
</style>
