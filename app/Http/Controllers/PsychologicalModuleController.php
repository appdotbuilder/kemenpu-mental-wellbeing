<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStressAssessmentRequest;
use App\Models\StressAssessment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PsychologicalModuleController extends Controller
{
    /**
     * Display the main psychological module dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        $recentAssessment = null;
        
        if ($user) {
            $recentAssessment = StressAssessment::where('user_id', $user->id)
                ->latest()
                ->first();
        }
        
        return Inertia::render('psychological-module', [
            'recentAssessment' => $recentAssessment,
        ]);
    }

    /**
     * Show the stress assessment form.
     */
    public function create()
    {
        return Inertia::render('stress-assessment', [
            'questions' => $this->getAssessmentQuestions(),
        ]);
    }

    /**
     * Store a new stress assessment.
     */
    public function store(StoreStressAssessmentRequest $request)
    {
        $validated = $request->validated();
        
        // Calculate total score
        $totalScore = $validated['work_pressure_score'] + 
                     $validated['sleep_quality_score'] + 
                     $validated['emotional_state_score'] + 
                     $validated['physical_symptoms_score'];
        
        // Determine stress level
        $stressLevel = StressAssessment::calculateStressLevel($totalScore);
        
        // Create assessment
        $assessment = StressAssessment::create([
            'user_id' => auth()->id(),
            'session_id' => auth()->guest() ? session()->getId() : null,
            'work_pressure_score' => $validated['work_pressure_score'],
            'sleep_quality_score' => $validated['sleep_quality_score'],
            'emotional_state_score' => $validated['emotional_state_score'],
            'physical_symptoms_score' => $validated['physical_symptoms_score'],
            'total_score' => $totalScore,
            'stress_level' => $stressLevel,
        ]);

        return Inertia::render('assessment-result', [
            'assessment' => $assessment,
            'recommendations' => $this->getRecommendations($stressLevel),
        ]);
    }

    /**
     * Display specific psychological module resource.
     */
    public function show(Request $request)
    {
        // Determine resource type from current route
        $currentPath = $request->path();
        
        if (str_contains($currentPath, 'breathing-exercises')) {
            $resourceId = 'breathing-exercises';
        } elseif (str_contains($currentPath, 'relaxation-techniques')) {
            $resourceId = 'relaxation-techniques';
        } elseif (str_contains($currentPath, 'mental-health-resources')) {
            $resourceId = 'mental-health-resources';
        } else {
            $resourceId = 'breathing-exercises';
        }
        
        switch ($resourceId) {
            case 'breathing-exercises':
                return Inertia::render('breathing-exercises', [
                    'exercises' => $this->getBreathingExercises(),
                ]);
            case 'relaxation-techniques':
                return Inertia::render('relaxation-techniques', [
                    'techniques' => $this->getRelaxationTechniques(),
                ]);
            case 'mental-health-resources':
                return Inertia::render('mental-health-resources', [
                    'resources' => $this->getMentalHealthResources(),
                ]);
            default:
                return redirect()->route('psychological-module.index');
        }
    }

    /**
     * Get assessment questions.
     *
     * @return array
     */
    protected function getAssessmentQuestions(): array
    {
        return [
            [
                'id' => 'work_pressure',
                'question' => 'Seberapa sering Anda merasa tertekan dengan beban kerja di Kementerian PUPR?',
                'options' => [
                    1 => 'Tidak pernah',
                    2 => 'Jarang',
                    3 => 'Kadang-kadang',
                    4 => 'Sering',
                    5 => 'Selalu',
                ],
            ],
            [
                'id' => 'sleep_quality',
                'question' => 'Bagaimana kualitas tidur Anda dalam 2 minggu terakhir?',
                'options' => [
                    1 => 'Sangat baik',
                    2 => 'Baik',
                    3 => 'Cukup',
                    4 => 'Buruk',
                    5 => 'Sangat buruk',
                ],
            ],
            [
                'id' => 'emotional_state',
                'question' => 'Seberapa sering Anda merasa cemas, mudah marah, atau sedih tanpa alasan yang jelas?',
                'options' => [
                    1 => 'Tidak pernah',
                    2 => 'Jarang',
                    3 => 'Kadang-kadang',
                    4 => 'Sering',
                    5 => 'Selalu',
                ],
            ],
            [
                'id' => 'physical_symptoms',
                'question' => 'Seberapa sering Anda mengalami gejala fisik seperti sakit kepala, nyeri otot, atau gangguan pencernaan?',
                'options' => [
                    1 => 'Tidak pernah',
                    2 => 'Jarang',
                    3 => 'Kadang-kadang',
                    4 => 'Sering',
                    5 => 'Selalu',
                ],
            ],
        ];
    }

    /**
     * Get recommendations based on stress level.
     *
     * @param string $stressLevel
     * @return array
     */
    protected function getRecommendations(string $stressLevel): array
    {
        $recommendations = [
            'low' => [
                'title' => 'Tingkat Stres Rendah',
                'description' => 'Kondisi psikologis Anda dalam keadaan baik. Pertahankan gaya hidup sehat Anda.',
                'suggestions' => [
                    'Terus lakukan aktivitas fisik secara teratur',
                    'Pertahankan pola tidur yang baik',
                    'Lakukan teknik relaksasi sebagai pencegahan',
                    'Jaga keseimbangan antara kerja dan kehidupan pribadi',
                ],
                'color' => 'green',
            ],
            'moderate' => [
                'title' => 'Tingkat Stres Sedang',
                'description' => 'Anda mengalami tingkat stres yang cukup. Mulai terapkan teknik manajemen stres.',
                'suggestions' => [
                    'Praktikkan latihan pernapasan setiap hari',
                    'Luangkan waktu untuk relaksasi dan hobi',
                    'Bicarakan dengan rekan kerja atau atasan tentang beban kerja',
                    'Pertimbangkan untuk mengatur ulang prioritas pekerjaan',
                ],
                'color' => 'yellow',
            ],
            'high' => [
                'title' => 'Tingkat Stres Tinggi',
                'description' => 'Anda mengalami tingkat stres yang tinggi. Penting untuk segera mengambil tindakan.',
                'suggestions' => [
                    'Praktikkan teknik relaksasi secara intensif',
                    'Pertimbangkan untuk berbicara dengan konselor atau psikolog',
                    'Evaluasi beban kerja dan minta bantuan jika diperlukan',
                    'Pastikan mendapat istirahat yang cukup',
                    'Hindari kafein dan alkohol berlebihan',
                ],
                'color' => 'orange',
            ],
            'severe' => [
                'title' => 'Tingkat Stres Sangat Tinggi',
                'description' => 'Anda mengalami tingkat stres yang sangat tinggi. Segera cari bantuan profesional.',
                'suggestions' => [
                    'Segera konsultasi dengan psikolog atau psikiater',
                    'Pertimbangkan untuk mengambil cuti sementara',
                    'Lakukan semua teknik relaksasi yang tersedia',
                    'Minta dukungan dari keluarga dan teman',
                    'Hubungi layanan kesehatan mental darurat jika diperlukan',
                ],
                'color' => 'red',
                'urgent' => true,
            ],
        ];

        return $recommendations[$stressLevel] ?? $recommendations['moderate'];
    }

    /**
     * Get breathing exercises.
     *
     * @return array
     */
    protected function getBreathingExercises(): array
    {
        return [
            [
                'id' => 'box-breathing',
                'name' => 'Pernapasan Kotak (Box Breathing)',
                'duration' => '5-10 menit',
                'description' => 'Teknik pernapasan yang membantu menenangkan sistem saraf dan mengurangi stres.',
                'steps' => [
                    'Duduk dengan nyaman dan rileks',
                    'Tarik napas melalui hidung selama 4 hitungan',
                    'Tahan napas selama 4 hitungan',
                    'Keluarkan napas melalui mulut selama 4 hitungan',
                    'Tahan napas kosong selama 4 hitungan',
                    'Ulangi siklus ini 8-10 kali',
                ],
                'benefits' => [
                    'Menurunkan detak jantung',
                    'Mengurangi kecemasan',
                    'Meningkatkan fokus dan konsentrasi',
                ],
            ],
            [
                'id' => '478-breathing',
                'name' => 'Pernapasan 4-7-8',
                'duration' => '3-5 menit',
                'description' => 'Teknik pernapasan yang efektif untuk mengatasi stres dan membantu tidur.',
                'steps' => [
                    'Posisikan lidah di belakang gigi depan atas',
                    'Keluarkan napas sepenuhnya melalui mulut',
                    'Tutup mulut dan tarik napas melalui hidung selama 4 hitungan',
                    'Tahan napas selama 7 hitungan',
                    'Keluarkan napas melalui mulut selama 8 hitungan',
                    'Ulangi siklus 3-4 kali',
                ],
                'benefits' => [
                    'Menenangkan sistem saraf',
                    'Membantu mengatasi insomnia',
                    'Mengurangi stres dan kecemasan',
                ],
            ],
            [
                'id' => 'diaphragmatic-breathing',
                'name' => 'Pernapasan Diafragma',
                'duration' => '10-15 menit',
                'description' => 'Pernapasan dalam yang melibatkan diafragma untuk relaksasi maksimal.',
                'steps' => [
                    'Berbaring atau duduk dengan nyaman',
                    'Letakkan satu tangan di dada, satu di perut',
                    'Tarik napas perlahan melalui hidung',
                    'Pastikan tangan di perut bergerak lebih banyak dari tangan di dada',
                    'Keluarkan napas perlahan melalui mulut',
                    'Fokus pada gerakan perut naik turun',
                ],
                'benefits' => [
                    'Meningkatkan oksigenasi',
                    'Menurunkan tekanan darah',
                    'Mengurangi ketegangan otot',
                ],
            ],
        ];
    }

    /**
     * Get relaxation techniques.
     *
     * @return array
     */
    protected function getRelaxationTechniques(): array
    {
        return [
            [
                'id' => 'progressive-muscle-relaxation',
                'name' => 'Relaksasi Otot Progresif',
                'duration' => '15-20 menit',
                'description' => 'Teknik relaksasi dengan mengencangkan dan mengendurkan kelompok otot secara berurutan.',
                'steps' => [
                    'Berbaring atau duduk dengan nyaman',
                    'Mulai dari kaki, kencangkan otot selama 5 detik',
                    'Lepaskan ketegangan dan rasakan relaksasi selama 10 detik',
                    'Lanjutkan ke betis, paha, perut, tangan, lengan, bahu, dan wajah',
                    'Fokus pada perbedaan antara tegang dan rileks',
                    'Akhiri dengan merasakan seluruh tubuh dalam keadaan rileks',
                ],
                'benefits' => [
                    'Mengurangi ketegangan fisik',
                    'Meningkatkan kualitas tidur',
                    'Menurunkan tingkat stres',
                ],
            ],
            [
                'id' => 'guided-imagery',
                'name' => 'Visualisasi Terpandu',
                'duration' => '10-15 menit',
                'description' => 'Menggunakan imajinasi untuk menciptakan pengalaman yang menenangkan.',
                'steps' => [
                    'Duduk atau berbaring dengan nyaman',
                    'Tutup mata dan bernapas dalam-dalam',
                    'Bayangkan tempat yang tenang dan damai',
                    'Gunakan semua indera untuk membayangkan detail tempat tersebut',
                    'Rasakan kedamaian dan ketenangan di tempat itu',
                    'Nikmati sensasi relaksasi selama beberapa menit',
                ],
                'benefits' => [
                    'Mengurangi kecemasan',
                    'Meningkatkan mood positif',
                    'Membantu fokus dan konsentrasi',
                ],
            ],
            [
                'id' => 'mindfulness-meditation',
                'name' => 'Meditasi Mindfulness',
                'duration' => '5-20 menit',
                'description' => 'Melatih kesadaran penuh terhadap momen sekarang tanpa menghakimi.',
                'steps' => [
                    'Duduk dengan posisi tegak dan nyaman',
                    'Fokuskan perhatian pada napas',
                    'Ketika pikiran melayang, kembalikan fokus ke napas',
                    'Terima pikiran dan perasaan tanpa menghakimi',
                    'Pertahankan kesadaran pada momen sekarang',
                    'Mulai dengan 5 menit, tingkatkan secara bertahap',
                ],
                'benefits' => [
                    'Meningkatkan regulasi emosi',
                    'Mengurangi stres dan kecemasan',
                    'Meningkatkan fokus dan klaritas mental',
                ],
            ],
        ];
    }

    /**
     * Get mental health resources.
     *
     * @return array
     */
    protected function getMentalHealthResources(): array
    {
        return [
            'emergency_contacts' => [
                [
                    'name' => 'Kementerian Kesehatan RI - Sehat Jiwa',
                    'phone' => '119 ext 8',
                    'description' => 'Layanan konsultasi kesehatan mental 24 jam',
                    'type' => 'hotline',
                ],
                [
                    'name' => 'RSCM Jakarta - Unit Psikiatri',
                    'phone' => '(021) 31900001',
                    'description' => 'Layanan darurat psikiatri',
                    'type' => 'hospital',
                ],
                [
                    'name' => 'Into The Light Indonesia',
                    'phone' => '081287877841',
                    'description' => 'Peer support untuk kesehatan mental',
                    'type' => 'support',
                ],
            ],
            'articles' => [
                [
                    'title' => 'Mengelola Stres di Tempat Kerja',
                    'summary' => 'Tips praktis untuk mengatasi tekanan pekerjaan dan menjaga keseimbangan hidup.',
                    'category' => 'Manajemen Stres',
                    'read_time' => '5 menit',
                ],
                [
                    'title' => 'Pentingnya Istirahat Mental',
                    'summary' => 'Mengapa istirahat mental penting untuk produktivitas dan kesehatan jangka panjang.',
                    'category' => 'Kesehatan Mental',
                    'read_time' => '4 menit',
                ],
                [
                    'title' => 'Komunikasi Efektif dengan Rekan Kerja',
                    'summary' => 'Strategi komunikasi yang sehat untuk mengurangi konflik di tempat kerja.',
                    'category' => 'Hubungan Kerja',
                    'read_time' => '6 menit',
                ],
            ],
            'self_help_tools' => [
                [
                    'name' => 'Jurnal Harian Mood',
                    'description' => 'Catat suasana hati dan faktor pemicunya setiap hari',
                    'type' => 'tracking',
                ],
                [
                    'name' => 'Checklist Perawatan Diri',
                    'description' => 'Daftar aktivitas untuk menjaga kesehatan mental harian',
                    'type' => 'checklist',
                ],
                [
                    'name' => 'Teknik Grounding 5-4-3-2-1',
                    'description' => 'Teknik cepat untuk mengatasi kecemasan akut',
                    'type' => 'technique',
                ],
            ],
            'professional_help' => [
                [
                    'name' => 'Himpunan Psikologi Indonesia (HIMPSI)',
                    'website' => 'https://himpsi.or.id',
                    'description' => 'Direktori psikolog berlisensi di Indonesia',
                ],
                [
                    'name' => 'Ikatan Psikiatri Indonesia (IPsI)',
                    'website' => 'https://ipsi.or.id',
                    'description' => 'Direktori psikiater di Indonesia',
                ],
                [
                    'name' => 'SehatMental.id',
                    'website' => 'https://sehatmental.id',
                    'description' => 'Platform konsultasi psikolog online',
                ],
            ],
        ];
    }
}