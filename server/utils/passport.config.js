const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { PrismaClient, priority } = require('@prisma/client');
const prisma = new PrismaClient();

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5002/google/callback",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try {
      const email = profile.email;
      const userPosition = request.body.userPosition  || "DEVELOPER";
      // const priority = request.body.priority || "HIGH"
     

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
        }
      });

      const organisation = await prisma.organisation.upsert({
        where: { 
          organisation: email.substring(email.lastIndexOf("@") + 1, email.lastIndexOf("."))
        },
        update: {
          created_at: new Date(),
        },
        create: {
          organisation: email.substring(email.lastIndexOf("@") + 1, email.lastIndexOf(".")),
           
          created_at: new Date(),
        }
      });

     const org_user= await prisma.organisation_Users.upsert({
        where: {
          organisation_id_user_id: {
            organisation_id: organisation.id,
            user_id: user.id
          }
        },
        update: {
          user_position: userPosition,  
           created_at: new Date(),
        },
        create: {
          organisation_id: organisation.id,
          user_id: user.id,
          user_position: userPosition,  
          created_at: new Date(),
        }
      });

      const org_user_position = await prisma.organisation_User_position.upsert({
        where : {
          organisation_user_id_user_id : {
          organisation_user_id :org_user.id,
          user_id : user.id,
          }
        },
        update : {
          user_position: userPosition,
          created_at : new Date(),
        },
        create : {
          organisation_user_id : org_user.id,
          user_id : user.id,
          user_position: userPosition,
          created_at : new Date(),
        }
      })


    

    //  const checklistTemplateVersion = await prisma.checklist_template_version.upsert({
    //   where : {
        
    //   },
    //  update : {
    //   created_at : new Date()
    //  },
    //  create : {
    //   organisation_user_id : org_user.id,
    //   created_at : new Date()
    //  }
    //  })
      
      
      
      
      
      
      
      // const tag = await prisma.tags.upsert({
      //   where: {
      //     tag_name : tagName
      //   },
      //   update: {
          
      //     user_positon: userPosition,

      //     created_at: new Date()
      //   },
      //   create: {
      //     tag_name: tagName, 
      //     organisation_user_id : org_user.id,
      //     user_positon: userPosition,
      //     created_at: new Date()
      //   }
      // });
      
      // const template = await prisma.checklist_template.upsert({
      //   where : {
          
      //     template_name : tagTemplate
      //   },
      //   update : {
      //     created_at : new Date()
      //   },
      //   create : {
      //     template_name : tagTemplate,
      //     tag_id :tag.id,
      //     priority : priority,
      //     organisation_user_id : org_user.id,
      //     created_at : new Date(),
      //     organisation_id : organisation.id,
      //     current_version_id : 1,
      //     instructions : "Full Wash"
      //   }
      // })

      // const templateVersion = await prisma.checklist_template_version.upsert({
      //   where : {
      //   checklist_template_id : template.id
      //   },
      //   update : {
      //     created_at : new Date()
      //   },
      //   create : {
      //     checklist_template_id : template.id,
      //     organisation_user_id : org_user.id,
      //     created_at : new Date()
      //   }
      // })

      // const tempateLinkedItems = await prisma.checklist_template_linked_items.upsert({
      //   where : {
      //   template_version_id : templateVersion.version_id, 
      //   },
      //   update : {
      //     created_at : new Date()
      //   },
      //   create : {
      //     template_version_id : templateVersion.version_id,
      //     checklist_item_id : 1,
      //      created_at : new Date()
      //   }
      // })

      // const templateOwners = await prisma.checklist_template_owners.upsert({
      //   where : {
      //     checklist_template_id : template.id,
      //   },
      //   update : {
      //     created_at : new Date()
      //   },
      //   create : {
      //     checklist_template_id : template.id,
      //     organisation_user_id : org_user.id,
      //     created_at: new Date()
      //   }
      // })

      
      

      return done(null, 
        {
       
        organisation : organisation.id,
        organisation_user_id:org_user.id,
        name: user.name,
        email: user.email,
      });

    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
