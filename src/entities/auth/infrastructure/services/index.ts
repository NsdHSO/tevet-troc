import fp from 'fastify-plugin';

export default fp(
    async ()=>{
        try{

        }catch(error){
            console.error('Error registering auth service:', error);
        }
    }
)