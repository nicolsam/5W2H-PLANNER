<?php

namespace App\Http\Controllers;

use App\Http\Resources\GoalsResource;
use App\Models\Company;
use App\Models\Goal;
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

            $goal = Goal::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta meta não existe.';

            return response()->json(['message' => $message, 404]);

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

            return response()->json(['message' => $message, 404]);

        }

        return GoalsResource::collection($goal);
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
