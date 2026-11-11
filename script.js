const input = document.getElementById('command-input');
const output = document.getElementById('terminal-output');

// Comprehensive Crosh Command Directory
const croshCommands = {
    "help": "Basic Crosh Commands:<br>" +
            "- <b>help_advanced</b>: View advanced / debug crosh commands<br>" +
            "- <b>ping [host]</b>: Send ICMP ECHO_REQUEST packets<br>" +
            "- <b>network_diag</b>: Run network diagnostic suite<br>" +
            "- <b>battery_test [seconds]</b>: Check battery discharge rate<br>" +
            "- <b>top</b>: Display system process stats<br>" +
            "- <b>memtest</b>: Test free memory<br>" +
            "- <b>uptime</b>: Show how long system has been running<br>" +
            "- <b>vmstat</b>: Report virtual memory statistics<br>" +
            "- <b>clear</b>: Clear terminal display",

    "help_advanced": "Advanced & Developer Crosh Commands:<br>" +
            "- <b>shell</b>: Spawn interactive bash shell (Developer Mode)<br>" +
            "- <b>packet_capture</b>: Capture network traffic to file<br>" +
            "- <b>dmesg</b>: Display kernel ring buffer messages<br>" +
            "- <b>storage_test_1</b>: Run short offline storage test<br>" +
            "- <b>storage_test_2</b>: Run long offline storage test<br>" +
            "- <b>tpcontrol</b>: Configure touchpad settings<br>" +
            "- <b>xset</b>: Modify display settings<br>" +
            "- <b>evtest</b>: Input event monitoring<br>" +
            "- <b>rlz</b>: Show RLZ brand and installation codes<br>" +
            "- <b>set_vgem_param</b>: Set VGEM parameters<br>" +
            "- <b>sound</b>: Record or play audio diagnostic tests<br>" +
            "- <b>tracepath</b>: Trace path to network host<br>" +
            "- <b>p2p_update</b>: Manage peer-to-peer update sharing<br>" +
            "- <b>btmon</b>: Bluetooth monitor debug tool",

    "shell": "<span style='color:#ff5555;'>[DEVELOPER MODE ONLY]</span> Accessing bash...<br><span style='color:#00ff66;'>chronos@localhost / $</span> Type 'exit' to return to crosh.",

    "battery_test": "Battery status: Discharging (98%)<br>Battery health: 96.4%<br>Calculating discharge rate over 30s...<br>Battery discharged 0.04% in 30s.",

    "ping": "PING google.com (142.250.190.46) 56(84) bytes of data.<br>64 bytes from 142.250.190.46: icmp_seq=1 ttl=116 time=14.2 ms<br>64 bytes from 142.250.190.46: icmp_seq=2 ttl=116 time=13.8 ms<br>--- google.com ping statistics ---<br>2 packets transmitted, 2 received, 0% packet loss, time 1001ms",

    "network_diag": "Running network diagnostics...<br>[PASS] Gateway reachable<br>[PASS] DNS Resolution functional<br>[PASS] HTTP connectivity online<br>All checks completed successfully.",

    "top": "top - 21:18:00 up 4:12, 1 user, load average: 0.24, 0.18, 0.15<br>Tasks: 142 total, 1 running, 141 sleeping<br>%Cpu(s): 2.4 us, 1.1 sy, 0.0 ni, 96.1 id<br>MiB Mem : 4096.0 total, 1842.1 free, 1420.5 used<br>PID USER PR NI VIRT RES SHR S %CPU %MEM TIME+ COMMAND<br>  1 root 20 0 1684 940 820 S 0.0 0.0 0:01.12 systemd",

    "memtest": "Free memory allocation check...<br>Allocating 512 MiB memory... SUCCESS<br>Testing pattern fill... PASSED<br>0 errors detected.",

    "uptime": "21:18:04 up 4 hours, 12 minutes, 1 user, load average: 0.22, 0.19, 0.15",

    "vmstat": "procs -----------memory---------- ---swap-- -----io--- -system-- ------cpu-----<br> r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st<br> 1  0      0 1886304  45120 892012    0    0    12    45  102  210  2  1 97  0  0",

    "dmesg": "[ 0.000000] Linux version 5.15.0-x3-generic (builder@x3-build)<br>[ 0.004112] CPU0: Intel Celeron N4500 @ 1.10GHz<br>[ 0.012419] Memory: 3982348K/4194304K available<br>[ 0.892011] ChromeOS EC initialized successfully.<br>[ 1.203114] EXT4-fs (mmcblk0p1): mounted filesystem.",

    "packet_capture": "Starting packet capture on wlan0...<br>Writing to /tmp/packet_capture_2026.pcap...<br>[Press Ctrl+C to stop capture - 14 packets logged]",

    "storage_test_1": "SMART overall-health self-assessment test result: PASSED<br>Short test duration: 2 minutes.<br>Status: Complete without error.",

    "storage_test_2": "SMART extended test queued...<br>Estimated completion time: 45 minutes.",

    "tpcontrol": "Touchpad Control Utility v1.2<br>Usage: tpcontrol [status|sensitivity|tap-to-click] [value]",

    "xset": "Display control parameter modified.",

    "evtest": "Available input devices:<br>/dev/input/event0: AT Translated Set 2 keyboard<br>/dev/input/event1: Elan Touchpad<br>Select device number: ",

    "rlz": "RLZ Brand Code: GOOG<br>Installation Code: 0x3_SYS_PROD",

    "set_vgem_param": "VGEM parameter successfully updated.",

    "sound": "Audio Diagnostic Tool:<br>- sound record [seconds]<br>- sound play<br>Default test tone output: 1000Hz PCM [OK]",

    "tracepath": "1: 192.168.1.1 (192.168.1.1) 1.120ms<br>2: 10.0.0.1 (10.0.0.1) 8.441ms<br>3: gateway.isp.net (203.0.113.1) 14.112ms<br>Resume: pmtu 1500 hops 3 back 3",

    "p2p_update": "P2P Update Sharing Status: ENABLED (Peers connected: 0)",

    "btmon": "Bluetooth monitor ver 5.64<br>Listening on hci0 interface... [No active BT packets]",

    "exit": "Exited session."
};

input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const fullCmd = input.value.trim();
        const baseCmd = fullCmd.split(' ')[0].toLowerCase();
        
        // Output user typed prompt
        const userLine = document.createElement('p');
        userLine.innerHTML = `<span class="prompt">crosh></span> ${fullCmd}`;
        output.insertBefore(userLine, input.parentElement);

        // Process response
        if (baseCmd === 'clear') {
            const paragraphs = output.querySelectorAll('p');
            paragraphs.forEach(p => p.remove());
            input.value = '';
            return;
        }

        let responseText = '';
        if (croshCommands[baseCmd]) {
            responseText = croshCommands[baseCmd];
        } else if (baseCmd !== '') {
            responseText = `Unknown command: '${baseCmd}'. Type <span class="highlight">'help'</span> for a list of commands.`;
        }

        if (responseText) {
            const respLine = document.createElement('p');
            respLine.className = 'sys-msg';
            respLine.innerHTML = responseText;
            output.insertBefore(respLine, input.parentElement);
        }

        input.value = '';
        output.scrollTop = output.scrollHeight;
    }
});
