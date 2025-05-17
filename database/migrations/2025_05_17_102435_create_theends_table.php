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
        Schema::create('theends', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('type_id')->constrained('types');
            $table->string('slug')->unique();
            $table->string('title')->required();
            $table->text('content');
            $table->boolean('is_public')->default(true);
            $table->enum('tone', ['dramatique', 'ironique', 'cringe', 'classe', 'touchant', 'absurde', 'passif_agressif', 'honnête']);
            $table->string('image_url')->nullable();
            $table->string('gif_url')->nullable();
            $table->string('sound_url')->nullable();
            $table->boolean('is_draft')->default(true);
            $table->unsignedBigInteger('views')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('theends');
    }
};