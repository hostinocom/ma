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

export default function InputSearchDomain({ id }: { id: string }) {
  const [domain, setDomain] = useState("");
  const [selectedTld, setSelectedTld] = useState(".ma");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    // Nettoyer le nom de domaine
    const cleanDomain = domain.trim().toLowerCase();
    
    // Validation
    if (!cleanDomain) {
      alert("Veuillez entrer un nom de domaine");
      return;
    }

    // Activer le chargement
    setIsLoading(true);

    // Construire le domaine complet
    const fullDomain = cleanDomain + selectedTld;
    
    // Construire l'URL complète
    const url = `https://my.hostino.com/order.php?spage=domain&action=register&a=add&query=${encodeURIComponent(fullDomain)}&language=french&country=MA&currency=1`;
    
    console.log("Redirection vers:", url);
    
    // Petit délai pour montrer l'indicateur avant la redirection
    setTimeout(() => {
      window.location.href = url;
    }, 10);
  };

  // Gérer la soumission avec la touche Entrée
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <div className="md:max-w-2xl w-full mx-auto mb-8">
      <div className="flex rounded-lg overflow-hidden sm:border-0 border border-primary bg-white flex-col sm:flex-row">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Entrer un nom de domaine"
          className="flex-1 px-8 sm:py-6 py-8 text-title font-[20px] rounded-l-lg focus:outline-none text-gray-800"
          disabled={isLoading}
          required
        />

        <div className="mr-[20px] flex items-center">
          <select
            name="domain_tld"
            value={selectedTld}
            onChange={(e) => setSelectedTld(e.target.value)}
            className="sm:block hidden text-right text-[20px] text-title font-[600] focus:outline-none bg-white cursor-pointer"
            disabled={isLoading}
          >
            {domainOptions.map((tld) => (
              <option key={tld} className="font-[600]" value={tld}>
                {tld}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleSubmit}
          type="button"
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 sm:py-0 py-6 text-white font-semibold px-8 sm:text-lg text-xl transition whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              <span>Recherche...</span>
            </>
          ) : (
            <span>Rechercher</span>
          )}
        </button>
      </div>
    </div>
  );
}