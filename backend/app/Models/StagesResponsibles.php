<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class StagesResponsibles extends Model
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'stage_id',
        'responsible_id'
    ];
}
