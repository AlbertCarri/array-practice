export interface Problem {
  id: number
  title: string
  description: string
  difficulty: string
  functionName: string
  parameters: string
  example?: string
  testCases: Array<{
    input: any[]
    expected: any
  }>
}

export const problems: Problem[] = [
  {
    id: 1,
    title: "Nombres únicos",
    description:
      "Dado un array de strings con nombres, devolver un nuevo array solo con los nombres únicos (sin duplicados).",
    difficulty: "Fácil",
    functionName: "nombresUnicos",
    parameters: "nombres",
    example: 'nombresUnicos(["Ana", "Juan", "Ana", "Pedro"]) → ["Ana", "Juan", "Pedro"]',
    testCases: [
      {
        input: [["Ana", "Juan", "Ana", "Pedro"]],
        expected: ["Ana", "Juan", "Pedro"],
      },
      {
        input: [["Carlos", "María", "Carlos", "Luis", "María"]],
        expected: ["Carlos", "María", "Luis"],
      },
    ],
  },
  {
    id: 2,
    title: "Mayores de edad",
    description:
      "Dado un array de objetos { nombre, edad }, devolver solo aquellos que sean mayores o iguales a 18 años.",
    difficulty: "Fácil",
    functionName: "mayoresDeEdad",
    parameters: "personas",
    example: 'mayoresDeEdad([{nombre: "Ana", edad: 17}, {nombre: "Juan", edad: 20}]) → [{nombre: "Juan", edad: 20}]',
    testCases: [
      {
        input: [
          [
            { nombre: "Ana", edad: 17 },
            { nombre: "Juan", edad: 20 },
            { nombre: "Pedro", edad: 25 },
          ],
        ],
        expected: [
          { nombre: "Juan", edad: 20 },
          { nombre: "Pedro", edad: 25 },
        ],
      },
      {
        input: [
          [
            { nombre: "María", edad: 16 },
            { nombre: "Carlos", edad: 18 },
          ],
        ],
        expected: [{ nombre: "Carlos", edad: 18 }],
      },
    ],
  },
  {
    id: 3,
    title: "Contar ocurrencias",
    description: "Dado un array de strings, devolver un objeto que cuente cuántas veces aparece cada string.",
    difficulty: "Medio",
    functionName: "contarOcurrencias",
    parameters: "elementos",
    example: 'contarOcurrencias(["a", "b", "a"]) → { a: 2, b: 1 }',
    testCases: [
      {
        input: [["a", "b", "a", "c", "b", "a"]],
        expected: { a: 3, b: 2, c: 1 },
      },
      {
        input: [["hola", "mundo", "hola"]],
        expected: { hola: 2, mundo: 1 },
      },
    ],
  },
  {
    id: 4,
    title: "Edad promedio",
    description: "Dado un array de objetos { nombre, edad }, calcular la edad promedio de todas las personas.",
    difficulty: "Medio",
    functionName: "edadPromedio",
    parameters: "personas",
    example: 'edadPromedio([{nombre: "Ana", edad: 20}, {nombre: "Juan", edad: 30}]) → 25',
    testCases: [
      {
        input: [
          [
            { nombre: "Ana", edad: 20 },
            { nombre: "Juan", edad: 30 },
            { nombre: "Pedro", edad: 25 },
          ],
        ],
        expected: 25,
      },
      {
        input: [
          [
            { nombre: "María", edad: 18 },
            { nombre: "Carlos", edad: 22 },
          ],
        ],
        expected: 20,
      },
    ],
  },
  {
    id: 5,
    title: "Eliminar repetidos por nombre y edad",
    description:
      "Dado un array de objetos { nombre, edad }, devolver un nuevo array donde no haya objetos repetidos (misma combinación de nombre + edad).",
    difficulty: "Medio",
    functionName: "eliminarRepetidos",
    parameters: "personas",
    example: 'eliminarRepetidos([{nombre: "Ana", edad: 20}, {nombre: "Ana", edad: 20}]) → [{nombre: "Ana", edad: 20}]',
    testCases: [
      {
        input: [
          [
            { nombre: "Ana", edad: 20 },
            { nombre: "Ana", edad: 20 },
            { nombre: "Juan", edad: 25 },
          ],
        ],
        expected: [
          { nombre: "Ana", edad: 20 },
          { nombre: "Juan", edad: 25 },
        ],
      },
      {
        input: [
          [
            { nombre: "Pedro", edad: 30 },
            { nombre: "María", edad: 25 },
            { nombre: "Pedro", edad: 30 },
          ],
        ],
        expected: [
          { nombre: "Pedro", edad: 30 },
          { nombre: "María", edad: 25 },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Ordenar por edad",
    description: "Dado un array de objetos { nombre, edad }, devolverlo ordenado de menor a mayor edad.",
    difficulty: "Medio",
    functionName: "ordenarPorEdad",
    parameters: "personas",
    example:
      'ordenarPorEdad([{nombre: "Juan", edad: 30}, {nombre: "Ana", edad: 20}]) → [{nombre: "Ana", edad: 20}, {nombre: "Juan", edad: 30}]',
    testCases: [
      {
        input: [
          [
            { nombre: "Juan", edad: 30 },
            { nombre: "Ana", edad: 20 },
            { nombre: "Pedro", edad: 25 },
          ],
        ],
        expected: [
          { nombre: "Ana", edad: 20 },
          { nombre: "Pedro", edad: 25 },
          { nombre: "Juan", edad: 30 },
        ],
      },
      {
        input: [
          [
            { nombre: "Carlos", edad: 40 },
            { nombre: "María", edad: 18 },
          ],
        ],
        expected: [
          { nombre: "María", edad: 18 },
          { nombre: "Carlos", edad: 40 },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Agrupar por edad",
    description:
      "Dado un array de objetos { nombre, edad }, devolver un objeto donde las claves sean las edades y los valores un array con los nombres de las personas que tienen esa edad.",
    difficulty: "Difícil",
    functionName: "agruparPorEdad",
    parameters: "personas",
    example: 'agruparPorEdad([{nombre: "Ana", edad: 20}, {nombre: "Juan", edad: 20}]) → { 20: ["Ana", "Juan"] }',
    testCases: [
      {
        input: [
          [
            { nombre: "Ana", edad: 20 },
            { nombre: "Juan", edad: 20 },
            { nombre: "Pedro", edad: 25 },
          ],
        ],
        expected: { 20: ["Ana", "Juan"], 25: ["Pedro"] },
      },
      {
        input: [
          [
            { nombre: "María", edad: 18 },
            { nombre: "Carlos", edad: 25 },
            { nombre: "Luis", edad: 18 },
          ],
        ],
        expected: { 18: ["María", "Luis"], 25: ["Carlos"] },
      },
    ],
  },
  {
    id: 8,
    title: "Mayor de todos",
    description: "Dado un array de objetos { nombre, edad }, devolver el objeto con la mayor edad.",
    difficulty: "Difícil",
    functionName: "mayorDeTodos",
    parameters: "personas",
    example: 'mayorDeTodos([{nombre: "Ana", edad: 20}, {nombre: "Juan", edad: 30}]) → {nombre: "Juan", edad: 30}',
    testCases: [
      {
        input: [
          [
            { nombre: "Ana", edad: 20 },
            { nombre: "Juan", edad: 30 },
            { nombre: "Pedro", edad: 25 },
          ],
        ],
        expected: { nombre: "Juan", edad: 30 },
      },
      {
        input: [
          [
            { nombre: "María", edad: 40 },
            { nombre: "Carlos", edad: 35 },
          ],
        ],
        expected: { nombre: "María", edad: 40 },
      },
    ],
  },
  {
    id: 9,
    title: "Transformar a Map",
    description:
      "Dado un array de objetos { id, nombre }, transformarlo en un Map donde la clave sea el id y el valor el nombre.",
    difficulty: "Difícil",
    functionName: "transformarAMap",
    parameters: "elementos",
    example: 'transformarAMap([{id: 1, nombre: "Ana"}]) → Map(1 => "Ana")',
    testCases: [
      {
        input: [
          [
            { id: 1, nombre: "Ana" },
            { id: 2, nombre: "Juan" },
          ],
        ],
        expected: new Map([
          [1, "Ana"],
          [2, "Juan"],
        ]),
      },
      {
        input: [
          [
            { id: 10, nombre: "Pedro" },
            { id: 20, nombre: "María" },
          ],
        ],
        expected: new Map([
          [10, "Pedro"],
          [20, "María"],
        ]),
      },
    ],
  },
  {
    id: 10,
    title: "Combinación de dos arrays",
    description: "Dado dos arrays de objetos { id, nombre }, combinarlos en uno solo, eliminando duplicados por id.",
    difficulty: "Muy Difícil",
    functionName: "combinarArrays",
    parameters: "array1, array2",
    example:
      'combinarArrays([{id: 1, nombre: "Ana"}], [{id: 1, nombre: "Ana"}, {id: 2, nombre: "Juan"}]) → [{id: 1, nombre: "Ana"}, {id: 2, nombre: "Juan"}]',
    testCases: [
      {
        input: [
          [
            { id: 1, nombre: "Ana" },
            { id: 2, nombre: "Pedro" },
          ],
          [
            { id: 2, nombre: "Pedro" },
            { id: 3, nombre: "Juan" },
          ],
        ],
        expected: [
          { id: 1, nombre: "Ana" },
          { id: 2, nombre: "Pedro" },
          { id: 3, nombre: "Juan" },
        ],
      },
      {
        input: [
          [{ id: 10, nombre: "Carlos" }],
          [
            { id: 20, nombre: "María" },
            { id: 10, nombre: "Carlos" },
          ],
        ],
        expected: [
          { id: 10, nombre: "Carlos" },
          { id: 20, nombre: "María" },
        ],
      },
    ],
  },
]
