<template>
  <section class="section search-section">
    <div class="container">
      <div class="search-header">
        <h2 class="search-title">Find Your Perfect Dive</h2>
        <p class="search-subtitle">Search from hundreds of dive sites worldwide</p>
      </div>

      <div class="search-container">
        <div class="search-grid">
          <div class="search-item">
            <input type="text" placeholder="Search destinations..." class="search-input" />
          </div>
          <div class="search-item">
            <input type="date" class="search-input" />
          </div>
          <div class="search-item">
            <select class="search-input">
              <option>1 Diver</option>
              <option>2 Divers</option>
              <option>3 Divers</option>
              <option>4+ Divers</option>
            </select>
          </div>
          <div class="search-item">
            <button class="search-btn">Search</button>
          </div>
        </div>

        <div class="search-filters">
          <button class="filter-chip active">All</button>
          <button class="filter-chip">Beginner</button>
          <button class="filter-chip">Advanced</button>
          <button class="filter-chip">Night Dive</button>
          <button class="filter-chip">Wreck Dive</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeFilter = ref("All");
</script>

<style scoped>
.search-section {
  background: linear-gradient(135deg, var(--deepblue) 0%, var(--darkblue) 100%);
  color: var(--white);
  padding: var(--pad-section) 0;
}

.search-header {
  text-align: center;
  margin-bottom: var(--gap-md);
}

.search-title {
  font-size: var(--font-xl);
  font-weight: 700;
  margin-bottom: var(--gap-sm);
  color: var(--white);
}

.search-subtitle {
  font-size: var(--font-md);
  color: rgba(255, 255, 255, 0.8);
}

.search-container {
  max-width: 1200px;
  margin: 0 auto;
}

.search-grid {
  display: grid;
  grid-template-columns: auto auto auto 10%;
  gap: var(--gap-sm);
  margin-bottom: var(--gap-md);
}

.search-item {
  display: flex;
  flex-direction: column;
}

.search-input {
  width: 100%;
  border: 1px solid var(--darkblue);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  background: var(--lightgray);
  color: var(--deepblue);
  font-weight: 500;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: var(--orange);
  background: var(--white);
  box-shadow: 0 0 0 2px rgba(239, 108, 51, 0.1);
}

.search-input::placeholder {
  color: var(--gray);
}

.search-btn {
  background-color: var(--orange);
  color: var(--white);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
}

.search-btn:hover {
  background: var(--darkblue);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-orange);
}

.search-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-sm);
  justify-content: center;
}

.filter-chip {
  padding: var(--gap-xs) var(--gap-sm);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  color: var(--white);
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-chip:hover {
  background: rgba(255, 255, 255, 0.2);
}

.filter-chip.active {
  background: var(--orange);
  border-color: var(--orange);
  color: var(--white);
}

@media (max-width: 768px) {
  .search-grid {
    grid-template-columns: 1fr;
    gap: var(--gap-sm);
  }

  .search-filters {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: var(--gap-sm);
  }

  .checkbox-label[data-v-b5664408] {
    flex-direction: column;
  }
}
</style>
