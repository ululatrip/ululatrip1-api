/* Replace with your SQL commands */

/* Replace with your SQL commands */
create table trip_host (
    id bigserial not null,
    account_id bigserial not null,
    trip_id bigserial not null,
    trip_host_rank int not null,
    profile_picture_url text not null,
    location text not null,
    occupation text not null,
    bank_option text not null,
    bank_account_name text not null,
    bank_account_number int not null,
    quotes text not null,
    ktp_photo_url text not null,
    ktp_selfie_photo_url text not null,
    
    
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    constraint trip_host_pkey primary key (id)
) with (OIDS = FALSE);

insert into
    trip_host (
    
    account_id,
    trip_id,
    trip_host_rank,
    profile_picture_url,
    location,
    occupation,
    bank_option,
    bank_account_name,
    bank_account_number,
    quotes,
    ktp_photo_url,
    ktp_selfie_photo_url
    )
values
    (
    /*account_id*/1,
    /*trip_id,*/1,
    /*trip_host_rank,*/'1',
    /*profile_picture,*/'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiGkIv-sJfeAhUGeysKHYp-A1oQjRx6BAgBEAU&url=https%3A%2F%2Featsiptrip.10best.com%2F2018%2F03%2F12%2Fhow-cooking-helped-me-beat-depression%2F&psig=AOvVaw2WDsb6zLcVhWUF_s8jL5ca&ust=1540206100524565',
    /*location,*/'cthlocation1',
    /*occupation,*/'cthoccupation1',
    /*bank_option,*/'bca',
    /*bank_account_name,*/'baccname1',
    /*bank_account_number,*/'1',
    /*quotes,*/'cthquotes1',
    /*ktp_photo_url,*/'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiGkIv-sJfeAhUGeysKHYp-A1oQjRx6BAgBEAU&url=https%3A%2F%2Featsiptrip.10best.com%2F2018%2F03%2F12%2Fhow-cooking-helped-me-beat-depression%2F&psig=AOvVaw2WDsb6zLcVhWUF_s8jL5ca&ust=1540206100524565',
    /*ktp_selfie_photo_url*/'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiGkIv-sJfeAhUGeysKHYp-A1oQjRx6BAgBEAU&url=https%3A%2F%2Featsiptrip.10best.com%2F2018%2F03%2F12%2Fhow-cooking-helped-me-beat-depression%2F&psig=AOvVaw2WDsb6zLcVhWUF_s8jL5ca&ust=1540206100524565'
    ),
    (
    /*account_id*/2,
    /*trip_id,*/2,
    /*trip_host_rank,*/'2',
    /*profile_picture,*/'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiGkIv-sJfeAhUGeysKHYp-A1oQjRx6BAgBEAU&url=https%3A%2F%2Featsiptrip.10best.com%2F2018%2F03%2F12%2Fhow-cooking-helped-me-beat-depression%2F&psig=AOvVaw2WDsb6zLcVhWUF_s8jL5ca&ust=1540206100524565',
    /*location,*/'cthlocation2',
    /*occupation,*/'cthoccupation2',
    /*bank_option,*/'bca',
    /*bank_account_name,*/'baccname2',
    /*bank_account_number,*/'2',
    /*quotes,*/'cthquotes2',
    /*ktp_photo_url,*/'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiGkIv-sJfeAhUGeysKHYp-A1oQjRx6BAgBEAU&url=https%3A%2F%2Featsiptrip.10best.com%2F2018%2F03%2F12%2Fhow-cooking-helped-me-beat-depression%2F&psig=AOvVaw2WDsb6zLcVhWUF_s8jL5ca&ust=1540206100524565',
    /*ktp_selfie_photo_url*/'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiGkIv-sJfeAhUGeysKHYp-A1oQjRx6BAgBEAU&url=https%3A%2F%2Featsiptrip.10best.com%2F2018%2F03%2F12%2Fhow-cooking-helped-me-beat-depression%2F&psig=AOvVaw2WDsb6zLcVhWUF_s8jL5ca&ust=1540206100524565'
    );