<?php

namespace Milestone\Tinycom\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Milestone\Tinycom\Model\Subscription;

class ExpireInfo extends Mailable //implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $subscription;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($id)
    {
        $this->subscription = Subscription::with(['Company.User'])->find($id);
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
            ->subject('[Reminder] ' . config('tinycom.name') . ' for ' . $this->subscription->Company->name . ' is getting expired!!')
            ->view('TinyCOM::mails.expire');
    }
}
