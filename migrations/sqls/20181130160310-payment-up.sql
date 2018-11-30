/* Replace with your SQL commands */

/* Replace with your SQL commands */

/* Replace with your SQL commands */
/* Replace with your SQL commands */
create table payment (
    id bigserial not null,
    order_id bigserial not null,
    payment_option text not null,
    unique_code int not null,
   
    
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    constraint payment_pkey primary key (id)
) with (OIDS = FALSE);



insert into
    payment (
        order_id,
        payment_option,
        unique_code
    )
values
    (
        1,
        'transfer manual',
        '123'
    
    ),
    (
        
        2,
        'transfer auto',
        '124'
    );