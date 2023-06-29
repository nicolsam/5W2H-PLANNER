<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateGoalRequest;
use App\Http\Resources\GoalsResource;
use App\Models\Company;
use App\Models\Goal;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GoalsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $goals = Goal::all();

        return GoalsResource::collection($goals);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdateGoalRequest $request)
    {
        $data = $request->validated();

        try {

            Company::findOrFail($request->company_id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta empresa não existe.';

            return response()->json(['message' => $message, 404]);

        }


        $goal = Goal::create($data);

        return new GoalsResource($goal);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {

            $goal = Goal::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta meta não existe.';

            return response()->json(['message' => $message], 404);

        }

        return new GoalsResource($goal);
    }

    public function showCompanyGoals(string $company_id)
    {
        try {

            Company::findOrFail($company_id);

            $goal = Goal::where('company_id', $company_id)->get();


        } catch(ModelNotFoundException $exception) {

            $message = 'Esta empresa não existe.';

            return response()->json(['message' => $message], 404);

        }

        return GoalsResource::collection($goal);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateGoalRequest $request, string $id)
    {
        $data = $request->validated();

        try {

            $goal = Goal::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta meta não existe.';

            return response()->json(['message' => $message], 404);

        }

        try {

            Company::findOrFail($request->company_id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta empresa não existe.';

            return response()->json(['message' => $message], 404);

        }

        $goal->update($data);

        return new GoalsResource($goal);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $goal = Goal::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta meta não existe';

            return response()->json(['message' => $message], 404);

        }

        $goal->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
