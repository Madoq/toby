<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Toby\Helpers\UserAvatarGenerator;
use Toby\Models\User;
use Toby\Models\VacationLimit;
use Toby\Models\YearPeriod;

class DatabaseSeeder extends Seeder
{
    public function __construct(
        protected UserAvatarGenerator $avatarGenerator,
    ) {
    }

    public function run(): void
    {
        User::unsetEventDispatcher();
        YearPeriod::unsetEventDispatcher();

        User::factory(9)->create();
        User::factory([
            "email" => env("LOCAL_EMAIL_FOR_LOGIN_VIA_GOOGLE"),
        ])->create();

        $users = User::all();

        $this->generateAvatarsForUsers($users);

        YearPeriod::factory()
            ->count(3)
            ->sequence(
                [
                    "year" => Carbon::now()->year - 1,
                ],
                [
                    "year" => Carbon::now()->year,
                ],
                [
                    "year" => Carbon::now()->year + 1,
                ],
            )
            ->afterCreating(function (YearPeriod $yearPeriod) use ($users): void {
                foreach ($users as $user) {
                    VacationLimit::factory()
                        ->for($yearPeriod)
                        ->for($user)
                        ->create();
                }
            })
            ->create();
    }

    protected function generateAvatarsForUsers(Collection $users): void
    {
        foreach ($users as $user) {
            $user->saveAvatar($this->avatarGenerator->generateFor($user));
        }
    }
}
