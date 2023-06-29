<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyAuthRequest extends FormRequest
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
        return [
            'cnpj' => 'required|min:18|max:18|string',
            'password' => 'required|string'
        ];
    }

    public function messages()
    {
        return [
            'cnpj.required' => 'O campo CNPJ é obrigatório.',
            'password.required' => 'O campo senha é obrigatório.',
        ];
    }
}
