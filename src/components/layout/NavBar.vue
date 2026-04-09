<template>
  <nav :class="['nav-section', isScrolled && 'nav-section--scrolled']" role="navigation" aria-label="Main navigation">
    <div class="nav-section__container">
      <div class="nav-section__logo">
        <router-link to="/" aria-label="DiveBuddy.SMO Home">DiveBuddy</router-link>
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
        <router-link
          v-if="!authStore.isAuthenticated"
          to="/login"
          class="nav-section__btn nav-section__btn--login"
          aria-label="Login to your account"
        >
          Login
        </router-link>
        <router-link v-else to="/dashboard" class="nav-section__btn nav-section__btn--user" aria-label="Go to dashboard">
          <span v-if="authStore.currentUser?.avatar" class="nav-section__user-avatar">
            <img :src="authStore.currentUser.avatar" :alt="`${authStore.currentUser.firstName} avatar`" />
          </span>
          <span class="nav-section__user-name">{{ authStore.currentUser?.firstName }}</span>
        </router-link>
        <a href="#contact" class="nav-section__btn nav-section__btn--cta" aria-label="Book a diving trip"> Book Now </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
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
  color: var(--white);
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
  background-color: var(--white);
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
  color: var(--white);
  font-weight: 500;
  transition: var(--transition-normal);
}

.nav-section__menu a:hover {
  color: var(--white);
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
  background: var(--darkblue);
  color: var(--white);
}

.nav-section__btn--login:hover {
  background: var(--deepblue);
}

.nav-section__btn--user {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  background: var(--orange);
  color: var(--white);
}

.nav-section__btn--user:hover {
  background: var(--darkblue);
}

.nav-section__user-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.nav-section__user-name {
  color: var(--white);
  font-weight: 500;
}

.nav-section__btn--cta {
  background: var(--orange);
  color: var(--white);
}

.nav-section__btn--cta:hover {
  background: var(--darkblue);
}

.nav-section__btn a {
  color: var(--white);
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
    background: var(--deepblue);
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
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-section__container {
    grid-template-columns: 1fr auto;
    padding: 0 var(--gap-md);
  }

  /* Overlay backdrop when menu open */
  .nav-section__menu--open::before {
    content: "";
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
}

@media (max-width: 480px) {
  .nav-section__btn--login,
  .nav-section__btn--cta {
    font-size: var(--font-xs);
    padding: var(--gap-xs);
  }

  .nav-section__user-name {
    display: none;
  }
}
</style>
