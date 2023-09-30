<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateAreaRequest;
use App\Http\Resources\AreaResource;
use App\Models\Company;
use App\Models\Area;
use App\Traits\HttpResponses;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $area = Area::all();
        return AreaResource::collection($area);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdateAreaRequest $request)
    {
        $data = $request->validated();

        $area = Area::create($data);

        return new AreaResource($area);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {

            $area = Area::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta área não existe.';

            return response()->json(['message' => $message], 404);

        }

        return new AreaResource($area);
    }
    
    public function showCompanyAreas(string $company_id)
    {
        try {

            Company::findOrFail($company_id);

            $area = Area::where('company_id', $company_id)->get();


        } catch(ModelNotFoundException $exception) {

            $message = 'Esta empresa não existe.';

            return response()->json(['message' => $message], 404);

        }

        return AreaResource::collection($area);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateAreaRequest $request, string $id)
    {

        $data = $request->validated();

        try {

            $area = Area::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta área não existe.';

            return response()->json(['message' => $message], 404);

        }

        $area->update($data);

        return new AreaResource($area);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $area = Area::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta área não existe';

            return response()->json(['message' => $message], 404);

        }

        $area->delete();

        return response()->json([], Response::HTTP_NO_CONTENT); 
    }
}
