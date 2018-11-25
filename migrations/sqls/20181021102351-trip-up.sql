/* Replace with your SQL commands */
create table trip(
    id bigserial not null,
    triphost_id bigserial not null,
    activity_id bigserial not null,
    title text not null,
    destination text not null,
    location text not null,
    duration_hour int not null,
    quota int not null,
    dates text not null,
    price int not null,
    cover_photo_url text not null,
    gallery_photo_url text not null,

    
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    constraint trip_pkey primary key (id)
    
) with (OIDS = FALSE);
insert into 
    trip
values
(
    /*id*/ 1,
    /*triphost_id*/ 1,
    /*activity_id*/ 1,
    /*title*/ 'TITLE cth',
    /*destination*/ 'DESTINATION cth',
    /*location*/ 'LOCATION cth',
    /*duration_hour*/ 1,
    /*quota*/ 1,
    /*dates*/ 'DATES cth',
    /*price*/ 111,
    /*cover_photo_url*/ 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiGkIv-sJfeAhUGeysKHYp-A1oQjRx6BAgBEAU&url=https%3A%2F%2Featsiptrip.10best.com%2F2018%2F03%2F12%2Fhow-cooking-helped-me-beat-depression%2F&psig=AOvVaw2WDsb6zLcVhWUF_s8jL5ca&ust=1540206100524565',
    /*gallery_photo_url*/ 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiQ96uLsZfeAhUDU30KHZnXAz8QjRx6BAgBEAU&url=https%3A%2F%2Fwww.yourtango.com%2F2018310196%2Fbest-female-tattoo-ideas-women&psig=AOvVaw3FfBKeMKF5AjcOfgpcP1ID&ust=1540206127866317'
);

insert into 
    trip
values
(
   /*id*/ 2,
    /*triphost_id*/ 2,
    /*activity_id*/ 2,
    /*title*/ 'TITLE2 cth',
    /*destination*/ 'DESTINATION2 cth',
    /*location*/ 'LOCATION2 cth',
    /*duration_hour*/ 2,
    /*quota*/ 2,
    /*dates*/ 'DATES2 cth',
    /*price*/ 222,
    /*cover_photo_url*/ 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiGkIv-sJfeAhUGeysKHYp-A1oQjRx6BAgBEAU&url=https%3A%2F%2Featsiptrip.10best.com%2F2018%2F03%2F12%2Fhow-cooking-helped-me-beat-depression%2F&psig=AOvVaw2WDsb6zLcVhWUF_s8jL5ca&ust=1540206100524565',
    /*gallery_photo_url*/ 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiQ96uLsZfeAhUDU30KHZnXAz8QjRx6BAgBEAU&url=https%3A%2F%2Fwww.yourtango.com%2F2018310196%2Fbest-female-tattoo-ideas-women&psig=AOvVaw3FfBKeMKF5AjcOfgpcP1ID&ust=1540206127866317'

);




