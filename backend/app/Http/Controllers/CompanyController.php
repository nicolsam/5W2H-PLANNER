<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Http\Requests\CreateUpdateCompanyRequest;
use App\Http\Resources\CompanyResource;

use App\Models\Company;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;

class CompanyController extends Controller
{
    public function index() {

        $companies = Company::all();

        // $response = new Response(json_encode($companies, JSON_UNESCAPED_UNICODE));
        // $response->header('Content-Type', 'application/json; charset=utf-8');

        return CompanyResource::collection($companies);

    }

    public function store(CreateUpdateCompanyRequest $request) {

        $data = $request->validated();
        $data['password'] = bcrypt($request->password);

        $company = Company::create($data);

        return new CompanyResource($company);

    }

    public function show(string $id) {

        try {

            $company = Company::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta empresa não foi encontrada!';

            return response()->json(['message' => $message, 404]);

        }

        return new CompanyResource($company);

    }

    public function update(CreateUpdateCompanyRequest $request, string $id) {

        $data = $request->validated();

        if($request->password) {
            $data['password'] = bcrypt($request->password);
        }

        try {

            $company = Company::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta empresa não foi encontrada!';

            return response()->json(['message' => $message, 404]);

        }

        $company->update($data);

        return new CompanyResource($company);

    }

    public function destroy(string $id) {

        try {

            $company = Company::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta empresa não foi encontrada!';

            return response()->json(['message' => $message, 404]);

        }

        $company->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);

    }

}
