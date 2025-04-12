import React from "react";
import FAQs from "@/components/FAQ";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/footer";

const page = () => {
  return (
    <div className="bg-[#f8f4ff]">
      <Navbar textColor="#8082E9"></Navbar>
      <FAQs />
      <Footer textColor="#8082E9" />
    </div>
  );
};

export default page;
