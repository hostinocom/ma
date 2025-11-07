"use client";


import React, { useState } from "react";


type AnimatedButtonProps = {
    text?: string;
    hoverText?: string;
    bgColor?: string;
    hoverBgColor?: string;
    textColor?: string;
    className?: string;
    arrowButton?: boolean;
    colorArrow?: string;
  };


export type Plan = {
  id: number;
  name: string;
  subtext?: string;
  gbOptions: {
    gb: string;
    price: string;
  }[];
  defaultGb: string;
  performance_stars: number;
  order: {
    text: string;
    href: string;
  };
  features: string[] | React.ReactNode[];
  most_popular: {
    text: string;
    is_most_popular: boolean;
    mostPopularGb?: string;
  };
  countUser: string;
};

type Props = {
  className?: string;
  title?: string;
  smallTitle?: string;
  plans?: Plan[];
  heroHeading?: boolean;
  bigTitle?: string;
  namePlaneBold?: boolean;
  titleExiste: boolean;
  id?: string
};

const hostingPlans: Plan[] = [
  {
    id: 1,
    name: "Maily®",
    gbOptions: [
      {
        gb: "8GB",
        price: "25 Dhs/mois",
      },
      {
        gb: "25GB",
        price: "45 Dhs/mois",
      },
    ],
    defaultGb: "8GB",
    performance_stars: 1,
    order: {
      text: "Commander",
      href: "https://my.hostino.com/order.php?pid=75&language=french&country=MA&currency=1",
    },
    features: [
      "Webmail",
      "POP/IMAP/SMTP",
      "Compatibilité <b>Outlook</b>",
      "Compatibilité <b>iOS / Android</b>",
      "Gestion des contacts",
      "Sécurité DNS <b>SPF, DKIM, DMARC</b>",
      <span style={{ opacity: "0.2" }}>Intégration ZOOM</span>,
      <span style={{ opacity: "0.2" }}>
        Gestion centralisée des signatures
      </span>,
      <span style={{ opacity: "0.2" }}>Gestion des tâches</span>,
      <span style={{ opacity: "0.2" }}>Logo personnalisé</span>,
      <span style={{ opacity: "0.2" }}>Calendrier</span>,
      <span style={{ opacity: "0.2" }}>Exchange ActiveSync</span>,
      "<br />",
      "<b>Sécurité</b>",
      "Antispam",
      "Antivirus",
      "Sauvegarde automatique",
      <span style={{ opacity: "0.2" }}>Double authentification</span>,
      <span style={{ opacity: "0.2" }}>Restriction d’adresse IP</span>,
      <span style={{ opacity: "0.2" }}>Accès forcé avec OTP</span>,
      "<br />",
      "<b>30 jours</b> satisfait ou remboursé",
      "Support par <b>téléphone et ticket</b>",
    ],
    most_popular: {
      text: "Le plus vendu",
      is_most_popular: false,
    },
    countUser: "par utilisateur / par mois",
  },
  {
    id: 2,
    name: "Maily® Plus",
    subtext:
      "Hébergement idéal pour les petits sites à faible consommation de ressources.",
    gbOptions: [
      {
        gb: "8GB",
        price: "35 Dhs/mois",
      },
      {
        gb: "25GB",
        price: "50 Dhs/mois",
      },
      {
        gb: "50GB",
        price: "65 Dhs/mois",
      },
    ],
    defaultGb: "25GB",
    performance_stars: 4,
    order: {
      text: "Commander",
      href: "https://my.hostino.com/order.php?pid=76&language=french&currency=1&country=MA&currency=",
    },
    features: [
      "Webmail",
      "POP/IMAP/SMTP",
      "Compatibilité <b>Outlook</b>",
      "Compatibilité <b>iOS / Android</b>",
      "Gestion des contacts",
      "Sécurité DNS <b>SPF, DKIM, DMARC</b>",
      "Intégration ZOOM",
      "Gestion centralisée des signatures",
      "Gestion des tâches",
      "Logo personnalisé",
      "Calendrier",
      <span style={{ opacity: "0.2" }}>Exchange ActiveSync</span>,
      "<br />",
      "<b>Sécurité</b>",
      "Antispam",
      "Antivirus",
      "Sauvegarde automatique",
      "Double authentification",
      "Restriction d’adresse IP",
      "Accès forcé avec OTP",
      "<br />",
      "<b>30 jours</b> satisfait ou remboursé",
      "Support par <b>téléphone et ticket</b>",
    ],
    most_popular: {
      text: "Le plus vendu",
      is_most_popular: true,
      mostPopularGb: "25GB",
    },
    countUser: "par utilisateur / par mois",
  },
  {
    id: 3,
    name: "Maily® Pro",
    gbOptions: [
      {
        gb: "8GB",
        price: "45 Dhs/mois",
      },
      {
        gb: "50GB",
        price: "75 Dhs/mois",
      },
      {
        gb: "100GB",
        price: "130 Dhs/mois",
      },
    ],
    defaultGb: "8GB",
    performance_stars: 5,
    order: {
      text: "Commander",
      href: "https://my.hostino.com/order.php?pid=80&language=french&currency=1&country=MA&currency=",
    },
    features: [
      "Webmail",
      "POP/IMAP/SMTP",
      "Compatibilité <b>Outlook</b>",
      "Compatibilité <b>iOS / Android</b>",
      "Gestion des contacts",
      "Sécurité DNS <b>SPF, DKIM, DMARC</b>",
      "Intégration ZOOM",
      "Gestion centralisée des signatures",
      "Gestion des tâches",
      "Logo personnalisé",
      "Calendrier",
      "Exchange ActiveSync",
      "<br />",
      "<b>Sécurité</b>",
      "Antispam",
      "Antivirus",
      "Sauvegarde automatique",
      "Double authentification",
      "Restriction d’adresse IP",
      "Accès forcé avec OTP",
      "<br />",
      "<b>30 jours</b> satisfait ou remboursé",
      "Support par <b>téléphone et ticket</b>",
    ],
    most_popular: {
      text: "Le plus vendu",
      is_most_popular: false,
    },
    countUser: "par utilisateur / par mois",
  },
];

const  AnimatedButton = ({
    text = "Click Me",
    hoverText = "Let's Go",
    bgColor = "bg-primary",
    hoverBgColor,
    textColor = "text-white",
    className = "",
    arrowButton = false,
    colorArrow = "white",
  }: AnimatedButtonProps) => {
    const hoverBgButtonColor = `hover:${hoverBgColor}`;
    return (
      <button
        className={`relative overflow-hidden cursor-pointer transition-all duration-200 group ${className} ${
          hoverBgColor && hoverBgColor !=="bg-transparent" && "hover:bg-title"
        } ${bgColor} `}
      >
        {/* Current text that slides up */}
        <span
          className={`block transition-transform duration-200 ease-out group-hover:-translate-y-[150%]`}
        >
          {text}
        </span>
  
        {/* Hover text that slides in from bottom */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out translate-y-[150%] group-hover:translate-y-0 ${textColor}`}
        >
          {hoverText}
        </span>
  
        {arrowButton && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke={colorArrow}
            className="w-4 h-4 absolute right-[8%] top-1/2 transform translate-y-[-50%]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>
    );
  }


const PlanCard = ({
  plan,
  totalPlans,
  namePlaneBold,
}: {
  plan: Plan;
  totalPlans: number;
  namePlaneBold?: boolean;
  id?: string;
}) => {
  const [selectedGb, setSelectedGb] = useState(plan.defaultGb);
  const currentOption = plan.gbOptions.find((opt) => opt.gb === selectedGb);

  const getWidthClass = () => {
    console.log(totalPlans);
    if (totalPlans === 2) {
      return "w-full md:w-[100%] lg:mx-[0] md:mx-[150px] lg:mb-[35px] md:mb-[50px] mb-[35px] lg:w-[38%]";
    }
    return "w-full md:w-[100%] lg:mx-[0] md:mx-[150px] lg:mb-[35px] md:mb-[50px] mb-[35px] lg:w-[32%]";
  };

  return (
    <div 
      className={`${
        plan.most_popular.is_most_popular && "border-3 border-primary"
      } bg-white relative lg:text-left text-center rounded-[10px] 
      ${getWidthClass()}
       md:pt-[55px] md:px-[50px] md:pb-[50px] lg:pt-[50px] lg:pb-[40px] lg:px-[40px] pt-[45px] px-[25px] pb-[35px] border border-gray-300 h-full`}
    >
      {plan.most_popular.is_most_popular && (
        <div className="absolute py-[8px] bg-primary px-[20px] text-[16px] sm:left-1/3 left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-white text-center font-meduim inline-block">
          <AnimatedButton
            text={plan.most_popular.text.toUpperCase()}
            hoverText={plan.most_popular.text.toUpperCase()}
            bgColor="bg-primary"
            textColor="text-white"
          />
        </div>
      )}

      {namePlaneBold ? (
        <h3
          className="lg:text-[34px] md:text-left text-center md:text-[31px] text-[28px] text-title font-[600] md:leading-[33px] leading-[1.3em] mb-4"
          dangerouslySetInnerHTML={{ __html: plan.name }}
        />
      ) : (
        <h3
          className="lg:text-[26px] md:text-left text-center md:text-[30px] text-[28px] text-title font-[600] md:leading-[33px] leading-[1.3em] mb-4"
          dangerouslySetInnerHTML={{ __html: plan.name }}
        />
      )}

      <div className="border-t py-[15px] border-gray-200 my-4"></div>

      <div className="flex rounded-[6px]  max-w-max overflow-hidden items-center lg:justify-start justify-center mb-6 flex-wrap">
        {plan.gbOptions.map((option) => (
          <button
            key={option.gb}
            onClick={() => setSelectedGb(option.gb)}
            className={`py-[10px] px-[24px]  font-[600] text-[16px] transition ${
              selectedGb === option.gb
                ? "bg-primary text-white"
                : "bg-title text-white hover:bg-primary"
            }`}
          >
            {option.gb}
          </button>
        ))}
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <p className="text-base text-title font-semibold mb-1">À seulement</p>
        <p
          className="font-[Montserrat] text-[40px] font-semibold leading-[54px] text-title"
        >
          {currentOption?.price}
        </p>
      </div>

      <a
        href={plan.order.href}
        className={`w-full ${
          plan.most_popular.is_most_popular
            ? "bg-primary"
            : "bg-title hover:bg-primary transition"
        } text-white flex items-center mt-[18px] gap-3 justify-center font-[600] py-[16px] rounded-[10px] text-center mb-4 transition`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {plan.order.text}
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={4}
          stroke="currentColor"
          className="size-3 font-[600]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </a>

      <p className="text-[14px] text-title mb-12">{plan.countUser}</p>

      <div className="border-t border-gray-200 my-4"></div>

      <ul className="text-gray-700 text-sm space-y-2 flex-grow">
        {plan.features.map((feature : any, index : number)  => (
          <li
            key={index}
            className="flex items-center lg:justify-start justify-center"
          >
            {typeof feature == "object" ? (
              <>{feature as React.ReactNode}</>
            ) : (
              <span
                className="text-title"
                dangerouslySetInnerHTML={{ __html: feature }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function PlansEmail({
  className,
  heroHeading,
  plans = hostingPlans,
  namePlaneBold,
  id
}: Props) {
  return (
    <section id={id} className={`${className} overflow-hidden  relative`}>
      <div className="container">
        {!heroHeading && (
          <div className="text-center">
            <h2 className="title-section text-title">
              Choisissez votre plan email<br className="sm:block hidden"/> professionnel Maroc
            </h2>
          </div>
        )}

        <div
          className={`${
            hostingPlans.length > 2
              ? "lg:gap-x-[1.33%] gap-y-[1.33%] lg:justify-self-start justify-center"
              : "gap-x-[5%] justify-center"
          } flex flex-wrap py-[30px] w-full`}
        >
          {plans?.map((plan: Plan) => (
            <PlanCard
              namePlaneBold={namePlaneBold}
              key={plan.id}
              plan={plan}
              totalPlans={plans.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}



  
