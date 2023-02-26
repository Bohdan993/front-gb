import React from "react";
import Link from "next/link";

const FourOhFour = () => {
  return (
    <div className="w-100 text-center">
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </div>
  );
};

export default FourOhFour;
