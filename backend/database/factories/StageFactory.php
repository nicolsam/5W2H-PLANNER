<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Action;
use App\Models\Responsible;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stage>
 */
class StageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'action_id' => Action::all()->random()->id,
            'name' => $this->faker->unique()->sentence(),
            'area' => $this->faker->unique()->sentence(),
            'what' => $this->faker->text(),
            'how' => $this->faker->text(),
            'start_at' => $this->faker->date('Y-m-d H:i:s'),
            'end_at' => $this->faker->date('Y-m-d H:i:s'),
            'responsible_id' => Responsible::all()->random()->id,
            'value' => $this->faker->numberBetween(0, 1000),
            'value_status' => $this->faker->randomElement([
                'Solicitar Orçamento',
                'Aguardando Cotação' ,
                'Orçamento em Apreciação',
                'Aprovado',
                'Não Aprovado',
                'Sem ônus' ,
                'Não definido'
            ]),
            'status' => $this->faker->randomElement([
                'A Iniciar',
                'Em Andamento',
                'Finalizado'
            ]),
            'priority' => $this->faker->randomElement([
                'Alta',
                'Média',
                'Baixa'
            ]),
            'observation' => $this->faker->text()
        ];
    }
}
