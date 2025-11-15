"use client";

import { useState } from "react";

const domainOptions = [
  ".ma",
  ".com",
  ".net",
  ".info",
  ".org",
  ".co.ma",
  ".org.ma",
  ".net.ma",
  ".edu.ma",
  ".press.ma",
  ".gov.ma",
  ".ac.ma",
  ".us",
  ".es",
  ".fr",
  ".be",
  ".nl",
  ".it",
  ".de",
  ".ch",
  ".eu",
  ".ca",
  ".uk",
  ".co.uk",
  ".tv",
  ".biz",
  ".co",
  ".tech",
  ".cloud",
  ".store",
  ".shop",
  ".ai",
];

export default function DomainSearchSectionEn({ id }: { id: string }) {
  const [domain, setDomain] = useState("");

  const handleSubmit = () => {
    console.log(domain);
  };

  return (
    <section
      id={id}
      style={{
        backgroundImage: "linear-gradient(180deg, #004C48 18%, #084448 100%)",
      }}
      className="lg:mt-[150px] mt-[60px] bg-gradient-to-r from-[#1b083b] to-[#7e5eba] text-white"
    >
      <div className="container py-[120px] text-center">
        <h2 className="title-section-white max-big-title text-white font-[600] mb-4">
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

        <form className="md:max-w-2xl w-full mx-auto mb-8">
          <div className="flex rounded-lg overflow-hidden sm:border-0 border border-primary bg-white flex-col sm:flex-row">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Search for a domain name"
              className="flex-1 px-8 sm:py-6 py-8 text-title font-[20px] rounded-l-lg focus:outline-none"
              required
            />

            <div className="mr-[20px] flex items-center">
              <select
                name="domain_tld"
                defaultValue=".ma"
                className="sm:block hidden text-right text-[20px] text-title font-[600]"
              >
                {domainOptions.map((domain) => (
                  <option key={domain} className="font-[600]" value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                console.log("clicked");
              }}
              className="bg-primary sm:py-0 py-6 text-white font-semibold px-8 sm:text-lg text-xl transition whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </form>

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

