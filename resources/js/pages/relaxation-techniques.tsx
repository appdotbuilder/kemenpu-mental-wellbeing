import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Technique {
    id: string;
    name: string;
    duration: string;
    description: string;
    steps: string[];
    benefits: string[];
}

interface Props {
    techniques: Technique[];
    [key: string]: unknown;
}

export default function RelaxationTechniques({ techniques }: Props) {
    const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    // Timer for relaxation sessions
    useEffect(() => {
        if (!isActive || timeRemaining <= 0) return;

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    setIsActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isActive, timeRemaining]);

    const startTechnique = (technique: Technique) => {
        setSelectedTechnique(technique);
        setCurrentStep(0);
        
        // Set duration based on technique
        let duration = 0;
        switch (technique.id) {
            case 'progressive-muscle-relaxation':
                duration = 15 * 60; // 15 minutes
                break;
            case 'guided-imagery':
                duration = 10 * 60; // 10 minutes
                break;
            case 'mindfulness-meditation':
                duration = 5 * 60; // 5 minutes
                break;
            default:
                duration = 10 * 60;
        }
        
        setTotalTime(duration);
        setTimeRemaining(duration);
        setIsActive(true);
    };

    const stopTechnique = () => {
        setIsActive(false);
        setTimeRemaining(0);
        setCurrentStep(0);
    };

    const nextStep = () => {
        if (selectedTechnique && currentStep < selectedTechnique.steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getProgressPercentage = () => {
        if (totalTime === 0) return 0;
        return ((totalTime - timeRemaining) / totalTime) * 100;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/psychological-module" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🧠</span>
                            </div>
                            <div>
                                <h1 className="font-bold text-xl text-gray-900">Teknik Relaksasi</h1>
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
                        🧘 Teknik Relaksasi & Meditasi
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Berbagai metode relaksasi yang terbukti efektif untuk mengurangi ketegangan, meningkatkan ketenangan batin, 
                        dan memperbaiki kualitas mental secara keseluruhan
                    </p>
                </div>

                {/* Active Session Display */}
                {isActive && selectedTechnique && (
                    <Card className="mb-8 border-4 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                        <CardHeader className="text-center pb-4">
                            <CardTitle className="text-3xl">{selectedTechnique.name}</CardTitle>
                            <CardDescription className="text-lg">
                                Sesi sedang berlangsung - {formatTime(timeRemaining)} tersisa
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Timer Display */}
                            <div className="text-center mb-6">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 mx-auto flex items-center justify-center mb-4">
                                    <span className="text-white text-2xl font-bold">{formatTime(timeRemaining)}</span>
                                </div>
                                <Progress value={getProgressPercentage()} className="h-4 max-w-md mx-auto" />
                            </div>

                            {/* Current Step */}
                            <Card className="mb-6 bg-white/50">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Langkah {currentStep + 1} dari {selectedTechnique.steps.length}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        {selectedTechnique.steps[currentStep]}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Navigation Controls */}
                            <div className="flex justify-center space-x-4">
                                <Button 
                                    onClick={previousStep}
                                    disabled={currentStep === 0}
                                    variant="outline"
                                >
                                    ← Sebelumnya
                                </Button>
                                <Button 
                                    onClick={stopTechnique}
                                    variant="destructive"
                                >
                                    Berhenti
                                </Button>
                                <Button 
                                    onClick={nextStep}
                                    disabled={currentStep === selectedTechnique.steps.length - 1}
                                    variant="outline"
                                >
                                    Selanjutnya →
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Technique Cards */}
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                    {techniques.map((technique) => (
                        <Card key={technique.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="text-center mb-4">
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl">
                                            {technique.id === 'progressive-muscle-relaxation' ? '💪' :
                                             technique.id === 'guided-imagery' ? '🌅' : '🧘'}
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl">{technique.name}</CardTitle>
                                    <Badge variant="secondary" className="mt-2">
                                        {technique.duration}
                                    </Badge>
                                </div>
                                <CardDescription className="text-center">
                                    {technique.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Steps Preview */}
                                    <div>
                                        <h4 className="font-medium mb-2">📋 Langkah-langkah:</h4>
                                        <ul className="text-sm space-y-1">
                                            {technique.steps.slice(0, 3).map((step, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-purple-500 mr-2">{index + 1}.</span>
                                                    <span className="text-gray-600">
                                                        {step.length > 50 ? step.substring(0, 50) + '...' : step}
                                                    </span>
                                                </li>
                                            ))}
                                            {technique.steps.length > 3 && (
                                                <li className="text-sm text-gray-500 italic">
                                                    ...dan {technique.steps.length - 3} langkah lainnya
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Benefits */}
                                    <div>
                                        <h4 className="font-medium mb-2">✅ Manfaat:</h4>
                                        <ul className="text-sm space-y-1">
                                            {technique.benefits.map((benefit, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-green-500 mr-2">•</span>
                                                    <span className="text-gray-600">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Action Button */}
                                    <Button 
                                        onClick={() => startTechnique(technique)}
                                        disabled={isActive}
                                        className="w-full mt-4"
                                        size="lg"
                                    >
                                        {isActive ? 'Sesi Sedang Berjalan' : 'Mulai Sesi'} 🚀
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Environment Tips */}
                <Alert className="mt-12 border-l-4 border-l-purple-500">
                    <AlertDescription>
                        <div className="flex items-start space-x-2">
                            <span className="text-purple-500 text-xl">💡</span>
                            <div>
                                <p className="font-medium">Tips untuk Sesi Relaksasi yang Optimal:</p>
                                <p className="text-sm mt-2">
                                    Cari ruang yang tenang, matikan notifikasi, gunakan pencahayaan yang lembut, 
                                    dan pastikan Anda tidak akan terganggu selama sesi berlangsung. 
                                    Konsistensi adalah kunci - lakukan secara rutin untuk hasil terbaik.
                                </p>
                            </div>
                        </div>
                    </AlertDescription>
                </Alert>

                {/* Detailed Guide */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">📚 Panduan Mendalam Teknik Relaksasi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center p-6 border rounded-lg">
                                <div className="text-4xl mb-4">🏠</div>
                                <h3 className="font-medium mb-2">Persiapan Lingkungan</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Ruang yang tenang dan nyaman</li>
                                    <li>• Suhu ruangan yang sejuk</li>
                                    <li>• Pencahayaan yang lembut</li>
                                    <li>• Matikan semua gangguan</li>
                                </ul>
                            </div>
                            
                            <div className="text-center p-6 border rounded-lg">
                                <div className="text-4xl mb-4">🧘</div>
                                <h3 className="font-medium mb-2">Posisi & Postur</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Duduk atau berbaring nyaman</li>
                                    <li>• Punggung tegak tapi rileks</li>
                                    <li>• Mata dapat ditutup atau terbuka</li>
                                    <li>• Tangan dan kaki dalam posisi natural</li>
                                </ul>
                            </div>
                            
                            <div className="text-center p-6 border rounded-lg">
                                <div className="text-4xl mb-4">⏰</div>
                                <h3 className="font-medium mb-2">Waktu & Konsistensi</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Pilih waktu yang sama setiap hari</li>
                                    <li>• Mulai dengan sesi pendek</li>
                                    <li>• Tingkatkan durasi secara bertahap</li>
                                    <li>• Jangan menyerah jika sulit awalnya</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Scientific Benefits */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="text-xl text-center">🔬 Manfaat Ilmiah Teknik Relaksasi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium mb-3 text-green-700">✅ Manfaat Fisiologis:</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Menurunkan tekanan darah dan detak jantung</li>
                                    <li>• Mengurangi kadar hormon stres (kortisol)</li>
                                    <li>• Meningkatkan sistem kekebalan tubuh</li>
                                    <li>• Memperbaiki kualitas tidur</li>
                                    <li>• Mengurangi ketegangan otot</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium mb-3 text-blue-700">🧠 Manfaat Psikologis:</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Meningkatkan fokus dan konsentrasi</li>
                                    <li>• Mengurangi kecemasan dan depresi</li>
                                    <li>• Memperbaiki regulasi emosi</li>
                                    <li>• Meningkatkan rasa sejahtera</li>
                                    <li>• Mengembangkan kesadaran diri</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-center space-x-4 mt-8">
                    <Link href="/breathing-exercises">
                        <Button variant="outline" size="lg">
                            🫁 Latihan Pernapasan
                        </Button>
                    </Link>
                    <Link href="/mental-health-resources">
                        <Button variant="outline" size="lg">
                            📚 Sumber Daya Mental
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