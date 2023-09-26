<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminAuthRequest;
use App\Models\Admin;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class AdminAuthController extends Controller
{

    public function register(AdminAuthRequest $request) {

        $data = $request->validated();

        $data['password'] = bcrypt($request->password);

        $admin = Admin::create($data);

        $token = $admin->createToken('adminToken')->plainTextToken;

        $response =  [
            'admin' => $admin,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function login(AdminAuthRequest $request) {

        $data = $request->validated();

        try {

            $admin = Admin::where('name', $data['name'])->first();

            if(!$admin || !Hash::check($data['password'], $admin->password)) {
                Throw new ModelNotFoundException();
            }


        } catch(ModelNotFoundException $exception) {

            $message = 'Usuário ou senha não estão corretos! Tente novamente.';

            return response()->json(['message' => $message], 401);

        }

        $token = $admin->createToken('API Token: admin', ['admin'])->plainTextToken;

        $response =  [
            'admin' => $admin,
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
