import { Run } from './Run'

const commands = {
  items: [
    {
      key: "defaultBowser",
      title: "Set default browser",
      script: "do shell script (\"open -a 'Firefox' --args --make-default-browser\")",
    },
    {
      key: "firefoxDev",
      title: "Quit Firefox Developer Edition",
      script: 'quit app "Firefox Developer Edition"',
    },
    {
      key: "msteams",
      title: "Close Microsoft Teams",
      script: 'quit app "Microsoft Teams"',
    },
    {
      key: "vscode",
      title: "Close Visual Studio Code",
      script: 'quit app "Visual Studio Code"',
    },
    {
      key: "discord",
      title: "Quit Discord",
      script: 'quit app "Discord"',
    },
    {
      key: "firefox",
      title: "Open Firefox",
      script: 'tell application "Firefox" to activate',
    },
    {
      key: "mute",
      title: "Mute",
      script: 'set volume output muted true',
    }
  ],
};

export default function Command() {
  return <Run
      errorMsg={{ title: "Failed to stop working, maybe work a bit longer?" }}
      successMsg={{ title: "Complete", message: 'Time to chill!' }}
      {...{ commands}}
    />
}
