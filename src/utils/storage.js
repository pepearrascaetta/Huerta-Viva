const STORAGE_KEY = 'huerta_viva_plants_v1';

export function getStoredPlants() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error al leer almacenamiento local:", error);
    return [];
  }
}

export function savePlants(plants) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
  } catch (error) {
    console.error("Error al guardar en almacenamiento local:", error);
  }
}
