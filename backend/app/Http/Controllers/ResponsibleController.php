<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateResponsibleRequest;
use App\Http\Resources\ResponsiblesResource;
use App\Models\Responsible;
use App\Traits\HttpResponses;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;



class ResponsibleController extends Controller
{

    use HttpResponses;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $responsibles = Responsible::all();
        return ResponsiblesResource::collection($responsibles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdateResponsibleRequest $request)
    {
        $data = $request->validated();

        $responsible = Responsible::create($data);

        return new ResponsiblesResource($responsible);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {

            $responsible = Responsible::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Este responsável não existe.';

            return response()->json(['message' => $message], 404);

        }

        return new ResponsiblesResource($responsible);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateResponsibleRequest $request, string $id)
    {

        $data = $request->validated();

        try {

            $responsible = Responsible::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Este responsável não existe.';

            return response()->json(['message' => $message], 404);

        }

        $responsible->update($data);

        return new ResponsiblesResource($responsible);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $responsible = Responsible::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Este responsável não existe';

            return response()->json(['message' => $message], 404);

        }

        $responsible->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
