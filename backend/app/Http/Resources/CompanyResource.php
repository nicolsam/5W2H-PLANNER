<?php

namespace App\Http\Resources;

use App\Models\Action;
use App\Models\Goal;
use App\Models\Stage;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
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
                'cnpj' => $this->cnpj,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at
            ],
            'count' => [
                'goals' => Goal::where('company_id', '=', $this->id)->get()->count(),
            ],
        ];
    }
}
