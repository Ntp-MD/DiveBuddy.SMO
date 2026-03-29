<template>
  <section class="search" id="search">
    <div class="container">
      <div class="search-bar">
        <div class="search-bar-inner">
          <div class="search-field">
            <span class="search-field-icon">🌊</span>
            <input type="text" placeholder="Where do you want to dive?" class="search-field-input" />
          </div>
          <div class="search-field">
            <span class="search-field-icon">📅</span>
            <input type="date" class="search-field-input" />
          </div>
          <div class="search-field">
            <span class="search-field-icon">👥</span>
            <select class="search-field-input">
              <option>1 Diver</option>
              <option>2 Divers</option>
              <option>3 Divers</option>
              <option>4+ Divers</option>
            </select>
          </div>
          <button class="search-submit">Search Dives</button>
        </div>
      </div>
      <div class="search-tags">
        <span class="search-tag">🐢 Marine Life</span>
        <span class="search-tag">🪸 Coral Reefs</span>
        <span class="search-tag">🌙 Night Dive</span>
        <span class="search-tag">🚢 Wreck Dive</span>
        <span class="search-tag">📸 Photography</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.search {
  background: var(--deepblue);
  padding: var(--gap-md) 0;
  position: relative;
}

.search-bar {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--gap-xs);
  backdrop-filter: blur(10px);
}

.search-bar-inner {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: var(--gap-xs);
  align-items: center;
}

.search-field {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 0 var(--gap-sm);
}

.search-field-icon {
  font-size: var(--font-md);
  flex-shrink: 0;
}

.search-field-input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: var(--font-sm);
  color: var(--deepblue);
  font-weight: 500;
}

.search-field-input:focus {
  outline: none;
  border: none;
  box-shadow: none;
}

.search-field-input::placeholder {
  color: var(--gray);
}

.search-submit {
  background: var(--orange);
  color: var(--white);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  font-weight: 700;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.search-submit:hover {
  background: var(--darkblue);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--shadow-orange);
}

.search-tags {
  display: flex;
  justify-content: center;
  gap: var(--gap-sm);
  margin-top: var(--gap-sm);
  flex-wrap: wrap;
}

.search-tag {
  padding: calc(var(--gap-xs) * 0.5) var(--gap-sm);
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--font-xs);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-tag:hover {
  background: var(--orange);
  color: var(--white);
}

@media (max-width: 768px) {
  .search-bar-inner {
    grid-template-columns: 1fr;
    gap: var(--gap-xs);
  }

  .search-tags {
    justify-content: flex-start;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: var(--gap-xs);
  }

  .search-tag {
    white-space: nowrap;
  }
}
</style>
