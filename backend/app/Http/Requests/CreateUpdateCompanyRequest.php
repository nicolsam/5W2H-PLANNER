<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class CreateUpdateCompanyRequest extends FormRequest
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
            'name' => 'required|min:3|max:255',
            'cnpj' => [
                'required',
                'min:18',
                'max:18',
                'unique:companies'
            ],
            'password' => 'required|min:8|max:100'
        ];

        if($this->method() === 'PATCH') {

            $rules = [
                'name' => 'required|min:3|max:255',
                'cnpj' => [
                    'required',
                    'min:18',
                    'max:18',
                    Rule::unique('companies')->ignore($this->id),
                ],
                'password' => 'nullable|min:8|max:100',
            ];
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'name.required' => 'Preencha o campo de nome corretamente!',
            'name.min' => 'O nome da empresa deve possuir pelo menos 3 caracteres',
            'cnpj.unique' => 'Este CNPJ já está cadastrado!',
            'cnpj.required' => 'Preencha o campo de CNPJ corretamente!',
            'password.required' => 'Preencha o campo de senha corretamente!',
            'password.min' => 'A senha deve possuir pelo menos 8 caracteres!'
        ];
    }
}
