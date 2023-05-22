<?php

declare(strict_types=1);

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;

class UsersPage extends Page
{
    public function url()
    {
        return "/users";
    }

    public function assert(Browser $browser): void
    {
        $browser->assertPathIs($this->url());
    }
}
