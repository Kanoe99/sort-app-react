<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\Feature;
use App\Models\User;
use App\Models\Printer;
use App\Models\Tag;

use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
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

        Feature::factory(100)->create();

        Printer::factory(1000)->withTags()->create(new Sequence([
            'attention' => false,
        ], [
            'attention' => true,
        ]));
    }
}
