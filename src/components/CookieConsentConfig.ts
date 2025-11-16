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
    default: 'fr',
    autoDetect: 'browser',
    translations: {
      fr: {
        consentModal: {
          title: 'Nous utilisons des cookies',
          description: 
            'Ce site web utilise des cookies pour améliorer votre expérience de navigation et analyser notre trafic. En cliquant sur "Tout accepter", vous consentez à notre utilisation des cookies.',
          acceptAllBtn: 'Tout accepter',
          acceptNecessaryBtn: 'Tout refuser',
          showPreferencesBtn: 'Gérer les préférences',
          footer:
            '<a href="/politique-cookies">Politique de cookies</a>\n<a href="/politique-de-confidentialite">Politique de confidentialité</a>\n<a href="/conditions-generales">Conditions générales</a>',
        },
        preferencesModal: {
          title: 'Centre de préférences des cookies',
          acceptAllBtn: 'Tout accepter',
          acceptNecessaryBtn: 'Tout refuser',
          savePreferencesBtn: 'Enregistrer les préférences',
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
      en: {
        consentModal: {
          title: 'We use cookies',
          description:
            'This website uses cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept all", you consent to our use of cookies.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Manage preferences',
          footer:
            '<a href="/en/cookie-policy">Cookie Policy</a>\n<a href="/en/privacy-policy">Privacy Policy</a>\n<a href="/en/terms-conditions">Terms & Conditions</a>',
        },
        preferencesModal: {
          title: 'Cookie Preferences Center',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Cookie Usage',
              description:
                'We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners.',
            },
            {
              title:
                'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
              description:
                'These cookies are essential for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Functionality Cookies',
              description:
                'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.',
              linkedCategory: 'functionality',
            },
            {
              title: 'Analytics Cookies',
              description:
                'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous.',
              linkedCategory: 'analytics',
            },
            {
              title: 'More information',
              description:
                'For any questions regarding our cookie policy and your choices, please <a class="cc__link" href="/en/contact">contact us</a>.',
            },
          ],
        },
      },
    },
  },
};