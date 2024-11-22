<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Models\User;
use App\Models\Feature;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Enum\RolesEnum;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $userRole = Role::create(['name' => RolesEnum::User->value]);
        $commenterRole = Role::create(['name' => RolesEnum::Commenter->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);

        $manageFeaturesPermission = Permission::create([
            'name' => PermissionsEnum::ManageFeatures->value,
        ]);
        $manageCommentsPermission = Permission::create([
            'name' => PermissionsEnum::ManageComments->value,
        ]);
        $manageUsersPermission = Permission::create([
            'name' => PermissionsEnum::ManageUsers->value,
        ]);
        $upvoteDownvotePermission = Permission::create([
            'name' => PermissionsEnum::UpvoteDownvote->value,
        ]);


        $userRole->syncPermissions([$upvoteDownvotePermission]);
        $commenterRole->syncPermissions([$upvoteDownvotePermission, $manageCommentsPermission]);
        $adminRole->syncPermissions([$upvoteDownvotePermission, $manageCommentsPermission, $manageUsersPermission, $manageFeaturesPermission]);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => '11111111a',
        ])->assignRole((RolesEnum::Admin));


        User::factory()->create([
            'name' => 'Commenter User',
            'email' => 'commenter@example.com',
            'password' => '11111111a',
        ])->assignRole((RolesEnum::Commenter));


        User::factory()->create([
            'name' => 'A User',
            'email' => 'user@example.com',
            'password' => '11111111a',
        ])->assignRole((RolesEnum::User));

        Feature::factory(100)->create();
    }
}
