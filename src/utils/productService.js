/**
 * Servicio para cargar productos dinámicos desde Google Sheets.
 */
const PRODUCTS_SHEET_URL = "https://docs.google.com/spreadsheets/d/1Z-W-SrY32Q7pJavtmQ_zFAfOx9lFY0e3s-GCpOmCpUM/gviz/tq?tqx=out:csv";

export const fetchExternalProducts = async () => {
  try {
    const response = await fetch(`${PRODUCTS_SHEET_URL}&t=${Date.now()}`); // Cache busting
    const text = await response.text();
    
    const rows = text.split('\n').filter(row => row.trim() !== '');
    if (rows.length <= 1) return {};

    const productsByCategory = {};

    // Skip header row
    for (let i = 1; i < rows.length; i++) {
        // Regex to split by comma but ignore commas inside quotes
        const columns = rows[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
        
        // Clean quotes and trim
        const cleanCols = columns.map(col => col.replace(/^"|"$/g, '').trim());
        
        if (cleanCols.length < 4) continue;

        const [, category, name, description, image] = cleanCols;

        if (!productsByCategory[category]) {
            productsByCategory[category] = [];
        }

        productsByCategory[category].push({
            name,
            description,
            image: image || "",
            id: `ext_${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
            isExternal: true
        });
    }

    return productsByCategory;
  } catch (error) {
    console.error("Error cargando productos externos:", error);
    return {};
  }
};
