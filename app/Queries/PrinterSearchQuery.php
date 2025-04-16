<?php

namespace App\Queries;

use Illuminate\Http\Request;

#################################

use App\Models\Printer;

class PrinterSearchQuery{
    public function searchPrinters(Request $request)
    {
     
          $perPage = $request->input('perPage', 10);
          $page = $request->input('page', 1);
          $search = $request->input('search');
      
          $query = Printer::with(['tags', 'sumPages', 'threeLastPages'])->latest();
  
          function qwertyToRussian($input) {
              $map = [
                  'q' => 'й', 'w' => 'ц', 'e' => 'у', 'r' => 'к', 't' => 'е', 'y' => 'н', 'u' => 'г', 'i' => 'ш', 'o' => 'щ', 'p' => 'з', '[' => 'х', ']' => 'ъ',
                  'a' => 'ф', 's' => 'ы', 'd' => 'в', 'f' => 'а', 'g' => 'п', 'h' => 'р', 'j' => 'о', 'k' => 'л', 'l' => 'д', ';' => 'ж', "'" => 'э',
                  'z' => 'я', 'x' => 'ч', 'c' => 'с', 'v' => 'м', 'b' => 'и', 'n' => 'т', 'm' => 'ь', ',' => 'б', '.' => 'ю'
              ];
          
              return strtr($input, $map);
          }
  
          function russianToQwerty($input) {
              $map = [
                  'й' => 'q', 'ц' => 'w', 'у' => 'e', 'к' => 'r', 'е' => 't', 'н' => 'y', 'г' => 'u', 'ш' => 'i', 'щ' => 'o', 'з' => 'p', 'х' => '[', 'ъ' => ']',
                  'ф' => 'a', 'ы' => 's', 'в' => 'd', 'а' => 'f', 'п' => 'g', 'р' => 'h', 'о' => 'j', 'л' => 'k', 'д' => 'l', 'ж' => ';', 'э' => "'",
                  'я' => 'z', 'ч' => 'x', 'с' => 'c', 'м' => 'v', 'и' => 'b', 'т' => 'n', 'ь' => 'm', 'б' => ',', 'ю' => '.'
              ];
          
              return strtr($input, $map);
          }
          
      
          if ($search) {
              $search = strtolower($search);
              
              $result = $query->whereRaw('LOWER(model) LIKE ?', ["%".$search."%"])
              ->orWhereRaw('LOWER(location) LIKE ?', ["%".$search."%"])
              ->orWhereRaw('LOWER(number) LIKE ?', ["%".$search."%"])
              ->orWhereRaw('LOWER(type) LIKE ?', ["%".$search."%"])
              ->orWhereRaw('LOWER(status) LIKE ?', ["%".$search."%"])
              ->orWhereHas('tags', function ($query) use ($search){
                  $query->whereRaw('LOWER(name) LIKE ?', ["%".$search."%"]);
              });
              
               $printers = $result->paginate($perPage, ['*'], 'page', $page);
  
  
              if($printers->isEmpty()){
  
                  $queryQTS = Printer::with(['tags'])->latest();
  
                  if(preg_match('/^[A-Za-z\[\];\',\.]/', $search)){
                      $search = qwertyToRussian($search);
                  }
                  else if(preg_match('/[А-Яа-я]/', $search)){
                      $search = russianToQwerty($search);
                  }
  
                  $result =  $queryQTS->whereRaw('LOWER(model) LIKE ?', ["%".$search."%"])
                  ->orWhereRaw('LOWER(location) LIKE ?', ["%".$search."%"])
                  ->orWhereRaw('LOWER(number) LIKE ?', ["%".$search."%"])
                  ->orWhereRaw('LOWER(type) LIKE ?', ["%".$search."%"]);
  
                $printers = $result->paginate($perPage, ['*'], 'page', $page);
              }
        
          }    
          
          return response()->json([
              'searchTransliterated' => $search,
              'printers' => $printers->items(),
              'current_page' => $printers->currentPage(),
              'last_page' => $printers->lastPage(),
          ]);
    }
}