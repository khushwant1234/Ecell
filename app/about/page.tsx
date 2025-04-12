import React from "react";
import ImageSlider from "@/components/ImageSlider";
import FloatingHeader from "@/components/FloatingHeader";
import FeaturedPersonCard from "@/components/FeaturedPersonCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/footer";

const page = () => {
  return (
    <div className="bg-[#FCF5F0]">
      <Navbar textColor="#b63b2c"></Navbar>
      <FloatingHeader title1="E-CELL" title2="Family" />
      <FeaturedPersonCard
        imageSrc="/Images/core.jpg"
        tags={[
          "Rohan Reddy",
          "Ujjwal Mishra",
          "Nishtha Jain",
          "S Avanthika",
          "Daksh Chopra",
        ]}
      />
      <ImageSlider />
      <Footer textColor="#b63b2c" />
      {/* Add any other components or content you want here */}
    </div>
  );
};

export default page;
