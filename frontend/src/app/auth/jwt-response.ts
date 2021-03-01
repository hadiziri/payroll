import { SpawnSyncOptionsWithBufferEncoding } from "child_process";

export interface JwtResponse {
    accessToken: string;
    type: string;
    username: string;
    currentMonth:string;
    authorities: string[];
}
