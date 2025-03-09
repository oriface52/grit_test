import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const questions = [
  { id: 1, text: "새로운 아이디어나 프로젝트 때문에 이전에 하던 일에 종종 집중하지 못할 때가 있다.", reverse: true },
  { id: 2, text: "좌절이 와도 낙담하지 않고 쉽게 포기하지 않는다.", reverse: false },
  { id: 3, text: "목표를 세우고 나서 다른 목표로 바꾸는 일이 자주 있다.", reverse: true },
  { id: 4, text: "나는 성실히 노력하는 편이다.", reverse: false },
  { id: 5, text: "몇 개월 이상 걸리는 프로젝트에 집중하기 어렵다.", reverse: true },
  { id: 6, text: "나는 시작한 일은 무엇이든 끝까지 해낸다.", reverse: false },
  { id: 7, text: "관심사가 매년 바뀐다.", reverse: true },
  { id: 8, text: "나는 꾸준하며 절대 포기하지 않는다.", reverse: false },
  { id: 9, text: "특정 아이디어나 프로젝트에 잠시 강렬히 몰두했다가 금세 관심을 잃은 경험이 있다.", reverse: true },
  { id: 10, text: "중요한 도전 과제를 성취하기 위해 어려움을 극복한 적이 있다.", reverse: false }
];

const scores = [5, 4, 3, 2, 1];

export default function GritQuiz() {
  const [responses, setResponses] = useState(Array(10).fill(null));
  const [step, setStep] = useState(0);

  const handleAnswer = (score) => {
    const updatedResponses = [...responses];
    updatedResponses[step] = questions[step].reverse ? 6 - score : score;
    setResponses(updatedResponses);
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const calculateResults = () => {
    const totalScore = responses.reduce((acc, score) => acc + score, 0) / 10;
    const passionScore = responses.filter((_, index) => index % 2 === 0).reduce((acc, score) => acc + score, 0) / 5;
    const perseveranceScore = responses.filter((_, index) => index % 2 !== 0).reduce((acc, score) => acc + score, 0) / 5;

    let result;
    if (totalScore >= 4.5) result = "탁월한 그리터(Gritter)";
    else if (totalScore >= 3.5) result = "꾸준한 실천가";
    else if (totalScore >= 2.5) result = "열정적인 탐색가";
    else result = "변화무쌍한 도전자";

    return { totalScore, passionScore, perseveranceScore, result };
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen">
      {step < questions.length ? (
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-4">{step + 1}/{questions.length}</h2>
            <p className="mb-4">{questions[step].text}</p>
            <div className="grid grid-cols-5 gap-2">
              {scores.map((score) => (
                <Button key={score} variant="outline" onClick={() => handleAnswer(score)}>
                  {score}
                </Button>
              ))}
            </div>
            <Progress value={(step / questions.length) * 100} className="mt-4" />
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-4">테스트 완료!</h2>
            <p className="text-lg">총 점수: {calculateResults().totalScore.toFixed(2)}</p>
            <p>열정 점수: {calculateResults().passionScore.toFixed(2)}</p>
            <p>끈기 점수: {calculateResults().perseveranceScore.toFixed(2)}</p>
            <p className="font-bold mt-2">당신은 "{calculateResults().result}" 유형입니다! 🚀</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}