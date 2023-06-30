<?php

namespace App\Http\Resources;

use App\Models\Action;
use App\Models\ActionsResponsibles;
use App\Models\Responsible;
use Carbon\Carbon;
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
                ],
                'responsibles' => $this->when(ActionsResponsibles::where('action_id', '=', $this->id)->count() > 0, function () {
                    $responsibles = ActionsResponsibles::where('action_id', '=', $this->id)->get('responsible_id');
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
