require('dotenv').config()

//POSTGRES Config
const { Sequelize } = require('sequelize')
// const sequelize = new Sequelize(process.env.POSTGRES_URI) // Example for postgres
// const sequelize = new Sequelize(process.env.DATABASE_URL+"?ssl=true") // Example for postgres

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: process.env.host,
  database: process.env.dbname,
  username: process.env.username,
  user: process.env.username,
  password: process.env.password,
  port: process.env.port,
  dialect: 'postgres',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  },
  logging: false
});

Promise.resolve(sequelize.authenticate()).then( () => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
})

//DATABASE
const db = {
  user: require("./models/user")(sequelize),
  job: require("./models/job")(sequelize),
  jobVideo: require("./models/jobVideo")(sequelize),
  appliedJob: require("./models/appliedJob")(sequelize),
  bookmarkedJob: require("./models/bookmarkedJob")(sequelize),
  // userCertification: require("./models/userCertification")(sequelize),
  // userEducation: require("./models/userEducation")(sequelize),
  userFilter: require("./models/userFilter")(sequelize),
  // userProfessionalDetail: require("./models/userProfessionalDetail")(sequelize),
  // userSkill: require("./models/userSkill")(sequelize),
  skill: require("./models/skill")(sequelize),
  category: require("./models/category")(sequelize),
}

//GENERAL
const   express                   = require("express"),
        app                       = express(),
        bodyParser                = require("body-parser"),
        // methodOverride         = require("method-override"),
        passport                  = require("passport"),
        LocalStrategySequelize    = require("passport-local-sequelize")
        cors                      = require('cors')

 



//ROUTES
const indexRoutes     = require('./routes/index')(db),
      adminRoutes     = require('./routes/admin')(db),
      userRoutes      = require('./routes/user')(db),
      skillRoutes     = require('./routes/skill')(db),
      categoryRoutes     = require('./routes/category')(db),
      jobRoutes     = require('./routes/job')(db)



//MIDDLEWAREs
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

 //PASSPORT CONFIG
LocalStrategySequelize.attachToUser(db.user, {
  usernameField: 'contactNumber',
  hashField: 'hash',
  saltField: 'salt'
});
 
app.use(require("express-session")({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(db.user.createStrategy())
passport.serializeUser(db.user.serializeUser())
passport.deserializeUser(db.user.deserializeUser())





const syncDB = async () => {
  let isForced = false
  await sequelize.authenticate()
  await sequelize.sync({force:isForced})
  if(isForced){
    const seed = require("./seed")(db)
    seed.seedAdmin()
    seed.seedCategories()
    seed.seedSkills()
    seed.seedUser()
  }
  // await db.user.create({email: 'test5@gd'})
}

Promise.resolve(syncDB()).then( () => {
  console.log("DB updated")
}).catch( (err) => {
  console.error("Error Occured", err)
})



app.use("/", indexRoutes)
app.use("/admin", adminRoutes)
app.use("/user", userRoutes)
app.use("/skill", skillRoutes)
app.use("/category", categoryRoutes)
app.use("/job", jobRoutes)


if(process.env.PORT)
  app.listen(process.env.PORT, process.env.IP)
else{
  app.listen(3000, function(){
    console.log("HyreFeed is on FIRE!!!")
  })
}
