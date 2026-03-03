<template>
  <div class="login-overlay" @click="closeLogin" role="dialog" aria-modal="true" aria-labelledby="login-title">
    <div class="login-modal" @click.stop role="document">
      <div class="login-header">
        <h2 id="login-title" class="login-title">Welcome Back</h2>
        <p class="login-subtitle">Sign in to your DiveBuddy account</p>
        <button class="close-btn" @click="closeLogin" aria-label="Close login dialog">×</button>
      </div>

      <form class="login-form" @submit.prevent="handleLogin" novalidate>
        <div class="form-group">
          <label class="form-label" for="username">Username or Email</label>
          <input
            id="username"
            v-model="loginForm.username"
            type="text"
            class="form-input"
            placeholder="Enter your username or email"
            required
            aria-describedby="username-help"
            autocomplete="username"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <input
            id="password"
            v-model="loginForm.password"
            type="password"
            class="form-input"
            placeholder="Enter your password"
            required
            aria-describedby="password-help"
            autocomplete="current-password"
          />
        </div>

        <div class="form-options">
          <label class="checkbox-label">
            <input v-model="loginForm.remember" type="checkbox" class="checkbox" />
            <span class="checkbox-text">Remember me</span>
          </label>
          <a href="#" class="forgot-link">Forgot password?</a>
        </div>

        <div v-if="errorMessage" class="error-message" role="alert" aria-live="polite">
          {{ errorMessage }}
        </div>

        <button type="submit" class="login-btn" :disabled="isLoading" aria-describedby="login-status">
          <span v-if="isLoading">Signing in...</span>
          <span v-else>Sign In</span>
        </button>
        <div id="login-status" class="sr-only" aria-live="polite"></div>
      </form>

      <div class="login-footer">
        <p class="signup-text">
          Don't have an account?
          <a href="#" class="signup-link">Sign up for free</a>
        </p>
      </div>

      <div class="demo-users">
        <h3 class="demo-title">Demo Users</h3>
        <div class="demo-list">
          <div class="demo-user" @click="setDemoUser('admin')"><strong>Admin:</strong> admin / admin123</div>
          <div class="demo-user" @click="setDemoUser('john_diver')"><strong>User:</strong> john_diver / diver123</div>
          <div class="demo-user" @click="setDemoUser('sarah_diver')"><strong>Beginner:</strong> sarah_diver / ocean456</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  avatar: string;
  joinedDate: string;
  certifications: string[];
  divesCount: number;
}

const emit = defineEmits<{
  close: [];
  login: [user: User];
}>();

const isLoading = ref(false);
const errorMessage = ref("");

const loginForm = reactive({
  username: "",
  password: "",
  remember: false,
});

const users: User[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@divebuddy.smo",
    password: "admin123",
    role: "admin",
    firstName: "Admin",
    lastName: "User",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    joinedDate: "2023-01-15",
    certifications: ["Divemaster", "Instructor"],
    divesCount: 1250,
  },
  {
    id: 2,
    username: "john_diver",
    email: "john@example.com",
    password: "diver123",
    role: "user",
    firstName: "John",
    lastName: "Smith",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    joinedDate: "2023-06-20",
    certifications: ["Open Water Diver", "Advanced Diver"],
    divesCount: 45,
  },
  {
    id: 3,
    username: "sarah_diver",
    email: "sarah@example.com",
    password: "ocean456",
    role: "user",
    firstName: "Sarah",
    lastName: "Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b7c2?w=100",
    joinedDate: "2023-09-10",
    certifications: ["Open Water Diver"],
    divesCount: 23,
  },
  {
    id: 4,
    username: "mike_instructor",
    email: "mike@divebuddy.smo",
    password: "teach789",
    role: "instructor",
    firstName: "Mike",
    lastName: "Chen",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100",
    joinedDate: "2022-11-05",
    certifications: ["Divemaster", "Instructor", "Master Scuba Diver Trainer"],
    divesCount: 2100,
  },
  {
    id: 5,
    username: "emma_beginner",
    email: "emma@example.com",
    password: "start321",
    role: "user",
    firstName: "Emma",
    lastName: "Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    joinedDate: "2024-01-28",
    certifications: [],
    divesCount: 0,
  },
];

const closeLogin = () => {
  emit("close");
};

const setDemoUser = (username: string) => {
  const user = users.find((u) => u.username === username);
  if (user) {
    loginForm.username = user.username;
    loginForm.password = user.password;
  }
};

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = users.find((u) => (u.username === loginForm.username || u.email === loginForm.username) && u.password === loginForm.password);

    if (user) {
      if (loginForm.remember) {
        localStorage.setItem("divebuddy_user", JSON.stringify(user));
      }
      emit("login", user);
      emit("close");
    } else {
      errorMessage.value = "Invalid username or password";
    }
  } catch (error) {
    errorMessage.value = "Login failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-overlay {
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

.login-modal {
  background: var(--white);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
}

.login-header {
  padding: var(--gap-md);
  border-bottom: 1px solid var(--lightgray);
  position: relative;
}

.login-title {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.login-subtitle {
  font-size: var(--font-sm);
  color: var(--gray);
}

.close-btn {
  position: absolute;
  top: var(--gap-md);
  right: var(--gap-md);
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

.login-form {
  padding: var(--gap-md);
}

.form-group {
  margin-bottom: var(--gap-md);
}

.form-label {
  display: block;
  margin-bottom: var(--gap-xs);
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--darkblue);
}

.form-input {
  width: 100%;
  border: 1px solid var(--lightgray);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  background: var(--white);
  color: var(--deepblue);
  font-weight: 500;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--orange);
  box-shadow: 0 0 0 2px rgba(239, 108, 51, 0.1);
}

.form-input::placeholder {
  color: var(--gray);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap-md);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  cursor: pointer;
  font-size: var(--font-sm);
  color: var(--gray);
}

.checkbox {
  margin: 0;
}

.forgot-link {
  font-size: var(--font-sm);
  color: var(--orange);
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: var(--darkblue);
}

.error-message {
  background: rgba(255, 0, 0, 0.1);
  color: var(--orange);
  padding: var(--gap-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  margin-bottom: var(--gap-md);
  border: 1px solid rgba(255, 0, 0, 0.2);
}

.login-btn {
  width: 100%;
  font-size: var(--font-md);
  font-weight: 600;
  transition: all 0.3s ease;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-footer {
  padding: var(--gap-md);
  border-top: 1px solid var(--lightgray);
  text-align: center;
}

.signup-text {
  font-size: var(--font-sm);
  color: var(--gray);
}

.signup-link {
  color: var(--orange);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.signup-link:hover {
  color: var(--darkblue);
}

.demo-users {
  padding: var(--gap-md);
  border-top: 1px solid var(--lightgray);
  background: var(--lightgray);
}

.demo-title {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--darkblue);
  margin-bottom: var(--gap-sm);
  text-align: center;
}

.demo-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
}

.demo-user {
  font-size: var(--font-xs);
  color: var(--gray);
  padding: var(--gap-xs);
  background: var(--white);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.demo-user:hover {
  background: var(--orange);
  color: var(--white);
}

.demo-user strong {
  color: inherit;
}

@media (max-width: 480px) {
  .login-modal {
    width: 95%;
    margin: var(--gap-md);
  }

  .form-options {
    flex-direction: column;
    gap: var(--gap-sm);
    align-items: flex-start;
  }
}
</style>
