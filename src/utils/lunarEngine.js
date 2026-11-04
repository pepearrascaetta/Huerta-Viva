export function getLunarPhaseAndTask() {
  // Cálculo simplificado de fase lunar para demostración offline
  const date = new Date();
  const day = date.getDate();
  
  if (day <= 7) {
    return {
      phase: "Luna Nueva",
      icon: "🌑",
      task: "Momento de descanso del suelo. Ideal para planificar y limpiar yuyos o malezas."
    };
  } else if (day <= 14) {
    return {
      phase: "Luna Creciente",
      icon: "🌓",
      task: "La savia asciende. Ideal para sembrar vegetales de hoja y frutos que crecen sobre la superficie."
    };
  } else if (day <= 22) {
    return {
      phase: "Luna Llena",
      icon: "🌕",
      task: "Máxima circulación de agua. Excelente absorción de nutrientes. Riego profundo recomendado."
    };
  } else {
    return {
      phase: "Luna Menguante",
      icon: "🌘",
      task: "La savia baja hacia las raíces. Ideal para podar, trasplantar y cultivar raíces o tubérculos."
    };
  }
}
