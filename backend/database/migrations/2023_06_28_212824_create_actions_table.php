<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('actions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('goal_id');
            $table->string('name');
            $table->string('area');
            $table->string('what'); // WHAT
            $table->string('how'); // HOW
            $table->date('start_at'); // WHEN
            $table->date('end_at'); // WHEN
            $table->decimal('value');
            $table->enum('value_status', [
                'Solicitar Orçamento',
                'Aguardando Cotação' ,
                'Orçamento em Apreciação',
                'Aprovado',
                'Não Aprovado',
                'Sem ônus' ,
                'Não definido'
            ]);
            $table->enum('status', [
                'A Iniciar',
                'Em Andamento',
                'Finalizado'
            ]);
            $table->enum('priority', [
                'Alta',
                'Média',
                'Baixa'
            ]);
            $table->string('observation')->nullable();
            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->onDelete('cascade');
            $table->foreign('goal_id')
                ->references('id')
                ->on('goals')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actions');
    }
};
