// add this file to .gitignore

// module.exports = {
//     google: {
//         clientID:'194227298659-jqg95r5gb65b7f5l8jfvs4g2f9kt003d.apps.googleusercontent.com',
//         clientSecret:'bK3dcoU6PQ8WWHiDquqK_Ibz'
//     },

//     session: {
//         cookieKey: 'suitedreamsadmin'
//     }
// };

exports.google = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
};

exports.session = {
    cookieKey: process.env.SESSION_KEY
};

exports.aylien = {
    application_id: process.env.AYLIEN_ID,
    application_key: process.env.AYLIEN_KEY
}
