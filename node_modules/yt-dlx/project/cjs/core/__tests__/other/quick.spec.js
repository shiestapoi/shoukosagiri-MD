"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const AudioHighest_1 = __importDefault(require("../../routes/Audio/single/AudioHighest"));
const videos = [
    "https://youtu.be/M1l52x3wXYw?si=NepWSKHiOF7tuYPN",
    "https://youtu.be/DeSa4z6rV9c?si=m5Qjknc0J5eGqp2Z",
    "https://youtu.be/t2ZrXnhKoZs?si=tqgDPILIBFXIJbuH",
    "https://youtu.be/Nx5W_1zcQI0?si=g7SmWv2B6BPK0giz",
    "https://youtu.be/Xyofyyc7Up8?si=t4qhkoSZUi9LIP52",
    "haan pehlibaar kishor kumar",
    "tumse milna batei karna acha lagtahai",
    "tumbhi chalo humbhi chale",
    "raho mein rehte hai",
];
async function main() {
    try {
        for (const query of videos) {
            await (0, AudioHighest_1.default)({
                query,
                verbose: true,
                onionTor: true,
                output: "audio",
            });
        }
    }
    catch (error) {
        console.error("@error:", error);
    }
}
main();
//# sourceMappingURL=quick.spec.js.map