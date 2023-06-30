<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Responsible extends Model
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'company_id',
        'name',
        'description'
    ];

    public function company() {
        return $this->belongsTo(Company::class);
    }

    public function action() {
        return $this->hasMany(Action::class);
    }
}
