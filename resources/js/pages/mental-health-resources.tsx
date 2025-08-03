import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EmergencyContact {
    name: string;
    phone: string;
    description: string;
    type: string;
}

interface Article {
    title: string;
    summary: string;
    category: string;
    read_time: string;
}

interface SelfHelpTool {
    name: string;
    description: string;
    type: string;
}

interface ProfessionalHelp {
    name: string;
    website: string;
    description: string;
}

interface Resources {
    emergency_contacts: EmergencyContact[];
    articles: Article[];
    self_help_tools: SelfHelpTool[];
    professional_help: ProfessionalHelp[];
}

interface Props {
    resources: Resources;
    [key: string]: unknown;
}

export default function MentalHealthResources({ resources }: Props) {
    const getContactTypeIcon = (type: string) => {
        switch (type) {
            case 'hotline': return '📞';
            case 'hospital': return '🏥';
            case 'support': return '🤝';
            default: return '📞';
        }
    };

    const getToolTypeIcon = (type: string) => {
        switch (type) {
            case 'tracking': return '📊';
            case 'checklist': return '✅';
            case 'technique': return '🧘';
            default: return '🛠️';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/psychological-module" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🧠</span>
                            </div>
                            <div>
                                <h1 className="font-bold text-xl text-gray-900">Sumber Daya Mental</h1>
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
                        📚 Sumber Daya Kesehatan Mental
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Informasi lengkap, artikel edukatif, kontak bantuan darurat, dan alat bantu untuk mendukung 
                        kesehatan mental dan kesejahteraan Anda
                    </p>
                </div>

                {/* Emergency Alert */}
                <Alert className="mb-8 border-l-4 border-l-red-500 bg-red-50">
                    <AlertDescription>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start space-x-2">
                                <span className="text-red-500 text-xl">🚨</span>
                                <div>
                                    <p className="font-bold text-red-800">Krisis Kesehatan Mental</p>
                                    <p className="text-red-700">
                                        Jika Anda atau seseorang yang Anda kenal mengalami krisis kesehatan mental atau 
                                        memiliki pikiran untuk menyakiti diri sendiri, segera hubungi layanan darurat.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Button variant="destructive" size="sm">
                                    <a href="tel:119">Hubungi 119</a>
                                </Button>
                                <Button variant="outline" size="sm">
                                    <a href="tel:081287877841">Peer Support</a>
                                </Button>
                            </div>
                        </div>
                    </AlertDescription>
                </Alert>

                {/* Main Content Tabs */}
                <Tabs defaultValue="emergency" className="space-y-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="emergency">🚨 Kontak Darurat</TabsTrigger>
                        <TabsTrigger value="articles">📖 Artikel & Tips</TabsTrigger>
                        <TabsTrigger value="tools">🛠️ Alat Bantu</TabsTrigger>
                        <TabsTrigger value="professional">👨‍⚕️ Bantuan Profesional</TabsTrigger>
                    </TabsList>

                    {/* Emergency Contacts */}
                    <TabsContent value="emergency" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center">📞 Kontak Darurat Kesehatan Mental</CardTitle>
                                <CardDescription className="text-center">
                                    Layanan bantuan yang tersedia 24/7 untuk situasi darurat atau krisis mental
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-1 gap-6">
                                    {resources.emergency_contacts.map((contact, index) => (
                                        <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-start space-x-4">
                                                        <div className="text-4xl">
                                                            {getContactTypeIcon(contact.type)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-bold text-lg text-gray-900">
                                                                {contact.name}
                                                            </h3>
                                                            <p className="text-gray-600 mb-2">{contact.description}</p>
                                                            <Badge variant="outline">
                                                                {contact.type === 'hotline' ? 'Hotline' :
                                                                 contact.type === 'hospital' ? 'Rumah Sakit' : 'Dukungan Peer'}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-blue-600 mb-2">
                                                            {contact.phone}
                                                        </div>
                                                        <Button asChild>
                                                            <a href={`tel:${contact.phone.replace(/\D/g, '')}`}>
                                                                Hubungi Sekarang
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                
                                <Alert className="mt-6">
                                    <AlertDescription>
                                        <div className="flex items-start space-x-2">
                                            <span>ℹ️</span>
                                            <div>
                                                <p className="font-medium">Catatan Penting:</p>
                                                <p className="text-sm mt-1">
                                                    Layanan darurat kesehatan mental tersedia gratis dan konfidensial. 
                                                    Jangan ragu untuk menghubungi jika Anda membutuhkan bantuan segera.
                                                </p>
                                            </div>
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Articles & Tips */}
                    <TabsContent value="articles" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center">📚 Artikel & Tips Kesehatan Mental</CardTitle>
                                <CardDescription className="text-center">
                                    Panduan praktis dan informasi edukatif untuk menjaga kesehatan mental
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-1 gap-4">
                                    {resources.articles.map((article, index) => (
                                        <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <span className="text-2xl">📖</span>
                                                            <Badge variant="secondary">{article.category}</Badge>
                                                            <Badge variant="outline">{article.read_time}</Badge>
                                                        </div>
                                                        <h3 className="font-bold text-lg text-gray-900 mb-2">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-600 leading-relaxed">
                                                            {article.summary}
                                                        </p>
                                                    </div>
                                                    <Button variant="outline" className="ml-4">
                                                        Baca →
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                
                                <div className="mt-8 text-center">
                                    <Card className="bg-gradient-to-r from-blue-50 to-green-50">
                                        <CardContent className="p-6">
                                            <h3 className="font-bold text-lg mb-4">📚 Perpustakaan Digital Kesehatan Mental</h3>
                                            <p className="text-gray-600 mb-4">
                                                Akses koleksi lengkap artikel, e-book, dan video edukatif tentang kesehatan mental
                                            </p>
                                            <Button size="lg">
                                                Jelajahi Perpustakaan 📚
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Self-Help Tools */}
                    <TabsContent value="tools" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center">🛠️ Alat Bantu Perawatan Diri</CardTitle>
                                <CardDescription className="text-center">
                                    Tools praktis yang dapat Anda gunakan sehari-hari untuk menjaga kesehatan mental
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-1 gap-6">
                                    {resources.self_help_tools.map((tool, index) => (
                                        <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-start space-x-4">
                                                        <div className="text-4xl">
                                                            {getToolTypeIcon(tool.type)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-bold text-lg text-gray-900 mb-2">
                                                                {tool.name}
                                                            </h3>
                                                            <p className="text-gray-600 leading-relaxed">
                                                                {tool.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button>
                                                        Gunakan Tool
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                {/* Grounding Technique Card */}
                                <Card className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
                                    <CardHeader>
                                        <CardTitle className="text-xl">🚀 Teknik Grounding 5-4-3-2-1</CardTitle>
                                        <CardDescription>
                                            Teknik cepat untuk mengatasi kecemasan atau serangan panik
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-5 gap-4 text-center">
                                            <div className="p-4 bg-white rounded-lg">
                                                <div className="text-3xl mb-2">👁️</div>
                                                <div className="font-bold">5</div>
                                                <div className="text-sm">Hal yang dapat Anda lihat</div>
                                            </div>
                                            <div className="p-4 bg-white rounded-lg">
                                                <div className="text-3xl mb-2">✋</div>
                                                <div className="font-bold">4</div>
                                                <div className="text-sm">Hal yang dapat Anda sentuh</div>
                                            </div>
                                            <div className="p-4 bg-white rounded-lg">
                                                <div className="text-3xl mb-2">👂</div>
                                                <div className="font-bold">3</div>
                                                <div className="text-sm">Suara yang dapat Anda dengar</div>
                                            </div>
                                            <div className="p-4 bg-white rounded-lg">
                                                <div className="text-3xl mb-2">👃</div>
                                                <div className="font-bold">2</div>
                                                <div className="text-sm">Aroma yang dapat Anda cium</div>
                                            </div>
                                            <div className="p-4 bg-white rounded-lg">
                                                <div className="text-3xl mb-2">👅</div>
                                                <div className="font-bold">1</div>
                                                <div className="text-sm">Rasa yang dapat Anda rasakan</div>
                                            </div>
                                        </div>
                                        <p className="text-center text-gray-600 mt-4">
                                            Teknik ini membantu Anda kembali fokus pada saat ini dan mengurangi kecemasan
                                        </p>
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Professional Help */}
                    <TabsContent value="professional" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center">👨‍⚕️ Bantuan Profesional</CardTitle>
                                <CardDescription className="text-center">
                                    Direktori dan platform untuk mendapatkan bantuan dari profesional kesehatan mental
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-1 gap-6">
                                    {resources.professional_help.map((help, index) => (
                                        <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-start space-x-4">
                                                        <div className="text-4xl">🌐</div>
                                                        <div className="flex-1">
                                                            <h3 className="font-bold text-lg text-gray-900 mb-2">
                                                                {help.name}
                                                            </h3>
                                                            <p className="text-gray-600 mb-3 leading-relaxed">
                                                                {help.description}
                                                            </p>
                                                            <div className="text-sm text-blue-600 font-medium">
                                                                {help.website}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button asChild>
                                                        <a href={help.website} target="_blank" rel="noopener noreferrer">
                                                            Kunjungi Website
                                                        </a>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                {/* What to Expect */}
                                <Card className="mt-8">
                                    <CardHeader>
                                        <CardTitle className="text-xl">💡 Apa yang Dapat Diharapkan dari Terapi?</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-medium mb-3">🏥 Sesi Pertama:</h4>
                                                <ul className="space-y-2 text-sm text-gray-600">
                                                    <li>• Asesmen awal kondisi mental</li>
                                                    <li>• Diskusi tentang riwayat dan keluhan</li>
                                                    <li>• Penjelasan tentang proses terapi</li>
                                                    <li>• Penetapan tujuan terapi</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-3">📈 Proses Terapi:</h4>
                                                <ul className="space-y-2 text-sm text-gray-600">
                                                    <li>• Sesi reguler dengan terapis</li>
                                                    <li>• Pembelajaran teknik coping</li>
                                                    <li>• Evaluasi kemajuan berkala</li>
                                                    <li>• Penyesuaian pendekatan terapi</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Navigation */}
                <div className="flex justify-center space-x-4 mt-8">
                    <Link href="/stress-assessment">
                        <Button variant="outline" size="lg">
                            📊 Asesmen Stres
                        </Button>
                    </Link>
                    <Link href="/breathing-exercises">
                        <Button variant="outline" size="lg">
                            🫁 Latihan Pernapasan
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