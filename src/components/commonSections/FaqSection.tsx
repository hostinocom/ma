"use client";

import { useState } from "react";

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[] >([-1]); // First item open by default

  const toggleItem = (index: number) => {
    // Accordion mode: only one item open at a time
    setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
  };

  const faqData = [
    {
      question: "C'est quoi l'hébergement d'un site web ?",
      answer: (
        <>
          <p className="mb-4">
            Imaginez votre site web comme une maison. Pour qu'elle soit visible
            sur internet, il lui faut un terrain. C'est là qu'intervient
            l'hébergement web.
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                L'hébergement web, c'est la location d'un espace sur un serveur
                puissant, connecté à internet.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                C'est sur cet espace que seront stockés tous les fichiers de
                votre site web (textes, images, vidéos...).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                L'hébergeur web, c'est le propriétaire du terrain. Il vous
                fournit l'espace et s'occupe de tout pour que votre site web
                soit accessible 24/24h et 7/7j.
              </span>
            </li>
          </ul>
          <p>
            Pour que votre site web soit accessible, il vous faut un nom de
            domaine, que la plupart des hébergeurs web vous permettent d'acheter
            en même temps que votre pack d'hébergement, et ils peuvent vous
            aider à en choisir et à l'enregistrer si vous n'en avez pas encore.
          </p>
        </>
      ),
    },
    {
      question: "Quel est le meilleur hébergeur web ?",
      answer:
        "Que vous soyez un particulier, une petite entreprise ou une grande organisation, Hostino™ a la solution d'hébergement web qu'il vous faut. Avec ses performances, sa fiabilité, ses fonctionnalités complètes et ses prix abordables, Hostino™ est le choix idéal pour héberger votre site web au Maroc.",
    },
    {
      question:
        "Est-il possible de modifier le pack d'hébergement web après souscription ?",
      answers: [
        "Bien sûr ! Toutes nos offres d'hébergement sont flexibles et ajustables selon vos exigences. Vous avez la possibilité de passer de l'hébergement web Starty® à l'hébergement Business® ou à Cloudy® à tout moment via votre espace client.",
        "Cette mise à niveau s'effectue automatiquement et sans aucune interruption de service.",
      ],
    },
    {
      question: "Quels sont les délais d'activation de ma commande ?",
      answers: [
        "L'activation de votre hébergement web est quasi instantanée. Dès validation de votre paiement, votre espace d'hébergement est configuré et accessible dans les minutes qui suivent.",
        "Vous recevrez vos identifiants de connexion par email immédiatement.",
      ],
    },
    {
      question: "Pourquoi héberger votre site au Maroc ?",
      answer:
        "Héberger votre site au Maroc offre plusieurs avantages : des temps de chargement plus rapides pour vos visiteurs marocains, une conformité avec la réglementation locale, la souveraineté de vos données sur le territoire national, et un support technique qui comprend parfaitement le contexte local.",
    },
    {
      question: "Quelle pack d'hébergement web conviendra à votre projet web ?",
      answer:
        "Le choix du pack dépend de plusieurs facteurs : le trafic attendu, le type de site (vitrine, e-commerce, blog), les ressources nécessaires (stockage, bande passante), et votre budget. Notre équipe peut vous conseiller gratuitement pour choisir le pack le plus adapté à votre projet.",
    },
  ];

  const renderAnswer = (item: any) => {
    if (item.answer) {
      // Single answer
      return typeof item.answer === "string" ? (
        <p>{item.answer}</p>
      ) : (
        item.answer
      );
    } else if (item.answers && Array.isArray(item.answers)) {
      // Multiple answers with mb-6 spacing
      return (
        <>
          {item.answers.map((phrase: string, idx: number) => (
            <p key={idx} className={idx < item.answers.length - 1 ? "mb-6" : ""}>
              {phrase}
            </p>
          ))}
        </>
      );
    }
    return null;
  };

  return (
    <section className="bg-gray-100 py-[150px]">
      <div className="container">
        <h2 className="title-section mb-[50px]">FAQ – Hébergement web</h2>

        <div className="flex md:flex-row flex-col gap-6">
          <div className="col-span-1 flex flex-col gap-6">
            {faqData.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="w-full transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full bg-white rounded-lg px-6 py-5 flex items-center justify-between text-left group"
                  aria-expanded={openItems.includes(index)}
                >
                  <span className="text-lg font-semibold text-[#14213D] pr-4 transition-colors duration-300">
                    {item.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-500 ease-in-out ${
                      openItems.includes(index) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openItems.includes(index)
                      ? "max-h-[2000px] pt-10 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div
                    className={`px-6 pb-6 text-[#022545] leading-relaxed transform transition-all duration-500 ${
                      openItems.includes(index)
                        ? "translate-y-0"
                        : "-translate-y-4"
                    }`}
                  >
                    {renderAnswer(item)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-1 flex flex-col gap-6">
            {faqData.slice(3, 7).map((item, index) => (
              <div key={index + 3} className="transition-shadow duration-300">
                <button
                  onClick={() => toggleItem(index + 3)}
                  className="w-full bg-white rounded-lg px-6 py-5 flex items-center justify-between text-left group"
                  aria-expanded={openItems.includes(index + 3)}
                >
                  <span className="text-lg font-semibold text-[#14213D] pr-4 transition-colors duration-300">
                    {item.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-500 ease-in-out ${
                      openItems.includes(index + 3) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openItems.includes(index + 3)
                      ? "max-h-[2000px] pt-10 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div
                    className={`px-6 pb-6 text-[#022545] leading-relaxed transform transition-all duration-500 ${
                      openItems.includes(index + 3)
                        ? "translate-y-0"
                        : "-translate-y-4"
                    }`}
                  >
                    {renderAnswer(item)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}