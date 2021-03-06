import passport from "passport";
import GitHubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import {
	githubLoginCallback,
	facebookLoginCallback
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GH_ID,
			clientSecret: process.env.GH_SECRET,
			callbackURL: `http://localhost:4000${routes.githubCallback}`
		},
		githubLoginCallback
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FB_ID,
			clientSecret: process.env.FB_SECRET,
			callbackURL: `https://4c126fe5.ngrok.io${routes.facebookCallBack}`,
			profileFields: ["id", "displayName", "email"],
			scope: ["public_profile", "email"]
		},
		facebookLoginCallback
	)
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
