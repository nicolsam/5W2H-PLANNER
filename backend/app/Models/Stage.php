<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stage extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'action_id',
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

    public function company() {
        return $this->belongsTo(Company::class);
    }

    public function action() {
        return $this->belongsTo(Action::class);
    }
}
