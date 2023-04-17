<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page;

class ResumePage extends Page
{
    public function url()
    {
        return "/resumes";
    }

    public function assert(Browser $browser): void
    {
        $browser->assertPathIs($this->url());
    }
}
