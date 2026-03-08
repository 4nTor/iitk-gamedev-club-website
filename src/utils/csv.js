import Papa from 'papaparse';

export const parseCsvText = (csvText) => {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }

  return result.data.map((row) =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]),
    ),
  );
};

export const fetchCsv = async (path) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV: ${path}`);
  }
  const csvText = await response.text();
  return parseCsvText(csvText);
};