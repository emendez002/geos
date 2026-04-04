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
    
    const rows = text.split('\n').filter(row => row.trim() !== '');
    if (rows.length <= 1) return { pages: {} };

    const lastRow = rows[rows.length - 1];
    
    // Robust extraction: Find the first '{' and the last '}'
    const startIdx = lastRow.indexOf('{');
    const endIdx = lastRow.lastIndexOf('}');
    
    if (startIdx !== -1 && endIdx !== -1) {
      let jsonStr = lastRow.substring(startIdx, endIdx + 1);
      
      // Google Sheets CSV escapes double quotes as ""
      jsonStr = jsonStr.replace(/""/g, '"');
      
      return JSON.parse(jsonStr);
    }
    
    return { pages: {} };
  } catch (error) {
    console.warn("No se pudo parsear la configuración del CMS. Formato CSV inválido o vacío.", error);
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
