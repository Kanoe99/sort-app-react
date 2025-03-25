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
            $table->integer('start_month')->check('start_month >= 1 and start_month <= 12')->nullable();
            $table->integer('start_year')->check('start_year >= 1925')->nullable();
            $table->integer('end_month')->check('end_month >= 1 and end_month <= 12');
            $table->integer('end_year')->check('end_year >= 1925');
            $table->boolean('isSum')->default(false);
            $table->unsignedBigInteger('print_pages')->nullable();
            $table->unsignedBigInteger('scan_pages')->nullable();
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
