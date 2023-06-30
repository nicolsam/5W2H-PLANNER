<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    use HasFactory;

    protected $fillable = [
        'goal_id',
        'name',
        'area',
        'what',
        'how',
        'start_at',
        'end_at',
        'value',
        'value_status',
        'status',
        'priority',
        'observation',
    ];

    public function goal() {
        return $this->belongsTo(Goal::class);
    }

    public function responsible() {
        return $this->belongsTo(Responsible::class);
    }



}
