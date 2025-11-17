import type { CookieConsentConfig } from 'vanilla-cookieconsent';

export const config: CookieConsentConfig = {
  root: '#cc-container',

  guiOptions: {
    consentModal: {
      layout: 'box inline',
      position: 'bottom left',
    },
    preferencesModal: {
      layout: 'box',
      position: 'right',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {},
    analytics: {
      services: {
        ga4: {
          label:
            '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4</a>',
          onAccept: () => {
            console.log('ga4 accepté');
            // TODO: charger ga4
          },
          onReject: () => {
            console.log('ga4 refusé');
          },
          cookies: [
            {
              name: /^_ga/,
            },
          ],
        },
        another: {
          label: 'Autre service',
        },
      },
    },
  },
  language: {
    default: 'fr-MA',
    autoDetect: 'browser',
    translations: {
      fr: {
        consentModal: {
          title: 'Le respect de votre vie privée, notre priorité',
          description : "Ce site web utilise des cookies pour améliorer votre expérience.",
          acceptAllBtn: 'Tout accepter',
          acceptNecessaryBtn: 'Tout refuser',
          showPreferencesBtn: 'Paramètres des cookies',
        },
        preferencesModal: {
          title: 'Centre de Préférences des Cookies',
          acceptAllBtn: 'Tout Accepter',
          acceptNecessaryBtn: 'Tout Rejeter',
          savePreferencesBtn: 'Paramètres des Cookies',
          closeIconLabel: 'Fermer',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Utilisation des Cookies',
              description:
                'Nous utilisons des cookies pour personnaliser le contenu et les publicités, pour fournir des fonctionnalités de médias sociaux et pour analyser notre trafic. Nous partageons également des informations sur votre utilisation de notre site avec nos partenaires de médias sociaux, de publicité et d\'analyse.',
            },
            {
              title:
                'Cookies Strictement Nécessaires Toujours Activés',
              description:
                'Ces cookies sont essentiels au fonctionnement du site Web et ne peuvent pas être désactivés dans nos systèmes. Ils sont généralement définis en réponse à des actions que vous effectuez et qui correspondent à une demande de service, comme la définition de vos préférences de confidentialité, la connexion ou le remplissage de formulaires.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Cookies de Fonctionnalité',
              description:
                'Ces cookies permettent au site Web de fournir des fonctionnalités améliorées et une personnalisation. Ils peuvent être définis par nous ou par des fournisseurs tiers dont nous avons ajouté les services à nos pages. Si vous n\'autorisez pas ces cookies, certains ou tous ces services peuvent ne pas fonctionner correctement.',
              linkedCategory: 'functionality',
            },
            {
              title: 'Cookies Analytiques',
              description:
                'Ces cookies nous permettent de compter les visites et les sources de trafic afin que nous puissions mesurer et améliorer les performances de notre site. Ils nous aident à savoir quelles pages sont les plus et les moins populaires et à voir comment les visiteurs se déplacent sur le site. Toutes les informations collectées par ces cookies sont agrégées et donc anonymes.',
              linkedCategory: 'analytics',
            },
            {
              title: 'Plus d\'Informations',
              description:
                'Pour toute question concernant notre politique en matière de cookies et vos choix, veuillez nous contacter.',
            },
          ],
        },
      },
    },
  },
};