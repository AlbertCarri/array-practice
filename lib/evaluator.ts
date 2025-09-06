import type { Problem } from "./problems"

export function evaluateCode(code: string, problem: Problem): { success: boolean; message: string } {
  try {
    // Create a safe evaluation environment
    const func = new Function("return " + code)()

    if (typeof func !== "function") {
      return {
        success: false,
        message: "El código debe definir una función válida.",
      }
    }

    // Test all cases
    for (let i = 0; i < problem.testCases.length; i++) {
      const testCase = problem.testCases[i]
      try {
        const result = func(...testCase.input)

        // Special handling for Maps
        if (testCase.expected instanceof Map) {
          if (!(result instanceof Map)) {
            return {
              success: false,
              message: `Caso de prueba ${i + 1}: Se esperaba un Map, pero se recibió ${typeof result}.`,
            }
          }

          if (result.size !== testCase.expected.size) {
            return {
              success: false,
              message: `Caso de prueba ${i + 1}: El Map tiene un tamaño incorrecto. Esperado: ${testCase.expected.size}, Recibido: ${result.size}.`,
            }
          }

          for (const [key, value] of testCase.expected) {
            if (!result.has(key) || result.get(key) !== value) {
              return {
                success: false,
                message: `Caso de prueba ${i + 1}: El Map no contiene la clave-valor esperada: ${key} => ${value}.`,
              }
            }
          }
        } else {
          // Deep comparison for objects and arrays
          if (!deepEqual(result, testCase.expected)) {
            return {
              success: false,
              message: `Caso de prueba ${i + 1}: Resultado incorrecto. Esperado: ${JSON.stringify(testCase.expected)}, Recibido: ${JSON.stringify(result)}.`,
            }
          }
        }
      } catch (error) {
        return {
          success: false,
          message: `Error en caso de prueba ${i + 1}: ${error instanceof Error ? error.message : "Error desconocido"}`,
        }
      }
    }

    return {
      success: true,
      message: `¡Excelente! Has resuelto correctamente el problema. +10 puntos.`,
    }
  } catch (error) {
    return {
      success: false,
      message: `Error de sintaxis: ${error instanceof Error ? error.message : "Código inválido"}`,
    }
  }
}

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true

  if (a == null || b == null) return false

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false
    }
    return true
  }

  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) return false

    for (const key of keysA) {
      if (!keysB.includes(key)) return false
      if (!deepEqual(a[key], b[key])) return false
    }
    return true
  }

  return false
}
