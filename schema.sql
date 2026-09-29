-- Run in the Supabase SQL editor.
create extension if not exists pgcrypto;

create table if not exists stores (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text default '',
  description text default '',
  province text not null,
  city text not null,
  suburb text default '',
  address text default '',
  lat double precision,
  lng double precision,
  phone text default '',
  whatsapp text default '',
  email text default '',
  website text default '',
  instagram text default '',
  hours text default '',
  delivery boolean default false,
  collection boolean default true,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  edit_token text not null default encode(gen_random_bytes(16), 'hex'),
  created_at timestamptz default now()
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id) on delete cascade,
  category text not null default 'Other',
  name text not null,
  description text default '',
  price numeric(10,2) not null default 0,
  unit text default 'each',
  available boolean default true,
  created_at timestamptz default now()
);

create index if not exists stores_status_idx on stores(status);
create index if not exists stores_city_idx on stores(province, city);
create index if not exists menu_store_idx on menu_items(store_id);

-- All access goes through the Next.js server using the service role key.
-- Lock the tables down so the anon key can never read edit tokens or write.
alter table stores enable row level security;
alter table menu_items enable row level security;
