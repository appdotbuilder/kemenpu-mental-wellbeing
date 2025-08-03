<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStressAssessmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'work_pressure_score' => 'required|integer|min:1|max:5',
            'sleep_quality_score' => 'required|integer|min:1|max:5',
            'emotional_state_score' => 'required|integer|min:1|max:5',
            'physical_symptoms_score' => 'required|integer|min:1|max:5',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'work_pressure_score.required' => 'Penilaian tekanan kerja harus diisi.',
            'work_pressure_score.integer' => 'Penilaian tekanan kerja harus berupa angka.',
            'work_pressure_score.min' => 'Penilaian tekanan kerja minimal 1.',
            'work_pressure_score.max' => 'Penilaian tekanan kerja maksimal 5.',
            'sleep_quality_score.required' => 'Penilaian kualitas tidur harus diisi.',
            'sleep_quality_score.integer' => 'Penilaian kualitas tidur harus berupa angka.',
            'sleep_quality_score.min' => 'Penilaian kualitas tidur minimal 1.',
            'sleep_quality_score.max' => 'Penilaian kualitas tidur maksimal 5.',
            'emotional_state_score.required' => 'Penilaian kondisi emosi harus diisi.',
            'emotional_state_score.integer' => 'Penilaian kondisi emosi harus berupa angka.',
            'emotional_state_score.min' => 'Penilaian kondisi emosi minimal 1.',
            'emotional_state_score.max' => 'Penilaian kondisi emosi maksimal 5.',
            'physical_symptoms_score.required' => 'Penilaian gejala fisik harus diisi.',
            'physical_symptoms_score.integer' => 'Penilaian gejala fisik harus berupa angka.',
            'physical_symptoms_score.min' => 'Penilaian gejala fisik minimal 1.',
            'physical_symptoms_score.max' => 'Penilaian gejala fisik maksimal 5.',
        ];
    }
}