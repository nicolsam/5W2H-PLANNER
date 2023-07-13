<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResponsiblesResource extends JsonResource
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
                'description' => $this->description,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at
            ],
            'relationships' => [
                'company' => [
                    'id' => $this->company->id,
                    'name' => $this->company->name,
                    'cnpj' => $this->company->cnpj,
                    'created_at' => $this->company->created_at,
                    'updated_at' => $this->company->updated_at
                ]
            ]
        ];
    }
}
