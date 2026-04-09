<template>
  <section class="view-section">
    <div class="settings-container">
      <div class="settings-tabs">
        <button v-for="tab in settingsTabs" :key="tab.id" :class="['settings-tab', { active: activeTab === tab.id }]" @click="activeTab = tab.id">
          {{ tab.label }}
        </button>
      </div>

      <!-- Business Info -->
      <div v-if="activeTab === 'business'" class="settings-panel">
        <h3>Business Information</h3>
        <div class="form-grid">
          <div class="form-group">
            <label>Business Name</label>
            <input v-model="localSettings.businessName" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="localSettings.email" type="email" class="form-input" />
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input v-model="localSettings.phone" type="tel" class="form-input" />
          </div>
          <div class="form-group">
            <label>Address</label>
            <textarea v-model="localSettings.address" class="form-input"></textarea>
          </div>
        </div>
      </div>

      <!-- Payment Settings -->
      <div v-if="activeTab === 'payment'" class="settings-panel">
        <h3>Payment Configuration</h3>
        <div class="form-grid">
          <div class="form-group">
            <label>Currency</label>
            <select v-model="localSettings.currency" class="form-input">
              <option value="THB">THB (฿)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Payment Gateway</label>
            <select v-model="localSettings.paymentGateway" class="form-input">
              <option value="stripe">Stripe</option>
              <option value="omise">Omise</option>
              <option value="2c2p">2C2P</option>
              <option value="promptpay">PromptPay QR</option>
            </select>
          </div>
          <div class="form-group">
            <label>Tax Rate (%)</label>
            <input v-model="localSettings.taxRate" type="number" class="form-input" />
          </div>
          <div class="form-group">
            <label>Deposit Required (%)</label>
            <input v-model="localSettings.depositPercent" type="number" class="form-input" />
          </div>
        </div>
      </div>

      <!-- SEO Settings -->
      <div v-if="activeTab === 'seo'" class="settings-panel">
        <h3>SEO Configuration</h3>
        <div class="form-grid">
          <div class="form-group">
            <label>Site Title</label>
            <input v-model="localSettings.siteTitle" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label>Meta Description</label>
            <textarea v-model="localSettings.metaDescription" class="form-input" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Keywords</label>
            <input v-model="localSettings.keywords" type="text" class="form-input" placeholder="diving, scuba, padi, phuket..." />
          </div>
        </div>
      </div>

      <!-- Social Links -->
      <div v-if="activeTab === 'social'" class="settings-panel">
        <h3>Social Media Links</h3>
        <div class="form-grid">
          <div class="form-group">
            <label>Facebook</label>
            <input v-model="localSettings.facebook" type="url" class="form-input" placeholder="https://facebook.com/..." />
          </div>
          <div class="form-group">
            <label>Instagram</label>
            <input v-model="localSettings.instagram" type="url" class="form-input" placeholder="https://instagram.com/..." />
          </div>
          <div class="form-group">
            <label>Line ID</label>
            <input v-model="localSettings.line" type="text" class="form-input" placeholder="@lineid" />
          </div>
          <div class="form-group">
            <label>YouTube</label>
            <input v-model="localSettings.youtube" type="url" class="form-input" placeholder="https://youtube.com/..." />
          </div>
        </div>
      </div>

      <div class="settings-actions">
        <button @click="$emit('save', localSettings)" class="btn btn-primary">Save Settings</button>
        <button @click="$emit('reset')" class="btn btn-secondary">Reset</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Settings {
  businessName: string;
  email: string;
  phone: string;
  address: string;
  currency: string;
  paymentGateway: string;
  taxRate: number;
  depositPercent: number;
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  facebook: string;
  instagram: string;
  line: string;
  youtube: string;
}

interface Props {
  settings: Settings;
  settingsTabs: readonly { id: string; label: string }[];
}

const props = defineProps<Props>();

defineEmits<{
  (e: "save", settings: Settings): void;
  (e: "reset"): void;
}>();

const activeTab = ref("business");
const localSettings = ref({ ...props.settings });
</script>

<style scoped>
.view-section {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.settings-container {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: var(--gap-lg);
  box-shadow: var(--shadow-sm);
}

/* Tabs */
.settings-tabs {
  display: flex;
  gap: var(--gap-xs);
  margin-bottom: var(--gap-lg);
  border-bottom: 2px solid var(--lightgray);
  padding-bottom: 0;
  overflow-x: auto;
}

.settings-tab {
  padding: var(--gap-sm) var(--gap-md);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--gray);
  cursor: pointer;
  font-weight: 500;
  font-size: var(--font-sm);
  white-space: nowrap;
  margin-bottom: -2px;
  transition:
    color 0.2s,
    border-color 0.2s;
}

.settings-tab:hover {
  color: var(--darkblue);
}

.settings-tab.active {
  color: var(--darkblue);
  border-bottom-color: var(--orange);
  font-weight: 600;
}

/* Panel */
.settings-panel h3 {
  margin: 0 0 var(--gap-lg);
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--darkblue);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
}

.form-group label {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--darkblue);
}

.form-input {
  padding: var(--gap-sm) var(--gap-md);
  border: 1px solid var(--lightgray);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  background: var(--white);
  color: var(--deepblue);
  transition: border-color 0.2s;
  resize: vertical;
}

.form-input:focus {
  outline: none;
  border-color: var(--orange);
  box-shadow: 0 0 0 2px rgba(239, 108, 51, 0.1);
}

/* Actions */
.settings-actions {
  display: flex;
  gap: var(--gap-sm);
  margin-top: var(--gap-lg);
  padding-top: var(--gap-lg);
  border-top: 1px solid var(--lightgray);
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .settings-tabs {
    flex-wrap: wrap;
  }
}
</style>
