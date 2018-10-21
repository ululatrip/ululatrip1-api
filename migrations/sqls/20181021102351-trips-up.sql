/* Replace with your SQL commands */
create table trip(
    id bigserial not null,
    imagetrip_url text not null,
    activity text not null,
    title text not null,
    destination text not null,
    location text not null,
    duration_hour int not null,
    price int not null,
    sellername text not null,
    sellerphoto_url text not null,
    selleroccupation text not null,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    constraint trip_pkey primary key (id)
) with (OIDS = FALSE);
insert into 
    trip
values
(
   /*id*/ 1,
   /*image*/ 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiGkIv-sJfeAhUGeysKHYp-A1oQjRx6BAgBEAU&url=https%3A%2F%2Featsiptrip.10best.com%2F2018%2F03%2F12%2Fhow-cooking-helped-me-beat-depression%2F&psig=AOvVaw2WDsb6zLcVhWUF_s8jL5ca&ust=1540206100524565',
   /*activity*/ 'Cooking Class',
   /*title*/ 'Belajar memasak berasama regi',
   /*destination*/ 'sency',
   /*location*/ 'Jakarta',
   /*duration_hour*/ 2,
   /*Price*/ 200.000,
   /*Sellername*/ 'Dea',
   /*Sellerphoto*/ 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiQ96uLsZfeAhUDU30KHZnXAz8QjRx6BAgBEAU&url=https%3A%2F%2Fwww.yourtango.com%2F2018310196%2Fbest-female-tattoo-ideas-women&psig=AOvVaw3FfBKeMKF5AjcOfgpcP1ID&ust=1540206127866317',
   /*selleroccupation*/ 'Founder'
);

insert into 
    trip
values
(
   /*id*/ 2,
   /*image*/ 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi8h6PIspfeAhWEu48KHSYrAh4QjRx6BAgBEAU&url=https%3A%2F%2Fwww.10best.com%2Finterests%2Foutdoor-adventures%2Fcliff-jumping-10-breathtaking-spots-for-diving-into-the-unknown%2F&psig=AOvVaw2qYI8ojC-NZpJqtScgBgcR&ust=1540206524829975',
   /*activity*/ 'loncat tebing',
   /*title*/ 'cliff jumping hoping',
   /*destination*/ 'Nusa penida',
   /*location*/ 'Bali',
   /*duration_hour*/ 6,
   /*Price*/ 400.000,
   /*Sellername*/ 'marissi',
   /*Sellerphoto*/ 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi6tJa7spfeAhWJ6Y8KHVGEDAoQjRx6BAgBEAU&url=http%3A%2F%2Ftime.com%2F5104215%2Fdonald-trump-affect-women%2F&psig=AOvVaw3FfBKeMKF5AjcOfgpcP1ID&ust=1540206127866317',
   /*selleroccupation*/ 'boss'
);




