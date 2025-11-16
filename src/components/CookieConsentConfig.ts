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
          description: "Ce site utilise des cookies essentiels à son bon fonctionnement et pour collecter des données sur la façon dont vous interagissez avec, ainsi qu'à des fins marketing.",
          acceptAllBtn: 'Tout accepter',
          acceptNecessaryBtn: 'Tout refuser',
          showPreferencesBtn: 'Paramètres des cookies',
          footer:
            '<a href="/politique-cookies">Politique de cookies</a>\n<a href="/conditions-generales">Conditions générales</a>',
        },
        preferencesModal: {
          title: 'Centre de préférences des cookies',
          acceptAllBtn: 'Tout accepter',
          acceptNecessaryBtn: 'Tout refuser',
          savePreferencesBtn: 'Paramètres des cookies',
          closeIconLabel: 'Fermer',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Utilisation des cookies',
              description:
                'Nous utilisons des cookies pour personnaliser le contenu et les annonces, pour fournir des fonctionnalités de médias sociaux et pour analyser notre trafic. Nous partageons également des informations sur votre utilisation de notre site avec nos partenaires de médias sociaux, de publicité et d\'analyse.',
            },
            {
              title:
                'Cookies strictement nécessaires <span class="pm__badge">Toujours activés</span>',
              description:
                'Ces cookies sont essentiels au fonctionnement du site web et ne peuvent pas être désactivés dans nos systèmes. Ils sont généralement établis en réponse à des actions que vous effectuez et qui correspondent à une demande de services, telles que la définition de vos préférences de confidentialité, la connexion ou le remplissage de formulaires.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Cookies de fonctionnalité',
              description:
                'Ces cookies permettent au site web de fournir des fonctionnalités et une personnalisation améliorées. Ils peuvent être définis par nous ou par des fournisseurs tiers dont nous avons ajouté les services à nos pages. Si vous n\'autorisez pas ces cookies, certains ou tous ces services peuvent ne pas fonctionner correctement.',
              linkedCategory: 'functionality',
            },
            {
              title: 'Cookies analytiques',
              description:
                'Ces cookies nous permettent de compter les visites et les sources de trafic afin que nous puissions mesurer et améliorer les performances de notre site. Ils nous aident à savoir quelles pages sont les plus et les moins populaires et à voir comment les visiteurs se déplacent sur le site. Toutes les informations collectées par ces cookies sont agrégées et donc anonymes.',
              linkedCategory: 'analytics',
            },
            {
              title: 'Plus d\'informations',
              description:
                'Pour toute question concernant notre politique relative aux cookies et vos choix, veuillez <a class="cc__link" href="/contact">nous contacter</a>.',
            },
          ],
        },
      },
    },
  },
};