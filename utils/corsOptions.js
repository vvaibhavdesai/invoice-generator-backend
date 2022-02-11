/**
 * What does this do ?? Express app will only allow requests from
 * the origins mentioned in this array. in production, remove localhost and
 * replace it with domain where ur frontend is defined
 *
 * */
const corsOptions = {
  //dont forget to add your domain in the array for frontend
  origin: ["http://localhost:3000", "*.up.railway.app"],
  optionsSuccessStatus: 200,
  credentials: true,
};
module.exports = corsOptions;
