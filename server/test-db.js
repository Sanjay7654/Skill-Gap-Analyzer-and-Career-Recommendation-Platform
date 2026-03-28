import supabase from './config/supabaseClient.js';

async function testConnection() {
    console.log('--- Database Connection Diagnostic ---');
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .limit(1);

        if (error) {
            console.error('❌ Supabase Query Error:', error.message);
            if (error.status === 401 || error.status === 403) {
                console.error('👉 Tip: Check your SUPABASE_KEY permissions.');
            }
            return;
        }

        console.log('✅ Connection Successful!');
        console.log('Sample Data Found:', data);
    } catch (err) {
        console.error('❌ Critical Connection Failure:', err.message);
    }
}

testConnection();
