/* Replace with your SQL commands */

/* Replace with your SQL commands */
/* Replace with your SQL commands */
create table trip_order (
    id bigserial not null,
    order_id bigserial not null,
    trip_id bigserial not null,
    dates DATE not null,
    gross_amount int not null,
   
    
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    constraint trip_order_pkey primary key (id)
) with (OIDS = FALSE);



insert into
    trip_order (
        order_id,
        trip_id,
        dates,
        gross_amount
    )
values
    (
        1,
        1,
        '1-28-2018',
        '1'
    
    ),
    (
        
        2,
        2,
        '2-28-2018',
        '2'
    ),
    (
        
        3,
        3,
        '3-28-2018',
        '3'
    );