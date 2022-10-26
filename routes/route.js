const bookRoutes = require ('./books');

const appRouter = (app, fs) => {

    // default routes
    app.get('/', (req, res)=>{
        res.send('Welcome to the development ap-server')
    });

    // other routes
    bookRoutes(app, fs);
};



module.exports = appRouter;