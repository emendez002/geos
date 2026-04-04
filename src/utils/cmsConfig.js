/**
 * Utilidad para cargar y guardar la configuración del CMS (Orden y Visibilidad).
 */
const CONFIG_SHEET_URL = "https://docs.google.com/spreadsheets/d/1kpzwQWIJQ00C0eTApVJoqetrB-k_tWjoafYDArtNeDs/gviz/tq?tqx=out:csv";
const SAVE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScbvymPTGn18Ycvi4vyegSGgrkpAz98zmEIMpTt-Q4f4Y2acg/formResponse";
const CONFIG_ENTRY_ID = "entry.1814822638";

export const fetchCMSConfig = async () => {
  try {
    const response = await fetch(`${CONFIG_SHEET_URL}&t=${Date.now()}`); // Cache busting
    const text = await response.text();
    
    // Parsear el CSV y obtener el valor JSON de la última fila (columna de configuración)
    const rows = text.split('\n').filter(row => row.trim() !== '');
    if (rows.length <= 1) return { pages: {} }; // Solo cabecera o vacío

    const lastRow = rows[rows.length - 1];
    
    // Extraer el JSON (normalmente es la última columna del Spreadsheet)
    const cells = lastRow.split('","').map(cell => cell.replace(/"/g, '').trim());
    const jsonStr = cells.find(cell => cell.startsWith('{') && cell.endsWith('}'));
    
    return jsonStr ? JSON.parse(jsonStr) : { pages: {} };
  } catch (error) {
    console.warn("No se pudo cargar la configuración del CMS:", error);
    return { pages: {} };
  }
};

export const saveCMSConfig = async (newConfig) => {
  try {
    const formData = new FormData();
    formData.append(CONFIG_ENTRY_ID, JSON.stringify(newConfig));
    
    // Envío por background (Google Forms no devuelve CORS headers, fallará pero los datos llegarán)
    fetch(SAVE_FORM_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error guardando CMS config:", error);
    return { success: false };
  }
};
