const { createClient } = require('@supabase/supabase-js')

const dotenv=require('dotenv');

dotenv.config()
const path = require('path')
const {v4:uuidv4}=require('uuid')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)
const uploadToSupabase=async(files)=>{

    const imageUrls = [];
    for(const file of files){
        const filePath = `cars/${Date.now()}_${file.originalname}`;
        // const filePath=`${fileName}`;
        const {error}=await supabase.storage.from('manymiles-image').upload(filePath,file.buffer,{
            contentType:file.mimetype,
        });
    
        if(error){
            console.log("Error Uploading File",error);
            return null;
        }
        
        const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/manymiles-image/${filePath}`;
        imageUrls.push(publicUrl);
    }
 
    return imageUrls;
}
module.exports=uploadToSupabase;