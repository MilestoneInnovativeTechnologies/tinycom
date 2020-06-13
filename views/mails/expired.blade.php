<hr>
<div style="text-align: center; font-weight: bolder">{{ config('tinycom.name') }}</div>
<hr>
<div style="margin-left: 10px; font-family: monospace">
    <p style="font-weight: bold">Hi, {{ $subscription->Company->User->name }}</p>
    <p>Hope you have enjoyed {{ config('tinycom.name') }} for your company <strong>{{ $subscription->Company->company }}</strong></p>
    <p>
        This mail is to inform you that your subscription have expired on <strong style="color: #761b18; text-decoration: underline">{{ date('D d/M/Y',strtotime($subscription->end)) }}</strong><br>
        Services will be automatically stopped soon <br>
        Kindly renew to enjoy our unique invention in eCommerce.
    </p>
    <p style="margin-top: 50px">
        Regards,<br><br>
        <strong>{{ config('tinycom.name') }}</strong><br>
        {!! implode("<br/>",array_filter([config('tinycom.contact_address_1'),config('tinycom.contact_address_2'),config('tinycom.contact_numbers'),config('tinycom.contact_email')])) !!}</strong><br>
    </p>
</div>
