<template>
  <div class="login-page">
    <div class="login-page-container">
      <div class="login-page-brand">
        <router-link to="/" class="login-page-logo">DiveBuddy</router-link>
        <p class="login-page-tagline">Sign in to your diving account</p>
      </div>

      <div class="login-page-card">
        <div class="login-page-header">
          <h1 class="login-page-title">Welcome Back</h1>
          <p class="login-page-subtitle">Sign in to your DiveBuddy account</p>
        </div>

        <form class="login-page-form" @submit.prevent="handleLogin" novalidate>
          <div class="login-page-field">
            <label class="login-page-label" for="username">Username or Email</label>
            <input
              id="username"
              v-model="loginForm.username"
              type="text"
              class="login-page-input"
              placeholder="Enter your username or email"
              required
              autocomplete="username"
            />
          </div>

          <div class="login-page-field">
            <label class="login-page-label" for="password">Password</label>
            <input
              id="password"
              v-model="loginForm.password"
              type="password"
              class="login-page-input"
              placeholder="Enter your password"
              required
              autocomplete="current-password"
            />
          </div>

          <div class="login-page-options">
            <label class="login-page-checkbox-label">
              <input v-model="loginForm.remember" type="checkbox" class="login-page-checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" class="login-page-forgot">Forgot password?</a>
          </div>

          <div v-if="errorMessage" class="login-page-error" role="alert" aria-live="polite">
            <span class="login-page-error-icon">⚠</span>
            {{ errorMessage }}
          </div>

          <button type="submit" class="login-page-submit" :disabled="isLoading">
            <span v-if="isLoading">Signing in...</span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <div class="login-page-footer">
          <p class="login-page-signup-text">
            Don't have an account?
            <a href="#" class="login-page-signup-link">Sign up for free</a>
          </p>
        </div>
      </div>

      <router-link to="/" class="login-page-back">← Back to website</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const isLoading = ref(false);
const errorMessage = ref("");

const loginForm = reactive({
  username: "",
  password: "",
  remember: false,
});

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    const success = await authStore.loginWithCredentials(loginForm.username, loginForm.password, loginForm.remember);

    if (success) {
      if (authStore.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } else {
      errorMessage.value = authStore.error || "Invalid username or password";
    }
  } catch {
    errorMessage.value = "Login failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--deepblue) 0%, var(--darkblue) 100%);
  padding: var(--gap-md);
}

.login-page-container {
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-md);
}

.login-page-brand {
  text-align: center;
}

.login-page-logo {
  font-size: var(--font-xxl);
  font-weight: 700;
  color: var(--white);
  text-decoration: none;
}

.login-page-tagline {
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--font-sm);
  margin-top: var(--gap-xs);
}

.login-page-card {
  width: 100%;
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.login-page-header {
  padding: var(--gap-lg) var(--gap-lg) 0;
}

.login-page-title {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.login-page-subtitle {
  font-size: var(--font-sm);
  color: var(--gray);
}

.login-page-form {
  padding: var(--gap-lg);
}

.login-page-field {
  margin-bottom: var(--gap-md);
}

.login-page-label {
  display: block;
  margin-bottom: var(--gap-xs);
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--darkblue);
}

.login-page-input {
  width: 100%;
  padding: var(--gap-sm) var(--gap-md);
  border: 1px solid var(--lightgray);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  background: var(--white);
  color: var(--deepblue);
  font-weight: 500;
  transition: border-color 0.2s;
}

.login-page-input:focus {
  outline: none;
  border-color: var(--orange);
  box-shadow: 0 0 0 2px rgba(239, 108, 51, 0.1);
}

.login-page-input::placeholder {
  color: var(--gray);
}

.login-page-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap-md);
}

.login-page-checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  cursor: pointer;
  font-size: var(--font-sm);
  color: var(--gray);
}

.login-page-forgot {
  font-size: var(--font-sm);
  color: var(--orange);
  text-decoration: none;
}

.login-page-forgot:hover {
  color: var(--darkblue);
}

.login-page-error {
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

.login-page-error-icon {
  font-size: var(--font-sm);
}

.login-page-submit {
  width: 100%;
  padding: var(--gap-sm) var(--gap-md);
  background: var(--orange);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-md);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.login-page-submit:hover {
  background: var(--darkblue);
}

.login-page-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-page-footer {
  padding: var(--gap-md) var(--gap-lg);
  border-top: 1px solid var(--lightgray);
  text-align: center;
}

.login-page-signup-text {
  font-size: var(--font-sm);
  color: var(--gray);
}

.login-page-signup-link {
  color: var(--orange);
  text-decoration: none;
  font-weight: 600;
}

.login-page-signup-link:hover {
  color: var(--darkblue);
}

.login-page-back {
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--font-sm);
  text-decoration: none;
  transition: color 0.2s;
}

.login-page-back:hover {
  color: var(--white);
}

@media (max-width: 480px) {
  .login-page {
    padding: var(--gap-sm);
  }

  .login-page-card {
    border-radius: var(--radius-md);
  }

  .login-page-options {
    flex-direction: column;
    gap: var(--gap-sm);
    align-items: flex-start;
  }
}
</style>
