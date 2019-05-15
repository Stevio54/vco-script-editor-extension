const _data = {
  "display-name": "Run Script In Guest",
  "description": "Steven Run a script inside the VM and wait until it returns his result.\nRetrieve the output of the script and returns it as output in the workflow\n\nInspired by implementation done in PowerCLI in the following .NET class :\n- VMware.VimAutomation.ViCore.Impl.V1.RunScriptInGuestHelper\n- VMware.VimAutomation.ViCore.Impl.V1.Service.VmGuestServiceImpl\n\nRequires running VMwareTools instance in the GuestOS.\nLeverages the vSphere 5.x GuestOperationsManager object and is not backwards compatible with previous versions of vSphere.",
  "position": { "y": 18.136363636363633, "x": 45.0 },
  "input": {
    "param": [
      {
        "description": "Virtual Machine (VC)",
        "name": "vm",
        "type": "VC:VirtualMachine"
      },
      {
        "description": "Guest OS username",
        "name": "username",
        "type": "string"
      },
      {
        "description": "Guest OS password",
        "name": "password",
        "type": "SecureString"
      },
      {
        "description": "bash / bat / powershell",
        "name": "scriptType",
        "type": "string"
      },
      { "description": "Script Text", "name": "script", "type": "string" },
      {
        "description": "Timeout for the running script (in second)",
        "name": "scriptTimeout",
        "type": "number"
      },
      {
        "description": "(default) Time (in seconds) where a check of script status occurs",
        "name": "scriptRefreshTime",
        "type": "number"
      },
      {
        "description": "Script working directory in the guest",
        "name": "scriptWorkingDirectory",
        "type": "string"
      },
      {
        "description": "Script context interactivity",
        "name": "interactiveSession",
        "type": "boolean"
      }
    ]
  },
  "output": {
    "param": [
      {
        "description": "Output of the script",
        "name": "scriptOutputText",
        "type": "string"
      },
      {
        "description": "Exit code of the script",
        "name": "scriptExitCode",
        "type": "number"
      }
    ]
  },
  "attrib": [
    {
      "value": { "value": "", "encoded": "n" },
      "description": "(internal) Error Message",
      "name": "errorMessage",
      "type": "string",
      "read-only": false
    },
    {
      "value": { "value": "", "encoded": "n" },
      "description": "(internal) Script arguments",
      "name": "scriptArguments",
      "type": "string",
      "read-only": false
    },
    {
      "value": { "value": "", "encoded": "n" },
      "description": "(internal) Path to the scripting process",
      "name": "scriptProgramPath",
      "type": "string",
      "read-only": false
    },
    {
      "value": { "value": "__NULL__", "encoded": "n" },
      "description": "(internal) Pid of the script cmd in the guest",
      "name": "scriptPid",
      "type": "number",
      "read-only": false
    },
    {
      "value": { "value": "__NULL__", "encoded": "n" },
      "description": "(internal) List of running processes in the guest",
      "name": "scriptProcessInfo",
      "type": "Array/CompositeType(pid:number,name:string,owner:string,cmdLine:string,startTime:Date,endTime:Date,exitCode:number):GuestProcessInfoType",
      "read-only": false
    },
    {
      "value": { "value": "false", "encoded": "n" },
      "description": "(internal) Flag when script is finished",
      "name": "scriptFinished",
      "type": "boolean",
      "read-only": false
    },
    {
      "value": { "value": "0.0", "encoded": "n" },
      "description": "(internal) Counter for timeout",
      "name": "scriptTimeoutCounter",
      "type": "number",
      "read-only": false
    },
    {
      "value": { "value": "", "encoded": "n" },
      "description": "(internal) File path where the script output will be written in the guest",
      "name": "scriptOutputFile",
      "type": "string",
      "read-only": false
    },
    {
      "value": { "value": "vco_", "encoded": "n" },
      "description": "(default) The prefix to be given to the new temporary file",
      "name": "scriptOutputPrefix",
      "type": "string",
      "read-only": false
    },
    {
      "value": { "value": "false", "encoded": "n" },
      "description": "(internal) True if copy operation was successful",
      "name": "vcoCopiedFileResult",
      "type": "boolean",
      "read-only": false
    },
    {
      "value": { "value": "", "encoded": "n" },
      "description": "(internal) vCO server temporary file path",
      "name": "vcoTempFile",
      "type": "string",
      "read-only": false
    },
    {
      "value": {
        "value": "dunes://service.dunes.ch/ResourceElement?id='352d998c-6af5-4af9-8c4f-da4a2a2dff2b'&dunesName='ResourceElement'",
        "encoded": "n"
      },
      "description": "Redirects cmd output to ANSI. Thanks to Pierre Torris www.ptorris.com",
      "name": "cmdAnsi",
      "type": "ResourceElement",
      "read-only": false
    },
    {
      "value": { "value": "", "encoded": "n" },
      "name": "cmdAnsiVcoPath",
      "type": "string",
      "read-only": false
    },
    {
      "value": { "value": "", "encoded": "n" },
      "description": "Guest file path",
      "name": "cmdAnsiGuestPath",
      "type": "string",
      "read-only": false
    },
    {
      "value": { "value": "true", "encoded": "n" },
      "description": "Overwrite file if exists",
      "name": "overwrite",
      "type": "boolean",
      "read-only": false
    },
    {
      "value": { "value": "true", "encoded": "n" },
      "name": "useCmdAnsi",
      "type": "boolean",
      "read-only": false
    },
    {
      "value": { "value": "", "encoded": "n" },
      "description": "The absolute path of the temporary file that is created.",
      "name": "powershellScriptGuestPath",
      "type": "string",
      "read-only": false
    },
    {
      "value": { "value": "", "encoded": "n" },
      "name": "powershellScript",
      "type": "string",
      "read-only": false
    },
    {
      "value": { "value": "", "encoded": "n" },
      "name": "powershellScriptVcoPath",
      "type": "string",
      "read-only": false
    },
    {
      "value": { "value": ".ps1", "encoded": "n" },
      "description": "The suffix to be given to the new temporary file",
      "name": "powershellSuffix",
      "type": "string",
      "read-only": false
    },
    {
      "value": { "value": "", "encoded": "n" },
      "name": "errorCode",
      "type": "string",
      "read-only": false
    },
    {
      "value": { "value": "", "encoded": "n" },
      "description": "The absolute path of the temporary directory that is created.",
      "name": "guestTempDirectory",
      "type": "string",
      "read-only": false
    },
    {
      "value": { "value": "true", "encoded": "n" },
      "description": "Delete directory content recursively",
      "name": "recirsive",
      "type": "boolean",
      "read-only": false
    },
    {
      "value": { "value": "__NULL__", "encoded": "n" },
      "description": "Time to wait (seconds)",
      "name": "delay",
      "type": "number",
      "read-only": false
    }
  ],
  "workflow-item": [
    {
      "display-name": "Delete file in vCO server",
      "script": {
        "value": "try {\n\tvar file = new File(vcoTempFile);\n\tif(file.exists)\n\t{\t\n\t\tfile.deleteFile();\n\t}\n} catch(err) {\n\tSystem.warn(\"Error during deletion of the temporary file in guest OS (\"+vcoTempFile+\") :\\n\" + err);\n}",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "name": "vcoTempFile",
            "type": "string",
            "export-name": "vcoTempFile"
          }
        ]
      },
      "out-binding": {},
      "position": { "y": 273.59090909090907, "x": 1524.5 },
      "name": "item6",
      "out-name": "item31",
      "catch-name": "item38",
      "throw-bind-name": "errorCode",
      "type": "task",
      "comparator": 0
    },
    {
      "display-name": "Bash Script?",
      "script": {
        "value": "if(scriptType.toLowerCase() == \"bash\") return true;\nreturn false;",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "name": "scriptType",
            "type": "string",
            "export-name": "scriptType"
          }
        ]
      },
      "position": { "y": 18.136363636363633, "x": 544.5 },
      "name": "item3",
      "out-name": "item21",
      "alt-out-name": "item15",
      "type": "custom-condition",
      "comparator": 0
    },
    {
      "display-name": "set for Bat",
      "script": {
        "value": "\nscriptProgramPath = \"cmd.exe\";\n\n//script = script.replace(\"\\r\\n\", \" & \");\n//script = script.replace(\"\\n\", \" & \");\n\nscript = script.replace(new RegExp(\"\\r\\n\", 'g'), \" & \");\nscript = script.replace(new RegExp(\"\\n\", 'g'), \" & \");\n\nscript = \"\\\"\" + script + \"\\\"\";\nscriptArguments = \"/s /c cmd >\" + scriptOutputFile + \" 2>&1 /s /c \" + script;\n//scriptArguments = \"/s /c \" + script + \" 2>&1 | cmdansi \" + scriptOutputFile;\n",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          { "name": "script", "type": "string", "export-name": "script" },
          {
            "name": "scriptOutputFile",
            "type": "string",
            "export-name": "scriptOutputFile"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "name": "scriptArguments",
            "type": "string",
            "export-name": "scriptArguments"
          },
          {
            "name": "scriptProgramPath",
            "type": "string",
            "export-name": "scriptProgramPath"
          }
        ]
      },
      "description": "Use the same implementation as used in PowerCLI\n(VMware.VimAutomation.ViCore.Impl.V1.RunScriptInGuestHelper)",
      "position": { "y": 91.77272727272727, "x": 684.5 },
      "name": "item7",
      "out-name": "item32",
      "type": "task",
      "comparator": 0
    },
    {
      "position": { "y": 199.95454545454544, "x": 1564.5 },
      "name": "item5",
      "throw-bind-name": "errorCode",
      "type": "end",
      "end-mode": "1",
      "comparator": 0
    },
    {
      "display-name": "isToolsOk ?",
      "script": {
        "value": "return System.getModule(\"com.vmware.pso.GuestOps\").testVmToolsForGuestOps(vm);",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          { "name": "vm", "type": "VC:VirtualMachine", "export-name": "vm" }
        ]
      },
      "position": { "y": 18.136363636363633, "x": 125.0 },
      "name": "item13",
      "out-name": "item41",
      "alt-out-name": "item19",
      "type": "custom-condition",
      "comparator": 0
    },
    {
      "display-name": "isFinished ?",
      "script": {
        "value": "//Generated by the system, cannot be edited\nreturn (scriptFinished == true) ;",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "name": "scriptFinished",
            "type": "boolean",
            "export-name": "scriptFinished"
          }
        ]
      },
      "condition": [
        {
          "value": "false",
          "name": "scriptFinished",
          "type": "boolean",
          "comparator": 0,
          "label": "null"
        }
      ],
      "position": { "y": 199.95454545454544, "x": 1804.5 },
      "name": "item14",
      "out-name": "item10",
      "alt-out-name": "item18",
      "type": "condition",
      "comparator": 0
    },
    {
      "display-name": "Check script state",
      "script": {
        "value": "if(scriptProcessInfo && scriptProcessInfo.length > 0)\n{\n\tfor each(var guestProcessInfo in scriptProcessInfo)\n\t{\t\t\n\t\tif(guestProcessInfo.pid == scriptPid)\n\t\t{\n\t\t\tif (System.getObjectType(guestProcessInfo.exitCode) != null)\n\t\t\t{\n\t\t\t\tscriptExitCode = guestProcessInfo.exitCode;\n\t\t\t\tscriptFinished = true;\n\t\t\t}\n\t\t\tbreak;\n\t\t}\n\t}\n}\nelse\n{\n\tthrow \"Process not found\";\n}\n",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "name": "scriptProcessInfo",
            "type": "Array/CompositeType(pid:number,name:string,owner:string,cmdLine:string,startTime:Date,endTime:Date,exitCode:number):GuestProcessInfoType",
            "export-name": "scriptProcessInfo"
          },
          { "name": "scriptPid", "type": "number", "export-name": "scriptPid" }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "name": "scriptFinished",
            "type": "boolean",
            "export-name": "scriptFinished"
          },
          {
            "name": "scriptExitCode",
            "type": "number",
            "export-name": "scriptExitCode"
          }
        ]
      },
      "position": { "y": 209.95454545454544, "x": 1664.5 },
      "name": "item16",
      "out-name": "item14",
      "catch-name": "item5",
      "throw-bind-name": "errorCode",
      "type": "task",
      "comparator": 0
    },
    {
      "display-name": "Timeout ?",
      "script": {
        "value": "return (scriptTimeout > scriptTimeoutCounter*scriptRefreshTime)",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "name": "scriptTimeoutCounter",
            "type": "number",
            "export-name": "scriptTimeoutCounter"
          },
          {
            "name": "scriptTimeout",
            "type": "number",
            "export-name": "scriptTimeout"
          },
          {
            "name": "scriptRefreshTime",
            "type": "number",
            "export-name": "scriptRefreshTime"
          }
        ]
      },
      "position": { "y": 18.136363636363633, "x": 1804.5 },
      "name": "item18",
      "out-name": "item11",
      "alt-out-name": "item2",
      "type": "custom-condition",
      "comparator": 0
    },
    {
      "display-name": "set for Linux",
      "script": {
        "value": "\nscriptProgramPath = \"/bin/bash\";\n\nscript = script.replace(\"\\r\\n\", \" ; \");\nscript = script.replace(\"\\\\\\\"\", \"'\\\"'\");\nscript = script.replace(/\\\"/g, \"\\\\\\\\\\\\\\\"\");\nscriptArguments = \"-c \\\"bash > \" + scriptOutputFile + \" 2>&1 -c \\\\\\\"\" + script + \"\\\\\\\"\\\"\";\nuseCmdAnsi = false;",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          { "name": "script", "type": "string", "export-name": "script" },
          {
            "name": "scriptOutputFile",
            "type": "string",
            "export-name": "scriptOutputFile"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "name": "scriptArguments",
            "type": "string",
            "export-name": "scriptArguments"
          },
          {
            "name": "scriptProgramPath",
            "type": "string",
            "export-name": "scriptProgramPath"
          },
          {
            "name": "useCmdAnsi",
            "type": "boolean",
            "export-name": "useCmdAnsi"
          }
        ]
      },
      "description": "Use the same implementation as used in PowerCLI\n(VMware.VimAutomation.ViCore.Impl.V1.RunScriptInGuestHelper)",
      "position": { "y": 28.136363636363633, "x": 1384.5 },
      "name": "item21",
      "out-name": "item0",
      "type": "task",
      "comparator": 0
    },
    {
      "display-name": "Sleep / Count",
      "script": {
        "value": "//Sleep\nif ( scriptRefreshTime == null )  {\n\tdelay = 60;\n} else {\n\tdelay = scriptRefreshTime;\n}\n\n//Measure timeout\nscriptTimeoutCounter++;\n",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "name": "scriptRefreshTime",
            "type": "number",
            "export-name": "scriptRefreshTime"
          },
          {
            "name": "scriptTimeoutCounter",
            "type": "number",
            "export-name": "scriptTimeoutCounter"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "name": "scriptTimeoutCounter",
            "type": "number",
            "export-name": "scriptTimeoutCounter"
          },
          { "name": "delay", "type": "number", "export-name": "delay" }
        ]
      },
      "position": { "y": 28.136363636363633, "x": 1664.5 },
      "name": "item11",
      "out-name": "item37",
      "type": "task",
      "comparator": 0
    },
    {
      "display-name": "Make Temp File in VM",
      "in-binding": {
        "bind": [
          {
            "description": "Username for the virtual machine",
            "name": "vmUsername",
            "type": "string",
            "export-name": "username"
          },
          {
            "description": "Password for the virtual machine",
            "name": "vmPassword",
            "type": "SecureString",
            "export-name": "password"
          },
          {
            "description": "Virtual machine",
            "name": "vm",
            "type": "VC:VirtualMachine",
            "export-name": "vm"
          },
          {
            "description": "The complete path to the directory in which to create the new file. If unset or an empty string, a guest-specific location will be used.",
            "name": "dirPath",
            "type": "string",
            "export-name": "guestTempDirectory"
          },
          {
            "description": "The prefix to be given to the new temporary file",
            "name": "prefix",
            "type": "string",
            "export-name": "scriptOutputPrefix"
          },
          {
            "description": "The suffix to be given to the new temporary file",
            "name": "suffix",
            "type": "string"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "description": "The absolute path of the temporary file that is created.",
            "name": "result",
            "type": "string",
            "export-name": "scriptOutputFile"
          }
        ]
      },
      "description": "Create a temporary file in a guest virtual machine.",
      "position": { "y": 28.136363636363633, "x": 404.5 },
      "name": "item17",
      "out-name": "item3",
      "catch-name": "item33",
      "throw-bind-name": "errorMessage",
      "type": "link",
      "business-status": "Create temporary file in guest",
      "linked-workflow-id": "C9808080808080808080808080808080DA80808001322751030482b80adf61e7c",
      "comparator": 0
    },
    {
      "display-name": "Start Script",
      "in-binding": {
        "bind": [
          {
            "description": "Username for the virtual machine",
            "name": "vmUsername",
            "type": "string",
            "export-name": "username"
          },
          {
            "description": "Password for the virtual machine",
            "name": "vmPassword",
            "type": "SecureString",
            "export-name": "password"
          },
          {
            "description": "Virtual machine",
            "name": "vm",
            "type": "VC:VirtualMachine",
            "export-name": "vm"
          },
          {
            "description": "This is set to true if the client wants an interactive session in the guest.",
            "name": "interactiveSession",
            "type": "boolean",
            "export-name": "interactiveSession"
          },
          {
            "description": "The absolute path to the program to start. For Linux guest operating systems, /bin/bash is used to start the program.  For Solaris guest operating systems, /bin/bash is used to start the program if it exists. Otherwise /bin/sh is used. If /bin/sh is used, then the process ID returned will be that of the shell used to start the program, rather than the program itself, due to the differences in how /bin/sh and /bin/bash work. This PID will still be usable for watching the process with this API to find its exit code and elapsed time. ",
            "name": "programPath",
            "type": "string",
            "export-name": "scriptProgramPath"
          },
          {
            "description": "The arguments to the program. In Linux and Solaris guest operating systems, the program will be executed by a guest shell. This allows stdio redirection, but may also require that characters which must be escaped to the shell also be escaped on the command line provided. For Windows guest operating systems, prefixing the command with \"cmd /c\" can provide stdio redirection. ",
            "name": "arguments",
            "type": "string",
            "export-name": "scriptArguments"
          },
          {
            "description": "The absolute path of the working directory for the program to be run. VMware recommends explicitly setting the working directory for the program to be run. If this value is unset or is an empty string, the behavior depends on the guest operating system. For Linux guest operating systems, if this value is unset or is an empty string, the working directory will be the home directory of the user associated with the guest authentication. For other guest operating systems, if this value is unset, the behavior is unspecified. ",
            "name": "workingDirectory",
            "type": "string",
            "export-name": "scriptWorkingDirectory"
          },
          {
            "description": "An array of environment variables, specified in the guest OS notation (eg PATH=c:\\bin;c:\\windows\\system32 or LD_LIBRARY_PATH=/usr/lib:/lib), to be set for the program being run. Note that these are not additions to the default environment variables; they define the complete set available to the program. If none are specified the values are guest dependent. ",
            "name": "environment",
            "type": "Array/Any",
            "export-name": "NULL"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "description": "The pid of the program started.",
            "name": "result",
            "type": "number",
            "export-name": "scriptPid"
          }
        ]
      },
      "description": "Starts a program in the guest operating system.\nA process started this way can have its status queried with this API. When the process completes, its exit code and end time will be available for 5 minutes after completion.",
      "position": { "y": 28.136363636363633, "x": 1524.5 },
      "name": "item0",
      "out-name": "item11",
      "type": "link",
      "linked-workflow-id": "C98080808080808080808080808080805E80808001322751030482b80adf61e7c",
      "comparator": 0
    },
    {
      "display-name": "Get Processes",
      "in-binding": {
        "bind": [
          {
            "description": "Username for the virtual machine",
            "name": "vmUsername",
            "type": "string",
            "export-name": "username"
          },
          {
            "description": "Password for the virtual machine",
            "name": "vmPassword",
            "type": "SecureString",
            "export-name": "password"
          },
          {
            "description": "Virtual machine",
            "name": "vm",
            "type": "VC:VirtualMachine",
            "export-name": "vm"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "description": "The list running processes.",
            "name": "result",
            "type": "Array/CompositeType(pid:number,name:string,owner:string,cmdLine:string,startTime:Date,endTime:Date,exitCode:number):GuestProcessInfoType",
            "export-name": "scriptProcessInfo"
          }
        ]
      },
      "description": "List the processes running in the guest operating system, plus those started by this API that have recently completed",
      "position": { "y": 155.4090909090909, "x": 1664.5 },
      "name": "item1",
      "out-name": "item16",
      "catch-name": "item40",
      "throw-bind-name": "errorCode",
      "type": "link",
      "linked-workflow-id": "C98080808080808080808080808080800180808001322751030482b80adf61e7c",
      "comparator": 0
    },
    {
      "display-name": "Copy output file",
      "in-binding": {
        "bind": [
          {
            "description": "Username for the virtual machine",
            "name": "vmUsername",
            "type": "string",
            "export-name": "username"
          },
          {
            "description": "Password for the virtual machine",
            "name": "vmPassword",
            "type": "SecureString",
            "export-name": "password"
          },
          {
            "description": "Virtual machine",
            "name": "vm",
            "type": "VC:VirtualMachine",
            "export-name": "vm"
          },
          {
            "description": "Guest file path",
            "name": "guestFilePath",
            "type": "string",
            "export-name": "scriptOutputFile"
          },
          {
            "description": "Path on vCO server",
            "name": "vcoPath",
            "type": "string",
            "export-name": "vcoTempFile"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "description": "Set to true if copy operation was successful",
            "name": "result",
            "type": "boolean",
            "export-name": "vcoCopiedFileResult"
          }
        ]
      },
      "description": "Copies the specified file from the guest filesystem to the vCO server.",
      "position": { "y": 273.59090909090907, "x": 1804.5 },
      "name": "item4",
      "out-name": "item12",
      "type": "link",
      "linked-workflow-id": "C3808080808080808080808080808080ED80808001322751030482b80adf61e7c",
      "comparator": 0
    },
    {
      "display-name": "Kill Script",
      "in-binding": {
        "bind": [
          {
            "description": "Username for the virtual machine",
            "name": "vmUsername",
            "type": "string",
            "export-name": "username"
          },
          {
            "description": "Password for the virtual machine",
            "name": "vmPassword",
            "type": "SecureString",
            "export-name": "password"
          },
          {
            "description": "Virtual machine",
            "name": "vm",
            "type": "VC:VirtualMachine",
            "export-name": "vm"
          },
          {
            "description": "Process ID of the process to be terminated ",
            "name": "pid",
            "type": "number",
            "export-name": "scriptPid"
          }
        ]
      },
      "out-binding": {},
      "description": "Terminates a process in the guest OS.",
      "position": { "y": 28.136363636363633, "x": 1944.5 },
      "name": "item2",
      "out-name": "item24",
      "type": "link",
      "linked-workflow-id": "C98080808080808080808080808080807B80808001322751030482b80adf61e7c",
      "comparator": 0
    },
    {
      "display-name": "Read output file",
      "script": {
        "value": "var fr = new FileReader(vcoTempFile);\nif(fr.exists)\n{\n\tfr.open();\n\tscriptOutputText = fr.readAll();\n\t//System.log(scriptOutputText);\n}\nelse\n{\n\tscriptOutputText = \"error: no output\"\n}\n\nfr.close();",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "name": "vcoTempFile",
            "type": "string",
            "export-name": "vcoTempFile"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "name": "scriptOutputText",
            "type": "string",
            "export-name": "scriptOutputText"
          }
        ]
      },
      "position": { "y": 273.59090909090907, "x": 1664.5 },
      "name": "item12",
      "out-name": "item6",
      "type": "task",
      "comparator": 0
    },
    {
      "display-name": "Batch script?",
      "script": {
        "value": "if(scriptType.toLowerCase() == \"batch\" || scriptType.toLowerCase() == \"bat\") return true;\nreturn false;",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "name": "scriptType",
            "type": "string",
            "export-name": "scriptType"
          }
        ]
      },
      "position": { "y": 81.77272727272727, "x": 544.5 },
      "name": "item15",
      "out-name": "item7",
      "alt-out-name": "item20",
      "type": "custom-condition",
      "comparator": 0
    },
    {
      "display-name": "Powershell script?",
      "script": {
        "value": "if(scriptType.toLowerCase() == \"powershell\") return true;\nreturn false;",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "name": "scriptType",
            "type": "string",
            "export-name": "scriptType"
          }
        ]
      },
      "position": { "y": 145.4090909090909, "x": 544.5 },
      "name": "item20",
      "out-name": "item34",
      "alt-out-name": "item22",
      "type": "custom-condition",
      "comparator": 0
    },
    {
      "display-name": "Error Message",
      "script": {
        "value": "errorMessage = \"VMware Tools are not running\"",
        "encoded": false
      },
      "in-binding": {},
      "out-binding": {
        "bind": [
          {
            "name": "errorMessage",
            "type": "string",
            "export-name": "errorMessage"
          }
        ]
      },
      "position": { "y": 219.04545454545453, "x": 125.0 },
      "name": "item19",
      "out-name": "item33",
      "type": "task",
      "comparator": 0
    },
    {
      "display-name": "Error Message",
      "script": {
        "value": "errorMessage = \"Script Type doesn't match with 'batch' / 'powershell' / 'bash'\"",
        "encoded": false
      },
      "in-binding": {},
      "out-binding": {
        "bind": [
          {
            "name": "errorMessage",
            "type": "string",
            "export-name": "errorMessage"
          }
        ]
      },
      "position": { "y": 219.04545454545453, "x": 544.5 },
      "name": "item22",
      "out-name": "item33",
      "type": "task",
      "comparator": 0
    },
    {
      "display-name": "set for Powershell",
      "script": {
        "value": "\nscriptProgramPath = \"cmd.exe\";\n\nvar s = \"powershell.exe -OutputFormat text -NonInteractive -Command '& {\"+script+\"}; exit $lastexitcode' > \\\"\"+scriptOutputFile+\"\\\"; exit $lastexitcode\"\n\nvar trap = \"trap\" + \"\\n\" + \"{\" + \"\\n\" + \"\tWrite-Error $_\" + \"\\n\" + \"    exit 1\" + \"\\n\" + \"}\"+ \"\\n\";\npowershellScript = trap + script;\n\n\n\nSystem.error(powershellScript);\n\n//need to be encoded in unicode (UTF-16LE, double-byte) base64\n//scriptArguments = \"/C powershell -NonInteractive -EncodedCommand \" + System.getModule(\"com.vmware.pso.util\").encodeBase64Unicode2(s);// + \" | cmdansi \" + scriptOutputFile;\n\n//Future : Need to change interactive below based on choice made in script config\nscriptArguments = \"/C powershell -OutputFormat text -NoProfile -NonInteractive -ExecutionPolicy unrestricted -f \" + powershellScriptPath + \" > \\\"\"+scriptOutputFile+\"\\\"\";\nSystem.error(scriptArguments);",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          { "name": "script", "type": "string", "export-name": "script" },
          {
            "name": "scriptOutputFile",
            "type": "string",
            "export-name": "scriptOutputFile"
          },
          {
            "name": "powershellScriptPath",
            "type": "string",
            "export-name": "powershellScriptGuestPath"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "name": "scriptArguments",
            "type": "string",
            "export-name": "scriptArguments"
          },
          {
            "name": "scriptProgramPath",
            "type": "string",
            "export-name": "scriptProgramPath"
          },
          {
            "name": "powershellScript",
            "type": "string",
            "export-name": "powershellScript"
          }
        ]
      },
      "description": "Use the same implementation as used in PowerCLI\n(VMware.VimAutomation.ViCore.Impl.V1.RunScriptInGuestHelper)",
      "position": { "y": 155.4090909090909, "x": 824.5 },
      "name": "item23",
      "out-name": "item36",
      "type": "task",
      "comparator": 0
    },
    {
      "display-name": "log message",
      "script": {
        "value": "System.warn(\"Script timeout - process has been killed\");",
        "encoded": false
      },
      "in-binding": {},
      "out-binding": {},
      "position": { "y": 82.68181818181817, "x": 1944.5 },
      "name": "item24",
      "out-name": "item10",
      "type": "task",
      "comparator": 0
    },
    {
      "display-name": "Create Temp File",
      "script": {
        "value": "var tempFilename = \"vcoGuest_\" + System.nextUUID();\nvar tempDirectory = System.getTempDirectory();\nvcoTempFile = System.appendToPath(tempDirectory , tempFilename);",
        "encoded": false
      },
      "in-binding": {},
      "out-binding": {
        "bind": [
          {
            "name": "vcoTempFile",
            "type": "string",
            "export-name": "vcoTempFile"
          }
        ]
      },
      "description": "Create temporary file on vCO server",
      "position": { "y": 209.95454545454544, "x": 1944.5 },
      "name": "item10",
      "out-name": "item26",
      "type": "task",
      "comparator": 0
    },
    {
      "display-name": "Copy cmdAnsi to VM",
      "in-binding": {
        "bind": [
          {
            "description": "Username for the virtual machine",
            "name": "vmUsername",
            "type": "string",
            "export-name": "username"
          },
          {
            "description": "Password for the virtual machine",
            "name": "vmPassword",
            "type": "SecureString",
            "export-name": "password"
          },
          {
            "description": "Virtual machine",
            "name": "vm",
            "type": "VC:VirtualMachine",
            "export-name": "vm"
          },
          {
            "description": "Path on vCO server",
            "name": "vcoPath",
            "type": "string",
            "export-name": "cmdAnsiVcoPath"
          },
          {
            "description": "Guest file path",
            "name": "guestFilePath",
            "type": "string",
            "export-name": "cmdAnsiGuestPath"
          },
          {
            "description": "Overwrite file if exists",
            "name": "overwrite",
            "type": "boolean",
            "export-name": "overwrite"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "description": "Set to true if copy operation was successful",
            "name": "result",
            "type": "boolean",
            "export-name": "vcoCopiedFileResult"
          }
        ]
      },
      "description": "Copy cmdAnsi from vCO to guest",
      "position": { "y": 91.77272727272727, "x": 1384.5 },
      "name": "item28",
      "out-name": "item0",
      "type": "link",
      "linked-workflow-id": "C78080808080808080808080808080809480808001322751030482b80adf61e7c",
      "comparator": 0
    },
    {
      "display-name": "Save cmdAnsi to vCO",
      "script": {
        "value": "var cmdAnsiVcoPath = System.getTempDirectory() + \"/\" + cmdAnsi.name;\n\nvar cmdAnsiFile = new File(cmdAnsiVcoPath);\n\nif (cmdAnsiFile.exists == true) {\n\tSystem.log(cmdAnsi.name + \" already exist on vCO server : \" + cmdAnsiVcoPath);\n\t}\nelse {\t\n\tSystem.log(\"Writing resource to vCO server : \" + cmdAnsiVcoPath);\n\tcmdAnsi.writeContentToFile(cmdAnsiVcoPath);\n}",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "name": "cmdAnsi",
            "type": "ResourceElement",
            "export-name": "cmdAnsi"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "name": "cmdAnsiVcoPath",
            "type": "string",
            "export-name": "cmdAnsiVcoPath"
          }
        ]
      },
      "description": "Write cmdAnsi.exe to vCO filesystem",
      "position": { "y": 91.77272727272727, "x": 1244.5 },
      "name": "item30",
      "out-name": "item28",
      "type": "task",
      "comparator": 0
    },
    {
      "display-name": "Path for cmdAnsi",
      "script": {
        "value": "cmdAnsiGuestPath = guestTempDirectory+\"\\\\\"+cmdAnsi.name;",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "name": "cmdAnsi",
            "type": "ResourceElement",
            "export-name": "cmdAnsi"
          },
          {
            "name": "guestTempDirectory",
            "type": "string",
            "export-name": "guestTempDirectory"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "name": "cmdAnsiGuestPath",
            "type": "string",
            "export-name": "cmdAnsiGuestPath"
          }
        ]
      },
      "position": { "y": 91.77272727272727, "x": 1104.5 },
      "name": "item32",
      "out-name": "item30",
      "type": "task",
      "comparator": 0
    },
    {
      "position": { "y": 209.04545454545453, "x": 384.5 },
      "name": "item33",
      "throw-bind-name": "errorMessage",
      "type": "end",
      "end-mode": "1",
      "comparator": 0
    },
    {
      "display-name": "Convert ANSI chars?",
      "script": {
        "value": "//Generated by the system, cannot be edited\nreturn (useCmdAnsi == true) ;",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "name": "useCmdAnsi",
            "type": "boolean",
            "export-name": "useCmdAnsi"
          }
        ]
      },
      "condition": [
        {
          "value": "false",
          "name": "useCmdAnsi",
          "type": "boolean",
          "comparator": 0,
          "label": "null"
        }
      ],
      "position": { "y": 263.59090909090907, "x": 1944.5 },
      "name": "item26",
      "out-name": "item27",
      "alt-out-name": "item4",
      "type": "condition",
      "comparator": 0
    },
    {
      "display-name": "Set ansi cmd",
      "script": {
        "value": "scriptProgramPath = \"cmd.exe\";\nscriptArguments = \"/A /C type \" + scriptOutputFile + \" | cmdansi \" + scriptOutputFile;",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "name": "scriptOutputFile",
            "type": "string",
            "export-name": "scriptOutputFile"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "name": "scriptArguments",
            "type": "string",
            "export-name": "scriptArguments"
          },
          {
            "name": "scriptProgramPath",
            "type": "string",
            "export-name": "scriptProgramPath"
          }
        ]
      },
      "position": { "y": 337.2272727272727, "x": 1944.5 },
      "name": "item27",
      "out-name": "item29",
      "type": "task",
      "comparator": 0
    },
    {
      "display-name": "Convert ANSI Output",
      "in-binding": {
        "bind": [
          {
            "description": "Username for the virtual machine",
            "name": "vmUsername",
            "type": "string",
            "export-name": "username"
          },
          {
            "description": "Password for the virtual machine",
            "name": "vmPassword",
            "type": "SecureString",
            "export-name": "password"
          },
          {
            "description": "Virtual machine",
            "name": "vm",
            "type": "VC:VirtualMachine",
            "export-name": "vm"
          },
          {
            "description": "This is set to true if the client wants an interactive session in the guest.",
            "name": "interactiveSession",
            "type": "boolean",
            "export-name": "interactiveSession"
          },
          {
            "description": "The absolute path to the program to start. For Linux guest operating systems, /bin/bash is used to start the program.  For Solaris guest operating systems, /bin/bash is used to start the program if it exists. Otherwise /bin/sh is used. If /bin/sh is used, then the process ID returned will be that of the shell used to start the program, rather than the program itself, due to the differences in how /bin/sh and /bin/bash work. This PID will still be usable for watching the process with this API to find its exit code and elapsed time. ",
            "name": "programPath",
            "type": "string",
            "export-name": "scriptProgramPath"
          },
          {
            "description": "The arguments to the program. In Linux and Solaris guest operating systems, the program will be executed by a guest shell. This allows stdio redirection, but may also require that characters which must be escaped to the shell also be escaped on the command line provided. For Windows guest operating systems, prefixing the command with \"cmd /c\" can provide stdio redirection. ",
            "name": "arguments",
            "type": "string",
            "export-name": "scriptArguments"
          },
          {
            "description": "The absolute path of the working directory for the program to be run. VMware recommends explicitly setting the working directory for the program to be run. If this value is unset or is an empty string, the behavior depends on the guest operating system. For Linux guest operating systems, if this value is unset or is an empty string, the working directory will be the home directory of the user associated with the guest authentication. For other guest operating systems, if this value is unset, the behavior is unspecified. ",
            "name": "workingDirectory",
            "type": "string",
            "export-name": "scriptWorkingDirectory"
          },
          {
            "description": "An array of environment variables, specified in the guest OS notation (eg PATH=c:\\bin;c:\\windows\\system32 or LD_LIBRARY_PATH=/usr/lib:/lib), to be set for the program being run. Note that these are not additions to the default environment variables; they define the complete set available to the program. If none are specified the values are guest dependent. ",
            "name": "environment",
            "type": "Array/Any",
            "export-name": "NULL"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "description": "The pid of the program started.",
            "name": "result",
            "type": "number",
            "export-name": "scriptPid"
          }
        ]
      },
      "description": "Starts a program in the guest operating system.\nA process started this way can have its status queried with this API. When the process completes, its exit code and end time will be available for 5 minutes after completion.",
      "position": { "y": 337.2272727272727, "x": 1804.5 },
      "name": "item29",
      "out-name": "item4",
      "type": "link",
      "linked-workflow-id": "C98080808080808080808080808080805E80808001322751030482b80adf61e7c",
      "comparator": 0
    },
    {
      "display-name": "Create Temp FIle",
      "in-binding": {
        "bind": [
          {
            "description": "Username for the virtual machine",
            "name": "vmUsername",
            "type": "string",
            "export-name": "username"
          },
          {
            "description": "Password for the virtual machine",
            "name": "vmPassword",
            "type": "SecureString",
            "export-name": "password"
          },
          {
            "description": "Virtual machine",
            "name": "vm",
            "type": "VC:VirtualMachine",
            "export-name": "vm"
          },
          {
            "description": "The complete path to the directory in which to create the new file. If unset or an empty string, a guest-specific location will be used.",
            "name": "dirPath",
            "type": "string",
            "export-name": "guestTempDirectory"
          },
          {
            "description": "The prefix to be given to the new temporary file",
            "name": "prefix",
            "type": "string",
            "export-name": "scriptOutputPrefix"
          },
          {
            "description": "The suffix to be given to the new temporary file",
            "name": "suffix",
            "type": "string",
            "export-name": "powershellSuffix"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "description": "The absolute path of the temporary file that is created.",
            "name": "result",
            "type": "string",
            "export-name": "powershellScriptGuestPath"
          }
        ]
      },
      "description": "Create a temporary powershell file in guest",
      "position": { "y": 155.4090909090909, "x": 684.5 },
      "name": "item34",
      "out-name": "item23",
      "type": "link",
      "linked-workflow-id": "C9808080808080808080808080808080DA80808001322751030482b80adf61e7c",
      "comparator": 0
    },
    {
      "display-name": "Copy file from vCO to guest",
      "in-binding": {
        "bind": [
          {
            "description": "Username for the virtual machine",
            "name": "vmUsername",
            "type": "string",
            "export-name": "username"
          },
          {
            "description": "Password for the virtual machine",
            "name": "vmPassword",
            "type": "SecureString",
            "export-name": "password"
          },
          {
            "description": "Virtual machine",
            "name": "vm",
            "type": "VC:VirtualMachine",
            "export-name": "vm"
          },
          {
            "description": "Path on vCO server",
            "name": "vcoPath",
            "type": "string",
            "export-name": "powershellScriptVcoPath"
          },
          {
            "description": "Guest file path",
            "name": "guestFilePath",
            "type": "string",
            "export-name": "powershellScriptGuestPath"
          },
          {
            "description": "Overwrite file if exists",
            "name": "overwrite",
            "type": "boolean",
            "export-name": "overwrite"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "description": "Set to true if copy operation was successful",
            "name": "result",
            "type": "boolean",
            "export-name": "vcoCopiedFileResult"
          }
        ]
      },
      "description": "Copies the specified file from the vCO server to the guest file system.",
      "position": { "y": 155.4090909090909, "x": 1104.5 },
      "name": "item35",
      "out-name": "item32",
      "type": "link",
      "linked-workflow-id": "C78080808080808080808080808080809480808001322751030482b80adf61e7c",
      "comparator": 0
    },
    {
      "display-name": "Save script to vCO",
      "script": {
        "value": "powershellScriptVcoPath = System.getTempDirectory() + \"/\" + System.nextUUID();\n\nvar fileWriter = new FileWriter(powershellScriptVcoPath);\nfileWriter.open();\nfileWriter.clean();\nfileWriter.write(powershellScript);\nfileWriter.close();",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "name": "powershellScript",
            "type": "string",
            "export-name": "powershellScript"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "name": "powershellScriptVcoPath",
            "type": "string",
            "export-name": "powershellScriptVcoPath"
          }
        ]
      },
      "position": { "y": 155.4090909090909, "x": 964.5 },
      "name": "item36",
      "out-name": "item35",
      "type": "task",
      "comparator": 0
    },
    {
      "position": { "y": 327.2272727272727, "x": 1284.5 },
      "name": "item8",
      "type": "end",
      "end-mode": "0",
      "comparator": 0
    },
    {
      "display-name": "System log",
      "script": {
        "value": "//Auto-generated script\nSystem.log(text);\n",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "description": "The text to log",
            "name": "text",
            "type": "String",
            "export-name": "errorCode"
          }
        ]
      },
      "out-binding": {},
      "description": "Log the input text to the console log with level 'log'",
      "position": { "y": 337.2272727272727, "x": 1524.5 },
      "name": "item38",
      "out-name": "item31",
      "type": "task",
      "prototype-id": "system-log",
      "interaction": "l",
      "comparator": 0
    },
    {
      "display-name": "Error Checking",
      "script": {
        "value": "if (errorCode.indexOf(\"Failed to authenticate\") > -1) {\n\tvar message = \"Failed to authenticate with the guest operating system, this workflow will now terminate.\";\n\tSystem.error(message);\n\tServer.error(message);\n\tthrow message;\n}\n\nelse if (errorCode.indexOf(\"The guest operating agent could not be contacted\") > -1) { var message = \"Retrieving the process list failed, cycling back into the loop\"; }\nelse { var message = \"Unknown error. The error handler passed the following output: \"+errorCode; }\nSystem.warn(message);\nServer.warn(message);\n",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          { "name": "errorCode", "type": "string", "export-name": "errorCode" }
        ]
      },
      "out-binding": {},
      "position": { "y": 91.77272727272727, "x": 1524.5 },
      "name": "item40",
      "out-name": "item11",
      "catch-name": "item5",
      "throw-bind-name": "errorCode",
      "type": "task",
      "comparator": 0
    },
    {
      "display-name": "Make Temp Dir in VM",
      "in-binding": {
        "bind": [
          {
            "description": "Username for the virtual machine",
            "name": "vmUsername",
            "type": "string",
            "export-name": "username"
          },
          {
            "description": "Password for the virtual machine",
            "name": "vmPassword",
            "type": "SecureString",
            "export-name": "password"
          },
          {
            "description": "Virtual machine",
            "name": "vm",
            "type": "VC:VirtualMachine",
            "export-name": "vm"
          },
          {
            "description": "The complete path to the directory in which to create the new directory. If unset or an empty string, a guest-specific location will be used.",
            "name": "dirPath",
            "type": "string",
            "export-name": "NULL"
          },
          {
            "description": "The prefix to be given to the new temporary directory",
            "name": "prefix",
            "type": "string",
            "export-name": "NULL"
          },
          {
            "description": "The suffix to be given to the new temporary directory",
            "name": "suffix",
            "type": "string",
            "export-name": "NULL"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "description": "The absolute path of the temporary directory that is created.",
            "name": "result",
            "type": "string",
            "export-name": "guestTempDirectory"
          }
        ]
      },
      "description": "Create a temporary directory in a guest virtual machine.",
      "position": { "y": 28.136363636363633, "x": 264.5 },
      "name": "item41",
      "out-name": "item17",
      "catch-name": "item33",
      "throw-bind-name": "errorCode",
      "type": "link",
      "linked-workflow-id": "C9808080808080808080808080808080CA80808001322751030482b80adf61e7c",
      "comparator": 0
    },
    {
      "display-name": "Delete Directory",
      "in-binding": {
        "bind": [
          {
            "description": "Username for the virtual machine",
            "name": "vmUsername",
            "type": "string",
            "export-name": "username"
          },
          {
            "description": "Password for the virtual machine",
            "name": "vmPassword",
            "type": "SecureString",
            "export-name": "password"
          },
          {
            "description": "Virtual machine",
            "name": "vm",
            "type": "VC:VirtualMachine",
            "export-name": "vm"
          },
          {
            "description": "Guest path",
            "name": "dirPath",
            "type": "string",
            "export-name": "guestTempDirectory"
          },
          {
            "description": "Delete directory content recursively",
            "name": "recirsive",
            "type": "boolean",
            "export-name": "recirsive"
          }
        ]
      },
      "out-binding": {
        "bind": [
          {
            "description": "Set to true if directory was created successfully",
            "name": "result",
            "type": "boolean",
            "export-name": "NULL"
          }
        ]
      },
      "description": "Delete a directory in a guest virtual machine.",
      "position": { "y": 273.59090909090907, "x": 1384.5 },
      "name": "item31",
      "out-name": "item8",
      "catch-name": "item9",
      "throw-bind-name": "errorCode",
      "type": "link",
      "linked-workflow-id": "C98080808080808080808080808080808280808001322751030482b80adf61e7c",
      "comparator": 0
    },
    {
      "display-name": "System log",
      "script": {
        "value": "//Auto-generated script\nSystem.log(text);\n",
        "encoded": false
      },
      "in-binding": {
        "bind": [
          {
            "description": "The text to log",
            "name": "text",
            "type": "String",
            "export-name": "errorCode"
          }
        ]
      },
      "out-binding": {},
      "description": "Log the input text to the console log with level 'log'",
      "position": { "y": 337.2272727272727, "x": 1385.0 },
      "name": "item9",
      "out-name": "item8",
      "type": "task",
      "prototype-id": "system-log",
      "interaction": "l",
      "comparator": 0
    },
    {
      "display-name": "Improved Sleep",
      "in-binding": {
        "bind": [
          {
            "description": "Time to wait (seconds)",
            "name": "delay",
            "type": "number",
            "export-name": "delay"
          }
        ]
      },
      "out-binding": {},
      "position": { "y": 91.77272727272727, "x": 1665.0 },
      "name": "item37",
      "out-name": "item1",
      "type": "link",
      "linked-workflow-id": "7ced6eda-298e-4d62-9811-7cb9c61f382b",
      "comparator": 0
    }
  ],
  "presentation": {
    "desc": "Run Script in Guest OS",
    "p-step": [
      {
        "title": "Run a script",
        "p-group": [
          {
            "title": "Virtual Machine Information",
            "p-param": [
              {
                "desc": "Virtual Machine",
                "p-qual": [
                  {
                    "value": "false",
                    "kind": "static",
                    "name": "mandatory",
                    "type": "boolean"
                  }
                ],
                "name": "vm"
              },
              {
                "desc": "Guest OS Username",
                "p-qual": [
                  {
                    "value": "true",
                    "kind": "static",
                    "name": "mandatory",
                    "type": "boolean"
                  }
                ],
                "name": "username"
              },
              {
                "desc": "Guest OS Password",
                "p-qual": [
                  {
                    "value": "false",
                    "kind": "static",
                    "name": "mandatory",
                    "type": "boolean"
                  }
                ],
                "name": "password"
              }
            ]
          },
          {
            "title": "Script",
            "p-param": [
              {
                "desc": "Script Type (bash, batch, powershell)",
                "p-qual": [
                  {
                    "value": "true",
                    "kind": "static",
                    "name": "mandatory",
                    "type": "boolean"
                  },
                  {
                    "value": "#{#string#batch#;#string#bash#;#string#powershell#}#",
                    "kind": "static",
                    "name": "genericEnumeration",
                    "type": "Array/string"
                  }
                ],
                "name": "scriptType"
              },
              {
                "desc": "Script",
                "p-qual": [
                  {
                    "value": "__NULL__",
                    "kind": "static",
                    "name": "textInput",
                    "type": "void"
                  },
                  {
                    "value": "true",
                    "kind": "static",
                    "name": "mandatory",
                    "type": "boolean"
                  }
                ],
                "name": "script"
              },
              {
                "desc": "Timeout for the running script (in second)",
                "p-qual": [
                  {
                    "value": "5.0",
                    "kind": "static",
                    "name": "minNumberValue",
                    "type": "Number"
                  },
                  {
                    "value": "120.0",
                    "kind": "static",
                    "name": "defaultValue",
                    "type": "number"
                  }
                ],
                "name": "scriptTimeout"
              },
              {
                "desc": "(default) Time (in seconds) where a check of script status occurs",
                "name": "scriptRefreshTime"
              },
              {
                "desc": "Script context interactivity",
                "p-qual": [
                  {
                    "value": "__NULL__",
                    "kind": "static",
                    "name": "defaultValue",
                    "type": "boolean"
                  }
                ],
                "name": "interactiveSession"
              },
              {
                "desc": "(optional) Script working directory in the guest",
                "name": "scriptWorkingDirectory"
              }
            ]
          }
        ]
      }
    ]
  },
  "workflow-note": [
    {
      "description": "Script Preparation",
      "x": 120.0,
      "y": 18.181818181818173,
      "w": 1400.0,
      "h": 172.72727272727272,
      "color": "b0ebb0ff"
    },
    {
      "description": "Manage timeout",
      "x": 1820.0,
      "y": 18.181818181818187,
      "w": 240.0,
      "h": 227.27272727272725,
      "color": "ebb0b0ff"
    },
    {
      "description": "Script Monitoring",
      "x": 1660.0,
      "y": 18.181818181818187,
      "w": 140.0,
      "h": 227.27272727272725,
      "color": "b0ebebff"
    },
    {
      "description": "Cleanup",
      "x": 1380.0,
      "y": 254.54545454545453,
      "w": 260.0,
      "h": 118.18181818181817,
      "color": "ebebebff"
    },
    {
      "description": "Retrieve output",
      "x": 1660.0,
      "y": 254.54545454545453,
      "w": 400.0,
      "h": 118.18181818181817,
      "color": "ebb0ebff"
    }
  ],
  "root-name": "item13",
  "object-name": "workflow:name=generic",
  "id": "f8cd5692-92a0-46b6-a98d-53ffd878d779",
  "version": "0.1.4",
  "api-version": "6.0.0",
  "allowed-operations": "evf",
  "restartMode": 1,
  "resumeFromFailedMode": 0
}
