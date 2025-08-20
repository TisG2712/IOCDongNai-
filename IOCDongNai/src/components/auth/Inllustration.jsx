import React from "react";
import bgImage from "../../assets/images/IOCbackground.jpg";

const Inllustration = () => {
  return (
    <div className="hidden md:block w-1/2">
      <img
        src={bgImage}
        alt="Illustration Background"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Inllustration;
