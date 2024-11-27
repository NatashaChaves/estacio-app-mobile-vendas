require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Inicialize o cliente Supabase
const Supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = Supabase;
