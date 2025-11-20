import { useEffect, useState } from "react";

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

export default function InputSearchDomain({ id, placeholder, nameButton }: { 
  id: string,
  placeholder: string,
  nameButton: string,
 }) {
  const [domain, setDomain] = useState("");
  const [selectedTld, setSelectedTld] = useState(".ma");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      setDomain("")
      setSelectedTld(".ma")
  }, []);

  const handleSubmit = () => {
    const cleanDomain = domain.trim().toLowerCase();

    console.log(cleanDomain);
    
    if (!cleanDomain) {
      alert("Veuillez entrer un nom de domaine");
      return;
    }

    setIsLoading(true);

    const fullDomain = cleanDomain + selectedTld;
    
    const url = `https://my.hostino.com/order.php?spage=domain&action=register&a=add&query=${encodeURIComponent(fullDomain)}&language=french&country=MA&currency=1`;
    
    
    setTimeout(() => {
      window.location.href = url;
    }, 10);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <div className="md:max-w-2xl w-full mx-auto mb-8">
      <div className="flex rounded-[10px] overflow-hidden  border border-primary bg-white flex-col sm:flex-row">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder || "Entrer un nom de domaine"}
          className="flex-1 px-11 sm:py-7 py-8  font-[20px] search-input-doamin rounded-l-lg focus:outline-none text-gray-800"
          disabled={isLoading}
          required
        />

        <div className="mr-[20px] flex items-center">
          <select
            name="domain_tld"
            value={selectedTld}
            onChange={(e) => setSelectedTld(e.target.value)}
            className="sm:block hidden text-right text-[20px] text-title poppins-semibold  focus:outline-none bg-white cursor-pointer"
            disabled={isLoading}
          >
            {domainOptions.map((tld) => (
              <option key={tld} className="poppins-semibold " value={tld}>
                {tld}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleSubmit}
          type="button"
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 sm:py-0 py-6 text-white poppins-semibold  px-8 sm:text-lg text-xl transition whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg 
                className="animate-spin h-5 w-5" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="poppins-semibold">{nameButton || "Rechercher"}...</span>
            </>
          ) : (
            <span className="poppins-semibold">{nameButton || "Rechercher"}</span>
          )}
        </button>
      </div>
    </div>
  );
}