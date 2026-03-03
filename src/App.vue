<template>
  <div id="app">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <NavBar />
    <main id="main-content" role="main">
      <HeroSection />
      <SearchSection />
      <DestinationCards />
      <CoursesSection />
      <PricingSection />
      <TestimonialSection />
      <GallerySection />
      <ContactSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import HeroSection from "@/components/HeroSection.vue";
import SearchSection from "@/components/SearchSection.vue";
import DestinationCards from "@/components/DestinationCards.vue";
import CoursesSection from "@/components/CoursesSection.vue";
import PricingSection from "@/components/PricingSection.vue";
import TestimonialSection from "@/components/TestimonialSection.vue";
import GallerySection from "@/components/GallerySection.vue";
import ContactSection from "@/components/ContactSection.vue";
import FooterSection from "@/components/FooterSection.vue";
</script>

<style>
html {
  scroll-behavior: smooth;
}

#app {
  min-height: 100vh;
}
</style>
