/* Replace with your SQL commands */
create table "order" (
    id bigserial not null,
    trip_id bigserial not null,
    trip_host_id bigserial not null,
    payment_id bigserial not null,
    account_id bigserial not null,
    order_date DATE not null,
    order_status text not null,

    
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    constraint order_pkey primary key (id)
) with (OIDS = FALSE);



insert into 
    "order" (
        trip_id,
        trip_host_id,
        account_id,
        payment_id,
        order_date,
        order_status
        
    )
values
    (
        1,
        1,
        1,
        1,
        '1-28-2018',
        'aman'
    ),
    (
        
        2,
        2,
        2,
        2,
        '2-28-2018',
        'aman'
    ),
    (
        
        3,
        3,
        3,
        3,
        '3-28-2018',
        'aman'
    );