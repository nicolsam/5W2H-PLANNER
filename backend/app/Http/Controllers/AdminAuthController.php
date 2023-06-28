<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminAuthRequest;
use App\Models\Admin;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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

            return response()->json(['message' => $message, 401]);

        }

        $token = $admin->createToken('adminToken')->plainTextToken;

        $response =  [
            'admin' => $admin,
            'token' => $token
        ];

        return response($response, 201);

    }

    public function logout() {

    }
}
