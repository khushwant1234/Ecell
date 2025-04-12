import React from "react";
import FAQs from "@/components/FAQ";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <div className="bg-[#f8f4ff]">
      <Navbar textColor="#8082E9"></Navbar>
      <FAQs />
    </div>
  );
};

export default page;
