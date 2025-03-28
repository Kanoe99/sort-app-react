<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('printers', function (Blueprint $table) {
            $table->id();

            // New
            $table->string('type');

            $table->string('department');
            $table->string('department_head');

            $table->string('PC_name')->nullable();

            $table->string('network_capable');

            $table->string('model');

            // Number became unique
            $table->unsignedMediumInteger('number')->nullable();
            $table->unique('number')->whereNotNull('number');


            $table->string('location');

            // Update
            // Should have a checkbox
            $table->string('IP')->unique()->nullable();
            $table->boolean('isIPv4');

            $table->string('status');
            $table->string('comment')->nullable();
            $table->string('logo')->nullable();

            $table->dateTime('fixDate')->nullable();

            $table->timestamps();
            $table->index('location');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('printers');
    }
};


