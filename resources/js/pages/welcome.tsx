import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Props {
    auth: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">🧠</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-xl text-gray-900">Modul Psikologi</h1>
                            <p className="text-sm text-gray-600">Kementerian PUPR RI</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        {auth.user ? (
                            <Link href="/dashboard">
                                <Button variant="default">Dashboard</Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="outline">Masuk</Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="default">Daftar</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            🧠 <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Modul Psikologi Digital
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Platform kesehatan mental khusus untuk pegawai Kementerian Pekerjaan Umum dan Perumahan Rakyat. 
                            Kelola stres, tingkatkan kesejahteraan mental, dan dapatkan dukungan profesional.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <Badge variant="secondary" className="px-4 py-2 text-sm">
                                ✅ Asesmen Stres
                            </Badge>
                            <Badge variant="secondary" className="px-4 py-2 text-sm">
                                🫁 Latihan Pernapasan
                            </Badge>
                            <Badge variant="secondary" className="px-4 py-2 text-sm">
                                🧘 Teknik Relaksasi
                            </Badge>
                            <Badge variant="secondary" className="px-4 py-2 text-sm">
                                📚 Sumber Daya Mental
                            </Badge>
                        </div>
                        
                        {auth.user ? (
                            <Link href="/psychological-module">
                                <Button size="lg" className="text-lg px-8 py-4">
                                    Mulai Asesmen Stres 🚀
                                </Button>
                            </Link>
                        ) : (
                            <div className="space-x-4">
                                <Link href="/register">
                                    <Button size="lg" className="text-lg px-8 py-4">
                                        Mulai Sekarang 🚀
                                    </Button>
                                </Link>
                                <Link href="/psychological-module">
                                    <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                                        Coba Tanpa Akun
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            ✨ Fitur Utama Platform
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Solusi komprehensif untuk kesehatan mental pegawai dengan pendekatan yang terbukti secara ilmiah
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">📊</span>
                                </div>
                                <CardTitle className="text-xl">Asesmen Stres</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm">
                                    Evaluasi tingkat stres dengan kuesioner tervalidasi dan dapatkan analisis personal
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🫁</span>
                                </div>
                                <CardTitle className="text-xl">Latihan Pernapasan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm">
                                    Teknik pernapasan terpandu untuk menenangkan pikiran dan mengurangi kecemasan
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🧘</span>
                                </div>
                                <CardTitle className="text-xl">Teknik Relaksasi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm">
                                    Berbagai metode relaksasi seperti meditasi dan relaksasi otot progresif
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">📚</span>
                                </div>
                                <CardTitle className="text-xl">Sumber Daya</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm">
                                    Artikel, kontak darurat, dan panduan kesehatan mental yang mudah diakses
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-green-50">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            🎯 Mengapa Menggunakan Platform Ini?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="text-left">
                                <div className="flex items-start space-x-3 mb-4">
                                    <span className="text-2xl">✅</span>
                                    <div>
                                        <h3 className="font-semibold text-lg">Mudah Digunakan</h3>
                                        <p className="text-gray-600">Interface yang intuitif dan ramah pengguna untuk semua kalangan</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 mb-4">
                                    <span className="text-2xl">🔒</span>
                                    <div>
                                        <h3 className="font-semibold text-lg">Aman & Terpercaya</h3>
                                        <p className="text-gray-600">Data pribadi terlindungi dengan standar keamanan tinggi</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">🎯</span>
                                    <div>
                                        <h3 className="font-semibold text-lg">Berbasis Bukti</h3>
                                        <p className="text-gray-600">Menggunakan metode yang terbukti secara ilmiah dan klinis</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-left">
                                <div className="flex items-start space-x-3 mb-4">
                                    <span className="text-2xl">⏰</span>
                                    <div>
                                        <h3 className="font-semibold text-lg">Akses 24/7</h3>
                                        <p className="text-gray-600">Tersedia kapan saja, di mana saja sesuai kebutuhan Anda</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 mb-4">
                                    <span className="text-2xl">📱</span>
                                    <div>
                                        <h3 className="font-semibold text-lg">Multi-Platform</h3>
                                        <p className="text-gray-600">Berfungsi optimal di desktop, tablet, dan smartphone</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">🤝</span>
                                    <div>
                                        <h3 className="font-semibold text-lg">Dukungan Profesional</h3>
                                        <p className="text-gray-600">Akses ke konselor dan psikolog berpengalaman</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            🚀 Mulai Perjalanan Kesehatan Mental Anda
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Bergabunglah dengan ribuan pegawai PUPR yang telah merasakan manfaat platform kesehatan mental ini
                        </p>
                        {auth.user ? (
                            <Link href="/psychological-module">
                                <Button size="lg" className="text-lg px-12 py-4">
                                    Masuk ke Dashboard 🎯
                                </Button>
                            </Link>
                        ) : (
                            <div className="space-x-4">
                                <Link href="/register">
                                    <Button size="lg" className="text-lg px-12 py-4">
                                        Daftar Gratis 🎯
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button size="lg" variant="outline" className="text-lg px-12 py-4">
                                        Sudah Punya Akun?
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4">
                <div className="container mx-auto text-center">
                    <div className="mb-8">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🧠</span>
                            </div>
                            <span className="font-bold text-xl">Modul Psikologi PUPR</span>
                        </div>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Platform kesehatan mental untuk mendukung kesejahteraan pegawai Kementerian Pekerjaan Umum dan Perumahan Rakyat
                        </p>
                    </div>
                    <div className="border-t border-gray-800 pt-8">
                        <p className="text-gray-400">
                            © 2024 Kementerian Pekerjaan Umum dan Perumahan Rakyat. Semua hak dilindungi.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Platform ini dikembangkan untuk mendukung kesehatan mental pegawai PUPR
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}