<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateStageRequest;
use App\Http\Resources\StagesResource;
use App\Models\Action;
use App\Models\Responsible;
use App\Models\Stage;
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdateStageRequest $request)
    {
        $data = $request->validated();

        try {

            action::findOrFail($request->action_id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta ação não existe.';

            return response()->json(['message' => $message], 404);

        }

        try {

            Responsible::findOrFail($request->responsible_id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Este responsável não existe.';

            return response()->json(['message' => $message], 404);

        }


        $stage = Stage::create($data);

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

            return response()->json(['message' => $message, 404]);

        }

        return StagesResource::collection($stage);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateStageRequest $request, string $id)
    {
        $data = $request->validated();

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

            Responsible::findOrFail($request->responsible_id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Este responsável não existe.';

            return response()->json(['message' => $message], 404);

        }

        $stage->update($data);

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
