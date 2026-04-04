/**
 * Utilidad para autenticación basada en Google Sheets (Roles Admin/Editor).
 */
const ROLES_SHEET_URL = "https://docs.google.com/spreadsheets/d/1-nyBZgorpkA6FcnvpoZ_2QCSQazmmHa2bMoYnpWPUNw/gviz/tq?tqx=out:csv";

export const validateUser = async (email) => {
  try {
    const response = await fetch(ROLES_SHEET_URL);
    const text = await response.text();
    
    // Parsear el CSV manualmente de forma sencilla
    const rows = text.split('\n').map(row => row.split(',').map(cell => cell.replace(/"/g, '').trim()));
    
    // Buscar el usuario por email
    const userRow = rows.find(row => row.includes(email.trim().toLowerCase()));
    
    if (userRow) {
      // Asumiendo que las columnas son: Marca de tiempo, Email, Rol
      const role = userRow.find(cell => ["Admin", "Editor"].includes(cell));
      return { success: true, email, role: role || "Editor" };
    }
    
    return { success: false, message: "Usuario no autorizado" };
  } catch (error) {
    console.error("Error validando usuario:", error);
    return { success: false, message: "Error de conexión con el sistema de roles" };
  }
};
