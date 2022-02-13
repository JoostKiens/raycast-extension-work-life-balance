import { runAppleScript } from "run-applescript";
import { useEffect, useCallback } from "react";
import {  List } from "@raycast/api";
import useIsMountedRef from "use-is-mounted-ref";
import { showToast, Toast } from "@raycast/api";
import { useStore } from './useStore'
import { State, Item, Msg } from './types'

export const Run = (props: ({ commands: State; errorMsg: Msg; successMsg: Msg })) => {
  const isMountedRef = useIsMountedRef();
  const [data, storeApi] = useStore(props.commands)


  const runCommands = useCallback(
    async () => {
      await Promise.all(
        props.commands.items.map(async (item: Item, index: number) => {
          try {
            storeApi.request(index)
            await runAppleScript(item.script);
            if (isMountedRef.current) storeApi.setSuccess(index)
          } catch (error) {
            if (isMountedRef.current) storeApi.setError(index, error as Error)
          }
        })
      );
    },
    [storeApi, props.commands.items]
  )

  useEffect(() => {
    (async function() {
      try {
        runCommands()
        if (isMountedRef.current) storeApi.done()
      } catch (error) {
        if (isMountedRef.current) storeApi.failure(error as Error)
      }
    })()
  }, [storeApi, runCommands])


  if (data.error) {
    showToast({
      style: Toast.Style.Failure,
      title: props.errorMsg.title,
      message: data.error.message,
    });
  }

  if (data.done) {
     showToast({
      style: Toast.Style.Success,
      title: props.successMsg.title,
      message: props.successMsg.message,
    });
  }

  return (
    <>
      <List isLoading={!data.items && !data.error}>
        {data.items?.map((item, index) => (
          <CommandListItem key={item.key} item={item} index={index} />
        ))}
      </List>
    </>
  );
}

function CommandListItem(props: { item: Item; index: number }) {
  const icon = props.item.success
    ? '🤘'
    : props.item.error
      ? '❌'
      : undefined
  return (
    <List.Item
      title={props.item.title}
      subtitle={props.item.error?.message}
      accessoryTitle={icon}
    />
  );
}