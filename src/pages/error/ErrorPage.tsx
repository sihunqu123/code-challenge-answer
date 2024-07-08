import React from "react";
const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <h1>404 Page</h1>
      <h3>Sorry, Page Is not Found</h3>
      <button onClick={() => (location.href = "/")}>Back To Home</button>
    </div>
  );
};

export default ErrorPage;
