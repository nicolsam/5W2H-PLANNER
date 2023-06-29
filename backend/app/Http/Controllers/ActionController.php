<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActionsResource;
use App\Models\Action;
use App\Models\Company;
use App\Models\Goal;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ActionController extends Controller
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

            $action = Action::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta ação não existe.';

            return response()->json(['message' => $message, 404]);

        }

        return new ActionsResource($action);
    }

    public function showGoalActions(string $goal_id)
    {
        try {

            Goal::findOrFail($goal_id);

            $actions = Action::where('goal_id', $goal_id)->get();

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta meta não existe.';

            return response()->json(['message' => $message, 404]);

        }

        return ActionsResource::collection($actions);
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
