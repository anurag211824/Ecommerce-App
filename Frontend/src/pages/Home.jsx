import React from 'react';
import Hero from '../components/Hero'; // Hero section displaying the main banner
import LatestCollection from '../components/LatestCollection'; // Section showing the latest product collection
import BestSeller from '../components/BestSeller'; // Section displaying the best-selling items
import OurPolicy from '../components/OurPolicy'; // Section outlining the store's policies
import NewsletterBox from '../components/NewsletterBox'; // Newsletter subscription box at the bottom

const Home = () => {
  return (
    <div>
      {/* Hero Section: Main Banner */}
      <Hero/>
      
      {/* Latest Collection Section */}
      <LatestCollection/>
      
      {/* Best Seller Section */}
      <BestSeller/>
      
      {/* Our Policy Section: Policies and Terms */}
      <OurPolicy/>
      
      {/* Newsletter Box: Subscription Form */}
      <NewsletterBox/>
    </div>
  );
}

export default Home;
