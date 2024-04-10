import web from "../web";
import colors from "colors";
import Engine from "./Engine";
import niptor from "./niptor";
import YouTubeID from "../web/YouTubeId";
import { version } from "../../package.json";
export default async function Agent({ query, verbose, onionTor, }) {
    verbose;
    console.log(colors.green("@info:"), "using", colors.green("yt-dlx"), "version", colors.green(version));
    let ipAddress;
    let nipTor;
    nipTor = await niptor(["curl https://checkip.amazonaws.com --insecure"]);
    console.log(colors.green("@info:"), "system", colors.green("ipAddress"), nipTor.stdout.trim());
    ipAddress = nipTor.stdout.trim();
    if (onionTor) {
        nipTor = await niptor([
            "systemctl restart tor && curl --socks5-hostname 127.0.0.1:9050 https://checkip.amazonaws.com --insecure",
        ]);
        if (nipTor.stdout.trim().length > 0) {
            console.log(colors.green("@info:"), "socks5", colors.green("ipAddress"), nipTor.stdout.trim());
            ipAddress = nipTor.stdout.trim();
        }
        else
            throw new Error("Unable to connect to Tor.");
    }
    let TubeBody;
    let respEngine = undefined;
    let videoId = await YouTubeID(query);
    if (!videoId) {
        TubeBody = await web.searchVideos({ query });
        if (!TubeBody[0])
            throw new Error("Unable to get response!");
        console.log(colors.green("@info:"), `preparing payload for`, colors.green(TubeBody[0].title));
        respEngine = await Engine({
            onionTor,
            ipAddress,
            query: `https://www.youtube.com/watch?v=${TubeBody[0].id}`,
        });
        return respEngine;
    }
    else {
        TubeBody = await web.singleVideo({ videoId });
        if (!TubeBody)
            throw new Error("Unable to get response!");
        console.log(colors.green("@info:"), `preparing payload for`, colors.green(TubeBody.title));
        respEngine = await Engine({
            onionTor,
            ipAddress,
            query: `https://www.youtube.com/watch?v=${TubeBody.id}`,
        });
        return respEngine;
    }
}
//# sourceMappingURL=Agent.js.map