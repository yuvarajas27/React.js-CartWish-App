import React from 'react'
import HeroSection from './HeroSection'
import iphone from "../../assets/iphone-14-pro.webp"
import mac from "../../assets/mac-system-cut.jfif"
import FeaturedProducts from './FeaturedProducts'

// we didn't created HomePage.css file , because all parts of our home page like HeroSection,FeaturedSection are separate components, so we will create css files for them respectively.
const HomePage = () => {
  return (
    <div>
        <HeroSection
        title="Buy iphone 14 Pro"
        subtitle="Experience the power of the latest iphone 14 with our most Pro camera ever"
        // giving link as relative path, its arecommende approach 
        // A relative path is a URL that is relative to the base URL of your current environment (e.g., your React app's root URL).
        // If your React app is running at http://localhost:3000, using to="/products/${id}" will navigate to http://localhost:3000/products/${id}.
        // In production, if your app is running at https://example.com, the same relative path will navigate to https://example.com/products/${id}.

        // An absolute path is a full URL that includes the protocol (http:// or https://), domain name, and the entire path to the resource.
        // This path will always navigate to the specific address http://localhost:5000/products/${id}, regardless of where your application is hosted.
        link="/products/669295a6d70cf4b757072415"
        image={iphone}
        />

        <FeaturedProducts/>
        
        <HeroSection
        title="Build the Ultimate Setup"
        subtitle="You can add Studio Display and colour-matched Magic accessories to your bag after config"
        link="/products/669295a6d70cf4b75707241d"
        image={mac}
        
        />

    </div>
  )
}

export default HomePage

