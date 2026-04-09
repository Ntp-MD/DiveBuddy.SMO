<template>
  <div class="admin-login-page">
    <div class="login-container">
      <div class="login-brand">
        <span class="brand-icon">🤿</span>
        <h1 class="brand-title">DiveBuddy Admin</h1>
        <p class="brand-subtitle">Staff & Management Portal</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input id="email" v-model="email" type="email" class="form-input" placeholder="admin@divebuddy.com" required />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <div class="input-wrapper">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="Enter your password"
              required
            />
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              {{ showPassword ? "🙈" : "👁️" }}
            </button>
          </div>
        </div>

        <div v-if="error" class="login-error">
          <span class="error-icon">⚠️</span>
          <span>{{ error }}</span>
        </div>

        <BaseButton type="submit" variant="primary" size="lg" :is-full-width="true" :is-loading="isLoading">
          {{ isLoading ? "Signing in..." : "Sign In" }}
        </BaseButton>
      </form>

      <div class="login-help" hidden>
        <p>Default admin: <code>admin@divebuddy.com / password</code></p>
        <a href="/" class="back-link">← Back to website</a>
      </div>
    </div>

    <div class="login-decoration">
      <div class="decoration-pattern"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import BaseButton from "@/components/base/BaseButton.vue";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);
const error = ref("");

async function handleLogin() {
  isLoading.value = true;
  error.value = "";

  try {
    const success = await auth.login(email.value, password.value);

    if (success) {
      if (!auth.isAdmin) {
        error.value = "Access denied. Admin privileges required.";
        return;
      }

      router.push({ name: "admin" });
    } else {
      error.value = auth.error || "Invalid email or password";
    }
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : "Login failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.admin-login-page {
  display: flex;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background: linear-gradient(135deg, var(--deepblue) 0%, var(--darkblue) 100%);
}

.login-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-y: auto;
  padding: var(--gap-xl);
  width: clamp(320px, 90vw, 600px);
  margin: 0 auto;
}

.login-brand {
  text-align: center;
  margin-bottom: var(--gap-xl);
  color: var(--white);
}

.brand-icon {
  font-size: var(--font-3xl);
  display: block;
  margin-bottom: var(--gap-md);
}

.brand-title {
  font-size: var(--font-xl);
  font-weight: 700;
  margin: 0 0 var(--gap-xs);
}

.brand-subtitle {
  font-size: var(--font-md);
  opacity: 0.8;
  margin: 0;
}

.login-form {
  width: 100%;
  background: var(--white);
  padding: var(--gap-xl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

.form-label {
  display: block;
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.form-input {
  width: 100%;
  padding: var(--gap-sm) var(--gap-md);
  border: 2px solid var(--lightgray);
  border-radius: var(--radius-sm);
  font-size: var(--font-md);
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--orange);
}

.input-wrapper {
  position: relative;
}

.input-wrapper .form-input {
  padding-right: 48px;
}

.toggle-password {
  position: absolute;
  right: var(--gap-sm);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: var(--font-md);
  cursor: pointer;
  opacity: 0.6;
}

.toggle-password:hover {
  opacity: 1;
}

.login-error {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  padding: var(--gap-sm);
  background: rgba(220, 38, 38, 0.1);
  color: var(--accent-error);
  border-radius: var(--radius-sm);
  margin-bottom: var(--gap-md);
  font-size: var(--font-sm);
}

.error-icon {
  font-size: var(--font-sm);
}

.login-help {
  margin-top: var(--gap-lg);
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--font-sm);
}

.login-help code {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: var(--radius-xs);
  font-family: monospace;
}

.back-link {
  display: block;
  margin-top: var(--gap-md);
  color: var(--white);
  text-decoration: none;
  opacity: 0.8;
}

.back-link:hover {
  opacity: 1;
}

.login-decoration {
  display: none;
}

/* Mobile (up to 639px) */
@media (max-width: 639px) {
  .login-container {
    height: 100%;
    padding: var(--gap-md);
    width: 100%;
    max-width: 100%;
    justify-content: center;
  }

  .login-brand {
    margin-bottom: var(--gap-lg);
  }

  .brand-icon {
    font-size: var(--font-2xl);
  }

  .brand-title {
    font-size: var(--font-lg);
  }

  .brand-subtitle {
    font-size: var(--font-sm);
  }

  .login-form {
    padding: var(--gap-lg);
  }

  .form-input {
    font-size: var(--font-md); /* Prevent iOS zoom on focus */
  }

  .btn-login {
    padding: var(--gap-sm) var(--gap-md);
    font-size: var(--font-sm);
  }

  .login-help {
    margin-top: var(--gap-md);
    font-size: var(--font-xs);
  }

  .login-help code {
    display: block;
    margin-top: var(--gap-xs);
    word-break: break-all;
  }
}

/* Tablet (640px - 1023px) */
@media (min-width: 640px) and (max-width: 1023px) {
  .login-container {
    width: 70vw;
    padding: var(--gap-lg);
  }

  .login-form {
    padding: var(--gap-xl);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .login-decoration {
    display: block;
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  .decoration-pattern {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 165, 0, 0.2) 0%, transparent 50%),
      url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
    background-size:
      cover,
      cover,
      50px 50px;
    animation: float 20s ease-in-out infinite;
  }
}

/* Large Desktop (1440px+) */
@media (min-width: 1440px) {
  .login-container {
    width: 40vw;
    max-width: 600px;
  }

  .brand-icon {
    font-size: var(--font-4xl);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .admin-login-page {
    background: linear-gradient(135deg, var(--dark-bg) 0%, var(--dark-surface) 100%);
  }
}
</style>
