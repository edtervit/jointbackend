import fetch from "node-fetch";

export const refreshToken = async (req, res) => {
  const refresh_token = req.body.refreshToken;
  const token = req.body.token;

  try {
    const url = "https://accounts.spotify.com/api/token";
    let authOptions = {
      method: "POST",
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
      headers: {
        Authorization:
          "Basic " +
          new Buffer(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const response = await fetch(url, authOptions);
    const json = await response.json();
    res.status(201).json(json);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const guest = async (req, res) => {
  const refresh_token = process.env.SPOTIFY_REFRESH;

  const pw = req.body.pw;

  const thePW = process.env.REFRESH_PW;

  try {
    if (pw === thePW) {
      const url = "https://accounts.spotify.com/api/token";
      let authOptions = {
        method: "POST",
        body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
        headers: {
          Authorization:
            "Basic " +
            new Buffer(
              process.env.SPOTIFY_CLIENT_ID +
                ":" +
                process.env.SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      const response = await fetch(url, authOptions);
      const json = await response.json();
      res.status(201).json(json);
    } else {
      res.statusMessage = "Wrong Password";
      res.status(401).end();
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
