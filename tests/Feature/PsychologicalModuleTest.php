<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\StressAssessment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PsychologicalModuleTest extends TestCase
{
    use RefreshDatabase;

    public function test_psychological_module_index_page_loads()
    {
        $response = $this->get('/psychological-module');

        $response->assertStatus(200);
    }

    public function test_stress_assessment_page_loads()
    {
        $response = $this->get('/stress-assessment');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('stress-assessment')
                 ->has('questions')
        );
    }

    public function test_breathing_exercises_page_loads()
    {
        $response = $this->get('/breathing-exercises');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('breathing-exercises')
                 ->has('exercises')
        );
    }

    public function test_relaxation_techniques_page_loads()
    {
        $response = $this->get('/relaxation-techniques');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('relaxation-techniques')
                 ->has('techniques')
        );
    }

    public function test_mental_health_resources_page_loads()
    {
        $response = $this->get('/mental-health-resources');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('mental-health-resources')
                 ->has('resources')
        );
    }

    public function test_guest_can_submit_stress_assessment()
    {
        $assessmentData = [
            'work_pressure_score' => 3,
            'sleep_quality_score' => 2,
            'emotional_state_score' => 4,
            'physical_symptoms_score' => 3,
        ];

        $response = $this->post('/stress-assessment', $assessmentData);

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('assessment-result')
                 ->has('assessment')
                 ->has('recommendations')
        );

        $this->assertDatabaseHas('stress_assessments', [
            'work_pressure_score' => 3,
            'sleep_quality_score' => 2,
            'emotional_state_score' => 4,
            'physical_symptoms_score' => 3,
            'total_score' => 12,
            'stress_level' => 'moderate',
            'user_id' => null,
        ]);
    }

    public function test_authenticated_user_can_submit_stress_assessment()
    {
        $user = User::factory()->create();

        $assessmentData = [
            'work_pressure_score' => 4,
            'sleep_quality_score' => 4,
            'emotional_state_score' => 5,
            'physical_symptoms_score' => 4,
        ];

        $response = $this->actingAs($user)->post('/stress-assessment', $assessmentData);

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('assessment-result')
                 ->has('assessment')
                 ->has('recommendations')
        );

        $this->assertDatabaseHas('stress_assessments', [
            'work_pressure_score' => 4,
            'sleep_quality_score' => 4,
            'emotional_state_score' => 5,
            'physical_symptoms_score' => 4,
            'total_score' => 17,
            'stress_level' => 'severe',
            'user_id' => $user->id,
        ]);
    }

    public function test_stress_assessment_validation()
    {
        $invalidData = [
            'work_pressure_score' => 6, // Invalid: should be 1-5
            'sleep_quality_score' => 0, // Invalid: should be 1-5
            'emotional_state_score' => null, // Invalid: required
            // Missing physical_symptoms_score
        ];

        $response = $this->post('/stress-assessment', $invalidData);

        $response->assertStatus(302); // Redirect due to validation errors
        $response->assertSessionHasErrors([
            'work_pressure_score',
            'sleep_quality_score',
            'emotional_state_score',
            'physical_symptoms_score',
        ]);
    }

    public function test_stress_level_calculation()
    {
        // Test low stress (score 8)
        $this->assertEquals('low', StressAssessment::calculateStressLevel(8));
        
        // Test moderate stress (score 12)
        $this->assertEquals('moderate', StressAssessment::calculateStressLevel(12));
        
        // Test high stress (score 16)
        $this->assertEquals('high', StressAssessment::calculateStressLevel(16));
        
        // Test severe stress (score 20)
        $this->assertEquals('severe', StressAssessment::calculateStressLevel(20));
    }

    public function test_authenticated_user_sees_recent_assessment()
    {
        $user = User::factory()->create();
        $assessment = StressAssessment::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user)->get('/psychological-module');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('psychological-module')
                 ->has('recentAssessment')
                 ->where('recentAssessment.id', $assessment->id)
        );
    }

    public function test_welcome_page_loads_with_psychological_module_info()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
        );
    }
}