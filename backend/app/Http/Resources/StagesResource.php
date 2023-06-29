<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StagesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'attributes' => [
                'name' => $this->name,
                'area' => $this->area,
                'what' => $this->what,
                'how' => $this->how,
                'start_at' => $this->start_at,
                'end_at' => $this->end_at,
                'responsible' => $this->responsible,
                'value' => $this->value,
                'value_status' => $this->value_status,
                'status' => $this->status,
                'priority' => $this->priority,
                'observation' => $this->observation,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at
            ],
            'relationships' => [
                'action' => [
                    'id' => $this->action->id,
                    'name' => $this->action->name,
                    'area' => $this->action->area,
                    'what' => $this->action->what,
                    'how' => $this->action->how,
                    'start_at' => $this->action->start_at,
                    'end_at' => $this->action->end_at,
                    'created_at' => $this->action->created_at,
                    'updated_at' => $this->action->updated_at
                ]
            ]
        ];
    }
}
