<?php

namespace App\Enum;

enum PermissionsEnum: string
{
    case ManagePrinters = 'manage_printers';
    case ManageUsers = 'manage_users';
    case ManageComments = 'manage_comments';
    case UpvoteDownvote = 'upvote_downvote';
}
