/* Replace with your SQL commands */

/* Replace with your SQL commands *//* Replace with your SQL commands */
create table activity_category(
    id bigserial not null,
    trip_id bigserial not null,
    activity_category_name text not null,
    activity_category_photo_url text  null,

    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    constraint activity_category_pkey primary key (id)
    
) with (OIDS = FALSE);
insert into 
    activity_category
values
(
    /*id*/ 1,
    /*trip_id*/ 1,
    /*activity_category_name*/ 'Sports',
    /*activity_category_photo_url*/ 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiGkIv-sJfeAhUGeysKHYp-A1oQjRx6BAgBEAU&url=https%3A%2F%2Featsiptrip.10best.com%2F2018%2F03%2F12%2Fhow-cooking-helped-me-beat-depression%2F&psig=AOvVaw2WDsb6zLcVhWUF_s8jL5ca&ust=1540206100524565'
   
 );

insert into 
    activity_category
values
(
   /*id*/ 2,
   /*trip_id*/ 2,
    /*activity_category_name*/ 'Cooking Class',
    /*activity_category_photo_url*/ 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiGkIv-sJfeAhUGeysKHYp-A1oQjRx6BAgBEAU&url=https%3A%2F%2Featsiptrip.10best.com%2F2018%2F03%2F12%2Fhow-cooking-helped-me-beat-depression%2F&psig=AOvVaw2WDsb6zLcVhWUF_s8jL5ca&ust=1540206100524565'
   
);




