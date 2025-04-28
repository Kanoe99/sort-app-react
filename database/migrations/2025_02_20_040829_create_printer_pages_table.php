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
        Schema::create('printer_pages', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('printer_id')->constrained()->onDelete('cascade');
            $table->integer('start_month')->check('start_month >= 0 and start_month <= 11');
            $table->integer('start_year')->check('start_year >= 1925');
            $table->integer('end_month')->check('end_month >= 0 and end_month <= 11');
            $table->integer('end_year')->check('end_year >= 1925');
            $table->boolean('isSum')->default(false);
            $table->string('print_pages');
            $table->string('scan_pages');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('printer_pages');
    }
};
