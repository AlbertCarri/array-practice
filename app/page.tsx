"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Code, CheckCircle, XCircle, Play } from "lucide-react";
import { problems } from "@/lib/problems";
import { evaluateCode } from "@/lib/evaluator";
import Codemirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import ToggleDark from "@/components/Toggle-dark";
import { dracula } from "@uiw/codemirror-theme-dracula";
import ConfettiExplosion, {
  ConfettiHandle,
} from "@/components/ConfettiExplosion";

export default function CodingPracticePage() {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [score, setScore] = useState(0);
  const [completedProblems, setCompletedProblems] = useState<boolean[]>([]);
  const [code, setCode] = useState(
    `function ${problems[currentProblem].functionName}(${problems[currentProblem].parameters}) {\n  // Tu código aquí\n}`
  );
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [showTrophy, setShowTrophy] = useState(false);

  const progress =
    (completedProblems.filter(Boolean).length / problems.length) * 100;

  const ref = useRef<ConfettiHandle>(null);

  useEffect(() => {
    const savedCompleted = localStorage.getItem("completedProblems");
    if (savedCompleted) setCompletedProblems(JSON.parse(savedCompleted));
    else {
      setCompletedProblems(new Array(10).fill(false));
    }
    const currentProblemSaved = localStorage.getItem("currentProblem");
    if (currentProblemSaved) {
      setCurrentProblem(JSON.parse(currentProblemSaved));
      setCode(
        `function ${problems[JSON.parse(currentProblemSaved)].functionName}(${
          problems[JSON.parse(currentProblemSaved)].parameters
        }) {\n  // Tu código aquí\n}`
      );
    } else {
      setCurrentProblem(0);
    }
    const scoreSaved = localStorage.getItem("scoreSaved");
    if (scoreSaved) setScore(JSON.parse(scoreSaved));
    else {
      setScore(0);
    }
  }, []);

  const handleEvaluate = () => {
    const evaluation = evaluateCode(code, problems[currentProblem]);
    setResult(evaluation);

    if (evaluation.success && !completedProblems[currentProblem]) {
      const newCompleted = [...completedProblems];
      newCompleted[currentProblem] = true;
      setCompletedProblems(newCompleted);
      setScore(score + 10);
      localStorage.setItem("completedProblems", JSON.stringify(newCompleted));
      localStorage.setItem("scoreSaved", `${score + 10}`);
      ref.current?.fire()
      // Check if all problems are completed
      if (newCompleted.every(Boolean)) {
        setShowTrophy(true);
      }
    }
  };

  const handleNextProblem = () => {
    if (
      currentProblem < problems.length - 1 &&
      completedProblems[currentProblem]
    ) {
      setCurrentProblem(currentProblem + 1);
      localStorage.setItem(
        "currentProblem",
        JSON.stringify(currentProblem + 1)
      );
      setCode(
        `function ${problems[currentProblem + 1].functionName}(${
          problems[currentProblem + 1].parameters
        }) {\n  // Tu código aquí\n}`
      );
      setResult(null);
    }
  };

  const handlePreviousProblem = () => {
    if (currentProblem > 0) {
      setCurrentProblem(currentProblem - 1);
      setCode(
        `function ${problems[currentProblem - 1].functionName}(${
          problems[currentProblem - 1].parameters
        }) {\n  // Tu código aquí\n}`
      );
      setResult(null);
    }
  };

  if (showTrophy) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Trophy className="h-24 w-24 text-accent animate-bounce" />
            </div>
            <CardTitle className="text-2xl text-balance">
              ¡Felicidades!
            </CardTitle>
            <CardDescription>Has completado todos los desafíos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-primary">
                {score} puntos
              </div>
              <p className="text-muted-foreground">
                Has demostrado un excelente dominio de arrays y objetos en
                JavaScript
              </p>
              <Button
                onClick={() => {
                  setShowTrophy(false);
                  setCurrentProblem(0);
                  setScore(0);
                  setCompletedProblems(new Array(10).fill(false));
                  setCode("");
                  setResult(null);
                }}
                className="w-full"
              >
                Empezar de nuevo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">
                Práctica de Arrays y Objetos
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                Puntuación: {score}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {currentProblem + 1} / {problems.length}
              </Badge>
              <ToggleDark />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">Progreso</span>
              <span className="text-sm font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>
      <ConfettiExplosion ref={ref} />
      <main className="container mx-auto px-4 py-6">
        <div className="flex lg:flex-row min-h-[calc(100vh-240px)] gap-6">
          {/* Problem Description */}

          <Card className="w-2/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  Problema {currentProblem + 1}:{" "}
                  {problems[currentProblem].title}
                </CardTitle>
                {completedProblems[currentProblem] && (
                  <CheckCircle className="h-5 w-5 text-accent" />
                )}
              </div>
              <CardDescription>
                Dificultad: {problems[currentProblem].difficulty}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-sm leading-relaxed">
                  {problems[currentProblem].description}
                </p>
                {problems[currentProblem].example && (
                  <div className="bg-neutral-300 dark:bg-neutral-900 p-3 rounded-md text-left">
                    <p className="text-sm font-medium mb-6">Ejemplo:</p>
                    <code className="text-sm font-mono text-teal-900 dark:text-teal-500">
                      {problems[currentProblem].example.split("→")[0]}
                    </code>
                  </div>
                )}

                <div className="bg-neutral-300 dark:bg-neutral-900 p-3 rounded-md">
                  <p className="text-sm font-medium mb-6">
                    Resultado esperado:
                  </p>
                  <code className="text-sm font-mono text-teal-900 dark:text-teal-500">
                    {problems[currentProblem].example?.split("→")[1]}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Editor */}

          <Card className="w-3/5">
            <CardHeader>
              <CardTitle className="text-lg mb-4">Editor de Código</CardTitle>
              <CardDescription>
                Escribe tu solución en JavaScript
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-md">
                <Codemirror
                  value={code}
                  height="240px"
                  extensions={[javascript()]}
                  onChange={(value) => setCode(value)}
                  theme={dracula}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleEvaluate}
                    disabled={!code.trim()}
                    className="flex-1"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Evaluar
                  </Button>
                </div>

                {result && (
                  <div
                    className={`p-3 rounded-md border ${
                      result.success
                        ? "bg-accent/10 border-accent text-accent-foreground"
                        : "bg-destructive/10 border-destructive text-destructive-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-black dark:text-white">
                      {result.success ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">
                        {result.success ? "¡Correcto!" : "Incorrecto"}
                      </span>
                    </div>
                    <p className="text-sm mt-1 text-black dark:text-white">
                      {result.message}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="destructive"
            onClick={() => {
              setShowTrophy(false);
              setCurrentProblem(0);
              setScore(0);
              setCompletedProblems(new Array(10).fill(false));
              setCode(
                `function ${problems[0].functionName}(${problems[0].parameters}) {\n  // Tu código aquí\n}`
              );
              setResult(null);
            }}
            disabled={currentProblem === 0}
          >
            Comenzar todo desde cero
          </Button>
          <Button
            onClick={handleNextProblem}
            disabled={
              currentProblem === problems.length - 1 ||
              !completedProblems[currentProblem]
            }
          >
            Siguiente
          </Button>
        </div>
      </main>
    </div>
  );
}
