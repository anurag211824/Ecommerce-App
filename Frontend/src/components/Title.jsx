import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500">
        {text1 + " "} 
        <span className="text-gray-700 font-medium">{text2}</span> {/* Highlight the second part of the title */}
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p> {/* Underline with dynamic width based on screen size */}
    </div>
  );
};

export default Title;
