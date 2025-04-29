<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class StartBeforeEnd implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (
            !isset($value['start_year'], $value['start_month'], $value['end_year'], $value['end_month']) ||
            !is_numeric($value['start_year']) || !is_numeric($value['start_month']) ||
            !is_numeric($value['end_year']) || !is_numeric($value['end_month'])
        ) {
            return; // skip validation, because other rules (required, numeric) will handle this
        }

        $start = $value['start_year'] * 12 + ($value['start_month'] + 1);
        $end = $value['end_year'] * 12 + ($value['end_month'] + 1);

        if ($start > $end) {
            $fail('Дата начала не может быть позже даты окончания.');
        }
    }
}
