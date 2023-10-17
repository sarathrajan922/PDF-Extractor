"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = (app) => {
    app.use('/api', () => {
        console.log('/api route');
    });
    app.use('/api/user', () => {
        console.log('api/user route');
    });
};
exports.default = router;
