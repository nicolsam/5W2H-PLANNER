<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyAuthRequest;
use App\Models\Company;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class CompanyAuthController extends Controller
{
    public function login(CompanyAuthRequest $request)
    {
        $data = $request->validated();

        try {

            $company = Company::where('cnpj', $data['cnpj'])->first();

            if(!$company || !Hash::check($data['password'], $company->password)) {
                Throw new ModelNotFoundException();
            }

        } catch(ModelNotFoundException $exception) {

            $message = 'Usuário ou senha não estão corretos! Tente novamente.';

            return response()->json(['message' => $message], 401);
        }

        $token = $company->createToken('API Token: company ', ['company'])->plainTextToken;

        $response =  [
            'company' => $company,
            'token' => $token
        ];

        return response($response, 201);

    }

    public function logout(Request $request)
    {

        $accessToken = $request->bearerToken();

        // Get access token from database
        $token = PersonalAccessToken::findToken($accessToken);

        try {

            // Revoke token
            $token->delete();

            return response()->json([
                'message' => 'Você foi deslogado com sucesso.'
            ], 200);

            throw new Exception();

        } catch(Exception $e) {

            return response()->json([
            'message' => 'Você não foi deslogado com sucesso.'
            ], 404);

        }

    }
}
