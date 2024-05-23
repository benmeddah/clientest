module.exports = {
  reflected: function (req, res, next) {
    res.render("reflected", { search: req.query?.search ?? "" });
  },
  dom: function (req, res, next) {
    res.render("dom", { num: req.query?.number ?? "" });
  },
  secretAdmin: function (req, res, next) {
    if (req.headers.cookie?.includes("VISITOR_COOKIE"))
      res.cookie("VISITOR_COOKIE", "", {
        expires: new Date(0),
      });
    res.cookie("ADMIN_COOKIE", "d9a3c25eb4316fcef262f45596746a20f66e", {
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.send("Cookie set");
  },
  csp: function (req, res, next) {
    res.setHeader("Content-Security-Policy", "connect-src 'none'; font-src 'none'; frame-src 'none'; img-src 'self'; manifest-src 'none'; media-src 'none'; object-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; worker-src 'none'; frame-ancestors 'none'; block-all-mixed-content;");
    res.render("csp", { name: req.query?.name?.replace('<script>', '').replace('</script>', '') ?? "" });
  }
};
