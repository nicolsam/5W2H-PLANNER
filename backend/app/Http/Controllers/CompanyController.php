<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Http\Requests\CreateUpdateCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Action;
use App\Models\Company;
use App\Models\Goal;
use App\Models\Stage;
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

            $message = 'Esta empresa não existe.';

            return response()->json(['message' => $message], 404);

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

            $message = 'Esta empresa não existe.';

            return response()->json(['message' => $message], 404);

        }

        $company->update($data);

        return new CompanyResource($company);

    }

    public function destroy(string $id) {

        try {

            $company = Company::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta empresa não existe';

            return response()->json(['message' => $message], 404);

        }

        $company->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);

    }

    public function statusCount(string $company_id) {
        $goalTotalCount = Goal::where('company_id', '=', $company_id)->count();

        $actionTotalCount = Action::where('company_id', '=', $company_id)->count();
        $actionCompletedCount = Action::where('status', 'Finalizado')->count();
        $actionToStartCount = Action::where('status', 'A Iniciar')->count();
        $actionInProgressCount = Action::where('status', 'Em Andamento')->count();

        $stageTotalCount = Stage::where('company_id', '=', $company_id)->count();
        $stageCompletedCount = Stage::where('status', 'Finalizado')->count();
        $stageToStartCount = Stage::where('status', 'A Iniciar')->count();
        $stageInProgressCount = Stage::where('status', 'Em Andamento')->count();

        return [
            'goal' => [
                'total' => $goalTotalCount,
            ],
            'action' => [
                'total' => $actionTotalCount,
                'completed' => $actionCompletedCount,
                'toStart' => $actionToStartCount,
                'inProgress' => $actionInProgressCount,
            ],
            'stage' => [
                'total' => $stageTotalCount,
                'completed' => $stageCompletedCount,
                'toStart' => $stageToStartCount,
                'inProgress' => $stageInProgressCount,
            ]
        ];

    }
}
