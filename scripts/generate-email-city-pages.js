import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to remove accents
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Function to normalize city name for URL
function normalizeCityNameForUrl(cityName) {
  return removeAccents(cityName)
    .toLowerCase()
    .replace(/\s+/g, "-");
}

// Function to replace Ville/ville with city name
function replaceVilleWithCity(text, cityName) {
  const cityNameCapitalized = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  const cityNameLowercase = cityName.toLowerCase();
  
  return text
    .replace(/Ville/g, cityNameCapitalized)
    .replace(/ville/g, cityNameLowercase);
}

// Cities data
const moroccanCitiesMaps = [
  {
    id: 1,
    title: "Google map of Tanger",
    name: "Tanger",
    src: "https://www.google.com/maps/embed/v1/place?q=Tanger&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 2,
    title: "Google map of Tétouan",
    name: "Tétouan",
    src: "https://www.google.com/maps/embed/v1/place?q=T%C3%A9touan&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 3,
    title: "Google map of Larache",
    name: "Larache",
    src: "https://www.google.com/maps/embed/v1/place?q=Larache&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 4,
    title: "Google map of Asilah",
    name: "Asilah",
    src: "https://www.google.com/maps/embed/v1/place?q=Asilah&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 5,
    title: "Google map of Chefchaouen",
    name: "Chefchaouen",
    src: "https://www.google.com/maps/embed/v1/place?q=Chefchaouen&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 6,
    title: "Google map of Ksar El Kébir",
    name: "Ksar El Kébir",
    src: "https://www.google.com/maps/embed/v1/place?q=Ksar+El+K%C3%A9bir&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 7,
    title: "Google map of Ouezzane",
    name: "Ouezzane",
    src: "https://www.google.com/maps/embed/v1/place?q=Ouezzane&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 8,
    title: "Google map of Al hoceima",
    name: "Al hoceima",
    src: "https://www.google.com/maps/embed/v1/place?q=Al+hoceima&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 9,
    title: "Google map of Fès",
    name: "Fès",
    src: "https://www.google.com/maps/embed/v1/place?q=F%C3%A8s&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 10,
    title: "Google map of Meknès",
    name: "Meknès",
    src: "https://www.google.com/maps/embed/v1/place?q=Mekn%C3%A8s&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 11,
    title: "Google map of Séfrou",
    name: "Séfrou",
    src: "https://www.google.com/maps/embed/v1/place?q=S%C3%A9frou&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 12,
    title: "Google map of Taza",
    name: "Taza",
    src: "https://www.google.com/maps/embed/v1/place?q=Taza&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 13,
    title: "Google map of Taounate",
    name: "Taounate",
    src: "https://www.google.com/maps/embed/v1/place?q=Taounate&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 14,
    title: "Google map of Khémisset",
    name: "Khémisset",
    src: "https://www.google.com/maps/embed/v1/place?q=Kh%C3%A9misset&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 15,
    title: "Google map of Rabat",
    name: "Rabat",
    src: "https://www.google.com/maps/embed/v1/place?q=Rabat&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 16,
    title: "Google map of Kénitra",
    name: "Kénitra",
    src: "https://www.google.com/maps/embed/v1/place?q=K%C3%A9nitra&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 17,
    title: "Google map of Sidi Kacem",
    name: "Sidi Kacem",
    src: "https://www.google.com/maps/embed/v1/place?q=Sidi+Kacem&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 18,
    title: "Google map of Sidi Slimane",
    name: "Sidi Slimane",
    src: "https://www.google.com/maps/embed/v1/place?q=Sidi+Slimane&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 19,
    title: "Google map of Casablanca",
    name: "Casablanca",
    src: "https://www.google.com/maps/embed/v1/place?q=Casablanca&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 20,
    title: "Google map of Mohammédia",
    name: "Mohammédia",
    src: "https://www.google.com/maps/embed/v1/place?q=Mohamm%C3%A9dia&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 21,
    title: "Google map of El Jadida",
    name: "El Jadida",
    src: "https://www.google.com/maps/embed/v1/place?q=El+Jadida&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 22,
    title: "Google map of Khénifra",
    name: "Khénifra",
    src: "https://www.google.com/maps/embed/v1/place?q=Kh%C3%A9nifra&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 23,
    title: "Google map of Béni Mellal",
    name: "Béni Mellal",
    src: "https://www.google.com/maps/embed/v1/place?q=B%C3%A9ni+Mellal&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 24,
    title: "Google map of Khouribga",
    name: "Khouribga",
    src: "https://www.google.com/maps/embed/v1/place?q=Khouribga&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 25,
    title: "Google map of Ifrane",
    name: "Ifrane",
    src: "https://www.google.com/maps/embed/v1/place?q=Ifrane&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 26,
    title: "Google map of Marrakech",
    name: "Marrakech",
    src: "https://www.google.com/maps/embed/v1/place?q=Marrakech&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 27,
    title: "Google map of Essaouira",
    name: "Essaouira",
    src: "https://www.google.com/maps/embed/v1/place?q=Essaouira&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 28,
    title: "Google map of Benguerir",
    name: "Benguerir",
    src: "https://www.google.com/maps/embed/v1/place?q=Benguerir&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 29,
    title: "Google map of Safi",
    name: "Safi",
    src: "https://www.google.com/maps/embed/v1/place?q=Safi&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 30,
    title: "Google map of Agadir",
    name: "Agadir",
    src: "https://www.google.com/maps/embed/v1/place?q=Agadir&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 31,
    title: "Google map of Laayoune",
    name: "Laayoune",
    src: "https://www.google.com/maps/embed/v1/place?q=Laayoune&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 32,
    title: "Google map of Dakhla",
    name: "Dakhla",
    src: "https://www.google.com/maps/embed/v1/place?q=Dakhla&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 33,
    title: "Google map of Nador",
    name: "Nador",
    src: "https://www.google.com/maps/embed/v1/place?q=Nador&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  },
  {
    id: 34,
    title: "Google map of Oujda",
    name: "Oujda",
    src: "https://www.google.com/maps/embed/v1/place?q=Oujda&zoom=14&maptype=roadmap&key=AIzaSyCNTEOso0tZG6YMSJFoaJEY5Th1stEWrJI"
  }
];

// Read template
const templatePath = path.join(__dirname, '../src/pages/email-professionnel-ville.astro');
const template = fs.readFileSync(templatePath, 'utf-8');

// Generate pages for each city
const pagesDir = path.join(__dirname, '../src/pages');

moroccanCitiesMaps.forEach((city) => {
  const cityName = city.name;
  const cityUrlName = normalizeCityNameForUrl(cityName);
  const fileName = `email-professionnel-${cityUrlName}.astro`;
  const filePath = path.join(pagesDir, fileName);
  
  // Always regenerate to update content
  
  // Replace all instances of Ville/ville with city name
  let content = template;
  
  // Replace canonical URL
  content = content.replace(
    /const canonical_url = "https:\/\/www\.hostino\.ma\/email-professionnel-ville";/g,
    `const canonical_url = "https://www.hostino.ma/email-professionnel-${cityUrlName}";`
  );
  
  // Replace PlansEmail ville prop - protect the attribute name first
  // Temporarily replace PlansEmail component to protect it
  const plansEmailRegex = /(<PlansEmail[^>]*?)\s+ville="Ville"([^>]*?>)/g;
  const plansEmailPlaceholder = '__PLANSEMAIL_PLACEHOLDER__';
  let plansEmailContent = '';
  
  content = content.replace(plansEmailRegex, (match, before, after) => {
    plansEmailContent = `${before} ville="${cityName}"${after}`;
    return plansEmailPlaceholder;
  });
  
  // Replace all remaining instances of Ville/ville with city name
  content = replaceVilleWithCity(content, cityName);
  
  // Restore the PlansEmail component with correct ville prop
  if (plansEmailContent) {
    content = content.replace(plansEmailPlaceholder, plansEmailContent);
  }
  
  // Final safety fix: if PlansEmail still has wrong attribute, fix it
  const cityNameEscaped = cityName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  content = content.replace(
    new RegExp(`(<PlansEmail[^>]*?)\\s+[^=]*="${cityNameEscaped}"([^>]*?>)`, 'g'),
    `$1 ville="${cityName}"$2`
  );
  
  // Replace ServiceProximite props - handle both {""} and "" formats
  content = content.replace(
    /titleMap=\{""\}/g,
    `titleMap="${city.title}"`
  );
  content = content.replace(
    /titleMap=""/g,
    `titleMap="${city.title}"`
  );
  // Handle src with curly braces
  content = content.replace(
    /src=\{""\}/g,
    `src="${city.src}"`
  );
  // Handle src without curly braces but with spaces
  content = content.replace(
    /src=""\s+/g,
    `src="${city.src}"  `
  );
  content = content.replace(
    /src=""/g,
    `src="${city.src}"`
  );
  
  // Replace all remaining instances of Ville/ville with city name
  content = replaceVilleWithCity(content, cityName);
  
  // Write file
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Generated ${fileName}`);
});

console.log('\nAll email professionnel city pages generated successfully!');

