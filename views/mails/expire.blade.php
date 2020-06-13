<hr>
<div style="text-align: center; font-weight: bolder">{{ config('tinycom.name') }}</div>
<hr>
<div style="margin-left: 10px; font-family: monospace">
    <p style="font-weight: bold">Hi, {{ $subscription->Company->User->name }}</p>
    <p>Hope you are enjoying {{ config('tinycom.name') }} for your company <strong>{{ $subscription->Company->company }}</strong></p>
    <p>This is a reminder mail, to remind you about the expiry date of your {{ config('tinycom.name') }}<br>The expire date is <strong style="color: #761b18; text-decoration: underline">{{ date('D d/M/Y',strtotime($subscription->end)) }}</strong></p>
    <p>Please renew before the account get expired.</p>
    <p style="margin-top: 50px">
        Regards,<br><br>
        <strong>{{ config('tinycom.name') }}</strong><br>
        {!! implode("<br/>",array_filter([config('tinycom.contact_address_1'),config('tinycom.contact_address_2'),config('tinycom.contact_numbers'),config('tinycom.contact_email')])) !!}</strong><br>
    </p>
</div>
