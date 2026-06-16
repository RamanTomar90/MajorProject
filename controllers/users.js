module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        if (!username || !email || !password || password.trim().length === 0) {
            req.flash("error", "All fields are required!");
            return res.redirect("/signup");
        }

        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        // ✅ FIXED LOGIN (PROMISE STYLE)
        await new Promise((resolve, reject) => {
            req.login(registeredUser, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        req.flash("success", "Welcome to WanderLust!");
        return res.redirect("/listings");

    } catch (e) {
        console.log("SIGNUP ERROR:", e); // 👈 DEBUG
        req.flash("error", e.message);
        return res.redirect("/signup");
    }
};