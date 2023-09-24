# MonaGater 🚪👀👾

MonaGater is a prototype to token gate Mona avatars. This could allow users to link Mona avatars to their owned NFTs across any EVM chain! 🤯

Used Technologies: 🛠️
- Next.js
- Vercel
- Unity Visual Scripting Language
- Mona SDK

## Methodology 🤔
The main process for this app is as follows:
1. On the webapp side, we detect the client's IP address and authorize a subset of avatars. 🕵️‍♀️
2. IP is stored in server kv store, along with an expiration time and authorized avatars. 🗄️
3. On the unity side, we query for authorized avatars using a Unity Web Request. 🕸️
4. We detect the same IP address, so can pass back the pre-authorized avatars. 🤝
5. We can update in realtime (currently using a key-press but could use sockets if enabled on Mona side) ⏰

## Further Potential 🚀
This is a rough prototype, but with a few additions, this same system could be production ready. The following improvements would make the system much, much more robust:
- Enable passing a user's wallet address via a Web Request. This would allow the app to check against ownership before serving the link to any VRM. 💰
- One could also gate the access or VRM urls, via validating (ideally) the wallet address, or even through this same IP method. 🔒
- If Mona team adds the VRMSwitcher to the Unity Visual Scripting types, then we could automatically instantiate and set the vrm addresses via the scripting language, which would be much, much better. 🤖

### Thank Yous 🙏

This was a fun weekend project and nice to experiment with new tech. Thanks to the entire Mona team that was here who helped brainstorm and troubleshoot and had great feedback! 🎉