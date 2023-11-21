/* 
* LMGU-Technik ping-deno

* Copyright (C) 2023 Hans Schallmoser

* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.

* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.

* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { SignalVariable, TypedSignal } from "https://deno.land/x/typed_signal@v0.1.1/mod.ts";

export function pingState(ip: string, interval = 5000): TypedSignal<boolean> {
    const state = new SignalVariable(false);
    async function ping() {
        state.setValue(await pingIp(ip));
        setTimeout(ping, interval);
    }
    ping();
    return state;
}

export async function pingIp(ip: string): Promise<boolean> {
    const cmd = new Deno.Command("ping", {
        args: [ip, "-n", "1"],
    });

    return new TextDecoder().decode((await cmd.output()).stdout).includes("TTL=");
}
