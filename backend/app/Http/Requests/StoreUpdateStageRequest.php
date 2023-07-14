<?php

namespace App\Http\Requests;

use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateStageRequest extends FormRequest
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
            'action_id' => 'required',
            'responsible_id' => 'required',
            'name' => [
                'required',
                'min:5',
                'max:300',
                Rule::unique('stages')->where(fn (Builder $query) => $query->where('company_id', $this->company_id)),
            ],
            'area' => 'required',
            'what' => 'required',
            'how' => 'required',
            'start_at' => 'required',
            'end_at' => 'required',
            'value' => 'required',
            'value_status' => 'required',
            'status' => 'required',
            'priority' => 'required',
            'observation' => 'nullable|max:300',
        ];

        if($this->method() === 'PATCH') {

            $rules['name'] = [
                'required',
                'min:5',
                'max:300',
                Rule::unique('stages')->ignore($this->id)->where(fn (Builder $query) => $query->where('company_id', $this->company_id)),
            ];

        }

        return $rules;
    }
    public function messages()
    {
        return [
            'company_id.required' => 'O ID da empresa deve ser preenchido.',
            'action_id.required' => 'O ID da ação deve ser preenchido.',
            'responsible_id.required' => 'O campo nome é obrigatório.',
            'name.unique' => 'Este nome já existe.',
            'name.min' => 'O campo nome deve possuir pelo 5 caracteres.',
            'area.required' => 'O campo área é obrigatório.',
            'what.required' => 'O campo "O que fazer" é obrigatório.',
            'how' => 'O campo "Como fazer" é obrigatório.',
            'start_at' => 'O campo Previsão de início é obrigatório.',
            'end_at' => 'O campo Previsão de término é obrigatório.',
            'value' => 'O campo Preço é obrigatório.',
            'value_status' => 'O campo Situação do Preço é obrigatório.',
            'status' => 'O campo status é obrigatório.',
            'priority' => 'O campo prioridade é obrigatório.',
        ];
    }
}
