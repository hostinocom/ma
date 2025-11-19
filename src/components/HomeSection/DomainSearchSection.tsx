import { useState, type FormEvent } from "react";
import InputSearchDoamain from "../commonSections/InputSearchDoamain";



export default function DomainSearchSection({ id , placeholder, nameButton }: { id: string, placeholder: string, nameButton: string }) {
  const [domain, setDomain] = useState("");
  const [selectedTld, setSelectedTld] = useState(".ma");

  const handleSubmit = () => {
    // Nettoyer le nom de domaine (enlever espaces et caractères spéciaux)
    const cleanDomain = domain.trim().toLowerCase();
    
    // Validation
    if (!cleanDomain) {
      alert("Veuillez entrer un nom de domaine");
      return;
    }

    // Construire le domaine complet
    const fullDomain = cleanDomain + selectedTld;
    
    // Construire l'URL complète
    const url = `https://my.hostino.com/order.php?spage=domain&action=register&a=add&query=${encodeURIComponent(fullDomain)}&language=french&country=MA&currency=1`;
    
    console.log("Redirection vers:", url);
    
    // Rediriger vers la page
    window.location.href = url;
  };

  // Gérer la soumission avec la touche Entrée
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
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
        <h2 className="title-section-white max-big-title text-white poppins-semibold  mb-4">
          Enregistrer votre nom de domaine
        </h2>
        <p className="mb-8 paragraph-white">
          Achetez dès maintenant votre
          <a
            href="/nom-de-domaine-ma/"
            className="underline mx-[4px]"
          >
            .ma domain name
          </a>
          à partir de 118 DH/an.
        </p>

        <InputSearchDoamain id="ma" placeholder={placeholder} nameButton={nameButton} />

        <img
          src="/images/01/nav-domaines.png"
          alt="Nav domaines"
          className="mx-auto md:w-[50%] sm:w-[80%] w-[100%]"
          loading="eager"
          width={1300}
          height={900}
        />
      </div>
    </section>
  );
}