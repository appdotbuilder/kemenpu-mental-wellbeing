import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface StressAssessment {
    id: number;
    total_score: number;
    stress_level: string;
    created_at: string;
}

interface Props {
    recentAssessment?: StressAssessment;
    [key: string]: unknown;
}

export default function PsychologicalModule({ recentAssessment }: Props) {
    const getStressLevelColor = (level: string) => {
        switch (level) {
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'severe': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStressLevelText = (level: string) => {
        switch (level) {
            case 'low': return 'Rendah';
            case 'moderate': return 'Sedang';
            case 'high': return 'Tinggi';
            case 'severe': return 'Sangat Tinggi';
            default: return level;
        }
    };

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
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🧠</span>
                            </div>
                            <div>
                                <h1 className="font-bold text-xl text-gray-900">Modul Psikologi</h1>
                                <p className="text-sm text-gray-600">Kementerian PUPR RI</p>
                            </div>
                        </Link>
                        <div className="flex space-x-2">
                            <Link href="/dashboard">
                                <Button variant="outline">Dashboard</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🧠 Selamat Datang di Modul Psikologi
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Platform kesehatan mental untuk mendukung kesejahteraan Anda sebagai pegawai Kementerian PUPR
                    </p>
                </div>

                {/* Recent Assessment Alert */}
                {recentAssessment && (
                    <Alert className="mb-8 border-l-4 border-l-blue-500">
                        <AlertDescription className="flex items-center justify-between">
                            <div>
                                <span className="font-medium">Asesmen terakhir:</span> {formatDate(recentAssessment.created_at)} - 
                                <Badge className={`ml-2 ${getStressLevelColor(recentAssessment.stress_level)}`}>
                                    Tingkat Stres: {getStressLevelText(recentAssessment.stress_level)}
                                </Badge>
                            </div>
                            <Link href="/stress-assessment">
                                <Button variant="outline" size="sm">
                                    Asesmen Ulang
                                </Button>
                            </Link>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Main Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
                    {/* Stress Assessment */}
                    <Card className="hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
                        <CardHeader className="text-center pb-4">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">📊</span>
                            </div>
                            <CardTitle className="text-2xl text-blue-900">Asesmen Stres</CardTitle>
                            <CardDescription className="text-base">
                                Evaluasi tingkat stres Anda dengan kuesioner yang telah tervalidasi secara klinis
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="space-y-4">
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>✅ 4 kategori penilaian</p>
                                    <p>✅ Analisis personal</p>
                                    <p>✅ Rekomendasi tindakan</p>
                                </div>
                                <Link href="/stress-assessment">
                                    <Button className="w-full" size="lg">
                                        {recentAssessment ? 'Lakukan Asesmen Ulang' : 'Mulai Asesmen'} 🚀
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Interventions */}
                    <Card className="hover:shadow-lg transition-shadow border-2 hover:border-green-200">
                        <CardHeader className="text-center pb-4">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">🧘</span>
                            </div>
                            <CardTitle className="text-2xl text-green-900">Intervensi Stres</CardTitle>
                            <CardDescription className="text-base">
                                Teknik-teknik terbukti untuk mengurangi stres dan meningkatkan kesejahteraan mental
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href="/breathing-exercises">
                                <Button variant="outline" className="w-full justify-start">
                                    🫁 Latihan Pernapasan Terpandu
                                </Button>
                            </Link>
                            <Link href="/relaxation-techniques">
                                <Button variant="outline" className="w-full justify-start">
                                    🛀 Teknik Relaksasi & Meditasi
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Resources Section */}
                <Card className="mb-8">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl flex items-center justify-center gap-2">
                            📚 Sumber Daya Kesehatan Mental
                        </CardTitle>
                        <CardDescription className="text-base">
                            Informasi, artikel, dan kontak bantuan profesional untuk kesehatan mental
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center p-4 border rounded-lg hover:bg-gray-50">
                                <span className="text-3xl block mb-2">📞</span>
                                <h3 className="font-medium mb-2">Kontak Darurat</h3>
                                <p className="text-sm text-gray-600 mb-3">Hotline 24/7 untuk bantuan segera</p>
                                <Link href="/mental-health-resources">
                                    <Button variant="outline" size="sm">Lihat Kontak</Button>
                                </Link>
                            </div>
                            
                            <div className="text-center p-4 border rounded-lg hover:bg-gray-50">
                                <span className="text-3xl block mb-2">📖</span>
                                <h3 className="font-medium mb-2">Artikel & Tips</h3>
                                <p className="text-sm text-gray-600 mb-3">Panduan praktis untuk kesehatan mental</p>
                                <Link href="/mental-health-resources">
                                    <Button variant="outline" size="sm">Baca Artikel</Button>
                                </Link>
                            </div>
                            
                            <div className="text-center p-4 border rounded-lg hover:bg-gray-50">
                                <span className="text-3xl block mb-2">🤝</span>
                                <h3 className="font-medium mb-2">Bantuan Profesional</h3>
                                <p className="text-sm text-gray-600 mb-3">Direktori psikolog dan psikiater</p>
                                <Link href="/mental-health-resources">
                                    <Button variant="outline" size="sm">Cari Bantuan</Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="bg-white rounded-lg p-6 border shadow-sm">
                    <h3 className="text-lg font-medium mb-4 text-center">📈 Statistik Platform</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">3</div>
                            <div className="text-sm text-gray-600">Teknik Pernapasan</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">3</div>
                            <div className="text-sm text-gray-600">Metode Relaksasi</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">10+</div>
                            <div className="text-sm text-gray-600">Artikel & Tips</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">24/7</div>
                            <div className="text-sm text-gray-600">Dukungan Tersedia</div>
                        </div>
                    </div>
                </div>

                {/* Emergency Contact */}
                <Alert className="mt-8 border-l-4 border-l-red-500 bg-red-50">
                    <AlertDescription>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="font-medium text-red-800">Darurat Kesehatan Mental:</span>
                                <span className="ml-2 text-red-700">Hubungi 119 ext 8 (Sehat Jiwa Kemenkes RI)</span>
                            </div>
                            <Link href="/mental-health-resources">
                                <Button variant="destructive" size="sm">
                                    Kontak Darurat
                                </Button>
                            </Link>
                        </div>
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}