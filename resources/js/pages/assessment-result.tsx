import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface StressAssessment {
    id: number;
    work_pressure_score: number;
    sleep_quality_score: number;
    emotional_state_score: number;
    physical_symptoms_score: number;
    total_score: number;
    stress_level: string;
    created_at: string;
}

interface Recommendation {
    title: string;
    description: string;
    color: string;
    suggestions: string[];
    urgent?: boolean;
}

interface Props {
    assessment: StressAssessment;
    recommendations: Recommendation;
    [key: string]: unknown;
}

export default function AssessmentResult({ assessment, recommendations }: Props) {
    const getStressLevelEmoji = (level: string) => {
        switch (level) {
            case 'low': return '😊';
            case 'moderate': return '😐';
            case 'high': return '😟';
            case 'severe': return '😰';
            default: return '😐';
        }
    };



    const scorePercentage = (assessment.total_score / 20) * 100;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
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
                                <h1 className="font-bold text-xl text-gray-900">Hasil Asesmen</h1>
                                <p className="text-sm text-gray-600">Kementerian PUPR RI</p>
                            </div>
                        </Link>
                        <Link href="/psychological-module">
                            <Button variant="outline">Kembali ke Dashboard</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        📊 Hasil Asesmen Stres Anda
                    </h1>
                    <p className="text-lg text-gray-600">
                        Berikut adalah analisis tingkat stres Anda berdasarkan jawaban yang diberikan
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Asesmen dilakukan pada: {formatDate(assessment.created_at)}
                    </p>
                </div>

                {/* Main Result Card */}
                <Card className="mb-8 border-2 border-gray-200">
                    <CardHeader className="text-center pb-6">
                        <div className="text-8xl mb-4">
                            {getStressLevelEmoji(assessment.stress_level)}
                        </div>
                        <CardTitle className="text-4xl mb-2">
                            {recommendations.title}
                        </CardTitle>
                        <Badge 
                            className={`text-lg px-6 py-2 border-2 ${
                                assessment.stress_level === 'low' ? 'bg-green-100 text-green-800 border-green-200' :
                                assessment.stress_level === 'moderate' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                assessment.stress_level === 'high' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                                'bg-red-100 text-red-800 border-red-200'
                            }`}
                        >
                            Skor: {assessment.total_score}/20
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Tingkat Stres</span>
                                <span className="text-sm font-medium">{Math.round(scorePercentage)}%</span>
                            </div>
                            <Progress 
                                value={scorePercentage} 
                                className="h-4"
                            />
                        </div>
                        <p className="text-lg text-center text-gray-700 leading-relaxed">
                            {recommendations.description}
                        </p>
                    </CardContent>
                </Card>

                {/* Score Breakdown */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl">📈 Rincian Skor per Kategori</CardTitle>
                        <CardDescription>
                            Analisis detail berdasarkan 4 aspek yang dinilai
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                                    <div>
                                        <span className="font-medium">💼 Tekanan Kerja</span>
                                        <p className="text-sm text-gray-600">Beban dan tekanan di tempat kerja</p>
                                    </div>
                                    <Badge variant="outline" className="text-lg">
                                        {assessment.work_pressure_score}/5
                                    </Badge>
                                </div>
                                
                                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                                    <div>
                                        <span className="font-medium">😴 Kualitas Tidur</span>
                                        <p className="text-sm text-gray-600">Pola dan kualitas istirahat</p>
                                    </div>
                                    <Badge variant="outline" className="text-lg">
                                        {assessment.sleep_quality_score}/5
                                    </Badge>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                                    <div>
                                        <span className="font-medium">💭 Kondisi Emosi</span>
                                        <p className="text-sm text-gray-600">Stabilitas dan regulasi emosi</p>
                                    </div>
                                    <Badge variant="outline" className="text-lg">
                                        {assessment.emotional_state_score}/5
                                    </Badge>
                                </div>
                                
                                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                                    <div>
                                        <span className="font-medium">🏥 Gejala Fisik</span>
                                        <p className="text-sm text-gray-600">Manifestasi fisik dari stres</p>
                                    </div>
                                    <Badge variant="outline" className="text-lg">
                                        {assessment.physical_symptoms_score}/5
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Urgent Alert for Severe Stress */}
                {recommendations.urgent && (
                    <Alert className="mb-8 border-l-4 border-l-red-500 bg-red-50">
                        <AlertDescription>
                            <div className="flex items-start space-x-2">
                                <span className="text-red-500 text-xl">⚠️</span>
                                <div>
                                    <p className="font-bold text-red-800">PERHATIAN KHUSUS</p>
                                    <p className="text-red-700 mt-1">
                                        Tingkat stres Anda sangat tinggi. Sangat disarankan untuk segera mencari bantuan profesional 
                                        dari psikolog atau psikiater. Jangan ragu untuk menghubungi layanan darurat kesehatan mental.
                                    </p>
                                </div>
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Recommendations */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl">💡 Rekomendasi untuk Anda</CardTitle>
                        <CardDescription>
                            Langkah-langkah yang dapat Anda lakukan untuk mengelola tingkat stres
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recommendations.suggestions.map((suggestion, index) => (
                                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                    <span className="text-green-500 font-bold text-lg">{index + 1}.</span>
                                    <p className="text-gray-700 flex-1">{suggestion}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <Link href="/breathing-exercises">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6 text-center">
                                <div className="text-4xl mb-3">🫁</div>
                                <h3 className="font-medium mb-2">Latihan Pernapasan</h3>
                                <p className="text-sm text-gray-600">Teknik pernapasan untuk meredakan stres</p>
                            </CardContent>
                        </Card>
                    </Link>
                    
                    <Link href="/relaxation-techniques">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6 text-center">
                                <div className="text-4xl mb-3">🧘</div>
                                <h3 className="font-medium mb-2">Teknik Relaksasi</h3>
                                <p className="text-sm text-gray-600">Metode relaksasi dan meditasi</p>
                            </CardContent>
                        </Card>
                    </Link>
                    
                    <Link href="/mental-health-resources">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6 text-center">
                                <div className="text-4xl mb-3">📞</div>
                                <h3 className="font-medium mb-2">Bantuan Profesional</h3>
                                <p className="text-sm text-gray-600">Kontak psikolog dan layanan darurat</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Next Steps */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">🎯 Langkah Selanjutnya</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium mb-2">Segera:</h4>
                                <ul className="space-y-1 text-sm text-gray-600">
                                    <li>• Coba salah satu teknik relaksasi yang tersedia</li>
                                    <li>• Luangkan waktu 10-15 menit untuk diri sendiri</li>
                                    <li>• Praktikkan latihan pernapasan</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Jangka Panjang:</h4>
                                <ul className="space-y-1 text-sm text-gray-600">
                                    <li>• Lakukan asesmen ulang dalam 2 minggu</li>
                                    <li>• Terapkan rutinitas self-care harian</li>
                                    <li>• Pertimbangkan konsultasi dengan profesional</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="flex justify-center space-x-4 mt-6">
                            <Link href="/stress-assessment">
                                <Button variant="outline">
                                    Asesmen Ulang
                                </Button>
                            </Link>
                            <Link href="/psychological-module">
                                <Button>
                                    Kembali ke Dashboard
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}