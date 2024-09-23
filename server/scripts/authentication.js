var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


passport.use(new GoogleStrategy({
    clientID:     process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5002/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try {
      
      const user = await prisma.user.upsert({
        where: { email: profile.email },
        update: {
          name: profile.displayName,
          image: profile.photos[0]?.value || null,
          created_at: new Date(),
        },
         create:{
          email: profile.email,
          name: profile.displayName,
          image: profile.photos[0]?.value || null,
          created_at: new Date(),
         }
      });

      return done(null, profile); 
    } catch (error) {
      return done(error, null);
    }
  }
));
passport.serializeUser(function(user,done){
    done(null,user)
})

passport.deserializeUser(function(user,done){
    done(null,user)
})


