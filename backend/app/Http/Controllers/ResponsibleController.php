<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateResponsibleRequest;
use App\Http\Resources\ResponsiblesResource;
use App\Models\Responsible;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;



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
        //
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
