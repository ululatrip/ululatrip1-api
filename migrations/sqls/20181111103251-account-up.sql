/* Replace with your SQL commands */
create table account (
    id bigserial not null,
    firstname text not null,
    lastname text not null,
    email text not null,
    role text not null,
    phone text not null,
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
        role,
        phone
    )
values
    (
        'regi',
        'arfiandi',
        'regiarfiandi@gmail.com',
        'admin',
        '081290719716'
    ),
    (
        
        'triphost',
        '01',
        'triphost01@gmail.com',
        'triphost',
        '08127227722'
    ),
    (
        
        'tripper',
        '01',
        'tripper01@gmail.com',
        'tripper',
        '0118181818181'
    );