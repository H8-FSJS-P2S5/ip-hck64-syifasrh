import React from "react";

export function Footer() {
  return (
    <>
      <footer className="mt-10 items-center justify-center border-t border-blue-gray-50 py-6 text-center md:justify-evenly">
        <div className="items-center justify-center flex">
          <img src="/logo.png" alt="logo shifashionid" width={"150px"} />
        </div>
        <div className="flex font-sans items-center justify-center font-normal leading-relaxed text-blue-gray-900 antialiased opacity-60">
          <p>
            © 2023 Shifashion Official Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
