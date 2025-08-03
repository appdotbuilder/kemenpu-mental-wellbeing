import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Question {
    id: string;
    question: string;
    options: Record<number, string>;
}

interface Props {
    questions: Question[];
    [key: string]: unknown;
}

export default function StressAssessment({ questions }: Props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const isLastQuestion = currentQuestion === questions.length - 1;
    const isFirstQuestion = currentQuestion === 0;
    const hasAnsweredCurrent = answers[questions[currentQuestion]?.id] !== undefined;

    const handleAnswerChange = (questionId: string, value: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: parseInt(value)
        }));
    };

    const handleNext = () => {
        if (isLastQuestion) {
            handleSubmit();
        } else {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (!isFirstQuestion) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        if (Object.keys(answers).length !== questions.length) {
            alert('Mohon jawab semua pertanyaan sebelum melanjutkan.');
            return;
        }

        setIsSubmitting(true);
        
        const formData = {
            work_pressure_score: answers.work_pressure,
            sleep_quality_score: answers.sleep_quality,
            emotional_state_score: answers.emotional_state,
            physical_symptoms_score: answers.physical_symptoms,
        };

        router.post('/stress-assessment', formData, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    const currentQuestionData = questions[currentQuestion];

    if (!currentQuestionData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Memuat pertanyaan...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/psychological-module" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🧠</span>
                            </div>
                            <div>
                                <h1 className="font-bold text-xl text-gray-900">Asesmen Stres</h1>
                                <p className="text-sm text-gray-600">Kementerian PUPR RI</p>
                            </div>
                        </Link>
                        <Link href="/psychological-module">
                            <Button variant="outline">Kembali</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Progress Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">
                            📊 Asesmen Tingkat Stres
                        </h2>
                        <span className="text-sm font-medium text-gray-600">
                            {currentQuestion + 1} dari {questions.length}
                        </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <p className="text-sm text-gray-600 mt-2">
                        Progress: {Math.round(progress)}% selesai
                    </p>
                </div>

                {/* Information Alert */}
                <Alert className="mb-8 border-l-4 border-l-blue-500">
                    <AlertDescription>
                        <div className="flex items-start space-x-2">
                            <span className="text-blue-500">ℹ️</span>
                            <div>
                                <p className="font-medium">Petunjuk Pengisian:</p>
                                <p className="text-sm mt-1">
                                    Jawablah setiap pertanyaan dengan jujur berdasarkan kondisi Anda dalam 2 minggu terakhir. 
                                    Tidak ada jawaban yang benar atau salah, yang terpenting adalah kejujuran Anda.
                                </p>
                            </div>
                        </div>
                    </AlertDescription>
                </Alert>

                {/* Question Card */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-xl text-gray-900">
                            Pertanyaan {currentQuestion + 1}
                        </CardTitle>
                        <CardDescription className="text-lg font-medium text-gray-700">
                            {currentQuestionData.question}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            value={answers[currentQuestionData.id]?.toString() || ''}
                            onValueChange={(value: string) => handleAnswerChange(currentQuestionData.id, value)}
                        >
                            <div className="space-y-4">
                                {Object.entries(currentQuestionData.options).map(([value, label]) => (
                                    <div key={value} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                                        <RadioGroupItem value={value} id={`option-${value}`} />
                                        <Label 
                                            htmlFor={`option-${value}`} 
                                            className="flex-1 cursor-pointer text-base"
                                        >
                                            {label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={isFirstQuestion}
                        className="flex items-center space-x-2"
                    >
                        <span>←</span>
                        <span>Sebelumnya</span>
                    </Button>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            {Object.keys(answers).length} dari {questions.length} pertanyaan terjawab
                        </p>
                    </div>

                    {isLastQuestion ? (
                        <Button
                            onClick={handleSubmit}
                            disabled={!hasAnsweredCurrent || isSubmitting}
                            className="flex items-center space-x-2"
                        >
                            <span>{isSubmitting ? 'Memproses...' : 'Selesai'}</span>
                            <span>✅</span>
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            disabled={!hasAnsweredCurrent}
                            className="flex items-center space-x-2"
                        >
                            <span>Selanjutnya</span>
                            <span>→</span>
                        </Button>
                    )}
                </div>

                {/* Question Overview */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="text-lg">📋 Ringkasan Pertanyaan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {questions.map((question, index) => (
                                <div
                                    key={question.id}
                                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                                        index === currentQuestion
                                            ? 'border-blue-500 bg-blue-50'
                                            : answers[question.id]
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setCurrentQuestion(index)}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-sm">
                                            Pertanyaan {index + 1}
                                        </span>
                                        <span className="text-lg">
                                            {answers[question.id] ? '✅' : index === currentQuestion ? '🔵' : '⚪'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">
                                        {question.question.length > 50 
                                            ? question.question.substring(0, 50) + '...'
                                            : question.question
                                        }
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Privacy Note */}
                <Alert className="mt-8">
                    <AlertDescription>
                        <div className="flex items-start space-x-2">
                            <span>🔒</span>
                            <div>
                                <p className="font-medium">Privasi & Keamanan</p>
                                <p className="text-sm mt-1">
                                    Jawaban Anda disimpan dengan aman dan hanya digunakan untuk memberikan rekomendasi personal. 
                                    Data tidak akan dibagikan kepada pihak ketiga tanpa persetujuan Anda.
                                </p>
                            </div>
                        </div>
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}