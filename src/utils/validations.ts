// Tipos para validación
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ValidationRule<T> {
  validate: (value: T) => string | null;
}

// Validaciones para entrada de usuario
export const userInputValidations = {
  // Validar término de búsqueda
  searchTerm: (term: string): ValidationResult => {
    const errors: string[] = [];

    if (term && term.length > 100) {
      errors.push("El término de búsqueda no puede exceder 100 caracteres");
    }

    if (term && !/^[a-zA-Z0-9\s\-']+$/.test(term)) {
      errors.push("El término de búsqueda contiene caracteres inválidos");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Validar parámetros de paginación
  pagination: (offset: number, limit: number): ValidationResult => {
    const errors: string[] = [];

    if (!Number.isInteger(offset) || offset < 0) {
      errors.push("El offset debe ser un número entero mayor o igual a 0");
    }

    if (!Number.isInteger(limit) || limit <= 0) {
      errors.push("El límite debe ser un número entero mayor a 0");
    }

    if (limit > 100) {
      errors.push("El límite no puede exceder 100 elementos");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

// Función para sanitizar entrada de usuario
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remover caracteres potencialmente peligrosos
    .substring(0, 100); // Limitar longitud
};

// Función para validar URL
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

