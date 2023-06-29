<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActionsResource extends JsonResource
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
                'goal' => [
                    'id' => $this->goal->id,
                    'name' => $this->goal->name,
                    'area' => $this->goal->area,
                    'created_at' => $this->goal->created_at,
                    'updated_at' => $this->goal->updated_at
                ]
            ]
        ];
    }
}
