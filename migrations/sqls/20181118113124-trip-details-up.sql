/* Replace with your SQL commands *//* Replace with your SQL commands */
create table trip_details(
    id bigserial not null,
    trip_id bigserial not null,
    trip_overview text not null,
    itinerary text not null,
    includes text  null,
    excludes text  null,
    meeting_point text not null,
    meeting_time TIME not null,
    extra_note text  null,

    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    constraint trip_details_pkey primary key (id)
    
) with (OIDS = FALSE);
insert into 
    trip_details
values
(
    /*id*/ 1,
    /*trip_id*/ 1,
    /*trip_overview*/ 'trip_overview cth',
    /*itinerary*/ 'itinerary cth',
    /*includes*/ 'includes cth',
    /*excludes*/ 'excludes cth',
    /*meeting_point*/ 'meeting_point cth',
    /*meeting_time*/ '04:05',
    /*extra_note*/ 'extra_note'
 );

insert into 
    trip_details
values
(
   /*id*/ 2,
    /*trip_id*/ 2,
    /*trip_overview*/ 'trip_overview cth2',
    /*itinerary*/ 'itinerary cth2',
    /*includes*/ 'includes cth2',
    /*excludes*/ 'excludes cth2',
    /*meeting_point*/ 'meeting_point cth2',
    /*meeting_time*/ '04:06',
    /*extra_note*/ 'extra_note2'
);




