<template>
  <section class="hero">
    <video class="hero-video" autoplay muted loop playsinline controlsList="nodownload" disablePictureInPicture>
      <source src="@/assets/vdo/pov-on-bleach.mp4" type="video/mp4" />
    </video>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">Discover the Ocean's Wonders</h1>
      <p class="hero-subtitle">Professional diving courses and unforgettable underwater adventures</p>
      <div class="hero-buttons">
        <button class="btn-explore"><a href="#courses">Explore Courses</a></button>
        <button class="btn-booknow"><a href="#contact">Book Now</a></button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: -1;
}

.hero-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 var(--gap-md);
  z-index: 1;
}

.hero-title {
  font-size: var(--font-xl);
  font-weight: 800;
  color: var(--white);
  margin-bottom: var(--gap-md);
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: var(--font-lg);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--gap-md);
  max-width: 600px;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: var(--gap-md);
}

.btn-explore {
  background-color: var(--orange);
  color: var(--white);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-explore:hover {
  background-color: var(--darkblue);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-orange);
}

.btn-booknow {
  background-color: var(--darkblue);
  color: var(--white);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-booknow:hover {
  background-color: var(--deepblue);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-darkblue);
}

.btn-explore a,
.btn-booknow a {
  color: var(--white);
}

@media (max-width: 1023px) {
  .hero-content {
    padding: 0 var(--gap-md);
  }

  .hero-title {
    font-size: var(--font-lg);
  }

  .hero-subtitle {
    padding: 0 var(--gap-md);
    max-width: 700px;
  }

  .hero-title {
    font-size: var(--font-lg);
    margin-bottom: var(--gap-sm);
  }

  .hero-subtitle {
    font-size: var(--font-sm);
    margin-bottom: var(--gap-md);
  }

  .hero-buttons {
    gap: var(--gap-md);
    flex-direction: row;
  }
}

@media (max-width: 1023px) and (orientation: landscape) {
  .hero {
    height: 80vh;
  }

  .hero-content {
    max-width: 900px;
  }

  .hero-title {
    font-size: var(--font-xl);
  }

  .hero-subtitle {
    font-size: var(--font-md);
  }
}

@media (max-width: 768px) {
  .hero {
    height: 70vh;
  }

  .hero-content {
    padding: 0 var(--gap-sm);
  }

  .hero-title {
    font-size: var(--font-md);
    margin-bottom: var(--gap-xs);
  }

  .hero-subtitle {
    font-size: var(--font-xs);
    margin-bottom: var(--gap-md);
  }

  .hero-buttons {
    gap: var(--gap-md);
  }
}

@media (max-width: 480px) {
  .hero {
    height: 60vh;
  }

  .hero-content {
    padding: 0 var(--gap-sm);
  }

  .hero-title {
    font-size: var(--font-sm);
  }

  .hero-subtitle {
    font-size: var(--font-xs);
  }

  .hero-buttons {
    flex-direction: column;
    gap: var(--gap-sm);
  }

  .hero-buttons .btn {
    width: 100%;
  }
}
</style>
