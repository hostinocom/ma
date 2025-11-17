import type { CookieConsentConfig } from 'vanilla-cookieconsent';

export const config: CookieConsentConfig = {
  root: '#cc-container', // Important, generate the html inside a common/persistent element

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
            '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4 (dummy)</a>',
          onAccept: () => {
            console.log('ga4 accepted');
            // TODO: load ga4
          },
          onReject: () => {
            console.log('ga4 rejected');
          },
          cookies: [
            {
              name: /^_ga/,
            },
          ],
        },
        another: {
          label: 'Another one (dummy)',
        },
      },
    },
  },
  language: {
    default: 'en',
    autoDetect: 'browser',
    translations: {
      en: {
        consentModal: {
          title: "We care about your privacy",
          description:"This website uses cookies to enhance your experience.",
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Cookie settings',
        },
        preferencesModal: {
          title: 'Cookie Preferences Center',
          acceptAllBtn: 'Accept All',
          acceptNecessaryBtn: 'Reject All',
          savePreferencesBtn: 'Cookie Settings',
          closeIconLabel: 'Close',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Use of Cookies',
              description:
                'We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners.',
            },
            {
              title:
                'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
              description:
                'These cookies are essential for the website to function and cannot be disabled in our systems. They are usually set in response to actions you take that correspond to a service request, such as setting your privacy preferences, logging in, or filling out forms.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Functionality Cookies',
              description:
                'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. If you do not allow these cookies, some or all of these services may not function properly.',
              linkedCategory: 'functionality',
            },
            {
              title: 'Analytics Cookies',
              description:
                'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site. All information collected by these cookies is aggregated and therefore anonymous.',
              linkedCategory: 'analytics',
            },
            {
              title: 'More Information',
              description:
                'For any questions regarding our cookie policy and your choices, please <a class="cc__link" href="/contact">contact us</a>.',
            },
          ],
        },
      },
    },
  },
};
