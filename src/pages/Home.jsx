import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCollection } from '../components/home/FeaturedCollection';
import { ShopByMood } from '../components/home/ShopByMood';
import { Bestsellers } from '../components/home/Bestsellers';
import { BrandStory } from '../components/home/BrandStory';
import { PerfumeFinder } from '../components/home/PerfumeFinder';
import { NewArrivals } from '../components/home/NewArrivals';
import { CustomerReviews } from '../components/home/CustomerReviews';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. FEATURED COLLECTION */}
      <FeaturedCollection />

      {/* 3. SHOP BY MOOD */}
      <ShopByMood />

      {/* 4. BESTSELLERS */}
      <Bestsellers />

      {/* 5. BRAND STORY */}
      <BrandStory />

      {/* 6. PERFUME FINDER */}
      <PerfumeFinder />

      {/* 7. NEW ARRIVALS */}
      <NewArrivals />

      {/* 8. CUSTOMER REVIEWS */}
      <CustomerReviews />

      {/* 9. NEWSLETTER */}
      <NewsletterSection />
    </main>
  );
};
