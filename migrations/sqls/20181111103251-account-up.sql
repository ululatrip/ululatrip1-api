/* Replace with your SQL commands */
create table account (
    id bigserial not null,
    firstname text not null,
    lastname text not null,
    email text not null,
    role text not null,
    access_token text null,
    
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    constraint account_pkey primary key (id)
) with (OIDS = FALSE);

create index IF NOT EXISTS account_id on account(id);
create index IF NOT EXISTS account_email_index on account(email);


insert into
    account (
        firstname,
        lastname,
        email,
        role
    )
values
    (
        'regi',
        'arfiandi',
        'regiarfiandi@gmail.com',
        'admin'
    ),
    (
        
        'triphost',
        '01',
        'triphost01@gmail.com',
        'triphost'
    ),
    (
        
        'tripper',
        '01',
        'tripper01@gmail.com',
        'tripper'
    );