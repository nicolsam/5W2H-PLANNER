<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stage extends Model
{
    use HasFactory;

    protected $fillable = [
        'action_id',
        'name',
        'area',
        'what',
        'how',
        'start_at',
        'end_at',
        'responsible',
        'value',
        'value_status',
        'status',
        'priority',
        'observation',
    ];

    public function action() {
        return $this->belongsTo(Action::class);
    }
}
