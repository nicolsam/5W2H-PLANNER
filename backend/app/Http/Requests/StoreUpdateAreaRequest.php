<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Database\Query\Builder;

class StoreUpdateAreaRequest extends FormRequest
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
                'min:3',
                'max:100',
                'string',
                Rule::unique('areas')->where(fn (Builder $query) => $query->where('company_id', $this->company_id)),
            ],
        ];

        if($this->method() === 'PATCH') {

            $rules['name'] = [
                'required',
                'min:3',
                'max:100',
                Rule::unique('areas')->ignore($this->id)->where(fn (Builder $query) => $query->where('company_id', $this->company_id)),
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
        ];
    }
}
