<?php

namespace App\Http\Requests;

use Illuminate\Database\Query\Builder;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreUpdateGoalRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {

        $rules = [
            'company_id' => 'required',
            'name' => [
                'required',
                'min:5',
                'max:100',
                Rule::unique('goals')->where(fn (Builder $query) => $query->where('company_id', $this->company_id)),
            ],
            'area' => 'required'
        ];

        if($this->method() === 'PATCH') {

            $rules['name'] = [
                'required',
                'min:5',
                'max:100',
                Rule::unique('goals')->ignore($this->id)->where(fn (Builder $query) => $query->where('company_id', $this->company_id)),
            ];
        }
        return $rules;
    }

    public function messages()
    {
        return [
            'company_id.required' => 'O ID da empresa deve ser preenchido.',
            'name.required' => 'O campo nome é obrigatório.',
            'name.unique' => 'Este nome já existe.',
            'area.required' => 'O campo área é obrigatório.',
        ];
    }
}
