import React, { useState, useEffect, useCallback } from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Exercise {
    id: string;
    name: string;
    duration: string;
    description: string;
    steps: string[];
    benefits: string[];
}

interface Props {
    exercises: Exercise[];
    [key: string]: unknown;
}

export default function BreathingExercises({ exercises }: Props) {
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [phase, setPhase] = useState(''); // 'inhale', 'hold-in', 'exhale', 'hold-out'
    const [cycleCount, setCycleCount] = useState(0);

    const stopExercise = useCallback(() => {
        setIsActive(false);
        setSecondsLeft(0);
        setPhase('');
        setCycleCount(0);
    }, []);

    const handleBoxBreathingPhase = useCallback(() => {
        switch (phase) {
            case 'inhale':
                setPhase('hold-in');
                setSecondsLeft(4);
                break;
            case 'hold-in':
                setPhase('exhale');
                setSecondsLeft(4);
                break;
            case 'exhale':
                setPhase('hold-out');
                setSecondsLeft(4);
                break;
            case 'hold-out':
                setCycleCount(prev => prev + 1);
                if (cycleCount >= 7) { // 8 cycles total
                    stopExercise();
                } else {
                    setPhase('inhale');
                    setSecondsLeft(4);
                }
                break;
            default:
                setPhase('inhale');
                setSecondsLeft(4);
        }
    }, [cycleCount, phase, stopExercise]);

    const handle478BreathingPhase = useCallback(() => {
        switch (phase) {
            case 'inhale':
                setPhase('hold-in');
                setSecondsLeft(7);
                break;
            case 'hold-in':
                setPhase('exhale');
                setSecondsLeft(8);
                break;
            case 'exhale':
                setCycleCount(prev => prev + 1);
                if (cycleCount >= 3) { // 4 cycles total
                    stopExercise();
                } else {
                    setPhase('inhale');
                    setSecondsLeft(4);
                }
                break;
            default:
                setPhase('inhale');
                setSecondsLeft(4);
        }
    }, [cycleCount, phase, stopExercise]);

    const handleDiaphragmaticBreathingPhase = useCallback(() => {
        switch (phase) {
            case 'inhale':
                setPhase('exhale');
                setSecondsLeft(6);
                break;
            case 'exhale':
                setCycleCount(prev => prev + 1);
                if (cycleCount >= 19) { // 20 cycles total
                    stopExercise();
                } else {
                    setPhase('inhale');
                    setSecondsLeft(4);
                }
                break;
            default:
                setPhase('inhale');
                setSecondsLeft(4);
        }
    }, [cycleCount, phase, stopExercise]);

    // Timer for breathing exercises
    useEffect(() => {
        if (!isActive || secondsLeft <= 0) return;

        const timer = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isActive, secondsLeft]);

    // Handle phase transitions for box breathing
    useEffect(() => {
        if (selectedExercise?.id === 'box-breathing' && isActive && secondsLeft === 0) {
            handleBoxBreathingPhase();
        } else if (selectedExercise?.id === '478-breathing' && isActive && secondsLeft === 0) {
            handle478BreathingPhase();
        } else if (selectedExercise?.id === 'diaphragmatic-breathing' && isActive && secondsLeft === 0) {
            handleDiaphragmaticBreathingPhase();
        }
    }, [secondsLeft, isActive, phase, selectedExercise, handleBoxBreathingPhase, handle478BreathingPhase, handleDiaphragmaticBreathingPhase]);

    const startExercise = (exercise: Exercise) => {
        setSelectedExercise(exercise);
        setIsActive(true);
        setCycleCount(0);
        
        if (exercise.id === 'box-breathing') {
            setPhase('inhale');
            setSecondsLeft(4);
        } else if (exercise.id === '478-breathing') {
            setPhase('inhale');
            setSecondsLeft(4);
        } else if (exercise.id === 'diaphragmatic-breathing') {
            setPhase('inhale');
            setSecondsLeft(4);
        }
    };

    const getPhaseInstruction = () => {
        switch (phase) {
            case 'inhale':
                return 'Tarik napas dalam-dalam melalui hidung';
            case 'hold-in':
                return 'Tahan napas';
            case 'exhale':
                return 'Keluarkan napas perlahan melalui mulut';
            case 'hold-out':
                return 'Tahan napas kosong';
            default:
                return 'Bersiap untuk memulai';
        }
    };

    const getPhaseColor = () => {
        switch (phase) {
            case 'inhale':
                return 'bg-blue-500';
            case 'hold-in':
                return 'bg-purple-500';
            case 'exhale':
                return 'bg-green-500';
            case 'hold-out':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
    };

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
                                <h1 className="font-bold text-xl text-gray-900">Latihan Pernapasan</h1>
                                <p className="text-sm text-gray-600">Kementerian PUPR RI</p>
                            </div>
                        </Link>
                        <Link href="/psychological-module">
                            <Button variant="outline">Kembali</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🫁 Latihan Pernapasan Terpandu
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Teknik pernapasan yang terbukti secara ilmiah untuk mengurangi stres, meningkatkan relaksasi, 
                        dan memperbaiki keseimbangan sistem saraf
                    </p>
                </div>

                {/* Active Exercise Display */}
                {isActive && selectedExercise && (
                    <Card className="mb-8 border-4 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                        <CardHeader className="text-center pb-4">
                            <CardTitle className="text-3xl">{selectedExercise.name}</CardTitle>
                            <CardDescription className="text-lg">
                                Siklus {cycleCount + 1} - {getPhaseInstruction()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="mb-8">
                                <div className={`w-32 h-32 rounded-full ${getPhaseColor()} mx-auto flex items-center justify-center transition-all duration-1000 transform ${
                                    phase === 'inhale' ? 'scale-125' : phase === 'exhale' ? 'scale-75' : 'scale-100'
                                }`}>
                                    <span className="text-white text-4xl font-bold">{secondsLeft}</span>
                                </div>
                            </div>
                            
                            <div className="max-w-md mx-auto mb-6">
                                <Progress 
                                    value={((selectedExercise.id === 'box-breathing' ? 8 : 
                                            selectedExercise.id === '478-breathing' ? 4 : 20) - cycleCount) / 
                                           (selectedExercise.id === 'box-breathing' ? 8 : 
                                            selectedExercise.id === '478-breathing' ? 4 : 20) * 100} 
                                    className="h-4" 
                                />
                                <p className="text-sm text-gray-600 mt-2">
                                    Siklus tersisa: {
                                        (selectedExercise.id === 'box-breathing' ? 8 : 
                                         selectedExercise.id === '478-breathing' ? 4 : 20) - cycleCount
                                    }
                                </p>
                            </div>

                            <Button 
                                onClick={stopExercise}
                                variant="destructive"
                                size="lg"
                            >
                                Berhenti
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Exercise Cards */}
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                    {exercises.map((exercise) => (
                        <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="text-center mb-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl">🫁</span>
                                    </div>
                                    <CardTitle className="text-xl">{exercise.name}</CardTitle>
                                    <Badge variant="secondary" className="mt-2">
                                        {exercise.duration}
                                    </Badge>
                                </div>
                                <CardDescription className="text-center">
                                    {exercise.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Steps */}
                                    <div>
                                        <h4 className="font-medium mb-2">📋 Langkah-langkah:</h4>
                                        <ul className="text-sm space-y-1">
                                            {exercise.steps.map((step, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-blue-500 mr-2">{index + 1}.</span>
                                                    <span className="text-gray-600">{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Benefits */}
                                    <div>
                                        <h4 className="font-medium mb-2">✅ Manfaat:</h4>
                                        <ul className="text-sm space-y-1">
                                            {exercise.benefits.map((benefit, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-green-500 mr-2">•</span>
                                                    <span className="text-gray-600">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Action Button */}
                                    <Button 
                                        onClick={() => startExercise(exercise)}
                                        disabled={isActive}
                                        className="w-full mt-4"
                                        size="lg"
                                    >
                                        {isActive ? 'Latihan Sedang Berjalan' : 'Mulai Latihan'} 🚀
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Tips Section */}
                <Card className="mt-12">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">💡 Tips untuk Latihan Pernapasan yang Efektif</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium mb-3">🏆 Sebelum Memulai:</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Cari tempat yang tenang dan nyaman</li>
                                    <li>• Duduk atau berbaring dengan posisi rileks</li>
                                    <li>• Matikan notifikasi dan gangguan</li>
                                    <li>• Kenakan pakaian yang longgar</li>
                                    <li>• Pastikan perut tidak terlalu penuh</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium mb-3">⚠️ Hal yang Perlu Diperhatikan:</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Jangan memaksakan diri jika merasa pusing</li>
                                    <li>• Bernapas dengan natural, jangan terlalu dipaksa</li>
                                    <li>• Hentikan jika merasa tidak nyaman</li>
                                    <li>• Konsultasi dokter jika ada masalah pernapasan</li>
                                    <li>• Lakukan secara konsisten untuk hasil optimal</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <p className="text-center text-blue-800">
                                <strong>💡 Tip:</strong> Lakukan latihan pernapasan secara rutin, idealnya 2-3 kali sehari 
                                untuk mendapatkan manfaat maksimal dalam mengelola stres dan meningkatkan kesejahteraan mental.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-center space-x-4 mt-8">
                    <Link href="/relaxation-techniques">
                        <Button variant="outline" size="lg">
                            🧘 Teknik Relaksasi
                        </Button>
                    </Link>
                    <Link href="/psychological-module">
                        <Button size="lg">
                            🏠 Kembali ke Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}