import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
// import { globals } from '@config/globals';
import Channels from '../main/channels'
import { dialog } from 'electron'

type AllValuesOf<T> = T extends any ? T[keyof T] : never
type ChannelsType = AllValuesOf<AllValuesOf<typeof Channels>>
type IInvokeResponse = Promise<{
  data: Record<string, unknown>
  errors?: Array<string>
}>

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

const electronHandler = {
  ipcRenderer: {
    send(channel: ChannelsType | string, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args)
    },
    on(channel: ChannelsType | string, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => func(...args)
      ipcRenderer.on(channel, subscription)

      return () => {
        ipcRenderer.removeListener(channel, subscription)
      }
    },
    once(channel: ChannelsType | string, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args))
    },
    invoke(channel: ChannelsType | string, ...args: unknown[]): IInvokeResponse {
      return ipcRenderer.invoke(channel, ...args) as IInvokeResponse
    }
  },
  channels: Channels,
  env: process.env,
  dialog: dialog
}
contextBridge.exposeInMainWorld('electron', electronHandler)

export type ElectronHandler = typeof electronHandler
