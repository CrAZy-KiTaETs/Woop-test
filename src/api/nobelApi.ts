const baseUrl = "https://api.nobelprize.org/2.1";

export async function fetchAwards(year: string, category: string, offset: string) {
  const response = await fetch(
    `${baseUrl}/nobelPrizes?sort=desc&nobelPrizeYear=${year}&nobelPrizeCategory=${category}&offset=${offset}`
  );
  return await response.json();
}

export async function fetchLaureates(name: string, birthDate: string, category: string, offset: string) {
  const response = await fetch(
    `${baseUrl}/laureates?sort=asc&name=${name}&birthDate=${birthDate}&nobelPrizeCategory=${category}&offset=${offset}`
  );
  return await response.json();
}
