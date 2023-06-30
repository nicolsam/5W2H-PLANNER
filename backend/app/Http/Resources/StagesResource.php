<?php

namespace App\Http\Resources;

use App\Models\Responsible;
use App\Models\Stage;
use App\Models\StagesResponsibles;
use Carbon\Carbon;
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
        $end = Carbon::parse($this->end_at, 'America/Sao_Paulo');
        $now = Carbon::parse(now(), 'America/Sao_Paulo');

        return [
            'id' => $this->id,
            'attributes' => [
                'name' => $this->name,
                'area' => $this->area,
                'what' => $this->what,
                'how' => $this->how,
                'start_at' => $this->start_at,
                'end_at' => $this->end_at,
                'remaining_days' => $end->diffInDays($now, true) + 1,
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
                ],
                'responsibles' => $this->when(StagesResponsibles::where('stage_id', '=', $this->id)->count() > 0, function () {
                    $responsibles = StagesResponsibles::where('stage_id', '=', $this->id)->get('responsible_id');
                    return $this->customFormatResponsibles($responsibles);
                })
            ]
        ];
    }

    private function customFormatResponsibles($responsibles)
    {

        $responsiblesFormat = [];

        foreach($responsibles as $responsible) {

            $responsible = Responsible::where('id', '=', $responsible['responsible_id'])->get();

            array_push($responsiblesFormat, $responsible[0]);

        }

        return $responsiblesFormat;
    }
}
