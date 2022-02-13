import { Run } from './Run'

const commands = {
  items: [
    {
      key: "defaultBowser",
      title: "Set default browser",
      script: "do shell script (\"open -a 'Firefox Developer Edition' --args --make-default-browser\")",
    },
    {
      key: "firefox",
      title: "Open Firefox Developer Edition",
      script: 'tell application "Firefox Developer Edition" to activate',
    },
    {
      key: "discord",
      title: "Open Discord",
      script: 'tell application "Discord" to activate',
    },
    {
      key: "msteams",
      title: "Open Microsoft Teams",
      script: 'tell application "Microsoft Teams" to activate',
    },
    {
      key: "vscode",
      title: "Open Visual Studio Code",
      script: 'tell application "Visual Studio Code" to activate',
    },
    {
      key: "unmute",
      title: "Unmute",
      script: 'set volume output muted false',
    }
  ],
};

export default function Command() {
  return <Run
      errorMsg={{ title: "Failed to start working, maybe take a sick day?" }}
      successMsg={{ title: "Complete", message: 'Time to make that moolah!' }}
      {...{ commands}}
    />
}
