// Function to remove accents from a string
function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Function to normalize city name for URL
export function normalizeCityNameForUrl(cityName: string): string {
  return removeAccents(cityName)
    .toLowerCase()
    .replace(/\s+/g, "-");
}

// Function to find city data from normalized URL name
export function findCityFromUrl(urlName: string, cities: Array<{ name: string; [key: string]: any }>): { name: string; [key: string]: any } | null {
  const normalizedUrl = urlName.toLowerCase();
  
  for (const city of cities) {
    const normalizedCity = normalizeCityNameForUrl(city.name);
    if (normalizedCity === normalizedUrl) {
      return city;
    }
  }
  
  return null;
}

// Function to replace Ville/ville with city name
export function replaceVilleWithCity(text: string, cityName: string): string {
  const cityNameCapitalized = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  const cityNameLowercase = cityName.toLowerCase();
  
  return text
    .replace(/Ville/g, cityNameCapitalized)
    .replace(/ville/g, cityNameLowercase);
}

