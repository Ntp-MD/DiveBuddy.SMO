<template>
  <div id="app">
    <NavBar />
    <main>
      <HeroSection />
      <SearchSection />
      <TrustBadges />
      <DestinationCards />
      <FeaturedExperiences />
      <WhyChooseUs />
      <TestimonialSection />
      <StatsBar />
      <GallerySection />
      <CoursesSection />
      <PricingSection />
      <FAQSection />
      <NewsletterCTA />
      <ContactSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import HeroSection from "@/components/HeroSection.vue";
import SearchSection from "@/components/SearchSection.vue";
import TrustBadges from "@/components/TrustBadges.vue";
import DestinationCards from "@/components/DestinationCards.vue";
import FeaturedExperiences from "@/components/FeaturedExperiences.vue";
import WhyChooseUs from "@/components/WhyChooseUs.vue";
import TestimonialSection from "@/components/TestimonialSection.vue";
import StatsBar from "@/components/StatsBar.vue";
import GallerySection from "@/components/GallerySection.vue";
import CoursesSection from "@/components/CoursesSection.vue";
import PricingSection from "@/components/PricingSection.vue";
import FAQSection from "@/components/FAQSection.vue";
import NewsletterCTA from "@/components/NewsletterCTA.vue";
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
