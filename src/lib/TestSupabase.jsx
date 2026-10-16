import { supabase } from "./SupabaseClient";

export async function testConnection() {
    const {data, error} = await supabase
    .from('properties')
    .select("name, address")

    if(error){
        console.log('error', error)
    } else {
        console.log('data berhasil diambil : ', data)
    }
} 