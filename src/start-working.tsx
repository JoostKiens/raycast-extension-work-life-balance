import { Run } from './Run'

const commands = {
  items: [
    {
      key: 'showDesktop',
      title: 'Hide all applications',
      script: `
      tell application "Finder"
          set visible of every process whose visible is true and name is not "Finder" to false
          set the collapsed of windows to true
      end tell
      `
    },
    {
      key: "unmute",
      title: "Unmute",
      script: 'set volume output muted false',
    },
    {
      key: "vscode",
      title: "Open Visual Studio Code",
      script: 'tell application "Visual Studio Code" to activate',
    },
    {
      key: "defaultBowser",
      title: "Set default browser",
      script: "do shell script (\"open -a 'Firefox Developer Edition' --args --make-default-browser\")",
    },
    {
      key: "msteams",
      title: "Open Microsoft Teams",
      script: 'tell application "Microsoft Teams" to activate',
    },
    {
      key: "discord",
      title: "Open Discord",
      script: 'tell application "Discord" to activate',
    },
  ],
};

export default function Command() {
  return <Run
      errorMsg={{ title: "Failed to start working, maybe take a sick day?" }}
      successMsg={{ title: "Complete", message: 'Time to make that moolah!' }}
      {...{ commands}}
    />
}
