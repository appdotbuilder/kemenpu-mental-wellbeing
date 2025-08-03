<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\StressAssessment
 *
 * @property int $id
 * @property int|null $user_id
 * @property string|null $session_id
 * @property int $work_pressure_score
 * @property int $sleep_quality_score
 * @property int $emotional_state_score
 * @property int $physical_symptoms_score
 * @property int $total_score
 * @property string $stress_level
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|StressAssessment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StressAssessment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StressAssessment query()
 * @method static \Illuminate\Database\Eloquent\Builder|StressAssessment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StressAssessment whereEmotionalStateScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StressAssessment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StressAssessment wherePhysicalSymptomsScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StressAssessment whereSessionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StressAssessment whereSleepQualityScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StressAssessment whereStressLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StressAssessment whereTotalScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StressAssessment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StressAssessment whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StressAssessment whereWorkPressureScore($value)
 * @method static \Database\Factories\StressAssessmentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class StressAssessment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'session_id',
        'work_pressure_score',
        'sleep_quality_score',
        'emotional_state_score',
        'physical_symptoms_score',
        'total_score',
        'stress_level',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'work_pressure_score' => 'integer',
        'sleep_quality_score' => 'integer',
        'emotional_state_score' => 'integer',
        'physical_symptoms_score' => 'integer',
        'total_score' => 'integer',
    ];

    /**
     * Get the user that owns the assessment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Calculate stress level based on total score.
     *
     * @param int $totalScore
     * @return string
     */
    public static function calculateStressLevel(int $totalScore): string
    {
        if ($totalScore <= 8) {
            return 'low';
        } elseif ($totalScore <= 12) {
            return 'moderate';
        } elseif ($totalScore <= 16) {
            return 'high';
        } else {
            return 'severe';
        }
    }
}