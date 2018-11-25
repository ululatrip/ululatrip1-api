/* Replace with your SQL commands */
/* Replace with your SQL commands */
create table message (
    id bigserial not null,
    sender_id bigserial not null,
    receiver_id bigserial not null,
    message_date DATE not null,
    message text not null,
   
    
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    constraint message_pkey primary key (id)
) with (OIDS = FALSE);



insert into
    message (
        sender_id,
        receiver_id,
        message_date,
        message
    )
values
    (
        '1',
        '1',
        '1-28-2018',
        'msggg'
    
    ),
    (
        
        '2',
        '2',
        '2-28-2018',
        'msggg'
    ),
    (
        
        '3',
        '3',
        '3-28-2018',
        'msggg'
    );