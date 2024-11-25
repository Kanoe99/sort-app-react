<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feature;
use App\Models\Comment;

class CommentController extends Controller
{
    public function store(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'comment' => ['required']
        ]);

        $data['feature_id'] = $feature->id;
        $data['user_id'] = auth()->id();

        Comment::create($data);

        return to_route('feature.show', $feature);
    }
    public function destroy(Comment $comment)
    {
        $featureId = $comment->feature->id;
        $comment->delete();

        return to_route('feature.show', $featureId);
    }
}
