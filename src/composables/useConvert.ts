import { reactive, ref, onMounted } from 'vue'
import { open } from '@tauri-apps/plugin-dialog'
import { Command } from 'tauri-plugin-shellx-api'
import { platform } from '@tauri-apps/plugin-os'
import { path } from '@tauri-apps/api'
import { createWin, getCurrent } from '../utils/WindowsUtils'
import { escapeBashArg, escapePowerShellArg } from '../utils/shellEscape'
import { saveFormData, loadFormData, loadFfmpegArgs } from '../stores/appStore'
import type { ConvertForm, FormatType } from '../types'
import { ElMessage } from 'element-plus'

export const audioFormats = [
  'mp3', 'wav', 'ogg', 'flac', 'aac', 'wma',
  'm4a', 'ape', 'aiff', 'au', 'mid', 'midi',
  'mp2', 'mpa', 'mpga',
]

export const videoFormats = [
  'mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm',
]

export function useConvert() {
  const loginfo = ref('')
  const childProcess = ref<{ pid: number; kill: () => Promise<void> } | null>(null)

  const form = reactive<ConvertForm & { logs: string; isConverting: boolean }>({
    filePath: null,
    format: null,
    outPath: null,
    formatType: 'audio' as FormatType,
    isAugment: false,
    augment: '-b:a 320k -ar 48000',
    logs: '',
    isConverting: false,
  })

  const log = (logLine: string) => {
    loginfo.value += logLine
  }

  const logl = (logLine: string) => {
    log(logLine + '\n')
  }

  const checkPlatform = () => {
    return platform()
  }

  onMounted(async () => {
    const savedForm = await loadFormData()
    if (savedForm) {
      form.filePath = savedForm.filePath
      form.format = savedForm.format
      form.outPath = savedForm.outPath
      form.formatType = savedForm.formatType
      form.isAugment = savedForm.isAugment
      form.augment = savedForm.augment
    }
    const savedArgs = await loadFfmpegArgs()
    form.augment = savedArgs
  })

  const selectFile = async () => {
    try {
      const filePath = await open({
        multiple: false,
        directory: false,
      })
      if (filePath) {
        form.filePath = filePath
      }
    } catch (error) {
      ElMessage.error('选择文件失败')
    }
  }

  const selectDirectory = async () => {
    try {
      const dirPath = await open({
        multiple: false,
        directory: true,
      })
      if (dirPath && dirPath.length !== 0) {
        form.outPath = dirPath
        logl('选择输出路径:' + dirPath)
      }
    } catch (error) {
      ElMessage.error('选择目录失败')
    }
  }

  const openDir = () => {
    if (!form.outPath) {
      ElMessage.warning('请先选择输出目录')
      return
    }
    try {
      let osType = checkPlatform()
      new Command(osType === 'windows' ? 'explorer' : 'open', [form.outPath]).execute()
    } catch (error) {
      ElMessage.error('打开目录失败')
    }
  }

  const onFormatChange = () => {
  }

  const stopConvert = async () => {
    if (childProcess.value) {
      try {
        await childProcess.value.kill()
        logl('转换已取消')
      } catch {
        logl('取消转换失败')
      }
      childProcess.value = null
      form.isConverting = false
    }
  }

  const convert = async () => {
    loginfo.value = ''
    await saveFormData({
      filePath: form.filePath,
      format: form.format,
      outPath: form.outPath,
      formatType: form.formatType,
      isAugment: form.isAugment,
      augment: form.augment,
    })
    let resourceDir = await path.resourceDir()
    form.isConverting = true
    let platformName = checkPlatform()
    let outFileName = await path.basename(form.filePath ?? '') + '.' + form.format
    let outputPath = await path.join(form.outPath ?? '', outFileName)
    let ffmpegPath = resourceDir + '/assets/mac/ffmpeg'
    let ffmpegPathWin = resourceDir + '/assets/win/ffmpeg/bin/ffmpeg.exe'
    let escapedFilePath = form.filePath ?? ''
    let escapedOutPath = outputPath
    let escapedAugment = form.isAugment ? form.augment : ''

    logl('════════════════════════════════════════')
    logl('          转换任务详情')
    logl('════════════════════════════════════════')
    logl(`操作系统: ${platformName}`)
    logl(`源文件: ${escapedFilePath}`)
    logl(`目标格式: ${form.format}`)
    logl(`输出文件: ${escapedOutPath}`)
    if (form.isAugment && escapedAugment) {
      logl(`自定义参数: ${escapedAugment}`)
    }
    logl(`FFmpeg路径: ${platformName === 'windows' ? ffmpegPathWin : ffmpegPath}`)
    logl('──────────────────────────────────────────')
    logl('执行命令:')
    logl(`ffmpeg -y -i "${escapedFilePath}" ${escapedAugment} "${escapedOutPath}"`)
    logl('──────────────────────────────────────────')
    logl('')

    let macScript =
      `#! /bin/bash
${escapeBashArg(ffmpegPath)} -y -i ${escapeBashArg(escapedFilePath)} ${escapedAugment} ${escapeBashArg(escapedOutPath)}
return $?
`
    let winScript =
      `$OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001
& ${escapePowerShellArg(ffmpegPathWin)} -y -i ${escapePowerShellArg(escapedFilePath)} ${escapedAugment} ${escapePowerShellArg(escapedOutPath)}
`

    let command = null
    try {
      if (platformName === 'macos' || platformName === 'linux') {
        command = Command.create('zsh', ['-c', macScript])
      } else {
        command = Command.create('powershell', ['-Command', winScript])
      }
      command.on('close', data => {
        logl('')
        logl('──────────────────────────────────────────')
        if (data.code === null) {
          logl('状态: 已取消')
        } else if (data.code === 0) {
          logl('状态: 转换成功 ✅')
        } else {
          logl(`状态: 转换失败 (退出码: ${data.code}) ❌`)
        }
        logl('════════════════════════════════════════')
        form.isConverting = false
        childProcess.value = null
      })
      command.on('error', error => {
        logl('')
        logl('状态: 错误 ❌')
        logl(`错误信息: ${error}`)
        logl('════════════════════════════════════════')
        form.isConverting = false
        childProcess.value = null
      })
      command.stdout.on('data', line => {
        log(line)
      })
      command.stderr.on('data', line => {
        log(line)
      })

      const child = await command.spawn()
      childProcess.value = child
      logl(`进程已启动 (PID: ${child.pid})`)
      logl('')
    } catch (error) {
      form.isConverting = false
      childProcess.value = null
      ElMessage.error('启动转换失败')
    }
  }

  const openSetting = () => {
    let main = getCurrent()
    main.setEnabled(false)
    saveFormData({
      filePath: form.filePath,
      format: form.format,
      outPath: form.outPath,
      formatType: form.formatType,
      isAugment: form.isAugment,
      augment: form.augment,
    })
    createWin({
      label: 'setting',
      title: '参数设置',
      url: '/setting',
      width: 640,
      height: 620,
      resizable: false,
      minimizable: true,
      maximizable: true,
      closable: true,
      decorations: true,
      alwaysOnTop: false,
      center: true,
      focus: true,
      transparent: false,
      onDestroyed: async () => {
        await main.setEnabled(true)
        await main.setFocus()
        const savedArgs = await loadFfmpegArgs()
        form.augment = savedArgs
      },
      onError: async () => {
        await main.setEnabled(true)
        await main.setFocus()
      },
    })
  }

  return {
    form,
    loginfo,
    audioFormats,
    videoFormats,
    selectFile,
    selectDirectory,
    openDir,
    onFormatChange,
    convert,
    stopConvert,
    openSetting,
  }
}
