"use client";

import { useState } from "react";
import InputSearchDoamain from "../commonSections/InputSearchDoamain";

export default function DomainSearchSectionEn({ id , placeholder, nameButton }: { id: string, placeholder: string, nameButton: string }) {
  

  return (
    <section
      id={id}
      style={{
        backgroundImage: "linear-gradient(180deg, #004C48 18%, #084448 100%)",
      }}
      className="lg:mt-[150px] mt-[60px] bg-gradient-to-r from-[#1b083b] to-[#7e5eba] text-white"
    >
      <div className="container py-[120px] text-center">
        <h2 className="title-section-white max-big-title text-white poppins-semibold  mb-4">
          Register your .Ma Domain Name Today
        </h2>
        <p className="mb-8 paragraph-white">
          Start your online journey with a{" "}
          <a
            href="https://www.hostino.ma/en/ma-domain-name"
            className="underline mx-[4px]"
          >
            .ma domain name
          </a>
          . Choose yours today.
        </p>

        <InputSearchDoamain id="ma" placeholder={placeholder} nameButton={nameButton} />

        <img
          src="https://www.hostino.ma/en/wp-content/uploads/2025/04/nav-domains.png"
          alt="Nav domains"
          className="mx-auto md:w-[50%] sm:w-[80%] w-[100%]"
          loading="eager"
          width={1226}
          height={55}
        />
      </div>
    </section>
  );
}

