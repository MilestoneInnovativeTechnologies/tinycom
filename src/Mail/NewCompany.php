<?php

namespace Milestone\Tinycom\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Milestone\Tinycom\Model\Company;

class NewCompany extends Mailable //implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $company;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($id)
    {
        $this->company = Company::with(['User','Referrer'])->find($id);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->from(config('tinycom.mail_from_address'))
            ->subject('[' .config('tinycom.name'). '] NEW COMPANY CREATED')
            ->view('TinyCOM::mails.new_company');
    }
}
