<template>
  <div class="home-page">
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
import NavBar from "@/components/layout/NavBar.vue";
import FooterSection from "@/components/layout/FooterSection.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import SearchSection from "@/components/sections/SearchSection.vue";
import TrustBadges from "@/components/sections/TrustBadges.vue";
import DestinationCards from "@/components/sections/DestinationCards.vue";
import FeaturedExperiences from "@/components/sections/FeaturedExperiences.vue";
import WhyChooseUs from "@/components/sections/WhyChooseUs.vue";
import TestimonialSection from "@/components/sections/TestimonialSection.vue";
import StatsBar from "@/components/sections/StatsBar.vue";
import GallerySection from "@/components/sections/GallerySection.vue";
import CoursesSection from "@/components/sections/CoursesSection.vue";
import PricingSection from "@/components/sections/PricingSection.vue";
import FAQSection from "@/components/sections/FAQSection.vue";
import NewsletterCTA from "@/components/sections/NewsletterCTA.vue";
import ContactSection from "@/components/sections/ContactSection.vue";
</script>
