<?php

namespace App\Http\Controllers;

use App\Http\Resources\StagesResource;
use App\Models\Stage;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
