<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateActionRequest;
use App\Http\Resources\ActionsResource;
use App\Models\Action;
use App\Models\ActionsResponsibles;
use App\Models\Company;
use App\Models\Goal;
use App\Models\Responsible;
use App\Traits\HttpResponses;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ActionController extends Controller
{
    use HttpResponses;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $actions = Action::all();
        return ActionsResource::collection($actions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdateActionRequest $request)
    {
        $data = $request->validated();
        
        try {

            Company::findOrFail($request->company_id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta empresa não existe.';

            return response()->json(['message' => $message], 404);

        }
        try {

            Goal::findOrFail($request->goal_id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta meta não existe.';

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

        $action = Action::create($data);

        foreach($request->responsible_id as $responsible_id) {

            ActionsResponsibles::create([
                'action_id' => $action->id,
                'responsible_id' => $responsible_id
            ]);

        }

        return new ActionsResource($action);
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

            return response()->json(['message' => $message], 404);

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

            return response()->json(['message' => $message], 404);

        }

        return ActionsResource::collection($actions);
    }
    
    public function showCompanyActions(string $company_id)
    {
        try {

            Company::findOrFail($company_id);

            $actions = Action::where('company_id', $company_id)->get();

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta empresa não existe.';

            return response()->json(['message' => $message], 404);

        }

        return ActionsResource::collection($actions);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateActionRequest $request, string $id)
    {
        $data = $request->validated();
        
        try {

            $company = Company::findOrFail($request->company_id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta ação não existe.';

            return response()->json(['message' => $message], 404);

        }
        try {

            $action = Action::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta ação não existe.';

            return response()->json(['message' => $message], 404);

        }

        try {

            Goal::findOrFail($request->goal_id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta meta não existe.';

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

        $action->update($data);

        ActionsResponsibles::where('action_id', '=', $id)->delete();

        foreach($request->responsible_id as $responsible_id) {


            ActionsResponsibles::create([
                'action_id' => $action->id,
                'responsible_id' => $responsible_id
            ]);

        }

        return new ActionsResource($action);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {

            $action = Action::findOrFail($id);

        } catch(ModelNotFoundException $exception) {

            $message = 'Esta ação não existe';

            return response()->json(['message' => $message], 404);

        }

        $action->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

}
