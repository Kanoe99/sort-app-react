<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UsersOnlySeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $userRole = Role::create(['name' => RolesEnum::User->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);

        $managePrintersPermission = Permission::create([
            'name' => PermissionsEnum::ManagePrinters->value,
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
        $adminRole->syncPermissions([
            $upvoteDownvotePermission,
            $manageUsersPermission,
            $manageCommentsPermission,
            $managePrintersPermission,
        ]);

        User::factory()->create([
            'name' => 'User User',
            'email' => 'user@example.com',
            'password' => '11111111a',
        ])->assignRole(RolesEnum::User);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => '11111111a',
        ])->assignRole(RolesEnum::Admin);
    }
}
