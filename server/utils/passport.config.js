const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { PrismaClient, userPosition } = require("@prisma/client");
const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK_URL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const email = profile.email;

        const organisationDomain = email.substring(
          email.lastIndexOf("@") + 1,
          email.lastIndexOf(".")
        );

        const user = await prisma.user.upsert({
          where: { email: email },
          update: {
            name: profile.displayName,
            image: profile.photos[0]?.value || null,
            created_at: new Date(),
          },
          create: {
            email: email,
            name: profile.displayName,
            image: profile.photos[0]?.value || null,
            created_at: new Date(),
          },
        });

        const existingOrg = await prisma.organisation.findUnique({
          where: {
            organisation: organisationDomain,
          },
        });

        console.log("exist", existingOrg)

        const organisation = await prisma.organisation.upsert({
          where: {
            organisation: organisationDomain,
          },
          update: {
            created_at: new Date(),
          },
          create: {
            organisation: organisationDomain,
            created_at: new Date(),
          },
        });

        
        const isNewOrganization = !existingOrg;


        console.log("new", isNewOrganization)


        let org_user = await prisma.organisation_Users.findFirst({
          where: {
            organisation_id: organisation.id,
            user_id: user.id,
          },
        });

        if (org_user) {
          org_user = await prisma.organisation_Users.update({
            where: {
              id: org_user.id, 
            },
            data: {
              created_at: new Date(),
            },
          });
        } else {
          const userType = isNewOrganization ? "ADMIN" : "USER";

          console.log("usertype", userPosition)

          
          org_user = await prisma.organisation_Users.create({
            data: {
              organisation_id: organisation.id,
              user_id: user.id,
              created_at: new Date(),
              user_type: userType, 
            },
          });
        }

        return done(null, {
          organisation: organisation.id,
          organisation_user_id: org_user.id,
          user_id: user.id,
          name: user.name,
          email: user.email,
          position: org_user.position,
        });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;