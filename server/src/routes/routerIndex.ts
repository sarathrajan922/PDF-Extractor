import { Application } from "express";


const router = (app:Application)=>{
    app.use('/api',()=>{
        console.log('/api route')
    })

    app.use('/api/user',()=>{
        console.log('api/user route')
    })
}

export default router;