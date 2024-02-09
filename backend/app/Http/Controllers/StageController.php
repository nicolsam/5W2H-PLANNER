<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateStageRequest;
use App\Http\Resources\StagesResource;
use App\Models\Action;
use App\Models\Company;
use App\Models\Responsible;
use App\Models\Stage;
use App\Models\StagesResponsibles;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stages = Stage::all();
        return StagesResource::collection($stages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdateStageRequest $request)
    {
        $data = $request->validated();
        
        try {

            Company::findOrFail($request->company_id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta empresa não existe.';

            return response()->json(['message' => $message], 404);

        }

        try {

            Action::findOrFail($request->action_id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta ação não existe.';

            return response()->json(['message' => $message], 404);

        }

        try {

            foreach($request->responsible_id as $responsible_id) {
                Responsible::findOrFail($responsible_id);
            }

        } catch(ModelNotFoundException $exception) {

            $message = 'Este responsável não existe.';

            return response()->json(['message' => $message], 404);

        }

        $stage = Stage::create($data);

        foreach($request->responsible_id as $responsible_id) {

            StagesResponsibles::create([
                'stage_id' => $stage->id,
                'responsible_id' => $responsible_id
            ]);

        }

        return new StagesResource($stage);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {

            $stage = Stage::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta etapa não existe.';

            return response()->json(['message' => $message, 404]);

        }

        return new StagesResource($stage);
    }

    public function showActionStages(string $action_id)
    {
        try {

            Stage::findOrFail($action_id);

            $stage = Stage::where('action_id', $action_id)->get();


        } catch(ModelNotFoundException $exception) {

            $message = 'Esta meta não existe.';

            return response()->json(['message' => $message], 404);

        }

        return StagesResource::collection($stage);
    }
    
    public function showCompanyStages(string $company_id)
    {
        try {

            Company::findOrFail($company_id);

            $stages = Stage::where('company_id', $company_id)->get();

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta empresa não existe.';

            return response()->json(['message' => $message], 404);

        }

        return StagesResource::collection($stages);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateStageRequest $request, string $id)
    {
        $data = $request->validated();
        
        try {

            Company::findOrFail($request->company_id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta empresa não existe.';

            return response()->json(['message' => $message], 404);


        }
        try {

            $stage = Stage::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta etapa não existe.';

            return response()->json(['message' => $message], 404);

        }

        try {

            Action::findOrFail($request->action_id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta ação não existe.';

            return response()->json(['message' => $message], 404);

        }

        try {

            foreach($request->responsible_id as $responsible_id) {
                Responsible::findOrFail($responsible_id);
            }

            unset($data['responsible_id']);

        } catch(ModelNotFoundException $exception) {

            $message = 'Este responsável não existe.';

            return response()->json(['message' => $message], 404);

        }

        $stage->update($data);

        StagesResponsibles::where('stage_id', '=', $id)->delete();

        foreach($request->responsible_id as $responsible_id) {


            StagesResponsibles::create([
                'stage_id' => $stage->id,
                'responsible_id' => $responsible_id
            ]);

        }

        return new StagesResource($stage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $stage = Stage::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta etapa não existe';

            return response()->json(['message' => $message], 404);

        }

        $stage->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
