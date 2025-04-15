<?php

namespace App\Services;

use App\Models\Printer;

class DataRefreshService{
    public function refreshed($request, $id){
        $fields = array_keys($request->all());
    
        $oldData = Printer::select($fields)->findOrFail($id)->toArray();
        $newData = $request->only($fields);

        return $newData != $oldData;
    }
}